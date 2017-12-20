import React from 'react';
import { Route } from 'mirrorx';
import Header from '../components/header';
import Footer from '../components/footer';
import ReduxDemo from '../demo/redux';
import { Layout } from 'antd';
import IndexPage from './IndexPage';
import NewsPage from './newsPage';
import ViewerDetailPage from './viewerDetailPage';
const { Content } = Layout;

const MainRouter = () => (
  <Layout>
    <Header />
    {/*测试路由*/}
    <Content>
      {/*首页轮播图不需要留白*/}
      <Route exact path="/" component={IndexPage}/>
      <div style={{padding:"0 50px"}}>
        <Route path="/reduxDemo" component={ReduxDemo} />
        <Route path="/news" component={NewsPage} />
        <Route path="/topics" component={Topics} />
        <Route path="/viewer/:id" component={ViewerDetailPage} />
      </div>
    </Content>
    <Footer/>
  </Layout>
)

// const Home = () => (
//   <div>
//     <h2>Home</h2>
//   </div>
// )

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