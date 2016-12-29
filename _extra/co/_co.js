/**
 * Created by nimdanoob on 2016/12/29.
 */
var _readFile = function (filename, callback) {
  // fake loading file
  callback(null, 'get ' + filename + ' content');
};

var readFile = function (fileName) {
  return new Promise(function (resolve, reject) {
    _readFile(fileName, function (error, data) {
      console.log('resolve data ' + data);
      resolve(data);
    })
  })
};

var gen = function*() {
  var f1 = yield readFile('/fileA');
  var f2 = yield readFile('/fileB');
  console.log('f1 is' + f1.toString());
  console.log('f2 is ' + f2.toString());
};


// 写一个自动执行器
function run(gen) {
  var g = gen();

  function next(data) {
    var result = g.next(data);
    if (result.done) return result.value;
    result.value.then(function (data) {
      next(data);
    })
  }

  next();
}

run(gen);

//----------------实现 co库的源码

function co(gen) {
  var ctx = this;
  return new Promise(function (resolve, reject) {
    if (typeof gen === 'function') gen = gen.call(ctx);// if gen is generator  invoke gen (equals  ```gen()```)
    if (!gen || typeof gen.next !== 'functoin') return resolve(gen); // next 不是function，结束链式调用
    //将Generator 函数的内部指针对象的next方法，包装成onFulefilled函数。这主要是为了能够捕捉抛出的错误
    onFulfilled();
    function onFulfilled(res) {
      var ret;
      try {
        ret = gen.next(res);
      } catch (e) {
        return reject(e);
      }
      next(ret);
    }

    /**
     * next函数反复调用自身
     * @param ret
     */
    function next(ret) {
      if (ret.done) return resolve(ret.value);
      var value = toPromise(ctx, ret.value);
      if (value && isPromise(value)) return value.then(onFulfilled, onReject);
      return onRejected(new TypeError('You may only yield a function,promise,generator,array,or object,'
        + 'but the following object was passed: ' + String(ret.value)));
    }
  });
}
