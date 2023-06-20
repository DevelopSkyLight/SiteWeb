const fs = require("fs");

function helperCopyFile(sourceFilePath, destinationFilePath, callback) {
  // Leer el archivo de origen
  fs.readFile(sourceFilePath, "utf-8", (err, data) => {
    if (err) {
      return callback(`Error al leer el archivo ${sourceFilePath}: ${err.message}`);
    }

    // Escribir el contenido del archivo de origen en el archivo de destino
    fs.writeFile(destinationFilePath, data, (err) => {
      if (err) {
        return callback(`Error al escribir el archivo ${destinationFilePath}: ${err.message}`);
      }

      return callback(null, `El archivo ${sourceFilePath} ha sido copiado en ${destinationFilePath}`);
    });
  });
}

module.exports = {
  helperCopyFile
}