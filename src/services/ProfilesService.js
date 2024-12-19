import { jwtStore } from "../stores/jwtStore";
import { get } from "svelte/store";
import { AuthService } from "@services/AuthService";
import { NetworkService } from "./NetworkService.js";
import { HttpResponseError } from "@utils/HttpResponseError.js";

const apiUrl = import.meta.env.VITE_API_URL;
const API_KEY = import.meta.env.VITE_API_KEY;

export class ProfilesService {
  apiKey = get(jwtStore);
  authService = new AuthService();
  networkService = new NetworkService();

  constructor() {
    jwtStore.subscribe((apiKey) => {
      this.apiKey = apiKey;
    });
  }

  async fetchProfiles() {
    const profiles = await this.networkService.get({
      uri: "/api/profiles",
      auth: NetworkService.AUTH_APIKEY,
    });

    return profiles.sort((a, b) =>
      a.data.nickName.localeCompare(b.data.nickName)
    );
  }

  async fetchQuestsCount() {
    return await this.networkService.get({
      uri: "/api/quests/count",
      auth: NetworkService.AUTH_APIKEY,
    });
  }

  async fecthInRaid() {
    const response = await this.networkService.get({
      uri: "/api/inraid",
      auth: NetworkService.AUTH_APIKEY,
    });

    if (response.length > 0) {
      for (const raid of response) {
        const { users } = raid;
        if (users.some((user) => user.nickName.toLowerCase() === "pipecalv")) {
          raid.team = "Fides";
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
}
