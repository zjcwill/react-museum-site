import React, { Component } from 'react';
import ReactSphereViewer from './utils/reactSphereViewer';
import src from './example.jpg';

const options = {
  gyroscope: false,
  loading_text: 'loading',
  container: 'photosphere',
  navbar: 'autorotate zoom fullscreen',
  size: {
    // width: 500,
    height: 800
  }
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>博物馆demo</h1>
        <ReactSphereViewer src={src} options={options}></ReactSphereViewer>
      </div>
    );
  }
}

export default App;
