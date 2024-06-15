// @ts-nocheck
import { NetworkService } from './NetworkService';

export class UserService {
  networkService = new NetworkService();  

  async generateApiKey(description) {
    return await this.networkService.post({
      uri: '/api/user/token',
      body:{
        description,
        type: 'user'
      },
    });
  }
  
  async deleteApiKey(token) {
    return await this.networkService.delete({
      uri: `/api/user/token/${token._id}`,
    });
  }

  async listApiKeys() {
    return await this.networkService.get({
      uri: '/api/user/tokens/',
    });
  }

  async changePassword(username, oldPassword, newPassword) {
    try {
      return await this.networkService.post({
        uri: '/api/user/password/change',
        body: { username, oldPassword, newPassword },
      });
    } catch (error) {
      console.log('error :>> ', error);
      throw new Error('error-changing-password');
    }
  }
}