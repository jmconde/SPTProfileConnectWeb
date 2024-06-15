import { get } from 'svelte/store';
import { jwtStore } from '../stores/jwtStore';

export class NetworkService {
  API_URL = import.meta.env.VITE_API_URL;
  
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
      throw new Error('Network response was not ok');
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

  getHeaders({ auth = true }) {
    const headers = {
      'Content-Type': 'application/json'
    };
    if (auth) {
      headers.Authorization = get(jwtStore);
    }
    return headers;
  }
}