const { check } = require("express-validator");
const slugify = require("slugify");
const validatorMiddleware = require("../../middlewares/validatorMiddleware");
const User = require("../../models/User");

exports.signupValidator = [
    check("firstName")
        .notEmpty()
        .withMessage("First name required")
        .isLength({ min: 2 })
        .withMessage("Too short first name")
        .custom((val, { req }) => {
            req.body.slug = slugify(val);
            return true;
        }),
    check("lastName")
        .notEmpty()
        .withMessage("Last name required")
        .isLength({ min: 2 })
        .withMessage("Too short last name")
        .custom((val, { req }) => {
            req.body.slug = slugify(val);
            return true;
        }),
    check("email")
        .notEmpty()
        .isEmail()
        .withMessage("Invalid email format")
        .custom((val) =>
            User.findOne({ email: val }).then((user) => {
                if (user) {
                    return Promise.reject(new Error("User already exists"));
                }
            })
        ),
    check("password")
        .notEmpty()
        .withMessage("Password required")
        .isLength({ min: 8 })
        .withMessage("Password must be at least 8 characters long")
        .custom((pass, { req }) => {
            if (pass !== req.body.passwordConfirm) {
                throw new Error("Passwords do not match");
            }
            return true;
        }),
    check("passwordConfirm")
        .notEmpty()
        .withMessage("Password confirmation required"),
    check("phone")
        .optional()
        .isMobilePhone(["en-GB"])
        .withMessage("Invalid phone only accepted UK phone numbers"),
    validatorMiddleware,
];

exports.loginValidator = [
    check("email").notEmpty().isEmail().withMessage("Invalid email format"),
    check("password")
        .notEmpty()
        .withMessage("Password required")
        .isLength({ min: 8 })
        .withMessage("Password must be at least 8 characters long"),
    validatorMiddleware,
];
