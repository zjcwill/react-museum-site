import React from 'react'
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom';
import Header from '../components/header';
import ReduxDemo from '../demo/redux';

const MainRouter = () => (
    <Router>
        <div>
            <Header/>
            <hr />
            {/*测试路由*/}
            <Route exact path="/" component={Home} />
            <Route path="/reduxDemo" component={ReduxDemo} />
            <Route path="/about" component={About} />
            <Route path="/topics" component={Topics} />
        </div>
    </Router>
)

const Home = () => (
    <div>
      <h2>Home</h2>
    </div>
  )
  
  const About = () => (
    <div>
      <h2>About</h2>
    </div>
  )
  
  const Topics = ({ match }) => (
    <div>
      <h2>Topics</h2>
      <ul>
        <li>
          <Link to={`${match.url}/rendering`}>
            Rendering with React
          </Link>
        </li>
        <li>
          <Link to={`${match.url}/components`}>
            Components
          </Link>
        </li>
        <li>
          <Link to={`${match.url}/props-v-state`}>
            Props v. State
          </Link>
        </li>
      </ul>
  
      <Route path={`${match.url}/:topicId`} component={Topic}/>
      <Route exact path={match.url} render={() => (
        <h3>Please select a topic.</h3>
      )}/>
    </div>
  )
  
  const Topic = ({ match }) => (
    <div>
      <h3>{match.params.topicId}</h3>
    </div>
  )

export default MainRouter;