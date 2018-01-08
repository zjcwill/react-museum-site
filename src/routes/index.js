import React from 'react';
import { Route } from 'mirrorx';
import Header from '../components/header';
import Footer from '../components/footer';
import ReduxDemo from '../demo/redux';
import { Layout } from 'antd';
import IndexPage from './IndexPage';
import NewsPage from './newsPage';
import NewsDetailPage from './newsDetailPage';
import ViewerIndexPage from './viewIndexPage';
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
        <Route path="/newsPage/:type/:id" component={NewsDetailPage} />
        <Route path="/viewerIndex" component={ViewerIndexPage} />
        <Route path="/viewer/:id" component={ViewerDetailPage} />
      </div>
    </Content>
    <Footer/>
  </Layout>
)

export default MainRouter;