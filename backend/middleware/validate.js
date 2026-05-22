const validateRegisterInput = (req, res, next) => {
    const data = req.body;
    const errors = {};

    // Basic fields validation
    if (!data.name || data.name.trim() === '') 
        errors.name = 'Name is required';

    if (!data.email || data.email.trim() === '') 
        errors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) 
        errors.email = 'Email is invalid';

    if (!data.mobile || data.mobile.trim() === '') 
        errors.mobile = 'Mobile number is required';
    else if (!/^\+?\d{10,}$/.test(data.mobile)) 
        errors.mobile = 'Mobile number is invalid';

    if (!data.dob || data.dob.trim() === '') 
        errors.dob = 'Date of birth is required';

    if (!data.password || data.password.trim() === '') 
        errors.password = 'Password is required';
    else if (data.password.length < 8) 
        errors.password = 'Password must be at least 8 characters';

    if (!data.confirmPassword || data.confirmPassword !== data.password) 
        errors.confirmPassword = 'Passwords do not match';

    if (data.terms !== true) 
        errors.terms = 'You must agree to the terms and conditions';

    // Role-specific validation
    if (data.role === 'student') {
        if (!data.university || data.university.trim() === '') 
            errors.university = 'University is required';
        if (!data.course || data.course.trim() === '') 
            errors.course = 'Course is required';
        if (!data.semester || data.semester.trim() === '') 
            errors.semester = 'Semester is required';
    }

    if (data.role === 'teacher') {
        if (!data.tDepartment || data.tDepartment.trim() === '') 
            errors.tDepartment = 'Department is required';
        if (!data.tDesignation || data.tDesignation.trim() === '') 
            errors.tDesignation = 'Designation is required';
        if (!data.expertise || !Array.isArray(data.expertise)) 
            errors.expertise = 'Expertise must be an array';
    }

     
    if (Object.keys(errors).length > 0) 
        return res.status(400).json(errors);

    next();
}; 


// const validateRegisterInput = (req, res, next) => {
//     const data = req.body;
//     const errors = {};

//     if (!data.name || data.name.trim() === '') 
//         errors.name = 'Name is required';

//     if (!data.email || data.email.trim() === '') 
//         errors.email = 'Email is required';
//     else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email))  
//         errors.email = 'Email is invalid'; 

//     if (!data.password || data.password.trim() === '') 
//         errors.password = 'Password is required';
//     else if (data.password.length < 6) 
//         errors.password = 'Password must be at least 6 characters';

//     if (!data.role || !['admin', 'student', 'teacher'].includes(data.role)) 
//         errors.role = 'Role must be either admin, student, or teacher';

//     if (Object.keys(errors).length > 0) 
//         return res.status(400).json(errors);  

//     next(); 
// };

const validateLoginInput = (req, res, next) => {
    const data = req.body;
    const errors = {};

    if (!data.email || data.email.trim() === '') 
        errors.email = 'Email is required';

    if (!data.password || data.password.trim() === '') 
        errors.password = 'Password is required';

    if (Object.keys(errors).length > 0) 
        return res.status(400).json(errors);

    next();
};

module.exports = { validateRegisterInput, validateLoginInput };
