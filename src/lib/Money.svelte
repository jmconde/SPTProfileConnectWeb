<!-- CurrencyInput.svelte -->
<script>
  import { configStore } from "../stores/configStore.js";

  import { CURRENCIES_MAP } from "../utilities/helper.js";

  export let data;
  export let showDecimals = false;
  
  let locale;

  configStore.subscribe((value) => {
    locale = value.locale;
  });
  
  const currencies = Object.keys(CURRENCIES_MAP);
  let currentIndex = 0;
  let currenCurrency = currencies[currentIndex];
  let current = data[currenCurrency];
  

  $: {
    currenCurrency = currencies[currentIndex];
    current = data[currenCurrency];
  }
  

  function handleCurrencyClick() {
    const nextCurrencyIndex = (currentIndex + 1) % currencies.length;
    currentIndex = nextCurrencyIndex;
  }

  function getFormattedAmount(amount) {
    return new Intl.NumberFormat(locale, {
      minimumFractionDigits: showDecimals ? 2 : 0, // This ensures no decimal places
      maximumFractionDigits: showDecimals ? 2 : 0  // This ensures no decimal places
    }).format(amount);
  }
</script>

<button  on:click={handleCurrencyClick}>{CURRENCIES_MAP[currenCurrency].symbol} {getFormattedAmount(current)}</button>

<style>
  button {
    padding: 0;
    border: none;
    background-color: transparent;
    cursor: pointer;
    opacity: 0.8;
    transition: all 0.3s;
  }
  button:hover {
    opacity: 1;
  }
</style>