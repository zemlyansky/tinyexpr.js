const te = require('.')

// Generate data
const x = []
const y = []

for (let i = 0; i < 100000; i++) {
  x.push(Math.random() * 100 + 1)
  y.push(Math.random())
}

// Compile a tiny function
const f = te.compile('sqrt(x * y + sin(x))', ['x', 'y'])

// Simple benchmark
console.time('wasm once')
let res1 = f(2, 6.11)
console.timeEnd('wasm once')
console.log(res1)

console.time('wasm each')
let res2 = x.map((v, i) => f(v, y[i]))
console.timeEnd('wasm each')
console.log(res2.slice(0, 5))

console.time('wasm array')
let res3 = f(x, y)
console.timeEnd('wasm array')
console.log(res3.slice(0, 5))

console.time('js once')
let res4 = Math.sqrt(2 * 6 + Math.sin(2))
console.timeEnd('js once')

console.time('js array')
let res5 = x.map((v, i) => Math.sqrt(v * y[i] + Math.sin(v)))
console.timeEnd('js array')


