# [fm](../../)
#### JavaScript [function modulation](#api) utility module
[<b>npm</b>: fm](https://www.npmjs.org/package/fm)

<a name="api"></a>
## API ([0.1](../../releases))

<a name="methods"></a>
- [<b>.bind()</b>](#bind)
- [<b>.partial()</b>](#partial)
- [<b>.constant()</b>](#constant)
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
&rarr; function

### .partial()
#### `fm.partial(callable, ...arguments)`
#### `fm(callable).partial(...arguments)`
&rarr; function

### .slice()
#### `fm.slice(callable, begin?, end?)`
#### `fm(callable).slice(begin?, end?)`
&rarr; function

### .got()
#### `fm.got(...arguments)`
#### `fm(head).got(...arguments)`
&rarr; array

### .constant()
#### `fm.constant(value)`
#### `fm(value).constant()`
&rarr; function

### .mixin()
#### `fm.mixin(object)`
&rarr; this

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