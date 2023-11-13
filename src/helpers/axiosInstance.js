import axios from "axios";
import axiosRetry from "axios-retry";

const baseURL = `http://localhost:8080/api`; //"http://localhost:8080/intranet_be/api";

const axiosInstance = axios.create({
    baseURL: baseURL,
});

axiosRetry(axiosInstance, {
    retries: 3, // number of retries
    retryDelay: (retryCount) => {
        console.log(`retry attempt: ${retryCount}`);
        return retryCount * 5000; // time interval between retries
    },
    retryCondition: (err) => {
        return err.response.status !== 200 || err.response.status !== 201;
    },
});

export default axiosInstance;
