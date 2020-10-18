class BaseLayer {
    constructor({ name, width, height, x, y, selected }) {
        this.name = name;
        this.width = width;
        this.height = height;
        this.x = x || 0;
        this.y = y || 0;
        this.selected = selected;
    }
}

export default BaseLayer;