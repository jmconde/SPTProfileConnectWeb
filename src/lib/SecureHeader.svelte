<script>
  import { Router, Link, navigate, link } from 'svelte-routing';
  
  import ThemeSwitcher from './ThemeSwitcher.svelte';
  import { AuthService } from "@services/AuthService";
  import { userStore } from '../stores/userStore';
  import { _ } from '@services/i18n';
  import { websocketState } from '../stores/websocket';
  import { NavigationRoutes, profilePlaceholderColors } from '@utils/constants.js';
  import brandDarkMode from './assets/images/brand/quests_brand_light.png';
  import { getColorForText, isDarkColor } from '@utils/helper.js';
    
  // @ts-ignore
  const version = APP_VERSION;
  const isBetaMode = import.meta.env.VITE_BETA_MODE === 'true';
  const auth = new AuthService();


  $: isAuthenticated = $userStore !== null && $userStore !== undefined && $userStore !== '';
  $: roles = $userStore?.roles ?? [];
  $: isAdmin = roles.includes('admin');
  $: username = $userStore?.username ?? '';
  $: profileImage = $userStore?.profileImage ?? '';
  $: backgroundColor = getColorForText(username, profilePlaceholderColors);
  $: textColor = isDarkColor(backgroundColor) ? '#FFF' : '#121212';

  async function logout() {
    await auth.logout();
    navigate(NavigationRoutes.LANDING);         
  }

</script>

<style lang="scss">
  
  .nav-dropdown-footer{
    padding: var(--bs-dropdown-item-padding-y) var(--bs-dropdown-item-padding-x);
  }
  
  .version {
    font-size: x-small;
    opacity: 0.3;
    margin-left: 4px;
    color: white;
    text-decoration: none;
    [data-bs-theme="dark"] & {
      opacity: 0.5;
    }
  }
  .brand-icon {
    height: 30px;
    caret-color: transparent;
  }
  

  .profile-image {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    object-fit: cover;
  }

  .profile-placeholder {
    width: 34px;
    height: 34px;
    border-radius: 50%;
    background-color: #009FB7;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 400;
    font-size: 115%;
    text-transform: uppercase;
  }

  .no-arrow::after {
    display: none;
  }  
</style>

<Router>
<nav class="navbar navbar-expand-lg bg-dark" data-bs-theme="dark">
  <div class="container-fluid">
        
    <a class="navbar-brand" href={NavigationRoutes.SECURE_DASHBOARD_HOME} use:link>
      <img src={brandDarkMode} alt="Quests" class="brand-icon img-fluid" />
       <span class="conn-status" class:connected={$websocketState.connected}></span></a>
    
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        
        
        
        
        {#if isAuthenticated}
        <li class="nav-item">
          <a class="nav-link" use:link href={NavigationRoutes.SECURE_DASHBOARD_HOME}>Quests</a>
        </li>
          <li class="nav-item">
            <a class="nav-link" use:link href={NavigationRoutes.SECURE_DASHBOARD_CHARTS}>Charts</a>
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
        {#if isBetaMode}<!-- -->{/if}
      </ul>
      
      
      <div class="nav-item dropdown">
        <a class="nav-link dropdown-toggle no-arrow" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
          {#if profileImage}
            <img src={profileImage} alt="Profile" class="profile-image" />
          {:else}
            <div class="profile-placeholder" style="background-color: {backgroundColor}; color: {textColor}">{username.charAt(0)}</div>
          {/if}
        </a>
        {#if isAuthenticated}
          <ul class="dropdown-menu dropdown-menu-end">
            <li>
              <a class="dropdown-item" href={NavigationRoutes.SECURE_DASHBOARD_USER_PROFILE} use:link>{$_('header.profile', { values: { username }})}</a>
            </li>
            {#if isAdmin}
              <li>
                <Link class="dropdown-item" to={NavigationRoutes.SECURE_DASHBOARD_ADMIN}>{$_('header.adminPanel')}</Link>
              </li>
            {/if}
            <li>
              <button class="dropdown-item" on:click={logout}>Logout</button>
            </li>
            <li>
              
            </li>
            <li><hr class="dropdown-divider"></li>
            
           
            
              
          
            <li>
              <div class="nav-dropdown-footer d-flex justify-content-between">
                <a href={NavigationRoutes.CHANGELOG} use:link>
                  <span class="version">v{version}</span>
                </a>
                <ThemeSwitcher />
              </div>
            </li>
          </ul>
        {/if}
      </div>
    </div>
  </div>
</nav>
</Router>
