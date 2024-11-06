const Admin = require('../models/Admin')
const Teacher = require('../models/Teacher')
const Student = require('../models/Student')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const asyncHandler = require('express-async-handler')

const register = asyncHandler(async(req, res) => {
        const { adminName, email, school, password } = req.body;
      
        if( !school || !email || !adminName || !password) {
            return res.status(400).json({message: 'All fields are required'})
        }
        const foundSchool = await Admin.findOne({ school }).exec()
          if (foundSchool) {
            return res.status(400).json({ message: "school already exists." })
          }
      
        const salt = await bcrypt.genSalt(10)
          const hashedPassword = await bcrypt.hash(password, salt)
      
        const schoolObj = {
            adminName, school, email,
            password: hashedPassword,
          }
      
        const newSchool = await Admin.create(schoolObj)
          if(newSchool){
              res.status(201).json({ message: `New school ${school} created`})
          } else{
              res.status(400).json({ message: 'Invalid user data'})
          }
                
})
  

const logIn = asyncHandler(async (req, res) => {
    const { username, password } = req.body; 

    if (!username || !password) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    let foundUser;
    let userType;

    foundUser = await Admin.findOne({ school: username}).exec()
    if(foundUser){
        userType = 'Admin'
    }

    if(!foundUser){
        foundUser = await Teacher.findOne({ teacherNumber: username}).exec()
        if(foundUser){
            userType = 'Teacher'
        }
    }

    if(!foundUser){
        foundUser = await Student.findOne({ studentNumber: username}).exec()
        if(foundUser){
            userType = 'Student'
        }
    }

    if (!foundUser) {
        return res.status(401).json({ message: 'user does not exist' });
    }
    const match = await bcrypt.compare(password, foundUser.password);
    if (!match) return res.status(401).json({ message: 'wrong password' });

    let role;
    switch (userType) {
        case 'Admin':
            role = foundUser.role;
            break;
        case 'Teacher':
            role = 'Teacher';
            break;
        case 'Student':
            role = 'Student';
            break;
        default:
            role = 'user';
    }

    const accessToken = jwt.sign(
        {
            "UserInfo": {
                "username": username,
                "role": role,
                "userId": foundUser._id
            }
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: '15m' }
    );

    const refreshToken = jwt.sign(
        { "username": username },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: '7d' }
    );

    res.cookie('jwt', refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'None',
        maxAge: 7 * 24 * 60 * 60 * 1000
    });

    res.json({ accessToken });
});

const refresh = asyncHandler((req, res) => {
    const cookies = req.cookies
    if (!cookies?.jwt) return res.status(401).json({ message: 'Unauthorized, cookie' })

    const refreshToken = cookies.jwt

    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        asyncHandler(async (err, decoded) => {
            if (err) return res.status(403).json({ message: 'Forbidden' })
            let foundUser;
            let userType;
        
            foundUser = await Admin.findOne({ school: decoded.username}).exec()
            if(foundUser){
                userType = 'Admin'
            }
        
            if(!foundUser){
                foundUser = await Teacher.findOne({ teacherNumber: decoded.username}).exec()
                if(foundUser){
                    userType = 'Teacher'
                }
            }
        
            if(!foundUser){
                foundUser = await Student.findOne({ studentNumber: decoded.username}).exec()
                if(foundUser){
                    userType = 'Student'
                }
            }
        
            if (!foundUser) return res.status(401).json({ message: 'Unauthorized, user not found' })        
            let role;
            switch (userType) {
                case 'Admin':
                    role = foundUser.role;
                    break;
                case 'Teacher':
                    role = 'Teacher';
                    break;
                case 'Student':
                    role = 'Student';
                    break;
                default:
                    role = 'user';
            }
        

            const accessToken = jwt.sign(
                {
                    "UserInfo": {
                        "username": decoded.username,
                        "role": role,
                        "userId": foundUser._id
                    }
                },
                
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '15m' }
            )

            res.json({ accessToken })
        })
    )
})


const logOut = asyncHandler((req, res) => {
    const cookies = req.cookies
    if (!cookies?.jwt) return res.sendStatus(204) //No content
    res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true })
    res.json({ message: 'Cookie cleared' })
})

module.exports = {
    logIn, refresh, logOut, register
}