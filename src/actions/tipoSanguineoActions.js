import {BASE_URL} from '../main/config';
import axios from 'axios';

import { TipoSanguineoTypes as Types } from '../types/tipoSanguineoTypes';

export function getTipoSanguineo(){
    const request = axios.get(`${BASE_URL}/enum?tipo=tipo_sanguineo`);
    return {
        type: Types.FETCHED,
        payload: request
    }
}