import fs from "fs";
import path from "path";
import multer from "multer";
import { BUCKETS as buckets } from "../../env";

//Genera el nombre del archivo
const generateFileName = (id, mimetype) => {
  return `${id}_${Date.now()}.${mimetype}`;
};

const saveFile = ({ filePath, destinationPath, destBucket }) => {
  const bucket = buckets[destBucket];
  if (bucket === undefined) {
    return {
      error: true,
      data: "El bucket no existe",
    };
  }
  try {
    const fileBuffer = fs.readFileSync(filePath);
    const destination = path.join(bucket, destinationPath);
    fs.existsSync(destination) && fs.unlinkSync(destination);
    fs.writeFileSync(destination, fileBuffer);
    return { error: false, data: [destBucket, destinationPath].join("/") };
  } catch (error) {
    return {
      error: true,
      data: error,
    };
  }
};

const mvUpload = (file, savePath, fileName) => {
  return saveFile({
    filePath: file.fullPath,
    destinationPath: `${fileName}`,
    destBucket: savePath,
  });
};

//Extrae los archivos del request y los agrega al cuerpo del req
const uploadHandler = (uploadMultert) => {
  return (req, res, next) => {
    const errorHandler = (error) => {
      if (error instanceof multer.MulterError) {
        console.error(error);
        return res
          .status(500)
          .json({
            error: true,
            message: 'Ocurrió un error al procesar el archivo',
            data: error.code,
          });
      } else if (error) {
        return res
          .status(403)
          .json({ error: true, message: error.message, data: null });
      }
      next();
    };
    uploadMultert(req, res, errorHandler);
  };
};

module.exports = {
  saveFile,
  generateFileName,
  mvUpload,
  uploadHandler
};
