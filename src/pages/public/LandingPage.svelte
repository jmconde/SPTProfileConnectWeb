<script>
  import { Router, link, navigate } from "svelte-routing";
  import { AuthService } from "@services/AuthService";
  import { t } from "@services/i18n";
  import { createToast } from "@stores/toasts";
  import { NavigationRoutes } from "../../utilities/constants.js";
  import ThemeSwitcher from "@lib/ThemeSwitcher.svelte";
  import { onMount } from "svelte";

  let username = "";
  let password = "";
  const auth = new AuthService();

  import brand from '../../lib/assets/images/brand/quests_brand_light.png';

  onMount(() => {
    const isLoggedIn = auth.fromStorage();

    if (isLoggedIn) {
      navigate(NavigationRoutes.SECURE_DASHBOARD_HOME, { replace: true });
    }
  });

  async function doLogin() {
    try {
      await auth.login(username, password);
      createToast("Login successful", "success");
      navigate(NavigationRoutes.SECURE_DASHBOARD_HOME);
      // window.location.reload();
    } catch (error) {
      console.error(error);
      createToast("Error logging in", "danger");
    }
  }

  function gotoPasswordRecovery(e) {
    e.preventDefault();
    navigate(NavigationRoutes.FORGOTTEN_PASSWORD);
  }
  // @ts-ignore
  const version = APP_VERSION;
</script>

<div class="container">
  <div class="row justify-content-center">
    <div class="col-md-6 login-box">
      <div class="image-container">
        <img src={brand} alt="Quests" class="img-fluid mt-5 mb-5" />
      </div>
      <form
        class="p-4 border"
        on:submit|preventDefault|stopPropagation={doLogin}
      >
        <div class="container">
          <div class="mb-3">
            <label for="username" class="form-label"
              >{$t("common.username")}</label
            >
            <input
              bind:value={username}
              type="text"
              class="form-control"
              id="username"
              name="username"
            />
          </div>
          <div class="mb-3">
            <label for="password" class="form-label"
              >{$t("label.password")}</label
            >
            <input
              bind:value={password}
              type="password"
              class="form-control"
              id="password"
              name="password"
            />
          </div>
          <button
            type="submit"
            class="btn btn-primary"
            >{$t("button.login")}</button
          >
          
          <Router>
            <button
              tabindex="-1"
              type="button"
              class="button-link"
              on:click|preventDefault|stopPropagation={gotoPasswordRecovery}
              >{$t("link.forgottenPassword")}</button
            >
          </Router>
        </div>
      </form>
      <div>
        <ThemeSwitcher />
        <a class="button-link version" href="/changelog" use:link>
          <span class="version">v{version}</span>
        </a>
      </div>
    </div>
  </div>
</div>

<style>
  .version {
    font-size: 80%;
  }
  .image-container {
    caret-color: transparent; 
    position: relative;
    display: inline-block; /* or block, depending on your layout */
    overflow: hidden; /* Optional, to clip any overflow from the pseudo-element */
  }
/* 
.image-container img {
  display: block; 
  width: 100%; 
  height: auto;
}

.image-container::before {
  content: "";
  position: absolute;
  width: 100%;
  height: 100%;
  background: linear-gradient(to right, 
      rgba(0, 0, 0, 1) 0%, 
      rgba(0, 0, 0, 0) 50%, 
      rgba(0, 0, 0, 1) 100%
  );
  top: 0;
  left: 0;
  pointer-events: none; 
} */
</style>
