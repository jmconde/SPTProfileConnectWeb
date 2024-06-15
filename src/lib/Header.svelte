<script>
  import { Router, Link, navigate, link } from 'svelte-routing';
  import LoginModal from './modals/LoginModal.svelte';
  import ThemeSwitcher from './ThemeSwitcher.svelte';
  import AuthService from '../services/authService';
  import { userStore } from '../stores/userStore';
  import { _ } from '@services/i18n';
  import { websocketState } from '../stores/websocket';
  
  // @ts-ignore
  const version = APP_VERSION;
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
  :global(.button-link) {
    color: white;
    opacity: 0.5;
    padding: 0;
    margin: 0;
    background-color: transparent;
    border: none;
    text-decoration: none;
    margin-left: 16px;
    line-height: 0;
  }
  .button-link:hover {
    text-decoration: underline;
  } 
</style>

<nav class="navbar navbar-expand-lg bg-dark" data-bs-theme="dark">
  <div class="container-fluid">
    <a class="navbar-brand" href="/">{$_('header.brand')}
      <a class="button-link version" href="/changelog">
        <span class="version">v{version}</span>
      </a>
      <div class="conn-status" class:connected={$websocketState.connected}></div>
    </a>
    <ul class="nav">
      <Router>
        {#if isAuthenticated}
          {#if isAdmin}
            <li class="nav-item">
              <Link class="button-link" to="/admin">{$_('header.adminPanel')}</Link>
            </li>
          {/if}
          <li class="nav-item">
            <a class="button-link" href="/profile" use:link>{$_('header.profile', { values: { username }})}</a>
          </li>
          <li class="nav-item">
            <button class="button-link" on:click={logout}>{$_('header.logout')}</button>
          </li>
        {:else}
          <li class="nav-item">
            <button class="button-link" on:click={() => isLoginModalOpen = true}>{$_('header.login')}</button>
          </li>
        {/if}
      </Router>
      <li class="nav-item">
        <ThemeSwitcher />
      </li>
    </ul>
  </div>
</nav>

<!-- <Navbar color="dark" theme="dark">
  <NavbarBrand>{$_('header.brand')}
    <a href="/changelog" use:link><span class="version">v{version}</span></a>
    <div class="conn-status" class:connected={$websocketState.connected}></div></NavbarBrand>
  <Nav>
    <NavItem>
      <ThemeSwitcher />
    </NavItem>
    <Router>
      {#if isAuthenticated}
        {#if isAdmin}
          <NavItem>
            <Link class="button-link" to="/admin">{$_('header.adminPanel')}</Link>
          </NavItem>
        {/if}
        <NavItem>
          <a class="button-link" href="/profile" use:link>{$_('header.profile', { values: { username }})}</a>
        </NavItem>
        <NavItem>
          <button class="button-link" on:click={logout}>{$_('header.logout')}</button>
        </NavItem>
      {:else}
        <NavItem>
          <button class="button-link" on:click={() => isLoginModalOpen = true}>{$_('header.login')}</button>
        </NavItem>
      {/if}
    </Router>
  </Nav>
</Navbar> -->

<LoginModal isOpen={isLoginModalOpen} on:close={() => isLoginModalOpen = false} />