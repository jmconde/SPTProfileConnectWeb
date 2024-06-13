<script>
  import { Router, Link, Route } from "svelte-routing";
  import Home from "./pages/Home.svelte";
  import Header from "./lib/Header.svelte";
  import UserProfile from "./pages/profile/UserProfile.svelte";
  import NotFound from "./pages/NotFound.svelte";
  import { onMount } from "svelte";
  import AuthService from "./services/authService";
  import ForgottenPassword from "./pages/ForgottenPassword.svelte";
  
  import Admin from "./pages/admin/Admin.svelte";
  import AdminUsers from "./pages/admin/AdminUsers.svelte";
  import AdminCreateUser from "./pages/admin/AdminCreateUser.svelte";
  import AdminNamespaces from "./pages/admin/AdminNamespaces.svelte";
  import AdminNamespace from "./pages/admin/AdminNamespace.svelte";
  import AdminUser from "./pages/admin/AdminUser.svelte";

  import { setupI18n } from './services/i18n.js';
  import { WebSocketService } from "./services/WebSocketService";
  
  import ToastManager from "./lib/ToastManager.svelte";
  import ConfirmationModal from "./lib/modals/ConfirmationModal.svelte";

  setupI18n({ withLocale: 'en' });

  

  new WebSocketService('ws://localhost:3001/ws');

  export let url = "";

  onMount(() => {
    const auth = new AuthService();
    auth.fromStorage();
  });
</script>

<Header />
<Router {url}>
  <Route path="/forgotten-password"><ForgottenPassword /></Route>
  <Route path="/profile"><UserProfile /></Route>
  <Route path="/admin/create-user"><AdminCreateUser /></Route>
  <Route path="/admin/users"><AdminUsers /></Route>
  <Route path="/admin/user/:id" let:params><AdminUser id={params.id} /></Route>
  <Route path="/admin/user"><AdminUser /></Route>
  <Route path="/admin/namespaces"><AdminNamespaces /></Route>
  <Route path="/admin/namespace/:id" let:params><AdminNamespace id={params.id} /></Route>
  <Route path="/admin/namespace"><AdminNamespace /></Route>
  <Route path="/admin"><Admin /></Route>
  <Route path="/"><Home /></Route>
  <Route><NotFound /></Route>
</Router>

<ConfirmationModal />
<ToastManager />
