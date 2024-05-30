import { get } from "svelte/store";
import { apiKeyStore } from "../stores/apiKeyStore";
import { user } from "../stores/userStore";

const apiUrl = import.meta.env.VITE_API_URL;
const USERNAME = import.meta.env.VITE_API_USERNAME;
const PASSWORD = import.meta.env.VITE_API_PASSWORD;

class AuthService {
  maxTries = 3;
  constructor() {
    // Initialize any necessary variables or dependencies
  }

  isAuthenticated() {
    return get(user) !== null;
  }

  hasRoles(roles) {
    const u = get(user);
    if (!u) return false;
    return roles.some(role => u.roles.includes(role));
  }

  logout() {
      apiKeyStore.set('');
      user.set(null);
  }

  async login(username, password) {
    let triesLeft = this.maxTries;
    try {
     while(this.maxTries > 0){
      const res = await fetch(`${apiUrl}/api/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
      });
      if (!res.ok) {
          triesLeft--;
          if (triesLeft === 0) {
            throw new Error('Network response was not ok');
          }
          continue
      }

      const { token } = await res.json();
      const loggedUser = this._parseJwt(token)
      apiKeyStore.set(token);
      user.set(loggedUser);
      console.log('user stored :>> ', loggedUser);
      return token;
     }
    } catch (error) {
      console.error(error);
    }
  }

  async generateApiKey() {
    const token = get(apiKeyStore);
    const res = await fetch(`${apiUrl}/api/user/token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${token}`
      }
    });
    if (!res.ok) {
      throw new Error('Network response was not ok');
    }
    console.log('res.json() :>> ', res.json());
    const { apiKey } = await res.json();
    return apiKey;
  }

  async listApiKeys() {
    const token = get(apiKeyStore);
    const res = await fetch(`${apiUrl}/api/user/tokens`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${token}`
      }
    });
    if (!res.ok) {
      throw new Error('Network response was not ok');
    }
    return await res.json();
  }

  async changePassword(username, oldPassword, newPassword) {
    const token = get(apiKeyStore);
    const res = await fetch(`${apiUrl}/api/change-password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${token}`
      },
      body: JSON.stringify({ username, oldPassword, newPassword })
    });
    if (!res.ok) {
      throw new Error('Network response was not ok');
    }
  }

  _parseJwt(token) {
    if (!token) {
      return;
    }
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace("-", "+").replace("_", "/");
    return JSON.parse(window.atob(base64));
  }
}

export default AuthService;