import {combineReducers} from 'redux';
import { reducer as formReducer } from 'redux-form';

import PacienteReducer from '../reducers/pacienteReducer';
import GeneroSexualReducer from '../reducers/generoSexualReducer';
import EscolaridadeReducer from '../reducers/escolaridadeReducer';
import TipoSanguineoReducer from '../reducers/tipoSanguineoReducer';
import SituacaoFamiliarReducer from '../reducers/situacaoFamiliarActions';

const rootReducer = combineReducers({
    form: formReducer,
    paciente: PacienteReducer,
    generoSexual: GeneroSexualReducer,
    escolaridade: EscolaridadeReducer,
    tipoSanguineo: TipoSanguineoReducer,
    situacaoFamiliar: SituacaoFamiliarReducer
});

export default rootReducer;