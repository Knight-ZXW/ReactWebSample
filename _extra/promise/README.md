Promise 的研究及源码实现

### PromiseA 的概念
　　Promise 是为了就叫 JavaScript 中 在编写复杂的异步操作任务时，写出 **Callback Hell**的问题，**Promise** 代表了一个当前不知道执行结果的任务，但是
- Promise 只有 **pending**(进行中) **fulfilled**（表示已完成，有些具体实现使用 Resolved表示） **rejected**（表示已失败，有些具体的实现使用Rejected表示） 这3个状态。当前的状态只能由异步操作的结果决定，
如何其他操作都无法改变这个状态。
- 状态的转换只能由 **pending** -> **fulfilled** 或者 **pending** -> **rejected** 这两种路径，并且一旦发生了这两种过程，状态就凝固了，不会再变化了，
就算改变已经发生了。如果你再次对这个 Promise 对象添加回调时间，也会立即得到这个结果。

// 实现 Promise 构造函数， Promise 构造函数接收一个 回调函数参数，这个函数的参数接收 两个由我们提供的 resolve 和  reject 方法
//  这个两个函数 根据异步任务执行 在未来的某个时间根据任务当前进行的进度（进行中、成功、失败）被调用， Promise的核心就在于此，不过此时看上去 跟回调没什么区别
// var promise = new Promise(function(resolve, reject) {
//   var request = new XMLHttpRequest();
//
//   request.open('GET', 'http://api.icndb.com/jokes/random');
//   request.onload = function() {
//     if (request.status == 200) {
//       resolve(request.response); // we got data here, so resolve the Promise
//     } else {
//       reject(Error(request.statusText)); // status is not 200 OK, so reject
//     }
//   };
//
//   request.onerror = function() {
//     reject(Error('Error fetching data.')); // error occurred, reject the  Promise
//   };
//
//   request.send(); //send the request
// });
//
// console.log('Asynchronous request made.');
//
// promise.then(function(data) {
//   console.log('Got data! Promise fulfilled.');
//   document.getElementsByTagName('body')[0].textContent = JSON.parse(data).value.joke;
// }, function(error) {
//   console.log('Promise rejected.');
//   console.log(error.message);
// });
// } else {
//   console.log('Promise not available');
// }

## 参考
[overview-javascript-promise](https://www.sitepoint.com/overview-javascript-promises/)
