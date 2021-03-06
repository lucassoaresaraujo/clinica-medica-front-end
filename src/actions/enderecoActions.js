import {BASE_URL} from '../main/config';
import axios from 'axios';

import { EnderecoTypes as Types } from '../types/enderecoTypes';

export function getEstados(){
    const request = axios.get(`${BASE_URL}/estado`);
    return {
        type: Types.ESTADOS_FETCHED,
        payload: request
    }
}

export function getCidades(estadoId) {
    if (estadoId !== undefined){
        const request = axios.get(`${BASE_URL}/cidade/${estadoId}`);
        return {
            type: Types.CIDADES_FETCHED,
            payload: request
        }
    }
}