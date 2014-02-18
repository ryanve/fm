(function(root) {
  var common = typeof module != 'undefined' && !!module.exports
  var aok = common ? require('../node_modules/aok') : root.aok
  var fm = common ? require('../src') : root.fm
  var join = fm.bind(fm.call, [].join)
  var keys = Object.keys

  aok('instance', fm() instanceof fm)
  aok('instance.length', 0 === fm().length && 1 === fm(fm).length && 2 === fm([0, 1]).length)
  aok('keys', !keys || keys(fm).join() === keys(fm.prototype).join())
  
  aok('constant(value)', 0 === fm.constant(0)(1))
  
  aok('bind(fn, scope)', function() {
    var bool, o = {}
    fm.bind(function(a) { 
      bool = this === o && 1 === a
    }, o)(1)
    return bool
  })
  
  aok('bind(fn, scope, ...args)', function() {
    var bool, o = {}
    fm.bind(function() { 
      bool = this === o && join(arguments) === '0,1,2,3'
    }, o, 0, 1)(2, 3)
    return bool
  })
  
  aok('partial(fn)', function() {
    var bool
    fm.partial(function() {
       bool = !arguments.length 
    })()
    bool && fm.partial(function() {
       bool = join(arguments) === '0,1'
    })(0, 1)
    return bool
  })
  
  aok('partial(fn, ...args)', function() {
    var bool
    fm.partial(function() {
       bool = join(arguments) === '0,1'
    }, 0, 1)()
    bool && fm.partial(function() {
       bool = join(arguments) === '0,1,2,3'
    }, 0, 1)(2, 3)
    return bool
  })
}(this));