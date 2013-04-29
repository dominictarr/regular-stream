
var r = require('../')
var values = require('pull-stream').values
var cat = r.cat
var end = r.end
//var buffer = require('../utils').buffer

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


