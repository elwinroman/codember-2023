const fs = require('fs')

const data = fs.readFileSync('./encryption_policies.txt', 'utf-8')
const words = data.split('\n')

// POLITICAS DE SEGURIDAD Y LA CLAVE
let policy = {
  min: 0,
  max: 0,
  character: ''
}
let key = ''

// array de claves inválidas por orden de aparición
let INVALID_KEYS = []
const NUMBER_INVALID_SUBMIT = 41

for (word of words) {
  const [policy_full, key_value] = word.split(':')
  const [policy_num, policy_character] = policy_full.split(' ')
  const [policy_min, policy_max] = policy_num.split('-')

  key = key_value.trim()
  policy.min = Number(policy_min)
  policy.max = Number(policy_max)
  policy.character = policy_character

  if (!checkSecurityPolicy(policy, key)) INVALID_KEYS.push(key)
}

// console.log('Existen', CORRECT_KEYS, 'claves de cifrado que son válidas según sus políticas')
console.log('Clave inválida número 42 (por orden de aparición):', INVALID_KEYS[NUMBER_INVALID_SUBMIT])

/**
 * Comprueba si la política de seguridad de cifrado cumple con la clave
 * @param {Object} policy 
 * @param {String} key 
 */
function checkSecurityPolicy (policy, key) {
  const rep = countRepetitions(key, policy.character)
  if (rep >= policy.min && rep <= policy.max)
    return true
  return false
}

/**
 * Cuenta el numero de repeticiones de un character en una cadena
 * @param {String} cad 
 * @param {String} ch
 * @return {Number} numero de repeticiones
 */
function countRepetitions (cad, ch) {
  let cont = 0
  for (let c of cad)
    if (c === ch) cont++
  return cont
}