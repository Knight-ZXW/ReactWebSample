/**
 * Created by nimdanoob on 2016/12/28.
 */
// function* gen() {
//   yield 1;
//   yield 2;
//   yield 3;
// }
// var g = gen(1); // 返回一个内部指针 即便利器 g
// console.log(g.next(2));
// console.log(g.next(3));
// console.log(g.next(4));
// console.log(g.next(22));
var wrappedPromise = function () {
  return new Promise(function (resolve, reject) {
    resolve('resolve');
  })
};

var gen = function*() {
  var r = yield wrappedPromise();
  console.log('r is ' + r)
};

var g = gen();
g.next().value.then(function (value) {
  console.log('i get value ' + value);
  g.next();
});


