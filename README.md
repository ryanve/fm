# fm
#### JavaScript function modulation module

```
npm install fm --save
```

## API
- [<b>.late()</b>](#late)
- [<b>.bind()</b>](#bind)
- [<b>.partial()</b>](#partial)
- [<b>.slice()</b>](#slice)
- [<b>.stat()</b>](#stat)
- [<b>.flow()</b>](#flow)
- [<b>.constant()</b>](#constant)
- [<b>.eq()</b>](#eq)
- [<b>.got()</b>](#got)
- [<b>.mixin()</b>](#mixin)

* * *

- methods can be used statically or via [OO syntax](#oo)

<a name="oo"></a>
### fm()
#### `fm(value)` &rarr; OO wrapper
##### `fm()` inherits from `fm.prototype`

```js
var fm = require('fm')
fm(callback).partial(...arguments)
fm.prototype.partial.apply(callback, arguments)
```

### .late()
#### `fm.late(method)`
#### `fm(method).late()`
&rarr; <b>function</b> that calls `this[method]`

```js
fm.late('yes').call({ yes:function() { return 1 } }) // => 1
fm.late(0).call([function() { return this.length }]) // => 1
```

### .bind()
#### `fm.bind(callback, scope, ...arguments)`
#### `fm(callback).bind(scope, ...arguments)`
&rarr; <b>function</b> that calls <var>callback</var> with `this` binded to <var>scope</var>, and prepends leading <var>arguments</var>

```js
fm.bind(callback, scope) // basic bind
fm.bind(callback, scope, 'a', 'b', 'c') // bind with partial arguments
```

### .partial()
#### `fm.partial(callback, ...arguments)`
#### `fm(callback).partial(...arguments)`
&rarr; <b>function</b> that calls <var>callback</var> with dynamic `this`, and prepends leading <var>arguments</var>

```js
fm.partial(fm.got, 'a', 'b')('c') // => ['a', 'b', 'c']
fm.partial('got', 'a', 'b').call(fm, 'c') // => ['a', 'b', 'c']
fm.prototype.partial.apply(callback, array) // useful for array partials
```

### .slice()
#### `fm.slice(callback, begin?, end?)`
#### `fm(callback).slice(begin?, end?)`
&rarr; <b>function</b> that calls <var>callback</var> with dynamic `this`, and `arguments` sliced by `[].slice`

```js
fm.slice(function(a, b, c) {}, 0, 2) // => new function that accepts only 2 args
fm.slice(fm.bind, 0, 2) // => version of .bind that ignores extra arguments
fm.slice(fm.got, 1)('a', 'b', 'c') // => ['b', 'c']
fm.slice(fm.got, -2)('a', 'b', 'c') // => ['b', 'c']
fm.slice(fm.got, 1, 2)('a', 'b', 'c') // => ['b']
```

### .stat()
#### `fm.stat(method)`
#### `fm(method).stat()`
- Convert an instance method into a static one.
&rarr; <b>function</b>

```js
fm.stat([].slice) // => static slice() function
fm.stat({}.hasOwnProperty) // => static has() function
```

### .flow()
#### `fm.flow(first, next)`
#### `fm(first).flow(next)`
- Create a new function that invokes the next function with the result the first function
&rarr; <b>function</b>

```js
fm.flow(fm.constant(2), fm.constant(3))()// => 3
```

### .constant()
#### `fm.constant(value)`
#### `fm(value).constant()`
&rarr; <b>function</b> that always returns <var>value</var> regardless of context or arguments

```js
fm.constant() // => noop function
fm.constant()() // => undefined
fm.constant(true)() // => true
```

### .eq()
#### `fm.eq(callback, index)`
#### `fm(callback).eq(index)`
&rarr; <b>function</b> that reduces the arguments passed to <var>callback</var> to the argument at the specified index


```js
fm.eq(Number, 1)(10, 11, 12) // => 11
fm.eq(Number, -1)(10, 11, 12) // => 12
```

### .got()
#### `fm.got(...arguments)`
#### `fm(head).got(...arguments)`
&rarr; <b>array</b> of arguments received

```js
fm.got() // => []
fm.got(0, 1, 2) // => [0, 1, 2]
```

### .mixin()
#### `fm.mixin(object)`
&rarr; <b>this</b>

## Coverage
Works...everywhere<b>!</b> Tested in node, Chrome, FF, Opera, IE

## Contribute
```
npm install
npm test
```

## Playground
[Try `fm` in your browser](http://ryanve.github.io/fm/)
