import { get } from "svelte/store";
import { jwtStore } from "../stores/jwtStore";

const apiUrl = import.meta.env.VITE_API_URL;

export class AdminService {
  async createUser(user) {
    const token = get(jwtStore);
    const res = await fetch(`${apiUrl}/api/user`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${token}`
      },
      body: JSON.stringify(user)
    });
    if (!res.ok) {
      throw new Error('Network response was not ok');
    }
  }
}