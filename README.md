# tinyexpr

**Parse, compile and evaluate expressions in a safe sandboxed environment**

Emscripten port and wrapper around native C [TinyExpr](https://github.com/zemlyansky/tinyexpr.js) library. Works in both Node.js and the browser. Generally slower than JS, but makes you worry less about `alert`s in user provided expressions

### Installation
```
npm install -S tinyexpr
```

### Usage
```javascript
const { interp, compile } = require('tinyexpr')
```

* `interp` immidiately executes an expression and returns results
```javascript
const res = interp('1 + 1') // -> 2
```

* `compile` takes an expression and an array of used variable names. Returns a JS function wrapping the compiled expression. Pass args in the same order as in variables array
```javascript
const sqrt = compile('sqrt(x)', ['x'])
const res = sqrt(4) // -> 2
```

### Work with arrays
Passing data between JS and WASM is a bottleneck, so if you need to iterate over an array, it's better to pass it to the compiled function directly, rather than calling the function from a JS loop. In such way iteration happens on a lower level and takes less time
```
wasm (in a loop): 216.668ms
wasm (array arg): 56.32ms
```

### Supported functions
* addition (`+`), subtraction/negation (`-`), multiplication (`*`), division (`/`), exponentiation (`^`), modulus (`%`)
* `abs`, `acos`, `asin`, `atan`, `atan2`, `ceil`, `cos`, `cosh`, `exp`, `floor`, `ln`, `log`, `log10`, `pow`, `sin`, `sinh`, `sqrt`, `tan`, `tanh`, `fac` (factorials e.g. fac 5 == 120), `ncr` (combinations e.g. ncr(6,2) == 15), `npr` (permutations e.g. npr(6,2) == 30)
* constants `pi` and `e`

Read more about how the native TinyExpr library works: [https://github.com/codeplea/tinyexpr/blob/master/README.md](https://github.com/codeplea/tinyexpr/blob/master/README.md)
