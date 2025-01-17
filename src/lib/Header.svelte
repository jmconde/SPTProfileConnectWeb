<script>
  import { Router, link } from 'svelte-routing';
  import ThemeSwitcher from './ThemeSwitcher.svelte';
  import { _ } from '@services/i18n';
    import { NavigationRoutes } from '@utils/constants.js';
  import brandDarkMode from './assets/images/brand/quests_brand_icon_light.png';
  
  // @ts-ignore
  const version = APP_VERSION;
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
  
  .brand-icon {
    width: 30px;
    height: 30px;
    caret-color: transparent;
  }
</style>

<Router>
<nav class="navbar navbar-expand-lg bg-dark" data-bs-theme="dark">
  <div class="container-fluid">
        
    <a class="navbar-brand" href={NavigationRoutes.LANDING} use:link><img src={brandDarkMode} alt="Quests" class="brand-icon img-fluid" /></a>
    
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0"> </ul>
      <ThemeSwitcher />
      <a class="button-link version" href="/changelog" use:link>
        <span class="version">v{version}</span>
      </a>      
    </div>
  </div>
</nav>
</Router>
