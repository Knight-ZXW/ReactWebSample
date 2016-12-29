Promise 的研究及源码实现

### PromiseA 的概念
　　Promise 是为了就叫 JavaScript 中 在编写复杂的异步操作任务时，写出 **Callback Hell**的问题，**Promise** 代表了一个当前不知道执行结果的任务，但是
- Promise 只有 **pending**(进行中) **fulfilled**（表示已完成，有些具体实现使用 Resolved表示） **rejected**（表示已失败，有些具体的实现使用Rejected表示） 这3个状态。当前的状态只能由异步操作的结果决定，
如何其他操作都无法改变这个状态。
- 状态的转换只能由 **pending** -> **fulfilled** 或者 **pending** -> **rejected** 这两种路径，并且一旦发生了这两种过程，状态就凝固了，不会再变化了，
就算改变已经发生了。如果你再次对这个 Promise 对象添加回调时间，也会立即得到这个结果。

## 参考
[overview-javascript-promise](https://www.sitepoint.com/overview-javascript-promises/)
