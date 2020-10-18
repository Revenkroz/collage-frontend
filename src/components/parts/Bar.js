import React from 'react';
import {connect} from "react-redux";
import { togglePreview } from '~/storage/actions';

const BUTTONS = [
    {
        name: 'Preview & Save',
        onClick: ({ togglePreview }) => {
            return () => {
                togglePreview();
            };
        },
    }
];

function Bar(props) {
    return (
        <div className="bar">
            <div className="buttons-list">
                {BUTTONS.map((button, idx) => (
                    <div key={idx} className="buttons-list__item" onClick={button.onClick(props)}>{button.name}</div>
                ))}
            </div>
        </div>
    );
}


const mapState = (state) => {
    return {
        previewMode: state.previewMode,
    };
}

export default connect(mapState, { togglePreview })(Bar);