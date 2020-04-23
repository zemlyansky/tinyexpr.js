const tape = require('tape')
const te = require('.')

tape('Simple expression parsing', function (t) {
  t.plan(1)
  t.equal(te.interp('1 + 1'), 2)
})

tape('Compiling and running one value', function (t) {
  t.plan(1)
  const sqrt = te.compile('sqrt(x)', ['x'])
  t.equal(sqrt(4), 2)
})
