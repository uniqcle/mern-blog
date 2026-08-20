import { validationResult } from "express-validator";


 const handleValidationErrors = (req, res, next) => {
 		// Валидация данных
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json(errors.array());
		}

	next(); 
}
 
export default handleValidationErrors; 