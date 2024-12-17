import { createToast } from "../stores/toasts";

export class GameNotificationService {
  notify(message) {
    let toastMessage = "";
    let toastType = "info";

    const { type, action, data } = JSON.parse(message);

    if (type === "raid") {
      const { client, raid } = data;
      const { isDedicatedHosted } = raid;
      const user = client?.nickName ?? "";
      const isSolo = raid.isSolo;
      switch (action) {
        case "new":
          if (!isDedicatedHosted) {
            toastMessage = isSolo
              ? `A new solo raid has been started by ${user}!`
              : `A new raid has been started by ${user}!, and they're bringing ${raid.waitingFor} friends!`;
          } else {
            toastMessage =
              "A new dedicated raid has been started and waiting for players to join!";
          }
          break;
        case "join":
          if (user) {
            toastMessage = `${user} has joined the raid!`;
          }
          break;
        case "leave":
          if (user) {
            toastMessage = isSolo
              ? `${user} has left the solo raid!`
              : `${user} has left the raid!`;
            }
          break;
        default:
          break;
      }
    } if (type === "client") {
      const { profile } = data;
      switch (action) {
        case "start":
          toastMessage = `${profile.nickName} has started the client!`;
          break;
        case "logout":
          toastMessage = `${profile.nickName} has closed the client!`;
          break;
        default:
          break;
      }
    }

    if (toastMessage === "") return;

    createToast(toastMessage, toastType);
  }
}
