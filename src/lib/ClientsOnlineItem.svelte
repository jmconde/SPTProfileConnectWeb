<script>
  import IconGeneratorOn from 'svelte-bootstrap-icons/lib/LightningChargeFill.svelte';
  import IconSolarPanelOn from 'svelte-bootstrap-icons/lib/SunFill.svelte';
  import IconBitcoinFarm from 'svelte-bootstrap-icons/lib/CurrencyBitcoin.svelte';
  import { configStore } from "@stores/configStore.js";
  import { t } from '@services/i18n';
  
  import usecLogo from "./assets/images/side_usec.png";
  import bearLogo from "./assets/images/side_bear.png";
  import Money from "./Money.svelte";

  export let item;

  let locale;

  configStore.subscribe((value) => {
    locale = value.locale;
  });
  
  const experienceNeeded = new Intl.NumberFormat(locale).format(
    item.nextLevel.totalExperience - item.experience
  );

  function getNextLevelText() {
   return `${experienceNeeded} experience needed to reach level ${item.nextLevel.level}`;
  }
</script>


<div class="client-status-container">
  <div class="conn-status {item.classes}"></div>
  <div class="image-container">
    <img
      src={item.side?.toLowerCase() === "usec" ? usecLogo : bearLogo}
      class="logo-side-small"
      alt="profile.Side.toLowerCase()"
    />
  </div>
  <div>
    <div class="user">
      {item.user}
      {#if item.hasBitcoinFarm}
        <span class="icon-bitcoin-farm" title={ $t("message.bitcoinFarm")}><IconBitcoinFarm  width="12"  /></span>
      {/if}
      {#if item.generatorInfo}
        <span class="icon-generator-on" title={ $t("message.generatorOn", {
          values: {
            fuelLeft: Math.round(item.generatorInfo.generatorFuelLeft),
          },
        })}><IconGeneratorOn  width="10"  /></span>
      {/if}
      {#if item.isSolarPanelOn}
        <span class="icon-generator-on" title={ $t("message.solarPanel")}><IconSolarPanelOn  width="10"  /></span>
      {/if}
      
      <!-- <a href="/user/{item.userId}" use:link class="profile-link">{item.user}</a
      > -->
      {#if item.status}
        <span class="status">{item.status}</span>
      {/if}
    </div>
    <div class="line-two">
      <span class="level" title={getNextLevelText()}>Level {item.level}</span> -
      <span class="money"><Money data={item.money} /></span>
    </div>
  </div>
</div>

<style lang="scss">
  .icon-generator-on {
    color: var(--bs-warning);
    margin-left: 2px;
  }

  .icon-bitcoin-farm {
    color: var(--bs-success);
    margin-left: 2px;
  }

  .blink {
    animation: blinker 0.8s linear infinite;
  }

  .starting {
    animation: blinker 0.4s linear infinite;
  }

  @keyframes blinker {
    50% {
      opacity: 0;
    }
  }

  .profile-link {
    color: inherit;
    text-decoration: none;
    opacity: 0.7;
    transition: all 0.2s ease-in-out;

    &:hover {
      opacity: 1;
    }
  }

  .client-status-container {
    display: grid;
    grid-template-columns: 12px 30px 3fr;
    align-items: center;
    gap: 8px;
    padding: 8px 0;
    border-bottom: 1px solid var(--bs-border-color);

    &:last-child {
      border-bottom: none;
    }

    .conn-status {
      width: 10px;
      height: 10px;
      border-radius: 50%;
      border: 1px solid var(--bs-border-color);
      align-self: flex-start;
      margin-top: 18px;
      margin-left: 4px;
    }

    .user {
      font-size: 1rem;
    }
    .status {
      font-size: 0.8rem;
      font-style: italic;
      opacity: 0.5;
      float: right;
    }
    .line-two {
      font-size: 0.8rem;
      .level {
        opacity: 0.5;
      }
    }

    .image-container {
      justify-content: center;
      align-items: center;
    }

    .logo-side-small {
      width: 28px;
      height: 28px;
    }
  }

  body[data-bs-theme=light] {
    .image-container img {
      filter: invert(100%);
    }
  }
</style>
