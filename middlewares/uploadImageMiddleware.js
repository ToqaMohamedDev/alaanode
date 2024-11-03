const multer = require('multer');
const ApiError = require('../utils/apiError');
const path = require('path');

const multerOptions = () => {

  const multerStorage = multer.memoryStorage();

  const multerFilter = function (req, file, cb) {
    if (file.mimetype.startsWith('image')) {
      cb(null, true);
    } else {
      cb(new ApiError('Only Images allowed', 400), false);
    }
  };

  const upload = multer({ storage: multerStorage, fileFilter: multerFilter });

  return upload;
};


const multerOptionsVideo = () => {
  const multerStorage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/videos');
    },
    filename: (req, file, cb) => {
      const ext = path.extname(file.originalname);
      req.body.video=`${file.fieldname}-${Date.now()}`;
      req.body.ext=ext;
      cb(null, `${file.fieldname}-${Date.now()}${ext}`);
    }
  });

  const multerFilter = function (req, file, cb) {
    if (file.mimetype.startsWith('video')) {
      cb(null, true);
    } else {
      cb(new ApiError('Only Videos allowed', 400), false);
    }
  };
  const upload = multer({ storage: multerStorage, fileFilter: multerFilter });
  return upload;
};

exports.uploadSingleVideo = (fieldName) => multerOptionsVideo().single(fieldName);
exports.uploadSingleImage = (fieldName) => multerOptions().single(fieldName);
exports.uploadMixOfImages = (arrayOfFields) =>
  multerOptions().fields(arrayOfFields);
