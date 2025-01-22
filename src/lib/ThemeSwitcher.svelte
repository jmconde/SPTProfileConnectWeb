<script>
  import { theme, toggleTheme } from '../stores/themeSwitcher.js';
  import MoonFill from "svelte-bootstrap-icons/lib/MoonFill.svelte";
  import SunFill from "svelte-bootstrap-icons/lib/SunFill.svelte";

  let size = 14;
  theme.subscribe((value) => {
    document.body.setAttribute('data-bs-theme', value);
    localStorage.setItem('theme', value);
  });  
</script>

<button class="button-link" on:click={toggleTheme} >
  {#if $theme === 'dark'}
    <SunFill height={size} />
  {:else}
    <MoonFill height={size}/>
  {/if}
</button>