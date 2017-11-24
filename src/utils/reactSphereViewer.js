import React, { Component } from 'react';
import PhotoSphereViewer from 'photo-sphere-viewer-sa';
import uEvent from 'uevent';
import style from './photo-sphere-viewer.css';
import PropTypes from 'prop-types';

class ReactSphereViewer extends Component {
	componentDidMount() {
		const { src, options } = this.props;
		this.psv = new PhotoSphereViewer({ ...options, panorama: src });
	}
	componentWillUnmount() {
		this.psv.destroy()
	}
	render() {
		const { options: { container } } = this.props;
		return (
			<div id={container}></div>
		);
	}
}

ReactSphereViewer.defaultProps = {
	options: {
		gyroscope: false,
		loading_text: 'loading',
		container: 'photosphere',
		navbar: 'autorotate zoom fullscreen',
		size: {
			// width: 500,
			height: 400
		}
	}
};

ReactSphereViewer.propTypes = {
	src: PropTypes.string,
	options: PropTypes.object
}

export default ReactSphereViewer;
