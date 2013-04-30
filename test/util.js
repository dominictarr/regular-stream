
var tape = require('tap').test
var values = require('pull-stream').values
var markable = require('pull-markable')

module.exports = function test(rule, seq, desc, pass) {
  tape('or:'+(pass?'+':'-') + JSON.stringify(seq) +": "+ desc, function (t) {
    rule(values(seq).pipe(markable()), function (err) {
      if(pass) t.notOk(err)
      else     t.ok(err)
      t.end()
    })
  })
}

