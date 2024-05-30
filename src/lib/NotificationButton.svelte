<script>
  export let onPermissionGranted;

  function requestPermission() {
      Notification.requestPermission().then(permission => {
          if (permission === 'granted' && typeof onPermissionGranted === 'function') {
              onPermissionGranted();
          } else {
              alert('Permission denied');
          }
      });
  }
</script>

<button on:click={requestPermission}>Enable Notifications</button>