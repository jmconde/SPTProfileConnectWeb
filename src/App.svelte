<script>
  import { onMount } from "svelte";
  import { Router, Route } from "svelte-routing";

  import ConfirmationModal from "@lib/modals/ConfirmationModal.svelte";
  import Header from "@lib/Header.svelte";
  import ToastManager from "@lib/ToastManager.svelte";

  import UserProfile from "@pages/admin/UserProfile.svelte";
  import Admin from "@pages/admin/Admin.svelte";
  import AdminUsers from "@pages/admin/AdminUsers.svelte";
  import AdminNamespaces from "@pages/admin/AdminNamespaces.svelte";
  import AdminNamespace from "@pages/admin/AdminNamespace.svelte";
  import AdminUser from "@pages/admin/AdminUser.svelte";
  import Changelog from "@pages/public/Changelog.svelte";
  import Charts from "@pages/public/Charts.svelte";
  import ForgottenPassword from "@pages/public/ForgottenPassword.svelte";
  import Home from "@pages/public/Home.svelte";
  import NotFound from "@pages/public/NotFound.svelte";
  import PublicUserProfile from "@pages/public/PublicUserProfile.svelte";

  import { AuthService } from "@services/AuthService";
  import { LoggingService } from "@services/LoggingService";  
  import { setupI18n } from '@services/i18n.js';
  import { WebSocketService } from "@services/WebSocketService.js";
    
  setupI18n({ withLocale: 'en' });

  new WebSocketService(import.meta.env.VITE_WS_URL);

  export let url = "";

  const logger = new LoggingService().logger;

  onMount(() => {
    const auth = new AuthService();
    auth.fromStorage();
  });
</script>

<Header />
<Router {url}>
  <Route path="/forgotten-password"><ForgottenPassword /></Route>
  <Route path="/profile"><UserProfile /></Route>
  <Route path="/changelog"><Changelog /></Route>
  <Route path="/admin/users"><AdminUsers /></Route>
  <Route path="/admin/user/:id" let:params><AdminUser id={params.id} /></Route>
  <Route path="/admin/user"><AdminUser /></Route>
  <Route path="/admin/namespaces"><AdminNamespaces /></Route>
  <Route path="/admin/namespace/:id" let:params><AdminNamespace id={params.id} /></Route>
  <Route path="/admin/namespace"><AdminNamespace /></Route>
  <Route path="/admin"><Admin /></Route>
  <Route path="/user/:id" let:params><PublicUserProfile id={params.id} /></Route>
  <Route path="/data/charts"><Charts /></Route>
  <Route path="/"><Home /></Route>
  <Route><NotFound /></Route>
</Router>

<ConfirmationModal />
<ToastManager />