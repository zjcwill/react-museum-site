import React from 'react';
import { actions, connect } from 'mirrorx';
import Banner from '../../components/banner';
import InformationBoard from '../../components/informationBoard';
import DisplayArea from '../../components/displayArea';
import './container';
import './index.css';

const IndexPage = connect(state => { return { data: state.IndexPage } })(props => (
    <div>
        <Banner imgUrl={props.data.bannerURL}/>
        <InformationBoard/>
        <DisplayArea/>
    </div>
)
);

export default IndexPage;