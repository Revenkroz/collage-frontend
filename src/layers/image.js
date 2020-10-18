import BaseLayer from '~/layers/base';

export default class Image extends BaseLayer {
    constructor(data) {
        super(data);

        this.url = data.url;
    }
}