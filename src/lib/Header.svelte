<script>
  import { Router, Link, navigate, link } from 'svelte-routing';
  import LoginModal from './modals/LoginModal.svelte';
  import ThemeSwitcher from './ThemeSwitcher.svelte';
  import { AuthService } from "@services/AuthService";
  import { userStore } from '../stores/userStore';
  import { _ } from '@services/i18n';
  import { websocketState } from '../stores/websocket';
  
  // @ts-ignore
  const version = APP_VERSION;
  const isBetaMode = import.meta.env.VITE_BETA_MODE === 'true';
  let isLoginModalOpen = false;
  const auth = new AuthService();

  $: isAuthenticated = $userStore !== null && $userStore !== undefined && $userStore !== '';
  $: roles = $userStore?.roles ?? [];
  $: isAdmin = roles.includes('admin');
  $: username = $userStore?.username ?? '';

  function logout() {
    auth.logout();
    navigate('/');
  }

</script>

<style lang="scss">
  .version {
    font-size: x-small;
    opacity: 0.3;
    margin-left: 4px;

    [data-bs-theme="dark"] & {
      opacity: 0.5;
    }
  }
</style>

<Router>
<nav class="navbar navbar-expand-lg bg-dark" data-bs-theme="dark">
  <div class="container-fluid">
        
    <a class="navbar-brand" href="/">{$_('header.brand')} <span class="conn-status" class:connected={$websocketState.connected}></span></a>
    
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        
        {#if !isAuthenticated}
        <li class="nav-item">
          <a class="nav-link" use:link href="/data/charts">Charts</a>
        </li>
        <li class="nav-item-dropdown">
          <!-- svelte-ignore a11y-invalid-attribute -->
          <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            {$_('header.resources')}
          </a>
          <ul class="dropdown-menu">
            <li><a href="https://wiki.edopaz.com/Games/Tarkov" target="_blank" class="dropdown-item">{$_('header.wiki')}</a></li>
            <li><hr class="dropdown-divider"></li>
            <li><a class="dropdown-item" href="https://tarkov-market.com/" target="_blank">{$_('header.market')}</a></li>
            <li><a class="dropdown-item" href="https://tarkov.dev" target="_blank">{$_('header.tarkov-dev')}</a></li>
            <li><a class="dropdown-item" href="https://tarkov.dev/loot-tier/" target="_blank">{$_('header.loot')}</a></li>
            <li><a class="dropdown-item" href="https://tarkovtracker.io/" target="_blank">{$_('header.tracker')}</a></li>
          </ul>
        </li> 
        {/if}
        {#if isAuthenticated}
          {#if isAdmin}
            <li class="nav-item">
              <Link class="nav-link" to="/admin">{$_('header.adminPanel')}</Link>
            </li>
          {/if}
        <li class="nav-item">
          <a class="nav-link" href="/profile" use:link>{$_('header.profile', { values: { username }})}</a>
        </li>
        <li class="nav-item">
          <button class="nav-link" on:click={logout}>{$_('header.logout')}</button>
        </li>
        {/if}
        {#if isBetaMode}<!-- -->{/if}
      </ul>
      {#if !isAuthenticated}
        <button class="button-link" on:click={() => isLoginModalOpen = true}>{$_('header.login')}</button>
      {/if}
      <ThemeSwitcher />
      <a class="button-link version" href="/changelog" use:link>
        <span class="version">v{version}</span>
      </a>      
    </div>
  </div>
</nav>
</Router>
<LoginModal isOpen={isLoginModalOpen} on:close={() => isLoginModalOpen = false} />
