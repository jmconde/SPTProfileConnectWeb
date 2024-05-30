<script>
    import { getColorScale } from "./helpers";

  export let value;
  export let max;
  export let height = 20;
  export let stepColors = [];

  
  $: percentage = Math.floor((value / max) * 100);
  
  // const colors = getColorScale(steps, '#ff5252', '#4caf50');
  // console.log('colors :>> ', colors);

  function getHealthColor(value) {
    const stepSize = 100 / stepColors.length;
    const color = stepColors[Math.floor(value / stepSize) - 1]
    return color;
  }
</script>

<style>
  .health-bar {
    width: 100%;
    height: 20px;
    background-color: lightgray;
    border-radius: 2px;
    overflow: hidden;
  }

  .health-bar-inner {
    height: 100%;
    background-color: #bac2ba; /* Green color for healthy */
    transition: width 0.3s ease-in-out; /* Smooth transition animation */
  }
</style>

<div class="health-bar" style="height:{height}px">
  <div class="health-bar-inner" style="background-color: {getHealthColor(percentage)};width: {percentage}%; height:{height}px"></div>
</div>