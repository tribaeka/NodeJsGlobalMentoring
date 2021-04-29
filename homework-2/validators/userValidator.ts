import { check } from "express-validator";

const PASSWORD_MATH_REGEXP = /^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/;

const checkUserAge = (age: number) => age >= 4 && age <=130;

const loginValidator = check('login').exists().notEmpty();
const passwordValidator = check('password').exists().matches(PASSWORD_MATH_REGEXP);
const ageValidator = check('age').exists().isNumeric().custom(checkUserAge);
const deleteStatusValidator = check('isDeleted').exists();


export const userValidator = [
    loginValidator,
    passwordValidator,
    ageValidator,
    deleteStatusValidator
];
