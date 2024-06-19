<script>
  import { t } from "@services/i18n";

  export let password = "";
  let strength = 0;
  let strengthMessage = "";
  let strengthClass = "";

  const checkPasswordStrength = (password) => {
    let score = 0;

    // Criteria for password strength
    const criteria = [
      { regex: /.{8,}/, message: "At least 8 characters", points: 1 },
      { regex: /[A-Z]/, message: "At least one uppercase letter", points: 1 },
      { regex: /[a-z]/, message: "At least one lowercase letter", points: 1 },
      { regex: /[0-9]/, message: "At least one number", points: 1 },
      {
        regex: /[^A-Za-z0-9]/,
        message: "At least one special character",
        points: 1,
      },
    ];

    criteria.forEach((criterion) => {
      if (criterion.regex.test(password)) {
        score += criterion.points;
      }
    });

    return score;
  };

  $: {
    strength = checkPasswordStrength(password);
    if (strength <= 1) {
      strengthMessage = $t('common.weak');
      strengthClass = "danger";
    } else if (strength <= 3) {
      strengthMessage = $t('common.moderate');
      strengthClass = "warning";
    } else {
      strengthMessage = $t('common.strong');
      strengthClass = "success";
    }
  }
</script>

<div>
  <div class="strength-bar">
    <div class={"bg-" + strengthClass} style="width: {strength * 20}%"></div>
  </div>
  <p class={"text-" + strengthClass}>{strengthMessage}</p>
</div>

<style>
  .strength-bar {
    height: 10px;
    width: 100%;
    background: lightgray;
    border-radius: 5px;
    margin-top: 5px;
  }
  .strength-bar > div {
    height: 100%;
    border-radius: 5px;
  }
  .text-danger {
    color: red;
  }
  .text-warning {
    color: orange;
  }
  .text-success {
    color: green;
  }
  .bg-danger {
    background: red;
  }
  .bg-warning {
    background: orange;
  }
  .bg-success {
    background: green;
  }
</style>
