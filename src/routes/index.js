import React from 'react';
// import {
//     BrowserRouter as Router,
//     Route,
//     Link
// } from 'react-router-dom';
import { Route } from 'mirrorx';
import Header from '../components/header';
import ReduxDemo from '../demo/redux';
import { Layout, Button } from 'antd';

const { Content } = Layout;

const MainRouter = () => (
  <Layout>
    <Header />
    {/*测试路由*/}
    <Content style={{padding:"0 60px"}}>
      <Route exact path="/" component={Home} />
      <Route path="/reduxDemo" component={ReduxDemo} />
      <Route path="/about" component={About} />
      <Route path="/topics" component={Topics} />
    </Content>
  </Layout>
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
    <Route path={`${match.url}/:topicId`} component={Topic} />
    <Route exact path={match.url} render={() => (
      <h3>Please select a topic.</h3>
    )} />
  </div>
)

const Topic = ({ match }) => (
  <div>
    <h3>{match.params.topicId}</h3>
  </div>
)

export default MainRouter;