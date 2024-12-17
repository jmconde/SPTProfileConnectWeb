<script>
  import { toasts } from '../stores/toasts';
  import Toast from './Toast.svelte';

  let currentToasts = [];

  // Subscribe to the toasts store
  toasts.subscribe(value => {
    currentToasts = value.slice(-5); // Only keep the last 5 toasts
  });

  function removeToast(id) {
    toasts.update(t => t.filter(toast => toast.id !== id));
  }
</script>

<div class="toast-container position-fixed bottom-0 end-0 p-3">
  {#each currentToasts as { id, header, message, type = 'info' } (id)}
    <Toast {id} {message} {header} {type} on:remove={e => removeToast(e.detail)} />
  {/each}
</div>

<style>
  .toast-container {
    z-index: 1050; /* Bootstrap z-index for toasts */
  } 
</style>
  