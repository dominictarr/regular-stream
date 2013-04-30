var test = require('./util')

var r = require('../')
var union = r.union
var end   = r.end
var and   = r.and
var star  = r.star
var plus  = r.plus
var maybe = r.maybe

var DATA='DATA', PAUSE='PAUSE', DRAIN='DRAIN', END='END'


//streams are hard to test, right?
//with all these async events flying everywhere
//how do you test that data never comes out after
var stream = and(star('DATA', maybe(plus('PAUSE'), 'DRAIN')), 'END')

test(stream,
  [DATA, DATA, DATA, END],
  'stream', true)

test(stream,
  [DATA, DATA, PAUSE, DRAIN, DATA, END],
  'stream', true)

test(stream,
  [DATA, DATA, PAUSE, PAUSE, DRAIN, DATA, END],
  'stream', true)

test(stream,
  [DATA, DATA, PAUSE, DRAIN, DRAIN, DATA, END],
  'stream', false)

test(stream,
  [DATA, DATA, PAUSE, DATA, DRAIN, DATA, END],
  'stream', false)

test(stream,
  [DATA, DATA, DATA],
  'stream', false)

test(stream,
  [END],
  'stream', true)

test(stream,
  [DATA, PAUSE, END],
  'stream', false)


