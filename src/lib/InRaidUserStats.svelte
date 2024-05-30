<script>
  import HealthBar from './HealthBar.svelte';

  export let user;
  
  let isOpen = false;
  let healthBarHeight = 14;
  let healthColors = ["#ff5252", "#ff9800", "#ffc107", "#a7aa0c", "#4caf50"];

  function toggleHealthInfo(){
    isOpen = !isOpen;
  }
</script>

<style>
  .inraid-health {
    list-style: none;
    padding: 0;
  }

  .inraid-user {
    border: 1px solid #ccc;
    border-radius: 5px;
    padding: 8px;
    background-color: #f9f9f9;
  }

  .inraid-health-item {
    display: grid;
    justify-content: space-between;
    grid-template-columns: 1fr 50px;
    align-items: center;
    gap: 8px;
  }
</style>

<div class="inraid-user">
  <h6 class="text-center">{user.user}</h6>
  {#if user.health}
    <ul class="inraid-health">
      <li class="inraid-health-item">
        <button class="icon-btn text-start" on:click={() => toggleHealthInfo()}><span class="h6 inraid-health-item-title mb-0">Health</span></button>
        <HealthBar
          value={user.health.totalBody[0]}
          max={user.health.totalBody[1]}
          height={healthBarHeight}
          stepColors={healthColors}
        />
      </li>
      {#if isOpen}
        <li class="inraid-health-item">
          <span class="h6 inraid-health-item-title mb-0">Head</span>
          <HealthBar value={user.health.head[0]} max={user.health.head[1]} height={healthBarHeight} stepColors={healthColors} />
        </li>
      
        <li class="inraid-health-item">
          <span class="h6 inraid-health-item-title mb-0">Chest</span>
          <HealthBar value={user.health.chest[0]} max={user.health.chest[1]} height={healthBarHeight} stepColors={healthColors}  />
        </li>
        <li class="inraid-health-item">
          <span class="h6 inraid-health-item-title mb-0">Stomach</span>
          <HealthBar value={user.health.stomach[0]} max={user.health.stomach[1]} height={healthBarHeight} stepColors={healthColors}  />
        </li>
        <li class="inraid-health-item">
          <span class="h6 inraid-health-item-title mb-0">Left Arm</span>
          <HealthBar value={user.health.leftArm[0]} max={user.health.leftArm[1]} height={healthBarHeight} stepColors={healthColors}  />
        </li>
        <li class="inraid-health-item">
          <span class="h6 inraid-health-item-title mb-0">Right Arm</span>
          <HealthBar value={user.health.rightArm[0]} max={user.health.rightArm[1]} height={healthBarHeight} stepColors={healthColors}  />
        </li>
        <li class="inraid-health-item">
          <span class="h6 inraid-health-item-title mb-0">Left Leg</span>
          <HealthBar value={user.health.leftLeg[0]} max={user.health.leftLeg[1]} height={healthBarHeight} stepColors={healthColors}  />
        </li>
        <li class="inraid-health-item">
          <span class="h6 inraid-health-item-title mb-0">Right Leg</span>
          <HealthBar value={user.health.rightLeg[0]} max={user.health.rightLeg[1]} height={healthBarHeight} stepColors={healthColors}  />
        </li>
      {/if}
      <li class="inraid-health-item">
        <span class="h6 inraid-health-item-title mb-0">energy</span>
        <HealthBar
          value={user.health.energy[0]}
          max={user.health.energy[1]}
          height={healthBarHeight}
          stepColors={healthColors}
        />
      </li>
      <li class="inraid-health-item">
        <span class="h6 inraid-health-item-title mb-0">Hydration</span>
        <HealthBar
          value={user.health.hydration[0]}
          max={user.health.hydration[1]}
          height={healthBarHeight}
          stepColors={healthColors}
        />
      </li>
      <li class="inraid-health-item">
        <span class="h6 inraid-health-item-title mb-0">Temperature</span>
        <HealthBar
          value={user.health.temperature[0]}
          max={user.health.temperature[1]}
          height={healthBarHeight}
          stepColors={healthColors}
        />
      </li>
    </ul>
  {/if}
</div>