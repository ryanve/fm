# fm
#### JavaScript [function modulation](#api) utility module

```sh
$ npm install fm --save
```

<a name="api"></a>
## API

<a name="methods"></a>
- [<b>.late()</b>](#late)
- [<b>.bind()</b>](#bind)
- [<b>.partial()</b>](#partial)
- [<b>.slice()</b>](#slice)
- [<b>.stat()</b>](#stat)
- [<b>.constant()</b>](#constant)
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

### .constant()
#### `fm.constant(value)`
#### `fm(value).constant()`
&rarr; <b>function</b> that always returns <var>value</var> regardless of context or arguments

```js
fm.constant() // => noop function
fm.constant()() // => undefined
fm.constant(true)() // => true
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

## Compatibility
Works...everywhere<b>!</b> Tested in node, Chrome, FF, Opera, IE

## Contribute
Make edits in [/<b>src</b>](./src). Run [tests](test) in [node](#cli) or in the [browser](test/index.html).

<a name="cli"></a>
```sh
$ npm install -g grunt-cli # install grunt-cli if you haven't already
$ npm install # install devDependencies from package.json
$ grunt test # run tests
```

## Fund
<b>[Tip the developer](https://www.gittip.com/ryanve/)</b> =)

## License
MIT