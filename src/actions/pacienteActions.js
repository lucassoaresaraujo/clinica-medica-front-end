import {BASE_URL} from '../main/config';

import axios from 'axios';
import {reset as resetForm, initialize, registerField} from 'redux-form';

import {PacienteTypes as Types } from '../types/pacienteTypes';

const INITIAL_VALUES = {
    telefones: [{}],
    enderecos: [{}]
}; 

export function getList(page = 1, paginate = 10, order = 'ASC', orderBy = 'nome', filtro){    
    const request = axios.get(`${BASE_URL}/paciente/?page=${page}&paginate=${paginate}&order=${order}&orderBy=${orderBy}&filtro=${filtro}`);
    return {
        type: Types.FETCHED,
        payload: request
    }
}

export function init() {    
    return [
        initialize('pacienteForm', INITIAL_VALUES),
        registerField('pacienteForm', 'telefones', 'FieldArray')
    ];
}