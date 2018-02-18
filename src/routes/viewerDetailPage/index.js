import React from 'react';
import mirror, { actions, connect } from 'mirrorx';
import ReactSphereViewer from '../../utils/reactSphereViewer';
import img from './example.jpg';
import { loadTheViewer } from "../../services/indexPage";
import _ from 'lodash';
import { Row,Col,Spin } from 'antd';

mirror.model({
    name: 'viewerDetails',
    initialState: {
        id:null,
        imgUrl:null,
    },
    reducers: {
        save(state, data) {
            return { ...state, ...data };
        },
    },
    effects: {
        async getImgUrl(id, getState) {
            const { data : { results } } = await loadTheViewer(id);
            actions.viewerDetails.save({imgUrl:results.pop().picture.url})
            // actions.app.increment()
        }
    }
});

mirror.hook((action, getState) => {
    const { routing: { location } } = getState();
    if (
      action.type === "@@router/LOCATION_CHANGE" &&
      location.pathname === "/viewer"
    ) {
        const id = location.search.split("=")[1];
        actions.viewerDetails.save({id:id});
        actions.viewerDetails.getImgUrl(id);
    }
  });

const Options = (height = 800) => {
    return {
        gyroscope: false,
        loading_text: 'loading',
        container: 'photosphere',
        navbar: 'autorotate zoom fullscreen',
        size: {
            // width: 500,
            height: height
        }
    };
};

const App = connect(state => state)(props => {
    const { viewerDetails:{imgUrl} } = props;    
    return (
        _.isNil(imgUrl)
        ?
        (
            <Row>
                <Col>
                    <Spin/>
                </Col>
            </Row>
        )
        :
        (
        <Row>
            <ReactSphereViewer src={imgUrl} options={Options()}></ReactSphereViewer>
        </Row>
        )
      
    )
});

export default App; 