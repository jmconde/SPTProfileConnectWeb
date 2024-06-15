<script>
  import { Button, Container } from "@sveltestrap/sveltestrap";
  import { onMount } from "svelte";
  import { t } from "../services/i18n.js";
  import { copy } from 'svelte-copy';

  import Loading from "./Loading.svelte";

  import X from "svelte-bootstrap-icons/lib/X.svelte";
  import Copy from "svelte-bootstrap-icons/lib/Copy.svelte";
  import { UserService } from "../services/UserService.js";
  import { createToast } from "../stores/toasts.js";
  import { confirmModal, modalData } from "../utilities/modal.js";
  import { AdminService } from "../services/AdminService.js";
  import ApiKeyModalContent from "./modals/ApiKeyModalContent.svelte";
  import { mask } from "../utilities/helper.js";
  

  export let namespaceId = '';

  const userService = new UserService();
  const adminService = new AdminService();
  
  let apiKeys = [];
  let loading = true;

  modalData.set({
    message: '',
  });

  async function getData() {
    if (namespaceId === undefined || namespaceId === null) {
      apiKeys = await userService.listApiKeys();
    } else if (typeof namespaceId === 'string' && namespaceId.length > 0) {
      apiKeys = await adminService.listNamespaceApiKeys(namespaceId);
    }
    loading = false;
  }

  async function generateApiKey() {
    try {
      const confirmation = await confirmModal({
        // @ts-ignore
        title: 'userTokens.modal.creation.title',
        // message: 'userTokens.modal.creation.message',
        customContent: ApiKeyModalContent,
        customData: modalData,
        confirmText: 'userTokens.modal.creation.confirm',
        cancelText: 'userTokens.modal.creation.cancel',
      });
      if (confirmation) {
        if (!namespaceId) {
          await userService.generateApiKey($modalData.message);
        } else {
          await adminService.createNamespaceApiKey(namespaceId, $modalData.message);
        }
        createToast('Api key generated successfuly', 'success');
      }
      modalData.set({
      message: '',
    });
      getData();
    } catch (error) {
      console.log('error :>> ', error);
      createToast('Error generating api key', 'danger');
    }
  }

  async function deleteToken(key) {
    try {
      const confirmation = await confirmModal({
        // @ts-ignore
        title: 'userTokens.modal.deletion.title',
        message: 'userTokens.modal.deletion.message',
        confirmText: 'userTokens.modal.deletion.confirm',
        cancelText: 'userTokens.modal.deletion.cancel',
        confirmVariant: 'danger',
      });
      if (confirmation) {
        if (!namespaceId) {          
          await userService.deleteApiKey(key);
        } else {
          await adminService.deleteNamespaceApiKey(namespaceId, key);
        }
        getData();
        createToast('Api key deleted successfuly', 'success');
      }
    } catch (error) {
      console.log('error :>> ', error);
      createToast('Error deleting api key', 'danger');
    }   
  }

  onMount(() => {
    getData();
  });
</script>

<Container class="mt-2">
  <div class="mb-4">
    {#if loading}
      <Loading />
    {:else if apiKeys.length === 0}
      <div class="alert alert-primary" role="alert">
        {$t("userTokens.noApiKeysFound")}
      </div>
    {:else}
      <div class="list-group">
        {#each apiKeys as key}
          <div class="list-group-item">
            <div class="token">
              <div class="text-truncate">{mask(key.token)} <button class="btn btn-sm btn-copy" use:copy={key.token}><Copy width={12} /></button></div>
              <div class="text-truncate">{#if key.description}{key.description}{/if}</div>
              <div class="button">
                <Button class="button" size="sm" color="danger" on:click={() => deleteToken(key)}
                  ><X /></Button
                >
              </div>
            </div>
          </div>
        {/each}
      </div>
    {/if}
  </div>

  <Button color="primary" on:click={generateApiKey}>{$t("userTokens.generate")}</Button
  >
</Container>

<style>
  .token {
    display: grid;
    grid-template-columns: 40% calc(60% - 30px) 30px;
    width: 100%;
    justify-content: start;
    align-items: center;
  }
  .btn-copy {
    color: var(--bs-gray-500);
  }
</style>
