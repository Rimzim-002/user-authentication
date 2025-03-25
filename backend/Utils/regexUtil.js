const regexUtils = {
    EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,  // ✅ Basic email validation
    PASSWORD: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,  
    // ✅ Password must be at least 8 characters, include letters, numbers, and special characters

    USERNAME: /^[a-zA-Z0-9_]{3,20}$/,  
    // ✅ Username should be 3-20 characters long, containing letters, numbers, or underscores

    isValidEmail: (email) => regexUtils.EMAIL.test(email),
    isValidPassword: (password) => regexUtils.PASSWORD.test(password),
    isValidUsername: (username) => regexUtils.USERNAME.test(username)
};

module.exports = regexUtils;
