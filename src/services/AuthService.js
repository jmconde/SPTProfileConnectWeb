import dayjs from 'dayjs';
import { get } from 'svelte/store';
import { jwtStore } from '../stores/jwtStore';
import { userStore } from '../stores/userStore';
import { NetworkService } from './NetworkService';

const apiUrl = import.meta.env.VITE_API_URL;

export class AuthService {
  maxTries = 3;
  networkService = new NetworkService();
  constructor() {
    // Initialize any necessary variables or dependencies
  }

  isAuthenticated() {
    return get(userStore) !== null;
  }

  hasRoles(roles) {
    const u = get(userStore);
    if (!u) return false;
    return roles.some((role) => u.roles.includes(role));
  }

  logout() {
    this.removePersistence();
  }

  async login(username, password) {
    try {
      const res = await fetch(`${apiUrl}/api/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const { token } = await res.json();
      this.persist(token);
      return token;
    } catch (error) {
      console.error(error);
    }
  }

  fromStorage() {
    const token = sessionStorage.getItem('token');
    if (token) {
      try {
        const parsed = this.parseJwt(token);
        const isAfter = dayjs().isAfter(parsed.exp * 1000);
        if (isAfter) {
          this.removePersistence();
          return;
        }
        this.persist(token);
      } catch (error) {
        console.log('error :>> ', error);
        this.removePersistence();
      }
    } else {
      this.removePersistence();
    }
  }

  persist(token) {
    const loggedUser = this.parseJwt(token);
    jwtStore.set(token);
    userStore.set(loggedUser);
    sessionStorage.setItem('token', token);
  }

  removePersistence() {
    jwtStore.set('');
    userStore.set(null);
    sessionStorage.removeItem('token');
  }

  async changePasswordWithCode(username, code, newPassword) {
    const res = await fetch(`${apiUrl}/api/user/password/recovery/change`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, code, newPassword }),
    });
    if (!res.ok) {
      throw new Error('Network response was not ok');
    }
    const { token } = await res.json();
    this.persist(token);
  }

  async requestPasswordRecovery(username) {
    const res = await fetch(`${apiUrl}/api/user/password/recovery`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username }),
    });
    if (!res.ok) {
      throw new Error('Network response was not ok');
    }
  }

  parseJwt(token) {
    if (!token) {
      return;
    }
    const base64Url = token.split('.')[1] ?? '';
    const base64 = base64Url.replace('-', '+').replace('_', '/');
    return JSON.parse(window.atob(base64));
  }

  async validate2FACode(code, username) {
    const res = await fetch(`${apiUrl}/api/auth/code`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ code, username }),
    });
    if (!res.ok) {
      throw new Error('Network response was not ok');
    }
  }
}