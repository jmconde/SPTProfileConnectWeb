import { get } from 'svelte/store';
import { jwtStore, refreshTokenStore } from '../stores/jwtStore';
import { HttpResponseError } from '@utils/errors/HttpResponseError';
import { SessionExpiredError } from '@utils/errors/SessionExpiredError.js';

export class NetworkService {
  API_URL = import.meta.env.VITE_API_URL;
  API_KEY = import.meta.env.VITE_API_KEY;
  static AUTH_JWT = 'jwt';
  static AUTH_BASIC = 'basic';
  static AUTH_APIKEY = 'apikey';
  static AUTH_NONE = 'none';

  constructor(authService) {
    this.authService = authService;
  }
  
  async post({ uri, params, body, auth }) {
    return await this.request({ uri, params, method: 'POST', body, auth });
  }
  
  async get({ uri, params, auth }) {
    return await this.request({ uri, params, auth });
  }

  async patch({ uri, params, body, auth }) {
    return await this.request({ uri, params, method: 'PATCH', body, auth });
  }

  async put({ uri, params, body, auth }) {
    return await this.request({ uri, params, method: 'PUT', body, auth });
  }

  async delete({ uri, params, auth }) {
    return await this.request({ uri, params, method: 'DELETE', auth });
  }

  async request({ uri = '', method = 'GET', body = null, auth = NetworkService.AUTH_JWT, params = null }) {
    if (!uri) {
      throw new Error('URL is required');
    }
    const urlParams = this.getURLParams(params);
    const fetchOptions = this.getFetchOptions({ method, body, auth });
    let res = await fetch(`${this.API_URL}${uri}${urlParams}`, fetchOptions);

    if (!res.ok) {
      if (auth !== NetworkService.AUTH_NONE && res.status === 401) {
        const newAccessToken = await this.refresh()
        if (newAccessToken) {
          fetchOptions.headers.Authorization = newAccessToken
          this.authService.persist(newAccessToken)
          res = await fetch(`${this.API_URL}${uri}${urlParams}`, fetchOptions)
        }
      } else {
        throw new HttpResponseError(res.statusText, res);
      }
    }
    const text = await res.text();

    if (text === '') {
      return;
    } else {
      return JSON.parse(text);
    }
  }

  async refresh() {
    //const { refreshToken } = get(refreshTokenStore);
    const refreshToken = localStorage.getItem('xrt');
    try {
      const fetchResponse = await fetch(`${this.API_URL}/api/refresh`, {
        method: 'POST',
        headers: this.getHeaders({ auth: NetworkService.AUTH_NONE }),
        body: JSON.stringify({ refreshToken: refreshToken }),
      })
      if (!fetchResponse.ok) {
        throw new SessionExpiredError()
      }
      const response = await fetchResponse.json()
      const { token } = response
      this.authService.persist(token)
      return token
    } catch (error) {
      throw new SessionExpiredError()
    }
  }

  getURLParams(params) {
    if (params === null) {
      return '';
    }
    const urlParams = new URLSearchParams();
    Object.keys(params).forEach(key => urlParams.append(key, params[key]));
    return `?${urlParams.toString()}`;
  }

  getFetchOptions({ method, body, auth }) {
    const options = {
      method,
      headers: this.getHeaders({ auth }),
    };
    if (body !== null) {
      options.body = typeof body === 'string' ? body : JSON.stringify(body);
    }
    
    return options;
  }

  getHeaders({ auth = NetworkService.AUTH_JWT }) {
    const headers = {
      'Content-Type': 'application/json'
    };
    switch (auth) {
      case NetworkService.AUTH_APIKEY:
        if (!this.authService.isAuthenticated()) {
          headers['X-Api-Key'] = this.API_KEY;
        } else {
          headers.Authorization = get(jwtStore);
        }
        break;
      case NetworkService.AUTH_BASIC:
      //   headers.Authorization = `Basic ${btoa(`${import.meta.env.VITE_BASIC_AUTH_USERNAME}:${import.meta.env.VITE_BASIC_AUTH_PASSWORD}`)}`;
      //   break;
      case NetworkService.AUTH_NONE:
        break;
      case NetworkService.AUTH_JWT:
      default:
        headers.Authorization = get(jwtStore);
        break;
    }      
    return headers;
  }
}