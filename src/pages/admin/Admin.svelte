<script>
  // Add your script logic here
  import { navigate } from "svelte-routing";
  import SecurePage from "@lib/SecurePage.svelte";
  import { t } from "@services/i18n";

  function goto(route) {
    navigate(route);
  }
</script>

<style>
  /* Add your component styles here */
</style>

<SecurePage roles={['admin']}>
  <div class="container">
    <h1 class="mt'5">{$t('title.adminPage')}</h1>
    <div class="card mt-4">
      <div class="card-body">
        <button type="button" class="btn btn-primary" on:click={() => goto("/admin/users")}>{$t('common.users')}</button>
        <button type="button" class="btn btn-primary" on:click={() => goto("/admin/namespaces")}>{$t('common.namespaces')}</button>
      </div>
    </div>
  </div>
</SecurePage>

<!-- Add your component markup here -->