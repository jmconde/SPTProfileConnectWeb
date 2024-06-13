<script>
  import { Router, Link, navigate, link } from "svelte-routing";
  import { Nav, NavItem, Navbar, NavbarBrand } from "@sveltestrap/sveltestrap";
  import LoginModal from "./modals/LoginModal.svelte";
  import AuthService from "../services/authService";
  import { userStore } from "../stores/userStore";
  import { _ } from "svelte-i18n";
  import { websocketState } from '../stores/websocket';
  
  // @ts-ignore
  const version = APP_VERSION;
  let isLoginModalOpen = false;
  const auth = new AuthService();

  $: isAuthenticated = $userStore !== null && $userStore !== undefined && $userStore !== "";
  $: roles = $userStore?.roles ?? [];
  $: isAdmin = roles.includes("admin");
  $: username = $userStore?.username ?? "";

  function logout() {
    auth.logout();
    navigate("/");
  }

</script>

<style>
  .version {
    color: #ababab;
    font-size: x-small;
    opacity: 0.3;
    margin-left: 12px
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
  }
  .button-link:hover {
    text-decoration: underline;
  } 
</style>


<Navbar color="dark" theme="dark">
  <NavbarBrand>{$_('header.brand')}<span class="version">v{version}</span><div class="conn-status" class:connected={$websocketState.connected}></div></NavbarBrand>
  <Nav>
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
</Navbar>

<LoginModal isOpen={isLoginModalOpen} on:close={() => isLoginModalOpen = false} />