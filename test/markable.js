

//a markable is a stream that can start parsing
//and then return and continue parsing from a previous point


var values = require('pull-stream').values
var markable = require('../utils').markable
var tape = require('tap').test

tape('markable', function (t) {
  values([1,2,3])
  .pipe(markable())
  .pipe(function (read) {
    var revert = read.mark()
    read(null, function (err, data) {
      t.equal(data, 1)
      read(null, function (err, data) {
        t.equal(data, 2)
        revert()
        read(null, function (err, data) {
          t.equal(data, 1)
          read(null, function (err, data) {
            t.equal(data, 2)
            read(null, function (err, data) {
              t.equal(data, 3)
              read(null, function (end, data) {
                t.ok(end); t.end()
              })
            })
          })
        })
      })
    })
  })
})

tape('markable2', function (t) {
  values([1,2,3])
  .pipe(markable())
  .pipe(function (read) {
    read(null, function (err, data) {
      t.equal(data, 1)
      var revert = read.mark()
      read(null, function (err, data) {
        t.equal(data, 2)
        read(null, function (err, data) {
          t.equal(data, 3)
          revert()
          read(null, function (err, data) {
            t.equal(data, 2)
            read(null, function (err, data) {
              t.equal(data, 3)
              read(null, function (end, data) {
                t.ok(end); t.end()
              })
            })
          })
        })
      })
    })
  })
})

tape('nested', function (t) {
  values([1,2,3])
  .pipe(markable())
  .pipe(function (read) {
    var first = read.mark()
    read(null, function (err, data) {
      t.equal(data, 1)
      var second = read.mark()
      read(null, function (err, data) {
        t.equal(data, 2)
        second()
        read(null, function (err, data) {
          t.equal(data, 2)
          first()
          read(null, function (err, data) {
            t.equal(data, 1)
            t.end()
          })
        })
      })
    })
  })
})

