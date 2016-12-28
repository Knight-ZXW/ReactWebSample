/**
 * Created by nimdanoob on 2016/12/28.
 */


// 定义 Promise  规范的 三个状态常量
var PENDING = 'pending', FULFILLED = 'fulfilled', REJECTED = 'rejected';

Promise = function () {
  this.queue = [];
  this.value = null;
  this.status = 'pending'; // pending fulfilled rejected'
};

Promise.prototype.getQueue = function () {
  return this.queue;
};

Promise.prototype.getStatus = function () {
  return this.status;
};

Promise.prototype.setStatus = function (s, value) {
  if (s === FULFILLED || s === REJECTED) {
    this.status = s;
    this.value = value || null;
    this.queue = [];
    var freezeObject = Object.freeze || function () {};
    freezeObject(this); //  一旦状态变成 FULFILLED 或者 REJECTED ，状态就不可变了， freeze it
  } else {
    throw new Error({message: "doest't support status " + s + 'the options status include only ' + FULFILLED + ' or ' + REJECTED});
  }
};

Promise.prototype.isFulfilled = function () {
  return this.status === FULFILLED;
};

Promise.prototype.isRejected = function () {
  return this.status === REJECTED;
};

Promise.prototype.isPending = function () {
  return this.status === PENDING;
};

Promise.prototype.then = function (onFulfilled, onRejected) {
  var handler = {
    'fulfilled': onFulfilled,
    REJECTED: onRejected
  };
  handler.deferred = new Deferred(); // 生成了新的Promise

  if (!this.isPending()) { // 这里允许先改变promise 的状态后添加回调
    utils.procedure(this.status, handler, this.value);
  } else {
    this.queue.push(handler); //then may be called multiple times on the same promise;规范2.2.6
  }
  return handler.deferred.promise; //返回新的Promise ,支持链式调用; 规范2.2.7
};
var utils = (
  function () {
    var makeSignaler = function (defereed, type) {
      return function (result) {
        transition(defereed, type, result);
      }
    };

    var procedure = function (type, handler, result) {
      var func = handler[type];//对应的回调处理函数
      var def = handler.deferred;
      if (func) {
        try {
          var newResult = func(result); // 处理函数的执行结果,也许是个普通的对象，也许是个 Promise
          if (newResult && typeof  newResult.then === 'function') { //thenable
            //   newResult.then(function (data) {
            //     def.resolve(data);
            //   },function (err) {
            //     def.reject(err)
            //   })
            // };
            //PromiseA+ 规范， x 代表 newResult, promise 代表 def.promise
            // if x is promise ,adopt its state [3,4]
            // if x is pending, promise must remain pending until x is fulfilled or rejected.
            // if/when x is fulfilled, fulfill promise with the same value
            // if/when x is rejected, reject promise with the same reason
            newResult.then(makeSignaler(def, FULFILLED), makeSignaler(def, REJECTED));// 利用了异步闭包，避免内存泄漏
          } else {
            transition(def, type, newResult);
          }
        } catch (err) {
          transition(def, 'rejected', err);
        }
      } else {
        transition(def, type, result);
      }

    };

    /**
     *
     * @param deferred promise
     * @param type 新的状态
     * @param result
     */
    var transition = function (deferred, type, result) {
      if (type === FULFILLED) {
        deferred.resolve(result);
      } else if (type === REJECTED) {
        deferred.resolve(result);
      } else if (type != PENDING) {
        throw new Error({message: "doest't support status " + s + 'the options status include only ' + FULFILLED + ' or ' + REJECTED});
      }

    };
    return {
      'procedure': procedure
    }
  }
)();
Deferred = function () {
  this.promise = new Promise();
};

Deferred.prototype.resolve = function (result) {
  if (!this.promise.isPending()) {
    return;
  }
  var queue = this.promise.getQueue();
  for (var i = 0, len = queue.length; i < len; i++) {
    utils.procedure(FULFILLED, queue[i], result);
  }

  this.promise.setStatus(FULFILLED, result);
};

Deferred.prototype.reject = function (err) {
  if (!this.promise.isPending()) {
    return;
  }
  var queue = this.promise.getQueue();
  for (var i = 0, len = queue; i < len; i++) {
    utils.procedure(REJECTED, queue[i], err);
  }
  this.promise.setStatus(REJECTED, err);
};

request = function () {
  var def = new Deferred();

  def.resolve('成功了');
  return def.promise;
};
request().then(function (data) {
  console.log(data);
  return request();
}).then(function (data) {
  console .log(data)
});
