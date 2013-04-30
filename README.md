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

## Graphs

Each expression can also be drawn as state transition graphs.
Would be cool to generate this automatically.

### and / cat

events must occur in order

``` js
and (A, B, C)

* --> A --> B --> C
```

### or / union

``` js
or (A, B)
x ---> A ---> y
  \          /^
   \        /
    `-> B -`
```
### star

``` js
star (A)
        &
k ---> A ---> y
 \           /^
  `---------`
```

### plus

``` js
plus (A)
        &
x ---> A --->y
```

### maybe

``` js
maybe (A)
x ---> A --->y
 \          /^
  `--------`
```

And then we can draw a big graph,
and show a program's execution path on it!

but maybe using canvas instead of ansi.

## License

MIT
