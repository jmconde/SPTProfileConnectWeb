<script>
  import { Container } from "@sveltestrap/sveltestrap";
  import NewPassword from "../lib/NewPassword.svelte";
  import UserTokens from "../lib/UserTokens.svelte";
  import Collpase from "../lib/Collpase.svelte";
  import 'bootstrap';

</script>

<Container>
  <h1>User profile!</h1>

  <div class="mt-5">
    <Collpase text="Api Tokens" collapsed={false}>
      <UserTokens />
    </Collpase>
  </div>
  <div class="mt-5">
    <Collpase text="Password Change" collapsed={false}>
      <NewPassword />
    </Collpase>
  </div>

</Container>
