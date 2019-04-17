import {PacienteTypes as Types} from '../types/pacienteTypes';

const INITIAL_STATE = {list: []};

export default (state = INITIAL_STATE, action) => {
    switch (action.type){
        case Types.FETCHED:
            return {
                ...state,
                list: action.payload.data
            };
        default: return state;
    }
}