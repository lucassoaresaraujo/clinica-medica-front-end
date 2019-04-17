import {combineReducers} from 'redux';
//import { reducer as formReducer } from 'redux-form';

import PacienteReducer from '../reducers/pacienteReducer';

const rootReducer = combineReducers({
    paciente: PacienteReducer
});

export default rootReducer;