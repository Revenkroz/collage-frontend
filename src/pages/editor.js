import React from 'react';
import Axios from 'axios';
import { LayersView } from '~/components/editor';
import { DragAndDrop } from '~/components';
import { connect } from 'react-redux';
import {addLayer, toggleUploading} from '~/storage/actions';

class Editor extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            layoutStyle: {
                width: props.layout.width + 'px',
                height: props.layout.height + 'px',
            },
        };
    }

    handleDropWithoutUpload = async (files) => {
        const reader = new FileReader();
        reader.readAsDataURL(files[0]);
        reader.onload = () => {
            const image = new Image();
            image.src = reader.result;
            let data = {
                url: image.src,
            };
            image.onload = () => {
                data.width = image.width;
                data.height = image.height;
                this.props.addLayer({
                    name: files[0].name,
                    ...data,
                });
            };
        }
    }

    handleDrop = async (files) => {
        this.props.toggleUploading();

        let formData = new FormData();
        formData.append('image', files[0]);
        const response = await Axios.post('http://127.0.0.1:8000/upload', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });

        this.props.addLayer({
            name: files[0].name,
            url: response.headers['x-url'],
            width: parseInt(response.headers['x-width']),
            height: parseInt(response.headers['x-height']),
        });

        this.props.toggleUploading();
    }

    render() {
        return (
            <div className="editor">
                <DragAndDrop handleDrop={this.handleDrop} style={this.state.layoutStyle}>
                    <div className="editor__main" style={this.state.layoutStyle}>
                        <LayersView moveable={true} id="layers" className="editor__layers" style={this.state.layoutStyle}/>
                    </div>
                </DragAndDrop>
            </div>
        );
    }
}

const mapState = (state) => {
    return {
        layout: state.layout,
    };
}

export default connect(mapState, { addLayer, toggleUploading })(Editor);