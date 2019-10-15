const validator = require('validator');
const isEmpty = require('./isEmpty');

const validateLoginInput = (data) => {
    let errors = {};

    data.email = !isEmpty(data.email) ? data.email : "";
    data.password = !isEmpty(data.email) ? data.password : "";
    
    if (validator.isEmpty(data.email)) {
        errors.email = "Email field is required";
    }

    if (validator.isEmpty(data.password)) {
        errors.password = "Password is required";
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}

module.exports = validateLoginInput;