import {ADD_LAYER, SELECT_LAYER, TOGGLE_PREVIEW, TOGGLE_UPLOADING, UPDATE_LAYER} from '~/storage/actionTypes';;

const initialWidth = (window.innerWidth - 240) * .75;
const initialLayout = {
    width: initialWidth,
    height: initialWidth * 9 / 16,
};

export const layout = (state = initialLayout) => {
    return state;
}

export const layers = (state = {}, action) => {
    if (action.type === ADD_LAYER) {
        return {
            [action.payload.id]: action.payload.data,
            ...state,
        };
    }

    if (action.type === UPDATE_LAYER) {
        state[action.payload.id] = {
            ...state[action.payload.id],
            ...action.payload.data,
        };

        return Object.assign({}, state);
    }

    if (action.type === SELECT_LAYER) {
        Object.keys(state).forEach(layerId => {
            state[layerId].selected = layerId === action.payload.id;
        });

        return Object.assign({}, state);
    }

    return state;
}

export const previewMode = (state = false, action) => {
    if (action.type === TOGGLE_PREVIEW) {
        return !state;
    }

    return state;
}

export const uploading = (state = false, action) => {
    if (action.type === TOGGLE_UPLOADING) {
        return !state;
    }

    return state;
}