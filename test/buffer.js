var tape = require('tap').test
var u = require('../utils')
var pull = require('pull-stream')
/*function values(ary) {
  var i = 0
  return function next(_, cb) {
    console.log(i, ary[i])
    if(i < ary.length)
      cb(null, ary[i++])
    else
      cb(true)
  }
}*/

var values = pull.values


tape('_buffer', function (t) {
  var makeRead = u.buffer(values(['A', 'B', 'C']))

  var r1 = makeRead()

  r1(null, function (err, data) {
    t.equal(data, 'A')
    t.notOk(err)
    r1(null, function (err, data) {
      t.equal(data, 'B')
      t.notOk(err)
      r1(null, function (err, data) {
        t.equal(data, 'C')
        t.notOk(err)

        var r2 = makeRead()

        r2(null, function (err, data) {
          t.equal(data, 'A')
          t.notOk(err)
          r2(null, function (err, data) {
            t.equal(data, 'B')
            t.notOk(err)
            r2(null, function (err, data) {
              t.equal(data, 'C')
              t.notOk(err)
              t.end()
            })})})

      })
    })
  })
})


tape('_buffer2', function (t) {
  var makeRead = u.buffer(values(['A', 'B']))

  var r1 = makeRead()

  r1(null, function (err, data) {
    t.equal(data, 'A', 'A')
    t.notOk(err, 'no error')
    r1(null, function (err, data) {
      t.equal(data, 'B', 'B')
      t.notOk(err, 'no error')
      r1(null, function (err, data) {
        t.notOk(data)
        t.ok(err, 'no error')

        var r2 = makeRead()

        r2(null, function (err, data) {
          t.equal(data, 'A', 'A')
          t.notOk(err, 'no error')
          r2(null, function (err, data) {
            t.equal(data, 'B', 'B')
            t.notOk(err, 'no error')
            r2(null, function (err, data) {
              t.notOk(data)
              t.ok(err, 'expect error')
              t.end()
            })})})

      })
    })
  })
})

