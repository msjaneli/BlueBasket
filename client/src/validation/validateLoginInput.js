import validator from 'validator';
import isEmpty from './isEmpty';

const validateLoginInput = (data) => {
    let errors = {};

    data.email = !isEmpty(data.email) ? data.email : "";
    data.password = !isEmpty(data.email) ? data.password : "";

    if (!validator.isEmail(data.email)) {
        errors.email = "Please enter a valid email";
    }
    
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

export default validateLoginInput;