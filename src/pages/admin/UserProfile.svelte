<script>
  import "bootstrap";

  import ApiKeys from "@lib/ApiKeys.svelte";
  import Collpase from "@lib/Collpase.svelte";
  import NewPassword from "@lib/NewPassword.svelte";
  import SecurePage from "@lib/SecurePage.svelte";
  import { t } from "@services/i18n";
</script>

<SecurePage roles={["user"]}>
  <div class="container">
    <h1 class="mt-5">{$t("title.userProfile")}</h1>

    <div class="mt-5">
      <Collpase title={$t("title.apiKeys")} collapsed={false}>
        <ApiKeys />
      </Collpase>
    </div>
    <div class="mt-5">
      <Collpase title={$t("title.passwordChange")} collapsed={true}>
        <NewPassword />
      </Collpase>
    </div>
  </div>
</SecurePage>
