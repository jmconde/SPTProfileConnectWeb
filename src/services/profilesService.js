import { apiKeyStore } from "../stores/apiKeyStore";
import { get } from 'svelte/store';
import AuthService from './authService.js';
import { insertRaidTotalHealth } from "../lib/helpers";

const apiUrl = import.meta.env.VITE_API_URL;
const API_KEY = import.meta.env.VITE_API_KEY;

class ProfilesService {
  apiKey = get(apiKeyStore);
  authService = new AuthService();

  constructor() {
    apiKeyStore.subscribe(apiKey => {
      this.apiKey = apiKey;
    });
  }

  async fetchProfiles() {
    try {
      const res = await fetch(`${apiUrl}/api/profiles`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'X-Api-Key': API_KEY
        }
      });
      if (!res.ok) {
        throw new Error('Network response was not ok');
      }
      const profiles = await res.json();
      return profiles.sort((a, b) => a.nickName.localeCompare(b.nickName));
    } catch (error) {
      console.error(error);
    }
  }

  async fetchQuestsCount() {
    try {
      const res = await fetch(`${apiUrl}/api/quests/count`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'X-Api-Key': API_KEY
        }
      });
      if (!res.ok) {
        throw new Error('Network response was not ok');
      }
      const { questsCount } = await res.json();
      return questsCount;
    } catch (error) {
      console.error(error);
    }
  }

  async fecthInRaid() {
    try {
      const res = await fetch(`${apiUrl}/api/inraid`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'X-Api-Key': API_KEY
        }
      });
      if (!res.ok) {
        throw new Error('Network response was not ok');
      }
      const { inRaid } = await res.json();
      // insertRaidTotalHealth(inRaid);
      return inRaid;
    } catch (error) {
      console.error(error);
    }
  }

  async fetchHideoutInfo() {
    try {
      const res = await fetch(`${apiUrl}/api/profiles/hideout`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'X-Api-Key': API_KEY
        }
      });
      if (!res.ok) {
        throw new Error('Network response was not ok');
      }
      const hideoutData = await res.json();
      return hideoutData;
    } catch (error) {
      console.error(error);
    }
  }
}

export default ProfilesService;