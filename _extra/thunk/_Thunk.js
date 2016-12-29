/**
 * Created by nimdanoob on 2016/12/29.
 */

//由于JavaScript是传值调用的，在JavaScirpt 中 Thunk函数的定义主要是是： 将多参数函数替换为单参数的版本，且只接收回调函数
//做为参数

// 一个简单的Thunk 函数转换器

var Thunk = function (fn) {
  return function () {
    var args = Array.prototype.slice.call(arguments); //
    return function (callback) {
      args.push(callback);
      return fn.apply(this, args); //执行函数
    }
  }
};

// 生产环境的Thunk 函数
function thunkify(fn) {
  return function () {
    var args = new Array(arguments.length);
    var ctx = this;
    for (var i = 0; i < args.length; i++) {
      args[i] = arguments[i];
    }
    return function (done) {
      var called; //判断done 方法是否调用过了，如果已经调用过则不重复调用
      args.push(function () {
        if (called) return;
        called = true;
        done.apply(null, arguments);
      });

      try {
        fn.apply(ctx, args);
      } catch (err) {
        done(err); // done的方法需要符合node.js 回调函数的规范。即第一个参数默认是 err
      }
    }
  }
}

function f(a, b, callback) {
  var sum = a + b;
  callback(sum);
  callback(sum);
}

var ft = thunkify(f);
ft(1, 2)(console.log);

//-----------------------------  Thunk with generator------------------------------------------
function readFile(name, callback) {
  callback(null, name);
}
var tReadFile =thunkify(readFile);

function *gen2(name) {
  var y = yield tReadFile(name);
  console.log('y is '+y);
}

// 创建一个自动流程管理的函数
/**
 * 这个函数能够执行的前提是 generator 函数的每个 yield 的都是thunk 函数
 * @param fun  generator 函数
 */
function run(fun) {
  var gen = fun();// get generator iterator
  function next(err, data) {
    var result = gen.next(data);
    if (result.done) return; //if get end
    result.value(next);// if not end, continue to invoke thunk method
  }
  next();
}

var g = gen2('testfilename');
r = g.next();
r.value(function (err, value) {
  console.log('i get' + value)
});
g.next();

