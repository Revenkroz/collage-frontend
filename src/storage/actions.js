import {ADD_LAYER, SELECT_LAYER, TOGGLE_PREVIEW, TOGGLE_UPLOADING, UPDATE_LAYER} from './actionTypes'
import { genId } from '~/utils';

export const addLayer = (content) => (
    {
        type: ADD_LAYER,
        payload: {
            id: genId(),
            data: {
                x: 0,
                y: 0,
                ...content,
            },
        },
    }
)

export const selectLayer = (id) => (
    {
        type: SELECT_LAYER,
        payload: {
            id,
        },
    }
)

export const updateLayer = (id, data) => (
    {
        type: UPDATE_LAYER,
        payload: {
            id,
            data,
        },
    }
)

export const togglePreview = () => (
    {
        type: TOGGLE_PREVIEW,
    }
)

export const toggleUploading = () => (
    {
        type: TOGGLE_UPLOADING,
    }
)