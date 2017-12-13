import React from 'react';
import mirror, { actions, connect } from 'mirrorx';
import axios from 'axios';

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
    },
  })
  
  // connect state with component
  const App = connect()(props => (
      <div>
        {console.log(props)}
        <h1>{props.count}</h1>
        {/* dispatch the actions */}
        <button onClick={() => actions.app.decrement()}>-</button>
        <button onClick={() => actions.app.increment()}>+</button>
        {/* dispatch the async action */}
        <button onClick={() => actions.app.incrementAsync()}>+ Async</button>
      </div>
    )
  )

const MuseumNews = () => {
  return (<div>
    馆内新闻
  </div>)
}

const InternentNews = (props) => {
  return (
    <div>
      互联网新闻
      {props.hello}
    </div>
  )
}

class NewsPage extends React.Component {
  constructor(props){
    super(props);
  }

  componentWillMount(){
  //   const data = axios({
  //     url : "http://toutiao-ali.juheapi.com/toutiao/index",
  //     method : 'GET',
  //     headers : {"Authorization" : "APPCODE 2bc0b379f81c4a45abe47324afdc610d"}
  //   }).then((data)=>console.log(data));
  //获取新闻信息 
}

  render(){
    return (
      <div>
        <MuseumNews/>
        <InternentNews hello="你好"/>
      </div>
    )
  }
}
  
export default NewsPage;