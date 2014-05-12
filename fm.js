/*!
 * fm 0.4.0+201405122000
 * https://github.com/ryanve/fm
 * MIT License (c) 2014 Ryan Van Etten
 */
!function(root, name, make) {
  if (typeof module != 'undefined' && module.exports) module.exports = make();
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
   * @return {Fm} an Fm instance
   */
  function fm(value) {
    return new Fm(value)
  }
  
  /** 
   * @param {Function} f
   * @param {Array|Arguments} a
   * @return {Array|undefined}
   */
  function extra(f, a) {
    if (a.length > f.length) return slice.call(a, f.length)
  }

  /** 
   * @param {Function} f
   * @param {*=} scope
   * @return {Function}
   */
  function bind(f, scope) {
    var rest = extra(bind, arguments)
    return rest ? function() {
      var a = rest.slice()
      push.apply(a, arguments)
      return f.apply(scope, a)
    } : function() {
      return f.apply(scope, arguments)
    }
  }

  /** 
   * @param {Function} f
   * @return {Function}
   */
  function partial(f) {
    var rest = extra(partial, arguments)
    return rest ? function() {
      var a = rest.slice()
      push.apply(a, arguments)
      return f.apply(this, a)
    } : function() {
      return f.apply(this, arguments)
    }
  }
  
  /** 
   * @param {*} method name
   * @return {Function}
   */
  function late(method) {
    return typeof method == 'function' ? method : function() {
      return this[method].apply(this, arguments)
    }
  }
  
  /** 
   * @param {*=} value
   * @return {Function}
   */
  function constant(value) {
    return function() {
      return value
    }
  }
  
  /**
   * @return {Array}
   */
  function got() {
    return slice.call(arguments)
  }

  /**
   * @this {Object} receiver
   * @param {Object} from
   */
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
  
  /** 
   * @param {string|number} name
   * @return {Function}
   */
  function method(name) {
    return function() {
      var a = [this instanceof fm ? this[0] : this]
      push.apply(a, arguments)
      return fm[name].apply(fm, a)
    }
  }
  
  /** 
   * @param {Function} f
   * @return {Function}
   */
  fm['slice'] = function(f) {
    var rest = slice.call(arguments, 1, 3)
    return function() {
      return f.apply(this, slice.apply(arguments, rest))
    }
  }

  fm['bind'] = bind
  fm['constant'] = constant
  fm['got'] = got
  fm['late'] = late
  fm['mixin'] = mixin
  fm['partial'] = partial
  fm['stat'] = partial(bind, fm.call)
  return fm['mixin'](fm)
});