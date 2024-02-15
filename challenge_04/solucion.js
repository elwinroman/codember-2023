const fs = require('fs')

const data = fs.readFileSync('./files_quarantine.txt', 'utf-8')
const files = data.split('\n')

const NUMBER_FILE_SUBMIT = 32 // orden 33 (que pide el ejercicio)
const archivos_reales = []  // array donde ese almacena solo los archivos reales

for (let file of files) {
  const [cad, unchecksum] = file.split('-')
  // const file = 'abbc11-ca'
  // const [cad, unchecksum] = file.split('-')
  let checksum = getUniqueCharacters(cad)
  // console.log(checksum, unchecksum)
  if (checksum === unchecksum) {
    // console.log('Nombre del archivo:', file)
    // console.log("Resultado: ✅ Real (El checksum es válido)")
    archivos_reales.push(file)
  } else {
    // console.log('Nombre del archivo:', file)
    // console.log(`Resultado: ❌ Falso (El checksum debería ser ${checksum}, es incorrecto)`)
  }
  // console.log('==========================')
}

// NOTA: Analiza la lista de nombres de archivos y sus checksums son REALES!, ni un irreal
console.log('Archivo real número 33 en orden de aparición', archivos_reales[NUMBER_FILE_SUBMIT])

/**
 * Obtiene los caracteres que solo se repiten una sola vez en orden izquierda-derecha
 * @param {String} cad Cadena de caracteres
 * @return {String} newCad
 */
function getUniqueCharacters (cad) {
  let newCad = ''
  let cRepetidos = []

  for (let c of cad) {
    if (cRepetidos.includes(c)) continue; // si el caracter ya es repetido, ya no se evalua, pasa al siguiente caracter
    if (isUnique(c, cad)) newCad += c     // registra los caracteres no repetidas (orden)
    else cRepetidos.push(c)               // (optimización) almacena los caracteres repetidos para no evaluarlos nuevamente
  }
  return newCad
}

/**
 * Comprueba si el número de repeticiones es unico
 * @param {String} c Carácter
 * @param {String} cad Cadena de caracteres
 * @return {Bool} cont
 */
function isUnique (c, cad) {
  let cont = 0
  for (let letter of cad) {
    if (letter === c) cont++
    if (cont > 1) return false  // (optimización) si un carácter tiene 2 repeticiones retorna FALSO, ya no tiene que seguir buscando
  }
  return true
}