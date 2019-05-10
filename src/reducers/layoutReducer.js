import {LayoutTypes as Types} from '../types/layoutTypes';

const INITIAL_STATE = {collapsed: false};

export default (state = INITIAL_STATE, action) => {
    switch (action.type){
        case Types.MENU_COLLAPSED:
            return {
                ...state,
                collapsed: !state.collapsed
            };
        default: return state;
    }
}