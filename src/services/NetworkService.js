import { get } from 'svelte/store';
import { jwtStore } from '../stores/jwtStore';

export class NetworkService {
  API_URL = import.meta.env.VITE_API_URL;
  
  async post({ uri = '', body, auth }) {
    return await this.request({ uri, method: 'POST', body, auth });
  }
  
  async get({ uri = '', auth }) {
    return await this.request({ uri, auth });
  }

  async patch({ uri, body, auth }) {
    return await this.request({ uri, method: 'PATCH', body, auth });
  }

  async delete({ uri, auth }) {
    return await this.request({ uri, method: 'DELETE', auth });
  }

  async request({ uri = '', method = 'GET', body = null, auth = true }) {
    if (!uri) {
      throw new Error('URL is required');
    }
    const res = await fetch(`${this.API_URL}${uri}`, this.getFetchOptions({ method, body, auth }));

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