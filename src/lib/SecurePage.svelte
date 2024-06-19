<script>
  import { onMount } from "svelte";
  import { navigate } from "svelte-routing";
  import { userStore } from "../stores/userStore";
  import { get } from "svelte/store";
  import { AuthService } from "@services/AuthService";

  export let roles = [];

  
  onMount(() => {
    const authService = new AuthService();

    const checkAuthorized = () => {
      if (!authService.hasRoles(roles)) {
        console.warn('Not authorized!');
        navigate('/');
      }
    }
    
    checkAuthorized();

    // userStore.subscribe(checkAuthorized);
  });
</script>

<slot />