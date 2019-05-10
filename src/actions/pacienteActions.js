import {BASE_URL} from '../main/config';

import axios from 'axios';
import {reset as resetForm, initialize} from 'redux-form';

import { notification } from 'antd';

import {PacienteTypes as Types } from '../types/pacienteTypes';
import history from '../main/history';

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
        initialize('pacienteForm', INITIAL_VALUES)
    ];
}

const submit = (values, method) => {
    return function (dispatch) {        
        const id = values.id ? values.id : '';
        console.log(values);
        axios[method](`${BASE_URL}/paciente/${id}`, values)
        .then(resp => {
            console.log("Concluido envio");
            dispatch([                
                resetForm('pacienteForm'),
                history.push('/paciente'),
                notification.success({
                    message: 'Operação Realizada',
                    description: 'Paciente cadastrado com sucesso!'
                }),
                //clearErros()
            ]);
        })
        .catch(erros => {
            console.log(erros.response.data);
            // dispatch(showErros(erros.response.data))
        })
    }
} 

export function createPaciente(values){
    return submit(values, 'post');
}

export function updatePaciente(values){    
    return submit(values, 'put');
}

export function removePaciente(values){
    return submit(values, 'delete');
}

