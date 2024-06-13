<script>
  import { modalData } from '../../utilities/modal';
</script>

<div class="form-floating">
  <input  type="text" class="form-control" id="description" name="description" bind:value={$modalData.message} placeholder="API Key Description" />
  <label for="description" class="form-label">API Key Description (optional)</label>
</div>