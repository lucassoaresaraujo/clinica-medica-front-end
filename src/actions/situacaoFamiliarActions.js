import {BASE_URL} from '../main/config';
import axios from 'axios';

import { SituacaoFamiliarTypes as Types } from '../types/situacaoFamiliarTypes';

export function getSituacaoFamiliar(){
    const request = axios.get(`${BASE_URL}/enum?tipo=situacao_familiar`);
    return {
        type: Types.FETCHED,
        payload: request
    }
}