# [fm](../../)
#### JavaScript [function modulation](#api) utility module
[<b>npm</b>: fm](https://www.npmjs.org/package/fm)

<a name="api"></a>
## API ([0.1](../../releases))

<a name="methods"></a>
- [<b>.bind()</b>](#bind)
- [<b>.partial()</b>](#partial)
- [<b>.slice()</b>](#slice)
- [<b>.constant()</b>](#constant)
- [<b>.got()</b>](#got)
- [<b>.mixin()</b>](#mixin)

* * *
- methods can be used statically or via [OO syntax](#oo)
- <var>callable</var> can be a <b>function</b> or <b>method name</b>

<a name="oo"></a>
### fm()
#### `fm(value)` &rarr; OO wrapper
##### `fm()` inherits from `fm.prototype`

```js
fm(callable).partial(...arguments)
fm.prototype.partial.apply(callable, arguments)
```

### .bind()
#### `fm.bind(callable, scope, ...arguments)`
#### `fm(callable).bind(scope, ...arguments)`
&rarr; <b>function</b> calls <var>callable</var> with `this` binded to <var>scope</var>, and prepends leading <var>arguments</var>

```js
fm.bind(callable, scope) // basic bind
fm.bind(callable, scope, 'a', 'b', 'c') // bind with partial arguments
```

### .partial()
#### `fm.partial(callable, ...arguments)`
#### `fm(callable).partial(...arguments)`
&rarr; <b>function</b> that calls <var>callable</var> with dynamic `this`, and prepends leading <var>arguments</var>

```js
fm.partial(fm.got, 'a', 'b')('c') // => ['a', 'b', 'c']
fm.partial('got', 'a', 'b').call(fm, 'c') // => ['a', 'b', 'c']
fm.prototype.partial.apply(callable, array) // useful for array partials
```

### .slice()
#### `fm.slice(callable, begin?, end?)`
#### `fm(callable).slice(begin?, end?)`
&rarr; <b>function</b> that calls <var>callable</var> with dynamic `this`, and `arguments` sliced by `[].slice`

```js
fm.slice(callable, 0, 2) // => function that accepts only 2 args
fm.slice(fm.bind, 0, 2) // => version of .bind that ignores extra arguments
fm.slice(fm.got, 1)('a', 'b', 'c') // => ['b', 'c']
fm.slice(fm.got, -2)('a', 'b', 'c') // => ['b', 'c']
fm.slice(fm.got, 1, 2)('a', 'b', 'c') // => ['b']
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
$ npm install # install devDependencies
$ grunt jshint:sub # lint sub dirs
$ grunt test # run tests
```

## Fund
<b>[Tip the developer](https://www.gittip.com/ryanve/)</b> =)

## License
[MIT](fm.js#L4)