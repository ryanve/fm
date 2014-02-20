(function(root, name, make) {
  if (typeof module != 'undefined' && module['exports']) module['exports'] = make();
  else root[name] = make();
}(this, 'fm', function() {

  fm.prototype = Fm.prototype
  var globe = this
    , empty = []
    , slice = empty.slice
    , push = empty.push
    , owns = empty.hasOwnProperty
    
  /** 
   * @constructor
   * @param {*=} value to wrap or Fm instance to clone
   */
  function Fm(value) {
    this.length = 1
    this[0] = value instanceof fm ? value[0] : value
  }

  /** 
   * @param {*=} value to wrap or Fm instance to clone
   * @return {Fm} an Fm instance whose length is 1
   */
  function fm(value) {
    return new Fm(value)
  }

  function bind(callable, scope) {
    var rest = slice.call(arguments, 2), late = typeof callable != 'function'
    return rest.length || (rest=0) || late ? function() {
      var a = rest ? rest.slice() : [], f = late ? scope[callable] : callable
      return push.apply(a, arguments) ? f.apply(scope, a) : f.call(scope)
    } : function() {
      return callable.apply(scope, arguments)
    }
  }

  function partial(callable) {
    var rest = slice.call(arguments, 1), late = typeof callable != 'function'
    return rest.length || (rest=0) || late ? function() {
      var a = rest ? rest.slice() : [], f = late ? this[callable] : callable
      return push.apply(a, arguments) ? f.apply(this, a) : f.call(this)
    } : function() {
      return callable.apply(this, arguments)
    }
  }
  
  function constant(value) {
    return function() {
      return value
    }
  }
  
  function mixin(from) {
    var k, to = this, pro = typeof to == 'function' && to.prototype
    if (to == globe) throw new TypeError('@this')
    for (k in from) {
      if (owns.call(from, k)) {
        to[k] = from[k]
        if (pro) pro[k] = mixin === from[k] ? mixin : method(k)
      }
    }
    return this
  }
  
  function method(name) {
    return function(a) {
      push.apply(a = [this instanceof fm ? this[0] : this], arguments)
      return fm[name].apply(fm, a)
    }
  }

  return mixin.call(fm, {
      'bind': bind
    , 'constant': constant
    , 'mixin': mixin
    , 'partial': partial
  })
}));