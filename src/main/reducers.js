import {combineReducers} from 'redux';
import { reducer as formReducer } from 'antd-form-redux';

import LayoutReducer from '../reducers/layoutReducer';
import PacienteReducer from '../reducers/pacienteReducer';
import GeneroSexualReducer from '../reducers/generoSexualReducer';
import EscolaridadeReducer from '../reducers/escolaridadeReducer';
import TipoSanguineoReducer from '../reducers/tipoSanguineoReducer';
import SituacaoFamiliarReducer from '../reducers/situacaoFamiliarReducer';
import EnderecoReducer from '../reducers/enderecoReducer';

const rootReducer = combineReducers({
    layout: LayoutReducer,
    form: formReducer,
    paciente: PacienteReducer,
    generoSexual: GeneroSexualReducer,
    escolaridade: EscolaridadeReducer,
    tipoSanguineo: TipoSanguineoReducer,
    situacaoFamiliar: SituacaoFamiliarReducer,
    endereco: EnderecoReducer
});

export default rootReducer;