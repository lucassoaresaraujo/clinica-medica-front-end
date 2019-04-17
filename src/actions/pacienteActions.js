import {BASE_URL} from '../main/config';
import history from '../main/history';

import axios from 'axios';

import {PacienteTypes as Types } from '../types/pacienteTypes';

const INITIAL_VALUES = {}; // valores para inicializar formulários

export function getList(page = 1, paginate = 10, order = 'ASC', orderBy = 'nome'){
    const request = axios.get(`${BASE_URL}/paciente/?page=${page}&paginate=${paginate}&order=${order}&orderBy=${orderBy}`);
    return {
        type: Types.FETCHED,
        payload: request
    }
}