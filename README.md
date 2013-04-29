# regular-stream

streaming parser for regular languages

[http://en.wikipedia.org/wiki/Regular_language]


cat(A, B, star(C)) //ABCCCCCCCC

cat(A, star(A)) //A | AAAAAA

star(or(A, B)) //ABBABABABBABABABBBABAA

cat(A, maybe(B), C) //ABC | AC


## License

MIT
