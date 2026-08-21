import multer from "multer";
import path from "path";

// Настройка хранилища
const storage = multer.diskStorage({
    // Куда сохранять
    destination: (req, file, cb) => {
        cb(null, "uploads/"); // Папка для сохранения
    },
    // Как назвать файл
    filename: (req, file, cb) => {
        // Формируем уникальное имя: текущая_дата-оригинальное_имя
        const uniqueName = Date.now() + "-" + file.originalname;
        cb(null, uniqueName);
    },
});

// Настройка фильтра файлов (принимаем только картинки)
const fileFilter = (req, file, cb) => {
 

    // const allowedTypes = /jpeg|jpg|png|webp/;
    // const extname = allowedTypes.test(
    //     path.extname(file.originalname).toLowerCase(),
    // );
    // const mimetype = allowedTypes.test(file.mimetype);

    // Проверяем только расширение файла
    const allowedExts = /\.(jpg|jpeg|png|webp|gif)$/i;
    const extname = allowedExts.test(
        path.extname(file.originalname).toLowerCase(),
    );



    // if (mimetype && extname) {
    if ( extname) {
        return cb(null, true); // Принять файл
    } else {
        cb(new Error("Разрешены только изображения (jpeg, jpg, png, webp)!")); // Отклонить
    }
};;;

// Собираем всё вместе
const upload = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // Лимит 5 MB
    fileFilter: fileFilter,
});

export default upload; 