import {EnderecoTypes as Types} from '../types/enderecoTypes';

const INITIAL_STATE = {list: []};

export default (state = INITIAL_STATE, action) => {
    switch (action.type){
        case Types.ESTADOS_FETCHED:
            return {
                ...state,
                estadosList: action.payload.data.lista
            };
        default: return state;
    }
}