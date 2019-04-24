import {GeneroSexualTypes as Types} from '../types/generoSexualTypes';

const INITIAL_STATE = {list: []};

export default (state = INITIAL_STATE, action) => {
    switch (action.type){
        case Types.FETCHED:
            return {
                ...state,
                list: action.payload.data.lista
            };
        default: return state;
    }
}