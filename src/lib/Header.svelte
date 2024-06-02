<script>
  import { Router, Link, navigate, link } from "svelte-routing";
  import { Button, Nav, NavItem, Navbar, NavbarBrand } from "@sveltestrap/sveltestrap";
  import LoginModal from "./modals/LoginModal.svelte";
  import AuthService from "../services/authService";
  import { userStore } from "../stores/userStore";
  
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
  <NavbarBrand>SPT Quests<span class="version">v{version}</span></NavbarBrand>
  <Nav>
    <Router>
      {#if isAuthenticated}
        {#if isAdmin}
          <NavItem>
            <Link class="button-link" to="/admin">Admin</Link>
          </NavItem>
        {/if}
        <NavItem>
          <a class="button-link" href="/profile" use:link>Profile ({username})</a>
        </NavItem>
        <NavItem>
          <button class="button-link" on:click={logout}>Logout</button>
        </NavItem>
      {:else}
        <NavItem>
          <button class="button-link" on:click={() => isLoginModalOpen = true}>Login</button>
        </NavItem>
      {/if}
    </Router>
  </Nav>
</Navbar>

<LoginModal isOpen={isLoginModalOpen} on:close={() => isLoginModalOpen = false} />