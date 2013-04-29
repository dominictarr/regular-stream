# regular-stream

streaming acceptor for regular languages

[http://en.wikipedia.org/wiki/Regular_language]

WORK IN PROGRESS

``` js
var r = require('regular-stream')
  , and = r.and, start = r.star, plus = r.plus
  , or = r.or, r.maybe = r.maybe, empty = r.empty

and('A', 'B', star('C')) //ABCCCCCCCC

and('A', star('A'))      //A | AAAAAA

plus('A')               //same as ^

star(or(A, B)) //ABBABABABBABABABBBABAA

and(A, or(B, empty()), C) //AB?C

and(A, maybe(B), C) //ABC | AC
```
## License

MIT
