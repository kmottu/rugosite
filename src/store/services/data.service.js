import axiosApi from './api.helper';
import authHeader from "./auth-header";

const API_URL = "api/data/";

class DataService {

  async getRugosite() {
    try {
      const response = await axiosApi.get(API_URL + "rugosite", { headers: authHeader() });
      return response;
    } catch (err) {
      console.log("Error", err);
    }
  }

  async postRugosite(data) {
    try {
      const response = await axiosApi.post(API_URL + "rugosite", data, { headers: authHeader() });
      return response;
    } catch (err) {
      console.log("Error", err);
    }
  }

  async deleteRugosite(data) {
    try {
      const response = await axiosApi.delete(API_URL + `rugosite/${data.id}`, { headers: authHeader() })
      return response;
    } catch (err) {
      console.log("Error", err);
      return err;
    }
  }

  async getMesures() {
    try {
      const response = await axiosApi.get(API_URL + "mesures", { headers: authHeader() });
      return response;
    } catch (err) {
      console.log("Error", err);
    }
  }

  async postMeasure(data) {
    try {
      const response = await axiosApi.post(API_URL + "mesure", data, { headers: authHeader() })
      return response;
    } catch (err) {
      console.log("Error", err);
      return err;
    }
  }

  async deleteMeasure(data) {
    try {
      const response = await axiosApi.delete(API_URL + `mesure/${data.id}`, { headers: authHeader() })
      return response;
    } catch (err) {
      console.log("Error", err);
      return err;
    }
  }

  async getOrganismes() {
    try {
      const response = await axiosApi.get(API_URL + "organismes", { headers: authHeader() });
      return response;
    } catch (err) {
      console.log("Error", err);
    }
  }

  async postOrganisme(data) {
    try {
      const response = await axiosApi.post(API_URL + "organisme", data, { headers: authHeader() })
      return response;
    } catch (err) {
      console.log("Error", err);
      return err;
    }
  }

  async deleteOrganisme(data) {
    try {
      const response = await axiosApi.delete(API_URL + `organisme/${data.id}`, { headers: authHeader() })
      return response;
    } catch (err) {
      console.log("Error", err);
      return err;
    }
  }

  async getUtilisateurs() {
    try {
      const response = await axiosApi.get(API_URL + "utilisateurs", { headers: authHeader() });
      return response;
    } catch (err) {
      console.log("Error", err);
    }
  }

  async postUtilisateur(data) {
    try {
      const response = await axiosApi.post(API_URL + "utilisateur", data, { headers: authHeader() })
      return response;
    } catch (err) {
      console.log("Error", err);
      return err;
    }
  }

  async deleteUtilisateur(data) {
    try {
      const response = await axiosApi.delete(API_URL + `utilisateur/${data.id}`, { headers: authHeader() })
      return response;
    } catch (err) {
      console.log("Error", err);
      return err;
    }
  }

}

export default new DataService();