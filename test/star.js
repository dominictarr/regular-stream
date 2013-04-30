var r = require('../')
var union = r.union
var end   = r.end
var cat   = r.cat
var star  = r.star
var plus  = r.plus

var aSTAR = star('a')

test = require('./util')

test(aSTAR, ['a', 'a', 'a'], 'a*', true)
test(aSTAR, ['a'], 'a*', true)
test(aSTAR, [], 'a*', true)

var aORbSTAR = star(union('a', 'b'))

test(aSTAR, ['a', 'b', 'a', 'b'], '(a|b)*', true)
test(aSTAR, ['a', 'b', 'a', 'b'], '(a|b)*', true)
test(aSTAR, [], '(a|b)*', true)
//*/

var aSTAR_CATb = cat(star('a'), 'b')

test(aSTAR_CATb, ['a', 'b'], 'a*b', true)
test(aSTAR_CATb, ['a', 'a', 'c'], 'a*b', false)
test(aSTAR_CATb, ['a', 'a', 'a', 'a', 'a', 'c'], 'a*b', false)
test(aSTAR_CATb, ['c'], 'a*b', false)

var aSTAR_CATbEND = cat(star('a'), 'b', end())

test(aSTAR_CATbEND, ['a', 'b'], 'a*b$', true)
test(aSTAR_CATbEND, ['a', 'a', 'c'], 'a*b$', false)
test(aSTAR_CATbEND, ['a', 'a', 'a', 'a', 'a', 'c'], 'a*b$', false)
test(aSTAR_CATbEND, ['c'], 'a*b$', false)

//cat(X, star(X)) is plus(X)
var aPLUS_CATbEND = cat(plus('a'), 'b', end())

test(aPLUS_CATbEND, ['a', 'b'], 'a+b$', true)
test(aPLUS_CATbEND, ['a', 'a', 'c'], 'a*b$', false)
test(aPLUS_CATbEND, ['a', 'a', 'a', 'a', 'a', 'b'], 'a*b$', true)
test(aPLUS_CATbEND, ['a', 'a', 'a', 'a', 'c', 'b'], 'a*b$', false)
test(aPLUS_CATbEND, ['b'], 'a+b$', false)
test(aPLUS_CATbEND, ['c'], 'a*b', false)

