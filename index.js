const Module = require('./wasm/native.js')
const bin = require('./wrapper/native.bin.js')
const m = Module({ wasmBinary: bin.data })

const _interp = m.cwrap('interp', 'number', ['string'])
const _compile = m.cwrap('compile', 'number', ['string', 'string', 'number'])
const _eval = m.cwrap('eval', 'number', ['number', 'array', 'number'])
const _evalArray = m.cwrap('evalArray', 'number', ['number', 'array', 'number', 'number'])

function uintify (arr) {
  return new Uint8Array(Float64Array.from(arr).buffer)
}

function interp (expr) {
  return _interp(expr)
}

function compile (expr, vars) {
  const addr = _compile(expr, vars.join(','), vars.length)
  const func = function () {
    const arr = Array.from(arguments)
    if (arr && arr.length && Array.isArray(arr[0])) {
      const resAddr = _evalArray(func.addr, uintify(arr.flat()), arr.length, arr[0].length)
      const data = []
      for (let i = 0; i < arr[0].length; i++) {
        data.push(m.HEAPF64[resAddr / Float64Array.BYTES_PER_ELEMENT + i])
      }
      return data
    } else {
      return _eval(func.addr, uintify(arr), arr.length)
    }
  }
  func.addr = addr
  return func
}

module.exports = {
  interp, compile
}
