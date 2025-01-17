<!-- PublicLayout.svelte -->
<script>
  import Admin from "@pages/admin/Admin.svelte";
  import AdminUsers from "@pages/admin/AdminUsers.svelte";
  import AdminNamespaces from "@pages/admin/AdminNamespaces.svelte";
  import AdminNamespace from "@pages/admin/AdminNamespace.svelte";
  import AdminUser from "@pages/admin/AdminUser.svelte";
  import MainLayout from "@pages/layouts/MainLayout.svelte";
  // import PublicUserProfile from "@pages/public/PublicUserProfile.svelte";

  import { navigate, Route, Router } from 'svelte-routing';
  import UserProfile from '@pages/admin/UserProfile.svelte';
  import SecureHeader from '@lib/SecureHeader.svelte';
  import { onMount } from "svelte";
  import { AuthService } from "@services/AuthService.js";
  import { NavigationRoutes } from "@utils/constants.js";
  
  const auth = new AuthService();

  onMount(() => {
    const isLoggedIn = auth.fromStorage();
    if (!isLoggedIn) {
      navigate(NavigationRoutes.LANDING, { replace: true });
    }
  });
</script>

<SecureHeader />
<main>
  <div class="container-fluid mt-2">
    <div class="row">
      <div class="col">
        <Router>          
          <Route path="/admin/users"><AdminUsers /></Route>
          <Route path="/admin/user/:id" let:params><AdminUser id={params.id} /></Route>
          <Route path="/admin/user"><AdminUser /></Route>
          <Route path="/admin/namespaces"><AdminNamespaces /></Route>
          <Route path="/admin/namespace/:id" let:params><AdminNamespace id={params.id} /></Route>
          <Route path="/admin/namespace"><AdminNamespace /></Route>
          <Route path="/admin"><Admin /></Route>
          <!-- <Route path="/user/:id" let:params><PublicUserProfile id={params.id} /></Route> -->
          <Route path="/profile"><UserProfile /></Route>
          <Route path="/*" component={MainLayout}></Route>
        </Router>
      </div>
    </div>
  </div>
</main>

<style></style>