<script>
  // @ts-ignore
  import { LottiePlayer } from '@lottiefiles/svelte-lottie-player';
  import { t } from '@services/i18n';

  export let loading = true;
  export let hasText = false;
  export let text = $t('common.loading');
</script>

<style lang="scss">
  .container {
    display: inline-block;

    &-animation {
      margin: 0 auto;      
      width: 100px;
      height: 70px;
    }

    &-text {
      margin: 0 auto;
      text-align: center;
      text-transform: uppercase;
      font-weight: bolder;
      font-size: 70%;
    }
  }
</style>

{#if loading}
  <div class="container mb-4">
    <div class="container-animation">
      <LottiePlayer
        src='lottie-loading.json'
        autoplay={true}
        loop={true}
        controls={false}
        renderer='svg'
        background='transparent'
        height={50}
        width={100} />
    </div>
    {#if hasText}
      <div class="container-text mt-2">{text}</div>
    {/if}
  </div>
{/if}