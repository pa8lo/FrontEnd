import { MOSTRAR_COMBOS, MOSTRAR_COMBO, AGREGAR_COMBO, EDITAR_COMBO, BORRAR_COMBO } from '../actions/types';

const initialState = {
    combos : [],
    loaded: false
}; 

export default function (state = initialState, action){
    switch(action.type){
        case MOSTRAR_COMBOS : 
            return {
                ...state,
                combos : action.payload,
                loaded: true,
            }
        case MOSTRAR_COMBO : 
            return {
                ...state,
                combo : action.payload
            }
        case EDITAR_COMBO :
            return {
                ...state,
            }
        case BORRAR_COMBO : 
            return {
                ...state,
                combos: state.combos.filter( combos => (combos.id !== action.payload))
            }
        case AGREGAR_COMBO : 
            return {
                ...state,
                combos : [...state.combos, action.payload]
            }
        default : 
            return state;
    }
}
