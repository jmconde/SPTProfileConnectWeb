<!-- PublicLayout.svelte -->
<script>
  import { Route, Router } from 'svelte-routing';
  import ForgottenPassword from "@pages/public/ForgottenPassword.svelte";
  import Changelog from "@pages/public/Changelog.svelte";
  import Header from '@lib/Header.svelte';
</script>

<Header />
<main>
  <div class="container-fluid mt-2">
    <div class="row">
      <div class="col">
        <Router>          
          <Route path="/forgotten-password"><ForgottenPassword /></Route>
          <Route path="/changelog"><Changelog /></Route>
        </Router>
      </div>
    </div>
  </div>
</main>

<style></style>