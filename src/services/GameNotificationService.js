import { createToast } from '../stores/toasts';

export class GameNotificationService {
  notify(message) {
    let toastMessage = '';
    let toastType = 'info';

    const { type, action , data } = JSON.parse(message);
    const { client, raid } = data;
    const user = client.nickName;
    const isSolo = raid.isSolo;

    if (type === 'raid') {
      switch (action) {
        case 'new':
          toastMessage = isSolo ?
            `A new solo raid has been started by ${user}!` :
            `A new raid has been started by ${user}!, and they're bringing ${raid.waitingFor} friends!`;
          break;
        case 'join':
          toastMessage = `${user} has joined the raid!`;
          break;
        case 'leave':
          toastMessage = isSolo ? 
            `${user} has left the solo raid!` :
            `${user} has left the raid!`;
          break;
        default:
          break;
      }
    }

    if (toastMessage === '') return;

    createToast(toastMessage, toastType);
  }
}