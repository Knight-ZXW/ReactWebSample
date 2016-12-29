/**
 * Created by nimdanoob on 2016/12/28.
 */

var test = undefined;

try {
  var f1 = function () {
    console.log('pre catch print')
    console.log(test.toString())
  }
} catch (e){
  console.log('error')
}
f1();
