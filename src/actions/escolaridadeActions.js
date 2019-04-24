import {BASE_URL} from '../main/config';
import axios from 'axios';

import { EscolaridadeTypes as Types } from '../types/escolaridadeTypes';

export function getEscolaridade(){
    const request = axios.get(`${BASE_URL}/enum?tipo=escolaridade`);
    return {
        type: Types.FETCHED,
        payload: request
    }
}