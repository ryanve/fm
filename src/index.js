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
   * @param {(Function|{length:number})=} fn
   */
  function Fm(fn) {
    push.apply(this, null == fn ? empty : typeof fn == 'object' ? slice.call(fn) : [fn])
    return this
  }
  
  /** 
   * @param {(Function|{length:number})=} fn
   * @return {Fm}
   */  
  function fm(fn) {
    return new Fm(fn)
  }

  function bind(fn, scope) {
    var rest = slice.call(arguments, 2), late = typeof fn != 'function'
    return rest.length || (rest=0) || late ? function() {
      var f = late ? scope[fn] : fn, a = rest ? rest.slice() : []
      return push.apply(a, arguments) ? f.apply(scope, a) : f.call(scope)
    } : function() {
      return fn.apply(scope, arguments)
    }
  }

  function partial(fn) {
    var rest = slice.call(arguments, 1), late = typeof fn != 'function'
    return rest.length || (rest=0) || late ? function() {
      var f = late ? this[fn] : fn, a = rest ? rest.slice() : []
      return push.apply(a, arguments) ? f.apply(this, a) : f.call(this)
    } : function() {
      return fn.apply(this, arguments)
    }
  }
  
  function constant(v) {
    return function() {
      return v
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