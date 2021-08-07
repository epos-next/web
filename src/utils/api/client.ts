/* istanbul ignore file */

import axios from "axios";
import rateLimit from 'axios-rate-limit';
import EnvHelper from "@helpers/env-helper";
import AuthHelper from "@helpers/auth-helper";
import ApiRoutes from "@utils/api/routes";

const rateLimitOpts = {
    maxRequests: 3, perMilliseconds: 2000,
}

const client = rateLimit(axios.create({
    baseURL: EnvHelper.serverUrl,
    headers: {
        "Authorization": AuthHelper.header,
    },
}), rateLimitOpts);

const interceptor = client.interceptors.response.use(
    res => res,
    error => {

        if (!error.response) {
            error.response = {
                status: 500,
            }
            return error;
        }

        // Reject promise if usual error
        if (error.response.status !== 401 && error.response.status !== 403) {
            return error.response;
        }

        /*
         * When response code is 401, try to refresh the token.
         * Eject the interceptor so it doesn't loop in case
         * token refresh causes the 401 response
         */
        axios.interceptors.response.eject(interceptor);

        axios.interceptors.response.use(response => {
            return response;
        }, error => {
            return error.response;
        });

        return axios.post(ApiRoutes.updateToken, AuthHelper.tokensBody)
            .then(res => {
                // Save tokens and trying to rerun action
                AuthHelper.tokens = res.data;
                error.response.config.headers["Authorization"] = AuthHelper.header;
                return client(error.response.config);
            })
            .catch(err => {
                AuthHelper.destroyTokens();
                return error.response;
            });
    }
);

export default client;
