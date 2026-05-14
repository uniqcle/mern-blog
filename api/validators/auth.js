import { body } from 'express-validator'

export const registerValidator = [
    body("email", "Неверный формат почты").isEmail(),
    body("password", "Пароль должен быть 5 символов").isLength({ min: 5 }),
	body("fullName", "Укажите имя").isLength({ min: 4 }),
	body('avatarUrl', "Неверная ссылка на аватарку").optional().isURL()
];