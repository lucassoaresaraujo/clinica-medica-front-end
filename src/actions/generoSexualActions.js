import {BASE_URL} from '../main/config';
import axios from 'axios';

import { GeneroSexualTypes as Types } from '../types/generoSexualTypes';

export function getGeneroSexual(){
    const request = axios.get(`${BASE_URL}/enum?tipo=genero_sexual`);
    return {
        type: Types.FETCHED,
        payload: request
    }
}