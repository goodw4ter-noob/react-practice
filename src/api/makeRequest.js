import axios from "axios";
import { handleError } from "../utils";

const API_ENDPOINT = 'http://localhost:3000';

export const makeRequest = function (config) {
    config.url = `${API_ENDPOINT}${config.url}`;

    return axios(config).catch(err => handleError(err));
}