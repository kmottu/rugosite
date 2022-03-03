import {
  RUGOSITE_SUCCESS,
  RUGOSITE_FAIL,
  MESURES_SUCCESS,
  MESURES_FAIL,
  ORGANISMES_FAIL,
  ORGANISMES_SUCCESS,
  UTILISATEUR_FAIL,
  UTILISATEUR_SUCCESS,
} from "../actions/types";

const initialState = {
  rugosite: [],
  mesures: [],
  organismes: [],
  utilisateur: [],
  error: "",
}

export default function data(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case RUGOSITE_SUCCESS:
      return {
        ...state,
        rugosite: payload,
        error: ""
      }

    case MESURES_SUCCESS:
      return {
        ...state,
        mesures: payload,
        error: ""
      }
    
    case ORGANISMES_SUCCESS:
      return {
        ...state,
        organismes: payload,
        error: ""
      }

    case UTILISATEUR_SUCCESS:
      return {
        ...state,
        utilisateurs: payload,
        error: ""
      }

    case MESURES_FAIL:
    case ORGANISMES_FAIL:
    case UTILISATEUR_FAIL:
    case RUGOSITE_FAIL:
      return {
        ...state,
        rugosite: [],
        mesures: [],
        organismes: [],
        error: payload
      }
        
    default:
      return state;
  }
}