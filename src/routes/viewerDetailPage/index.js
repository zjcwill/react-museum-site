import React from 'react';
import mirror, { actions, connect } from 'mirrorx';
import ReactSphereViewer from '../../utils/reactSphereViewer';
import img from './example.jpg';

mirror.model({
    name: 'viewerDetails',
    initialState: {
        test: "123"
    },
    reducers: {

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
    const { viewerDetails } = props;
    return (<div>
        <p>{props.match.params.id}</p>
        <p>{viewerDetails.test}</p>
        <ReactSphereViewer src={img} options={Options()}></ReactSphereViewer>
    </div>)
});

export default App; 