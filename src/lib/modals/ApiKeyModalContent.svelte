<script>
  import { modalData } from '../../utilities/modal';
  import { t } from '../../services/i18n';
</script>

<div>
  <label for="description" class="form-label">{$t('userTokens.modal.description')}</label>
  <input  type="text" class="form-control" id="description" name="description" bind:value={$modalData.message} />
</div>