<script>
  import { link } from "svelte-routing";
  import { t } from "@services/i18n";

  export let id = "";
</script>

<main>
  <h1>{$t("title.publicProfile")}</h1>
  <!-- <p>{$t('text.publicProfile', { id })}</p> -->
  <p>Public profile for user whrefh id {id}</p>

  <a href="/" use:link>Home</a>
</main>
