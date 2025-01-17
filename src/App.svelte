<script>
  import { onMount } from "svelte";
  import { Router, Route } from "svelte-routing";

  import ConfirmationModal from "@lib/modals/ConfirmationModal.svelte";
  import Header from "@lib/Header.svelte";
  import ToastManager from "@lib/ToastManager.svelte";

  import Changelog from "@pages/public/Changelog.svelte";
  import LandingPage from "@pages/public/LandingPage.svelte";
  import ForgottenPassword from "@pages/public/ForgottenPassword.svelte";
  import NotFound from "@pages/public/NotFound.svelte";
  
  import { AuthService } from "@services/AuthService";
  import { LoggingService } from "@services/LoggingService";  
  import { setupI18n } from '@services/i18n.js';
  import { WebSocketService } from "@services/WebSocketService.js";
  import SnowFlake from "@lib/SnowFlake.svelte";

  import "bootstrap/dist/css/bootstrap.min.css";
  import SecureDashboardLayout from "@pages/layouts/SecureDashboardLayout.svelte";
  import UnsecureDashboardLayout from "@pages/layouts/UnsecureDashboardLayout.svelte";
    
  setupI18n({ withLocale: 'en' });

  new WebSocketService(import.meta.env.VITE_WS_URL);
  const hasSnowEffect = import.meta.env.VITE_SNOWFLAKES === "true";

  export let url = "";

  const logger = new LoggingService().logger;

  onMount(() => {
    const auth = new AuthService();
    auth.fromStorage();
  });
</script>


<Router {url}>
  
  <Route path="/secure/*" component={SecureDashboardLayout}></Route>
  <Route path="/*" component={UnsecureDashboardLayout}></Route>
  <Route path="/" component={LandingPage}></Route>
  <Route><NotFound /></Route>
</Router>

<ConfirmationModal />
<ToastManager />
<SnowFlake active={hasSnowEffect} />