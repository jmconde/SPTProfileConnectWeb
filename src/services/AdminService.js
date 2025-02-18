// @ts-nocheck
import { NetworkService } from './NetworkService';
import { ServiceBase } from './ServiceBase';

export class AdminService extends ServiceBase{
  networkService = new NetworkService();

  async updateUser(user) {
    return await this.networkService.patch({
      uri: `/api/admin/user/${user._id}`,
      body: user
    });
  }

  async deleteUser(id) {
    return await this.networkService.delete({
      uri: `/api/admin/user/${id}`
    });
  }

  async listUsers(params) {
    return await this.networkService.get({
      uri: '/api/admin/users',
      params
    });
  }

  async createUser(user) {
    return await this.networkService.post({
      uri: '/api/admin/user',
      body: user
    });
  } 

  async getUser(id) {
    return await this.networkService.get({
      uri: `/api/admin/user/${id}`
    });
  }

  async listNamespaces() {
    return (await this.networkService.get({
      uri: '/api/admin/namespaces',
    })).sort((a, b) => a.name.localeCompare(b.name));
  }

  async getNamespace(id) {
    return await this.networkService.get({
      uri: `/api/admin/namespace/${id}`,
    });
  }

  async createNamespace(namespace) {
    const { name, description } = namespace;
    const body = {
      ...namespace,
      name: name.trim(),
      description: description.trim(),
    };
    return await this.networkService.post({
      uri: '/api/admin/namespace',
      body,
    });
  }

  async updateNamespace(namespace) {
    const { _id, name, description } = namespace;
    const body = {
      ...namespace,
      name: name.trim(),
      description: description.trim(),
    };
    return await this.networkService.patch({
      uri: `/api/admin/namespace/${_id}`,
      body,
    });
  }

  async updateUserNamespace(userId, namespaceId) {
    return await this.networkService.patch({
      uri: `/api/admin/user/${userId}/namespace/${namespaceId}/change`,
    });
  }
  
  async resetUserNamespace(userId) {
    return await this.networkService.patch({
      uri: `/api/admin/user/${userId}/namespace/reset`,
    });
  }

  async deleteNamespace(id) {
    return await this.networkService.delete({
      uri: `/api/admin/namespace/${id}`,
    });
  }

  async createNamespaceApiKey(id, description) {
    return await this.networkService.post({
      uri: `/api/admin/namespace/${id}/token`,
      body:{
        description,
        type: 'namespace'
      },
    });
  }

  async listNamespaceApiKeys(namespaceId) {
    return await this.networkService.get({
      uri: `/api/admin/namespace/${namespaceId}/tokens`,
    });
  }

  async deleteNamespaceApiKey(namespaceId, token) {
    return await this.networkService.delete({
      uri: `/api/admin/namespace/${namespaceId}/token/${token._id}`,
    });
  }

  getNamespaceUsersChanges(originalUsers, selectedUsers) {
    const added = selectedUsers.filter((su) => !originalUsers.find((ou) => ou._id === su._id)).map((u) => ({ id: u._id, added: true }));
    const removed = originalUsers.filter((ou) => !selectedUsers.find((su) => su._id === ou._id)).map((u) => ({ id: u._id, removed: true }));
    return [...added, ...removed];
  }
}