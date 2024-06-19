import { jwtStore } from '../stores/jwtStore';
import { get } from 'svelte/store';
import { AuthService } from "@services/AuthService";

const apiUrl = import.meta.env.VITE_API_URL;
const API_KEY = import.meta.env.VITE_API_KEY;

export class ProfilesService {
  apiKey = get(jwtStore);
  authService = new AuthService();

  constructor() {
    jwtStore.subscribe(apiKey => {
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
      const profiles = (await res.json());

      return profiles.sort((a, b) => a.data.nickName.localeCompare(b.data.nickName));
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
      return await res.json();
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
      const response = await res.json();
      // const { inRaid } = response;
      // insertRaidTotalHealth(inRaid);
      return response;
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