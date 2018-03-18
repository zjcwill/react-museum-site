import React from 'react';
import { Route } from 'mirrorx';
import Header from '../components/header';
import Footer from '../components/footer';
import ReduxDemo from '../demo/redux';
import { Layout } from 'antd';
import IndexPage from './IndexPage';
import NewsPage from './newsPage';
<<<<<<< HEAD
import ViewerIndexPage from './viewerIndexPage';
=======
import NewsDetailPage from './newsDetailPage';
import ViewerIndexPage from './viewIndexPage';
>>>>>>> sprint180109
import ViewerDetailPage from './viewerDetailPage';
import AdminPage from './adminPage';
import SigninPage from './signinPage';

const { Content } = Layout;

const MainRouter = () => (
  <Layout>
    <Route path="*" component={Header}/>
    <Content>
      <Route exact path="/" component={IndexPage}/>
      <div style={{padding:"0 50px"}}>
        <Route path="/reduxDemo" component={ReduxDemo} />
        <Route path="/news" component={NewsPage} />
        <Route path="/detailPage/*" component={NewsDetailPage} />
        <Route path="/viewerIndex" component={ViewerIndexPage} />
<<<<<<< HEAD
        <Route path="/viewer/:id" component={ViewerDetailPage} />
=======
        <Route path="/viewer" component={ViewerDetailPage} />
        <Route path="/admin" component={AdminPage} />
        <Route path="/signin" component={SigninPage}/>
>>>>>>> sprint180109
      </div>
    </Content>
    <Route path="*" component={Footer}/>
  </Layout>
)

export default MainRouter;