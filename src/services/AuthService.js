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
    const res = await this.networkService.post({
      uri: '/api/login',
      body: JSON.stringify({ username, password }),
      auth: NetworkService.AUTH_NONE,
    });

    const { token } = await res;
    this.persist(token);
    return token;
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
    const res = await this.networkService.post({
      uri: '/api/user/password/recovery/change',
      body: JSON.stringify({ username, code, newPassword }),
    });
    const { token } = await res;
    this.persist(token);
  }

  async requestPasswordRecovery(username) {
    await this.networkService.post({
      uri: '/api/user/password/recovery',
      body: JSON.stringify({ username }),
    });
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
    await this.networkService.post({
      uri: '/api/auth/code',
      body: JSON.stringify({ code, username }),
    });
  }
}