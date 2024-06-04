
<script>
  import { Router, Link, Route } from "svelte-routing";
    import Home from './pages/Home.svelte';
  import Admin from './pages/Admin.svelte';
    import Header from './lib/Header.svelte';
  import UserProfile from "./pages/UserProfile.svelte";
  import AdminCreateUser from "./pages/AdminCreateUser.svelte";
  import NotFound from "./pages/NotFound.svelte";
  import { onMount } from "svelte";
  import AuthService from "./services/authService";
  import AdminUsers from "./pages/AdminUsers.svelte";
  import ForgottenPassword from "./pages/ForgottenPassword.svelte";

  export let url = "";

  onMount(() => {
    const auth = new AuthService();
    auth.fromStorage();
  });
  
</script>

<Header />
<Router {url} >
  <Route path="/forgotten-password"><ForgottenPassword /></Route>
  <Route path="/profile"><UserProfile /></Route>
  <Route path="/admin/create-user"><AdminCreateUser /></Route>
  <Route path="/admin/users"><AdminUsers /></Route>
  <Route path="/admin"><Admin /></Route>
  <Route path="/"><Home /></Route>
  <Route><NotFound /></Route>
</Router>

