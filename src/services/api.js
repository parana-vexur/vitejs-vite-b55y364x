import axios from 'axios';

let requestLogger = null;

export const setRequestLogger = (logger) => {
  requestLogger = logger;
};

const api = axios.create({
  baseURL: 'https://hml-api-gateway.vexur.com.br',
  headers: {
    'accept': 'application/json',
    'accept-language': 'pt-BR,pt;q=0.9',
    'content-type': 'application/json',
    'api-key': 'a73a78bd-45ed-4c68-839f-cc74ca8495f3',
    'ip': 'Não identificado',
    'ip-vexur': 'Não identificado'
  }
});

// Add request interceptor
api.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    if (requestLogger) {
      requestLogger.addRequest({
        method: error.config?.method?.toUpperCase() || 'UNKNOWN',
        url: error.config?.url || 'UNKNOWN',
        status: 0,
        error: error.message
      });
    }
    return Promise.reject(error);
  }
);

// Add response interceptor
api.interceptors.response.use(
  (response) => {
    if (requestLogger) {
      requestLogger.addRequest({
        method: response.config.method.toUpperCase(),
        url: response.config.url,
        status: response.status
      });
    }
    return response;
  },
  (error) => {
    if (requestLogger) {
      requestLogger.addRequest({
        method: error.config?.method?.toUpperCase() || 'UNKNOWN',
        url: error.config?.url || 'UNKNOWN',
        status: error.response?.status || 0,
        error: error.response?.data?.message || error.message
      });
    }
    return Promise.reject(error);
  }
);

export const authenticate = async (login, password) => {
  try {
    const response = await api.post('/api-vexur-seguranca/autenticar', {
      login,
      pw: password
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export default api;