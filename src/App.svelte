<script>
  import { onMount } from "svelte";
  import { Router, Route, navigate } from "svelte-routing";

  import ConfirmationModal from "@lib/modals/ConfirmationModal.svelte";
  import ToastManager from "@lib/ToastManager.svelte";

  import LandingPage from "@pages/public/LandingPage.svelte";
  import NotFound from "@pages/public/NotFound.svelte";
  
  import { AuthService } from "@services/AuthService";
  import { setupI18n } from '@services/i18n.js';
  import { WebSocketService } from "@services/WebSocketService.js";
  import SnowFlake from "@lib/SnowFlake.svelte";

  import "bootstrap/dist/css/bootstrap.min.css";
  import SecureDashboardLayout from "@pages/layouts/SecureDashboardLayout.svelte";
  import UnsecureDashboardLayout from "@pages/layouts/UnsecureDashboardLayout.svelte";
  import { NavigationRoutes } from "@utils/constants.js";
  import { isInRoutes, isSecurePath } from "@utils/helper.js";
  import CustomPopover from "@lib/CustomPopover.svelte";
  import TodoListViewer from "@lib/TodoListViewer.svelte";
    
  setupI18n({ withLocale: 'en' });

  new WebSocketService(import.meta.env.VITE_WS_URL);
  const hasSnowEffect = import.meta.env.VITE_SNOWFLAKES === "true";

  export let url = "";

  onMount(() => {
    const auth = new AuthService();
    const isLoggedIn = auth.fromStorage();
    if (isLoggedIn) {
      if (isInRoutes(location.pathname) && isSecurePath(location.pathname)) {
        navigate(location.pathname, { replace: true });
      } else {
        navigate(NavigationRoutes.SECURE_DASHBOARD_HOME, { replace: true });
      }
    } else {
      navigate(NavigationRoutes.LANDING, { replace: true });
    }
  });
</script>

<Router {url}>
  <Route path="/secure/*" component={SecureDashboardLayout}></Route>
  <Route path="/*" component={UnsecureDashboardLayout}></Route>
  <Route path="/" component={LandingPage}></Route>
  <Route><NotFound /></Route>
</Router>

<TodoListViewer />
<ConfirmationModal />
<ToastManager />
<SnowFlake active={hasSnowEffect} />
