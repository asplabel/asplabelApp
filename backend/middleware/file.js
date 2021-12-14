/* DOCUMENTACIÓN DE MULTER
 * https://github.com/expressjs/multer
 */
const multer = require('multer')

const MIME_TIPE_MAP = {
  'image/png': 'png',
  'image/jpeg': 'jpeg',
  'image/jpg': 'jpg'
}

/* Configurar en donde se almacenará la imagen*/
const storage = multer.diskStorage({
  /*req: el request
    file: el archivo que se va a extraer
    cb: callback*/
  destination: (req, file, cb) => {
    let err
    let isValid
    if (file !=null){
      isValid = MIME_TIPE_MAP[file.mimetype]
      err = new Error("Invalid mime type")
    }else{
      isValid = false
    }
    if(isValid){
      err = null
      cb(err, "backend/images")
    }

  },
  filename: (req,file,cb) =>{
    if (file !=null){
      const name = file.originalname.toLowerCase().split(' ').join('-')
      const ext = MIME_TIPE_MAP[file.mimetype]
      cb(null, name + '-' + Date.now() + '.' + ext)
    }
  }
})

module.exports =  multer({storage: storage}).single("photo")
