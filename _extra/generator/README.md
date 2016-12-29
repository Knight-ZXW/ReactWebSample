
Generator 函数是携程在ES6 的实现，最大的特点是可以交出函数的执行权
```javascript
function* gen(x) {
  var y = yield x +2;
  return y;
}
```
Generator 函数是可以暂停执行的，所以为了区别，在函数前加了 *
整个Generator  函数就是一个封装的异步任务，或者说是异步任务的容器。异步操作是需要暂停的地方，都用yield语句注明

