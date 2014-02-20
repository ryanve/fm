(function(root) {
  var common = typeof module != 'undefined' && !!module.exports
  var aok = common ? require('../node_modules/aok') : root.aok
  var fm = common ? require('../src') : root.fm
  var join = fm.bind(fm.call, [].join)
  var keys = Object.keys

  aok.prototype.fail = 'FAIL'
  if (!keys) aok.prototype.express = aok.info // alert in IE8

  aok('instance', fm() instanceof fm)
  aok('instance.length', 1 === fm().length && 1 === fm(fm()).length)
  aok('keys', !keys || keys(fm).join() === keys(fm.prototype).join())
  aok('got', '0,1' === fm.got(0, 1).join())
  aok('constant(value)', 0 === fm.constant(0)(1))
  
  aok('bind(f, scope)', function() {
    var bool, o = {}
    fm.bind(function(a) { 
      bool = this === o && 1 === a
    }, o)(1)
    return bool
  })
  
  aok('bind(f, scope, ...args)', function() {
    var bool, o = {}
    fm.bind(function() { 
      bool = this === o && join(arguments) === '0,1,2,3'
    }, o, 0, 1)(2, 3)
    return bool
  })
  
  aok('partial(f)', !fm.partial(fm.got)().length && '0,1' === fm.partial(fm.got)(0, 1).join())
  aok('partial(f, ...args)', '0,1,2,3' === fm.partial(fm.got, 0, 1)(2, 3).join())

  aok('slice(f)', '0,1' === fm.slice(fm.got)(0, 1).join())
  aok('slice(f, start)', '1,2' === fm.slice(fm.got, 1)(0, 1, 2).join())
  aok('slice(f, start, end)', '1' === fm.slice(fm.got, 1, -1)(0, 1, 2).join())
}(this));