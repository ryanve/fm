!function(root) {
  var common = typeof module != 'undefined' && !!module.exports
  var aok = common ? require('aok') : root.aok
  var fm = common ? require('./') : root.fm
  var join = fm.bind(fm.call, [].join)
  var keys = Object.keys

  aok.prototype.fail = function() {
    throw new Error(this.id)
  }

  if (!keys) aok.prototype.express = aok.info // alert in IE8

  aok('instance', fm() instanceof fm)
  aok('instance.length', 1 === fm().length && 1 === fm(fm()).length)
  aok('keys', !keys || keys(fm).join() === keys(fm.prototype).join())
  aok('#got', '0,1' === fm.got(0, 1).join())
  aok('#constant', 0 === fm.constant(0)(1))
  aok('.constant', 2 === +fm(2).constant()(1))
  aok('#late(method)', 1 === fm.late(0).call([fm.constant(1)]))
  aok('#late(function)', fm.late === fm.late(fm.late))
  aok('.late()', fm.late === fm('late').late().call(fm, fm.late))

  aok('#bind(f, scope)', function() {
    var bool, o = {}
    fm.bind(function(a) {
      bool = this === o && 1 === a
    }, o)(1)
    return bool
  })

  aok('#bind(f, scope, ...args)', function() {
    var bool, o = {}
    fm.bind(function() {
      bool = this === o && join(arguments) === '0,1,2,3'
    }, o, 0, 1)(2, 3)
    return bool
  })

  aok('#partial(f)', !fm.partial(fm.got)().length && '0,1' === fm.partial(fm.got)(0, 1).join())
  aok('#partial(f, ...args)', '0,1,2,3' === fm.partial(fm.got, 0, 1)(2, 3).join())
  aok('(f).partial', '0,1' === fm(fm.got).partial(0)(1).join())

  aok('#slice(f)', '0,1' === fm.slice(fm.got)(0, 1).join())
  aok('#slice(f, start)', '1,2' === fm.slice(fm.got, 1)(0, 1, 2).join())
  aok('#slice(f, start, end)', '1' === fm.slice(fm.got, 1, -1)(0, 1, 2).join())
  aok('(f).slice()', '0,1,2' === fm(fm.got).slice()(0, 1, 2).join())
  aok('(f).slice(start)', '1,2' === fm(fm.got).slice(1)(0, 1, 2).join())

  aok('#stat', function() {
    var a = [0, 1, 2, 3, 4]
    return a.slice(1, 3).join() === fm.stat(a.slice)(a, 1, 3).join()
  })

  aok('.stat', function() {
    var a = [0, 1, 2, 3, 4]
    return a.slice(1, 3).join() === fm(a.slice).stat()(a, 1, 3).join()
  })

  aok('#eq(f, index)', fm.eq(Number, 1)(10, 11, 12) === 11)
  aok('#eq(f, -index)', fm.eq(Number, -1)(10, 11, 12) === 12)
  aok('(f).flow(g)', fm(fm.constant(2)).flow(fm.constant(3))() === 3)
}(this);
