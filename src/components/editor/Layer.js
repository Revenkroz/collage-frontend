import React, { createRef } from 'react';
import { MoveableItem } from '~/components/editor';

class Layer extends React.Component {
    target = createRef();

    selectLayer = () => {
        this.props.selectLayer(this.props.id);
    };

    render() {
        return (
            <>
                <div
                    data-id={this.props.id}
                    ref={this.target}
                    className={`layer ${this.props.data.selected ? 'active' : ''}`}
                    onClick={this.selectLayer}
                    style={{
                        width: this.props.data.width,
                        height: this.props.data.height,
                        top: this.props.data.y,
                        left: this.props.data.x,
                    }}
                >
                    <img
                        src={this.props.data.url}
                        alt={this.props.data.name}
                        style={{
                            width: '100%',
                            height: '100%',
                        }}
                    />
                </div>
                <MoveableItem
                    moveable={this.props.moveable}
                    target={this.target}
                    draggable={true}
                    onDrag={({ target, left, top }) => {
                        if (!this.props.data.selected) {
                            this.selectLayer();
                        }

                        target.style.left = `${left}px`;
                        target.style.top = `${top}px`;

                        this.props.updateLayer(this.props.id, {
                            x: left,
                            y: top,
                        });
                    }}

                    resizable={this.props.data.selected}
                    keepRatio={true}
                    renderDirections={['nw', 'ne', 'sw', 'se']}
                    origin={false}
                    onResize={({ target, width, height, drag }) => {
                        target.style.width = `${width}px`;
                        target.style.height = `${height}px`;
                        target.style.left = `${drag.left}px`;
                        target.style.top = `${drag.top}px`;

                        this.props.updateLayer(this.props.id, {
                            width,
                            height,
                            x: drag.left,
                            y: drag.top,
                        });
                    }}

                    snappable={true}
                />
            </>
        );
    }
}

export default Layer;