
<script>
  import { Router, Link, Route } from "svelte-routing";
    import Home from './pages/Home.svelte';
  import Admin from './pages/Admin.svelte';
  import Header from './lib/Header.svelte';
  import UserProfile from "./pages/UserProfile.svelte";

  export let url = "";
  
</script>

<Header />
<Router {url} >
  <Route path="/profile"><UserProfile /></Route>
  <Route path="/admin"><Admin /></Route>
  <Route path="/"><Home /></Route>
</Router>

