import Moveable from "react-moveable";
import React from "react";

function MoveableItem(props) {
    if (!props.moveable) {
        return null;
    }

    return (
        <Moveable {...props} />
    );
}

export default MoveableItem;