<script>
  import { LottiePlayer } from '@lottiefiles/svelte-lottie-player';

  export let loading = true;
  export let hasText = false;
  export let text = 'Loading...';
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
        src='https://lottie.host/1608bb0a-be0b-47b8-b197-7a4587b086ec/pf641p2RTg.json'
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