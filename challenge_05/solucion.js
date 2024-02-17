const fs = require('fs')

const file = fs.readFileSync('./database_attacked.txt', 'utf-8')
const data = file.split('\n')

const INVALID_USERNAMES = []

for (let row of data) {
  const [id, username, email, age, location] = row.split(',')

  const validation = idValidation(id) && 
                    usernameValidation(username) && 
                    emailValidation(email) &&
                    ageValidation(age) && 
                    locationValidation(location)

  if (!validation) INVALID_USERNAMES.push(username)
}

let mensaje_oculto = ''
for (let username of INVALID_USERNAMES)
  mensaje_oculto += username.slice(0,1)

console.log(mensaje_oculto)
//////////////////////////////////////////////////

function idValidation (id) {
  if (id === '') return false

  const regex = new RegExp(/^[a-zA-Z0-9]+$/)
  return regex.test(id)
}

function usernameValidation (username) {
  if (username === '') return false
  
  const regex = new RegExp(/^[a-zA-Z0-9]+$/)
  return regex.test(username)
}

function emailValidation (email) {
  if (email === '') return false

  const regex = new RegExp(/^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/)
  return regex.test(email)
}

function ageValidation (age) {
  if (age === '') return true

  const regex = new RegExp(/^\d+$/)
  return regex.test(age)
}

function locationValidation (location) {
  if (location === '') return true

  const regex = new RegExp(/^([a-zA-Z]+\s?)+$/)
  return regex.test(location)
}