// @ts-nocheck
import { websocketState } from '../stores/websocket';
import { GameNotificationService } from './GameNotificationService';

export class WebSocketService {
  gameNotifyer = new GameNotificationService();
  constructor(url) {
    if (!WebSocketService.instance) {
      WebSocketService.instance = this;
      this.reconnectAttempts = 0;
      this.maxReconnectAttempts = 10;
      this.reconnectDelay = 2000; // 2 
      this.url = url;
      this.connect();
    }  

    return WebSocketService.instance;
  }

  connect() {
    const { update } = websocketState;  
    this.socket = new WebSocket(this.url);

    this.socket.addEventListener('open', () => {
      update(state => ({ ...state, connected: true, error: null }));
      this.reconnectAttempts = 0; // Reset reconnect attempts on successful connection
    });

    this.socket.addEventListener('message', event => {
      this.gameNotifyer.notify(event.data);
      update(state => ({ ...state, messages: [...state.messages, event.data] }));
    });

    this.socket.addEventListener('close', () => {
      update(state => ({ ...state, connected: false }));
      this.attemptReconnect();
    });

    this.socket.addEventListener('error', (err) => {
      console.log('Web Socket Error :>> ', err);
      update(state => ({ ...state, error: err.message }));
      socket.close(); // Close the connection on error
    });
  }

  attemptReconnect() {
    if (this.reconnectAttempts < this.maxReconnectAttempts) {
      this.reconnectAttempts += 1;
      setTimeout(() => this.connect(), this.reconnectDelay);
    } else {
      update(state => ({ ...state, error: 'Max reconnect attempts reached.' }));
    }
  }

  send(message) {
    if (this.socket.readyState === WebSocket.OPEN) {
      this.socket.send(message);
    }
  }

  close() {
    this.socket.close();
  }
}