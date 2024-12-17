import { get } from 'svelte/store';
import { jwtStore } from '../stores/jwtStore';
import { HttpResponseError } from '@utils/HttpResponseError.js';

export class NetworkService {
  API_URL = import.meta.env.VITE_API_URL;
  API_KEY = import.meta.env.VITE_API_KEY;
  static AUTH_JWT = 'jwt';
  static AUTH_BASIC = 'basic';
  static AUTH_APIKEY = 'apikey';
  static AUTH_NONE = 'none';
  
  async post({ uri, params, body, auth }) {
    return await this.request({ uri, params, method: 'POST', body, auth });
  }
  
  async get({ uri, params, auth }) {
    return await this.request({ uri, params, auth });
  }

  async patch({ uri, params, body, auth }) {
    return await this.request({ uri, params, method: 'PATCH', body, auth });
  }

  async delete({ uri, params, auth }) {
    return await this.request({ uri, params, method: 'DELETE', auth });
  }

  async request({ uri = '', method = 'GET', body = null, auth = true, params = null }) {
    if (!uri) {
      throw new Error('URL is required');
    }
    const res = await fetch(`${this.API_URL}${uri}${this.getURLParams(params)}`, this.getFetchOptions({ method, body, auth }));

    if (!res.ok) {
      throw new HttpResponseError(res.statusText, res);
    }
    const text = await res.text();

    if (text === '') {
      return;
    } else {
      return JSON.parse(text);
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
        headers['X-Api-Key'] = this.API_KEY;
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