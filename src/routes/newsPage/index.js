import React from 'react';
import mirror, { actions, connect } from 'mirrorx';

mirror.model({
    name: 'news',
    initialState: 0,
    reducers: {
      increment(state) { return state + 1 },
      decrement(state) { return state - 1 }
    },
    effects: {
      async incrementAsync() {
        await new Promise((resolve, reject) => {
          setTimeout(() => {
            resolve()
          }, 1000)
        })
        actions.app.increment()
      }
    }
  })
  
  // connect state with component
  const App = connect()(props => (
      <div>
        <h1>{props.count}</h1>
        {/* dispatch the actions */}
        <button onClick={() => actions.app.decrement()}>-</button>
        <button onClick={() => actions.app.increment()}>+</button>
        {/* dispatch the async action */}
        <button onClick={() => actions.app.incrementAsync()}>+ Async</button>
      </div>
    )
  )
  
export default App;