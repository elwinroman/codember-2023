// operaciones del lenguaje
const operator = [
  {
    symbol: '#',
    do: val => (val + 1)
  },
  {
    symbol: '@',
    do: val => (val - 1)
  },
  {
    symbol: '*',
    do: val =>  (val * val)
  }
]

// const input = '##*&'
// const input = '&##&*&@&'
const input = '&###@&*&###@@##@##&######@@#####@#@#@#@##@@@@@@@@@@@@@@@*&&@@@@@@@@@####@@@@@@@@@#########&#&##@@##@@##@@##@@##@@##@@##@@##@@##@@##@@##@@##@@##@@##@@##@@&'
let value = 0
let output = ''

for (symbol of input) {
  if (symbol === '&') output += value // imprime
  else { // operación matemática
    operator.forEach(op => {
      if (symbol === op.symbol) value = op.do(value)
    })
  }
}
console.log('output', output)