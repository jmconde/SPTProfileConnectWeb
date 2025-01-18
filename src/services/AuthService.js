import dayjs from 'dayjs';
import { get } from 'svelte/store';
import { jwtStore, refreshTokenStore } from '../stores/jwtStore';
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

  async logout() {
    await this.networkService.post({
      uri: '/api/logout',
      auth: NetworkService.AUTH_JWT
    });
    this.removePersistence();
  }

  async login(username, password) {
    const res = await this.networkService.post({
      uri: '/api/login',
      body: JSON.stringify({ username, password }),
      auth: NetworkService.AUTH_NONE,
    });

    const { token, refreshToken } = await res;
    this.persist(token);
    this.persistRefreshToken(refreshToken);

    return token;
  }

  fromStorage() {
    const token = localStorage.getItem('token');
    const xrt = localStorage.getItem('xrt');
    if (token && xrt) {
      try {
        const parsed = this.parseJwt(token);
        const parsedXrt = this.parseJwt(xrt);
        const isAfter = dayjs().isAfter(parsedXrt.exp * 1000);
        if (isAfter) {
          this.removePersistence();
          return false;
        }
        this.persist(token);
        this.persistRefreshToken(xrt);
        return true;
      } catch (error) {
        console.log('error :>> ', error);
        this.removePersistence();
        return false;
      }
    } else {
      this.removePersistence();
      return false;
    }
  }

  persist(token) {
    const { user: loggedUser} = this.parseJwt(token);
    jwtStore.set(token);
    userStore.set(loggedUser);
    localStorage.setItem('token', token);
  }

  persistRefreshToken(token) {
    refreshTokenStore.set(token);
    localStorage.setItem('xrt', token);
  }


  removePersistence() {
    console.log('removePersistence');
    jwtStore.set('');
    userStore.set(null);
    localStorage.removeItem('token');
    refreshTokenStore.set('');
    localStorage.removeItem('xrt');
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
    const parsed = JSON.parse(window.atob(base64));
    return parsed;
  }

  async validate2FACode(code, username) {
    await this.networkService.post({
      uri: '/api/auth/code',
      body: JSON.stringify({ code, username }),
    });
  }
}