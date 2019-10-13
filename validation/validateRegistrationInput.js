const validator = require('validator');
const isEmpty = require('./isEmpty');

const validateRegistrationInput = (data) => {
    let errors = {};

    data.name = !isEmpty(data.name) ? data.name : "";
    data.email = !isEmpty(data.email) ? data.email : "";
    data.password = !isEmpty(data.password) ? data.password : "";

    if (validator.isEmpty(data.name)) {
        errors.name = "Name field is required";
    }
    
    if (!validator.isEmail(data.email)) {
        errors.email = "Email is invalid";
    }
    
    if (validator.isEmpty(data.email)) {
        errors.email = "Email field is required";
    }

    if (data.password.length < 8) {
        errors.password = "Password must be at least 8 characters long";
    }

    if (validator.isEmpty(data.password)) {
        errors.password = "Password is required";
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }

}

module.exports = validateRegistrationInput;