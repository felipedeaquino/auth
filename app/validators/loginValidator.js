import { body, validationResult } from 'express-validator'

const loginValidator = [
  body('username').isLength({ min: 3 }).withMessage('The minimum accepted username length is 3 alphanumeric characters.'),
  body('password').isLength({ min: 6 }).withMessage('The minimum password length is 6 characters.'),
  (req, res, next) => {
    const errors = validationResult(req);
      if (!errors.isEmpty())
        return res.status(422).json({errors: errors.array()});
      next();
    },
  ];

  export { loginValidator };