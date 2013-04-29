
var r = require('../')
var values = require('pull-stream').values
var cat = r.cat
var end = r.end
var buffer = require('../utils').buffer

var tape = require('tap').test

var ab = cat('a', 'b')


tape('cat: pass - ab', function (t) {
  ab(values(['a','b']), function (err) {
    t.notOk(err)
    t.end()
  })
})

tape('cat: fail - aX', function (t) {
  ab(values(['a','X']), function (err) {
    t.ok(err)
    t.end()
  })
})

var abEND = cat('a', 'b', end())

tape('cat: pass - abEND', function (t) {
  abEND(values(['a','b']), function (err) {
    t.notOk(err)
    t.end()
  })
})

tape('cat: pass - abEND', function (t) {
  abEND(values(['a','b', 'X']), function (err) {
    t.ok(err)
    t.end()
  })
})

tape('_buffer', function (t) {
  var makeRead = buffer(values(['A', 'B', 'C']))

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


tape('_buffer', function (t) {
  var makeRead = buffer(values(['A', 'B']))

  var r1 = makeRead()

  r1(null, function (err, data) {
    t.equal(data, 'A')
    t.notOk(err)
    r1(null, function (err, data) {
      t.equal(data, 'B')
      t.notOk(err)
      r1(null, function (err, data) {
        t.notOk(data)
        t.ok(err)

        var r2 = makeRead()

        r2(null, function (err, data) {
          t.equal(data, 'A')
          t.notOk(err)
          r2(null, function (err, data) {
            t.equal(data, 'B')
            t.notOk(err)
            r2(null, function (err, data) {
              t.notOk(data)
              t.ok(err)
              t.end()
            })})})

      })
    })
  })
})

