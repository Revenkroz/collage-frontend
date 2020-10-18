import React from 'react';
import { connect } from 'react-redux';
import { selectLayer, updateLayer } from '~/storage/actions';
import { Layer } from '~/components/editor';

import Image from '~/layers/image';

function LayersView(props) {
    return (
        <div id={props.id} className={props.className} style={props.style}>
            {Object.keys(props.layers).reverse().map((id) => (
                <Layer
                    key={id}
                    id={id}
                    data={props.layers[id]}
                    selectLayer={props.selectLayer}
                    updateLayer={props.updateLayer}
                    moveable={props.moveable}
                />
            ))}
        </div>
    )
}

const mapState = (state) => {
    return {
        layers: state.layers,
    };
}

export default connect(mapState, { selectLayer, updateLayer })(LayersView);