/* eslint-disable */
"use strict";

import Vue from "vue";
import axios from "axios";
import store from "../store";

// Full config:  https://github.com/axios/axios#request-config
axios.defaults.baseURL =
    process.env.baseURL ||
    process.env.apiUrl ||
    "http://localhost:8000/api/";
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";
let config = {
    //     onUploadProgress: (e) => {
    //       // updating progress indicator
    //       progress(e.lengthComputable, e.loaded, e.total);
    //     },
    // baseURL: process.env.baseURL || process.env.apiUrl || ""
    // timeout: 60 * 1000, // Timeout
    // withCredentials: true, // Check cross-site Access-Control
};

const _axios = axios.create(config);

_axios.interceptors.request.use(
    function(config) {
        // Do something before request is sent
        const token = store.state.auth.token;

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    function(error) {
        // Do something with request error
        return Promise.reject(error);
    }
);

// Add a response interceptor
_axios.interceptors.response.use(
    function(response) {
        // Do something with response data
        //console.log("res axios");
        return response;
    },
    async function(error) {
        // Do something with response error
        let message = "";
        if (error.response) {
            message = error.response;
            if (JSON.stringify(message.data.error)) {
                if (
                    [
                        '"The token has been expired"',
                        '"The token is invalid"',
                        '"The token has been blacklisted"',
                        '"The token is absent"',
                    ].includes(JSON.stringify(message.data.error))
                ) {

                    localStorage.removeItem("u-sell")
                    window.location.reload()




                } else {
                    console.log(message.data);

                }
            } else {
                console.log(message.data);

            }

        }
        return Promise.reject(error);
    }
);

Plugin.install = function(Vue, options) {
    Vue.axios = _axios;
    window.axios = _axios;
    Object.defineProperties(Vue.prototype, {
        axios: {
            get() {
                return _axios;
            },
        },
        $axios: {
            get() {
                return _axios;
            },
        },
    });
};

Vue.use(Plugin);

export default Plugin;