const User = require('../models/User');
const { generateToken } = require('../config/jwt');


const registerUser = async (req, res) => {

    console.log("Registering user with data:", req.body);

    const {
        name,
        email,
        mobile,
        dob,
        password,
        role,
        university,
        course,
        semester,
        tDepartment,
        tDesignation,
        expertise,
        aDepartment,
        aRole,
        aEmployeeId,
        aAccessLevel,
        terms
    } = req.body;



    try {
        const userExists = await User.findOne({ email });

        if (userExists)
            return res.status(400).json({ message: 'User already exists' });

        const userData = {
            name,
            email,
            mobile,
            dob,
            password,
            role
        };

        if (role === 'student') {
            userData.studentDetails = { university, course, semester };
        } else if (role === 'teacher') {
            userData.teacherDetails = { department: tDepartment, designation: tDesignation, expertise };
        } 

        const user = await User.create(userData);

        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            mobile: user.mobile,
            dob: user.dob,
            role: user.role,
            studentDetails: user.studentDetails,
            teacherDetails: user.teacherDetails,
            adminDetails: user.adminDetails,
            terms: user.terms,
            token: generateToken(user._id),
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Backend Server Error' });
    }
};



// @desc    Register a new user
// @route   POST /api/auth/register   
// @access  Public

// const registerUser = async (req, res) => {
//     const { name, email, password, role } = req.body;
//     console.log(name, email, password, role);
//     try {
//         const userExists = await User.findOne({ email });

//         if (userExists) 
//             return res.status(400).json({ message: 'User already exists' });

//         const user = await User.create({ name, email, password, role});

//         res.status(201).json({
//             _id: user._id,
//             name: user.name,
//             email: user.email,
//             role: user.role,
//             token: generateToken(user._id),
//         }); 
//     } 
//     catch (error) {
//         console.error(error);
//         res.status(500).json({ message: 'Backend Server Error' });
//     }
// };


// @desc    Authenticate user & get token
// @route   POST /api/auth/login
// @access  Public

const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (user && await user.matchPassword(password)) {
            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                token: generateToken(user._id),
            });
        }
        else
            res.status(401).json({ message: 'Invalid email or password' });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Backend Server Error' });
    }
};

// @desc    Get user profile 
// @route   GET /api/auth/profile
// @access  Private 
const getUserProfile = async (req, res) => {
    try {
        // Check if req.user exists (depends on your auth middleware)
        if (!req.user || !req.user._id) {
            console.log(req.user);
            return res.status(401).json({ message: 'Unauthorized - User not authenticated' });
        }

        const user = await User.findById(req.user._id).select('-password');
        // console.log(user);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json(user);
    }
    catch (error) {
        console.error('Error in getUserProfile:', error);
        res.status(500).json({
            message: 'Server Error',
            // error: process.env.NODE_ENV === 'development' ? error.message : undefined 
        });
    }
};

module.exports = { registerUser, loginUser, getUserProfile };

