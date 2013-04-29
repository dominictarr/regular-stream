var pull = require('pull-stream')

exports.markable = pull.Through(markable)
//exports.buffer = buffer

function markable(read) {
  var seen = [], marked = false, head = 0, ended

  function readable (abort, cb) {
    if(abort)
      return read(abort, cb)

    if(marked && head < seen.length) {
      return cb(null, seen[head++])
    } else if (ended)
      return cb(ended)
    else
      read(null, function (end, data) {
        if(!marked) return cb(end, data)
        if(end)
          ended = ended || end
        else {
          seen.push(data)
          head = seen.length
        }
        cb(end, data)
      })
  }

  readable.mark = function () {
    var mark = head
    //return a function that allows the user
    //to return the stream to a given start point.
    marked = true
    return function revert () {
      head = mark
    }
  }

  return readable
}
/*
function buffer (read) {
  var ary = [], ended = false
  var inflight = false
  function get(i, cb) {
    if(i < ary.length)
      cb(null, ary[i])
    else {
      inflight = true
      read(null, function (end, data) {
        inflight = false
        if(end) {
          ended = end
          cb(ended)
        } else {
          ary.push(data)
          cb(null, data)
        }
      })
    }
  }
  return function () {
    var i = 0
    function read(_, cb) {
      get(i++, cb)
    }
    i.unread = function () {
      i--
    }
    return read
  }
}
*/
