const {Router} = require('express');
const multer = require('multer');
const path = require('path');
const imageProcessor = require('./imageProcessor');

const photoPath = path.resolve(__dirname, '../../client/photo-viewer.html')

const router = Router();

router.get('/photo-viewer',(req, resp) => {
  resp.senfFile('photoPath')
})


const filename = (req, file, callback) => {
  callback(null, file.originalname)
}

const storage  = multer.diskStorage(
  {
    destination: 'api/uploads/',
    filename,
  }
);

const fileFilter = (req, file, cb) => {
  if (file.mimetype !== 'image/png'){
    req.fileValidationError ='Wrong file type';
    cb(null, false, new Error('Wrong file type'))
  } else {
    cb(null, true)
  }
};

const upload = multer({
  fileFilter,
  storage,
})
    router.post('/upload', upload.single('photo'), async (req, res) => {
      if (req.fileValidationError)
        return res.status(400).json({err: req.fileValidationError})

 try {
    await imageProcessor(request.file.filename);
  } catch (error) {

 }
     return response.status(201).json({success: true})
    })

router.get('/photo-viewer', (request, response) => {
  response.sendFile(photoPath);
});

module.exports = router;