import {
  RUGOSITE_SUCCESS,
  RUGOSITE_FAIL,
  MESURES_SUCCESS,
  MESURES_FAIL,
  SET_MESSAGE,
  ORGANISMES_SUCCESS,
  ORGANISMES_FAIL,
  UTILISATEUR_SUCCESS,
  UTILISATEUR_FAIL,
} from "./types";

import DataService from "../services/data.service";

export const getRugosite = () => (dispatch) => {
  return DataService.getRugosite().then((res) => {
    dispatch({
      type: RUGOSITE_SUCCESS,
      payload: res.data,
    });
    return Promise.resolve();
  },
    (error) => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      dispatch({
        type: RUGOSITE_FAIL
      });

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });
      return Promise.reject();
    })
};

export const getMesures = () => (dispatch) => {
  return DataService.getMesures().then((res) => {
    dispatch({
      type: MESURES_SUCCESS,
      payload: res.data,
    });
    return Promise.resolve();
  },
    (error) => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      dispatch({
        type: MESURES_FAIL
      });

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });
      return Promise.reject();
    });
};

export const getOrganismes = () => (dispatch) => {
  return DataService.getOrganismes().then((res) => {
    dispatch({
      type: ORGANISMES_SUCCESS,
      payload: res.data,
    });
    return Promise.resolve();
  },
    (error) => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      dispatch({
        type: ORGANISMES_FAIL
      });

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });
      return Promise.reject();
    });
};

export const getUtilisateurs = () => (dispatch) => {
  return DataService.getUtilisateurs().then((res) => {
    dispatch({
      type: UTILISATEUR_SUCCESS,
      payload: res.data,
    });
    return Promise.resolve();
  },
    (error) => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      dispatch({
        type: UTILISATEUR_FAIL
      });

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });
      return Promise.reject();
    });
};
