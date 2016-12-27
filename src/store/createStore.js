import {applyMiddleware, compose, createStore} from 'redux'
import thunk from 'redux-thunk'
import {browserHistory} from 'react-router'
import createLogger from 'redux-logger'
import makeRootReducer from './reducers'
import {updateLocation} from './location'
import DevTools from '../containers/DevTools';


export default (initialState = {}) => {
  // ======================================================
  // Middleware Configuration
  // ======================================================
  const loggerMiddleware = createLogger();
  const middleware = [thunk, loggerMiddleware];

  // ======================================================
  // Store Enhancers
  // ======================================================

  //DevTools 需要
  const enhancers = [DevTools.instrument()];
  let composeEnhancers = compose;

  if (__DEV__) {
    const composeWithDevToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
    if (typeof composeWithDevToolsExtension === 'function') {
      composeEnhancers = composeWithDevToolsExtension
    }
    console.log('composeEnhancers is ' + composeEnhancers);
  }

  // ======================================================
  // Store Instantiation and HMR Setup
  // ======================================================

  //todo 思考 composeEnhancers(applyMiddleware(..middleware),...enhancers) 的作用，applyMiddleware已经连接了中间件，为什么在外部又compose一次呢?
  const store = createStore(
    makeRootReducer(),
    initialState,
    composeEnhancers(
      applyMiddleware(...middleware),
      ...enhancers
    )
  );
  store.asyncReducers = {};

  // To unsubscribe, invoke `store.unsubscribeHistory()` anytime
  store.unsubscribeHistory = browserHistory.listen(updateLocation(store));

  if (module.hot) {
    module.hot.accept('./reducers', () => {
      const reducers = require('./reducers').default;
      store.replaceReducer(reducers(store.asyncReducers))
    })
  }

  return store
}
