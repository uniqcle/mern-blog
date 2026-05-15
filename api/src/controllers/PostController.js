import PostModel from '../models/Post.js'

export const create = async (req, res) => {
	try {
		const doc = new PostModel({
			title: req.body.title, 
			text: req.body.text,
			imageUrl: req.body.imageUrl, 
			tags: req.body.tags,
			user: req.userId
		})

		const post = await doc.save(); 


		return res.status(200).json(post)

	} catch (err) {
		res.status(500).json({
			message: 'Не удалось добавить статью'
		})
	}
}