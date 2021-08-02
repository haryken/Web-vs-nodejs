const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public/uploads/")
    },
    filename: function(req, file, cb) {
        cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname))
    }
})

const imageFilter = (req, file, cb) => {
    if (!file.originalname.match(/\.(jpg|JPG|jpeg|png|PNG)$/)) {
        req.fileValidationError = "Only image files are allowed";
        return cb(new Error("Only image files are allowed"), false);
    }

    cb(null, true);
}

module.exports = {
    storage,
    imageFilter,
}