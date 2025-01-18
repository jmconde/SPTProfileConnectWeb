import { jwtStore } from "../stores/jwtStore";
import { get } from "svelte/store";
import { AuthService } from "@services/AuthService";
import { NetworkService } from "@services/NetworkService.js";
import { HttpResponseError } from "@utils/errors/HttpResponseError.js";

const apiUrl = import.meta.env.VITE_API_URL;
const API_KEY = import.meta.env.VITE_API_KEY;
const SPECIAL_TEAM = import.meta.env.VITE_SPECIAL_TEAM;

export class ProfilesService {
  apiKey = get(jwtStore);
  authService = new AuthService();
  networkService = new NetworkService(this.authService);

  constructor() {
    jwtStore.subscribe((apiKey) => {
      this.apiKey = apiKey;
    });
  }

  async fetchOnlineData() {
    const data = await this.networkService.get({
      uri: "/api/online",
      auth: NetworkService.AUTH_APIKEY,
    });

    return data;
  }

  async fetchProfiles() {
    const profiles = await this.networkService.get({
      uri: "/api/profiles",
      auth: NetworkService.AUTH_APIKEY,
    });

    return profiles.sort((a, b) =>
      a.nickName.localeCompare(b.nickName)
    );
  }

  async fetchQuestsCount() {
    return await this.networkService.get({
      uri: "/api/quests/count",
      auth: NetworkService.AUTH_APIKEY,
    });
  }

  async fetchUserQuestTasks(userId, questId) {
    return await this.networkService.get({
      uri: `/api/quest/${questId}/user/${userId}/tasks`,
      auth: NetworkService.AUTH_APIKEY,
    });
  }

  async fecthInRaid() {
    const response = await this.networkService.get({
      uri: "/api/inraid",
      auth: NetworkService.AUTH_APIKEY,
    });

    if (SPECIAL_TEAM && response.length > 0) {
      const st = SPECIAL_TEAM.split('|');
      const stTeam = st[0];
      const stUsers = st[1].split(',').map((user) => user.toLowerCase());
      for (const raid of response) {
        const { users } = raid;
        if (users.some((user) => stUsers.includes(user.nickName.toLowerCase()) )) {
          raid.team = stTeam;
        }
      }
    }

    //[{"dedicated":false,"team":"Uniform","status":"started","location":"Customs","users":[{"user":"Tesst"}],"character":"pmc"}]
    // const { inRaid } = response;
    // insertRaidTotalHealth(inRaid);
    return response;
  }

  async fetchHideoutInfo() {
    return await this.networkService.get({
      uri: "/api/profiles/hideout",
      auth: NetworkService.AUTH_APIKEY,
    });
  }

  async fetchLoggedInInfo() {
    return await this.networkService.get({
      uri: "/api/loggedin",
      auth: NetworkService.AUTH_APIKEY,
    });
  }

  getPlayerStatus(loggedInInfo, profiles, raids) {}

  async fetchMoneyData(fromDate, toDate) {
    const from = fromDate.getTime();
    const to = toDate.getTime();
    try {
      return await this.networkService.get({
        uri: `/api/data/money/hourly?from=${from}&to=${to}`,
        auth: NetworkService.AUTH_APIKEY,
      });
    } catch (error) {
      console.error(error);
    }
  }

  async getQuestItemsNeeded(id) {
    try {
      return await this.networkService.get({
        uri: `/api/quest/needed/${id}`,
        auth: NetworkService.AUTH_APIKEY,
      });
    } catch (error) {
      console.error(error);
    }
  }
}
