exports.cat = cat
exports.and = cat
exports.end = end
exports.or  = or
exports.union = or
exports.star  = star
exports.plus  = plus

var u = require('./utils')
buffer = u.buffer
markable = u.markable
//exports._buffer = buffer

function match (matcher, read, done) {
  if('function' === typeof matcher) {
    matcher(read, done)
  } else {
    read(null, function (err, data) {
      if(err) done(err)
      else if(data === matcher) done(null)
      else
        done({
          error: 'mismatch', 
          expected: matcher, 
          found: data
        })
    })
  }
}

function cat () {
  var args = [].slice.call(arguments)
  if(!args.length)
    return function (next, done) {
      //match empty string
      done()
    }

  return function (read, done) {
    var i = 0
    ;(function next () {
      if(i >= args.length)
        return done() //matched

      match(args[i++], read, function (err) {
        if(err) done(err)
        else next()
      })

    })()
  }
}

function end () {
  return function (read, done) {
    read(null, function (err, data) {
      if(err) done()
      else done({error: "did not end", found: data})
    })
  }
}


function or () {
  var args = [].slice.call(arguments)
  return function (read, done) {
    var revert = read.mark()
    var i = 0
    ;(function next() {
      if(i >= args.length)
        return done({error: 'did not match'})
      match(args[i++], read, function (err) {
        if(err) {
          revert()
          return next()
        }
        done()
      })
    })()
  }
}

//match star 0 or more times.
//read, until the matcher doesn't match
//don't consume the unmatching 

function star (matcher) {
  return function (read, done) {
    ;(function next() {
      var revert = read.mark()      
      match(matcher, read, function (err) {
       if(err)
          return revert(), done()
        next()
      })
    })()
  }
}

//match one or more things.
function plus(matcher) {
  return cat(matcher, star(matcher))
}

//match nothing!
function empty () {
  return function (read, done) {
    done()
  }
}

//match something or nothing
function maybe(matcher) {
  return union(matcher, empty())
}
