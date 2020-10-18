import React from 'react';
import { LayersView } from '~/components/editor';
import { connect } from 'react-redux';
import { togglePreview } from "~/storage/actions";

import domtoimage from 'dom-to-image';

class Preview extends React.Component {
    constructor(props) {
        super(props);

        this.layoutStyle = {
            width: props.layout.width + 'px',
            height: props.layout.height + 'px',
        };
    }

    saveImage = () => {
        domtoimage.toJpeg(document.querySelector('#layers-preview'), { quality: 0.95 })
            .then(function (dataUrl) {
                const link = document.createElement('a');
                link.download = `test-${new Date().toISOString().slice(0, 10)}.jpg`;
                link.href = dataUrl;
                link.click();
            });
    }

    render() {
        if (!this.props.previewMode) {
            return null;
        }

        return (
            <>
                <div className="overlay" onClick={this.props.togglePreview}/>
                <div id="preview" className="preview" style={{
                    marginTop: - this.props.layout.height / 2,
                    marginLeft: - this.props.layout.width / 2,
                }}>
                    <div style={this.layoutStyle}>
                        <LayersView moveable={false} id="layers-preview" className="editor__layers" style={this.layoutStyle}/>
                    </div>
                </div>
                <div className="btn save-btn" onClick={this.saveImage} style={{
                    marginTop: - this.props.layout.height / 2 - 40,
                    marginLeft: -32,
                }}>
                    Save
                </div>
            </>
        );
    }
}

const mapState = (state) => {
    return {
        previewMode: state.previewMode,
        layout: state.layout,
    };
}

export default connect(mapState, { togglePreview })(Preview);