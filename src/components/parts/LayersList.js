import React from 'react';
import Axios from 'axios';
import { connect } from 'react-redux';
import {addLayer, toggleUploading, updateLayer} from '~/storage/actions';

class LayersList extends React.Component {
    openFileDialog = () => {
        const input = document.createElement('input');
        input.type = 'file';
        input.onchange = async (e) => {
            const file = e.target.files[0];
            this.props.toggleUploading();

            let formData = new FormData();
            formData.append('image', file);
            const response = await Axios.post('/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            this.props.addLayer({
                name: file.name,
                url: response.headers['x-url'],
                width: parseInt(response.headers['x-width']),
                height: parseInt(response.headers['x-height']),
            });

            this.props.toggleUploading();
        }

        input.click();
    }

    render() {
        return (
            <>
                <div id="layers-list" className="layers-list" onClick={this.openFileDialog}>
                    <div className="add-layer">
                        <div className="btn">
                            Add Image
                        </div>
                        <div className="info">
                            Click on button above or drag and drop images on layout.
                        </div>
                    </div>
                    {Object.entries(this.props.layers).map(([id, data]) => (
                        <div key={id} className="layers-list__item">
                            {data.name}
                        </div>
                    ))}
                </div>
            </>
        )
    }
}

const mapState = (state) => {
    return {
        layers: state.layers,
    };
}

export default connect(mapState, { addLayer, updateLayer, toggleUploading })(LayersList);