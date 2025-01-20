<script>
  import { onDestroy, onMount } from "svelte";
  import MoneyChart from "@lib/MoneyChart.svelte";
  import { ProfilesService } from "@services/ProfilesService";

  const profilesService = new ProfilesService();
  let data = [];
  let labels = [];
  let mode = 'roubles';
  let lastValues = {};
  
  async function getData() {
    const to = new Date();
    const from = new Date(to.getTime() - 1000 * 60 * 60 * 24 * 3); // last 3 days
    const moneyResponse = await profilesService.fetchMoneyData(from, to);

    const allUsers = (moneyResponse[moneyResponse.length - 1]?.values || []).map((item) => item.nickname).sort((a, b) => a.localeCompare(b));
    
    lastValues = allUsers.reduce((acc, val) => {
      acc[val] = {
        roubles: 0,
        dollars: 0,
        euros: 0,
      };
      return acc;
    }, {})

    labels = moneyResponse.map((item) => {
      const date = item._id;
      return `${date.day}/${date.month} ${date.hour}:00`;
    });

    data = moneyResponse.reduce((users, item) => {
      allUsers.forEach((nickname) => {
        let  user = users.find(r => r.label === nickname);
        const userValues = item.values.find(r => r.nickname === nickname);
        if (!user) {
          user = {
            label: nickname,
            roubles: [ !userValues ? lastValues[nickname].roubles : userValues.roubles ],
            dollars: [ !userValues ? lastValues[nickname].dollars : userValues.dollars ],
            euros: [ !userValues ? lastValues[nickname].euros : userValues.euros ],
          };
          users.push(user);
        } else if (!userValues) {
          user.roubles.push(lastValues[nickname].roubles);
          user.dollars.push(lastValues[nickname].dollars);
          user.euros.push(lastValues[nickname].euros);
        } else {
          user.roubles.push(userValues.roubles);
          user.dollars.push(userValues.dollars);
          user.euros.push(userValues.euros);
          lastValues[nickname].roubles = userValues.roubles;
          lastValues[nickname].dollars = userValues.dollars;
          lastValues[nickname].euros = userValues.euros;
        }
       
      });
      return users;
    }, []);
  }
  
  let pollInterval;

  onMount(async () => {
    getData();
    startPolling();
  });

  onDestroy(() => {
    stopPolling();
  });

  function startPolling() {
    pollInterval = setInterval(() => {
      getData();
    }, 1000 * 10); // 10 seconds
  }

  function stopPolling() {
    clearInterval(pollInterval);
  }
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
<main class="container-fluid mt-4">
  <div class="btn-group" role="group" aria-label="Currency selector">
    <input type="radio" class="btn-check" name="btnradio" id="btnradio1" autocomplete="off" checked>
    <label class="btn btn-outline-secondary" for="btnradio1" on:click={() => mode = 'roubles'}>Roubles</label>

    <input type="radio" class="btn-check" name="btnradio" id="btnradio2" autocomplete="off">
    <label class="btn btn-outline-secondary" for="btnradio2" on:click={() => mode = 'dollars'}>Dollars</label>

    <input type="radio" class="btn-check" name="btnradio" id="btnradio3" autocomplete="off">
    <label class="btn btn-outline-secondary" for="btnradio3" on:click={() => mode = 'euros'}>Euros</label>
  </div>

  {#if mode === 'roubles'}
    <MoneyChart {labels} data={data} axisXLabel="Time" axisYLabel="Roubles" currency="roubles" />
  {:else if mode === 'dollars'}
    <MoneyChart {labels} data={data} axisXLabel="Time" axisYLabel="Dollars" currency="dollars" />
  {:else if mode === 'euros'}
    <MoneyChart {labels} data={data} axisXLabel="Time" axisYLabel="Euros" currency="euros" />
  {/if}
</main>