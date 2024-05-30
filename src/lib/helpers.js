export const highlightMatch = (word, query) => {
  if (!query.length) return word;
  let parts = query;
  let highlightRegex = new RegExp(`(${parts.join('|')})`, 'ig');
  return word.replace(highlightRegex, '<mark class="highlighted">$1</mark>');
}

export function interpolateColor(color1, color2, factor) {
  const r1 = parseInt(color1.substring(1, 3), 16);
  const g1 = parseInt(color1.substring(3, 5), 16);
  const b1 = parseInt(color1.substring(5, 7), 16);
  const r2 = parseInt(color2.substring(1, 3), 16);
  const g2 = parseInt(color2.substring(3, 5), 16);
  const b2 = parseInt(color2.substring(5, 7), 16);

  const r = Math.round(r1 + (r2 - r1) * factor);
  const g = Math.round(g1 + (g2 - g1) * factor);
  const b = Math.round(b1 + (b2 - b1) * factor);

  const hex = '#' + (r << 16 | g << 8 | b).toString(16).padStart(6, '0');

  return hex;
}

export function getColorScale(steps, veryLowColor, veryHighColor) {
  const colors = [];
  for (let i = 0; i < steps; i++) {
    const factor = i / (steps - 1); // 9 steps for 10 colors
    const color = interpolateColor(veryLowColor, veryHighColor, factor);
    colors.push(color);
  }

  return colors;
}

export function insertRaidTotalHealth (raids) {
  raids.forEach(raid => {
    raid.totalHealth = raid.users.reduce((acc, user) => {
      const { health } = user;
      const { chest, head, stomach, leftArm, rightArm, leftLeg, rightLeg } = health;
      health.TotalBody = [
        chest[0] + head[0] + stomach[0] + leftArm[0] + rightArm[0] + leftLeg[0] + rightLeg[0],
        chest[1] + head[1] + stomach[1] + leftArm[1] + rightArm[1] + leftLeg[1] + rightLeg[1],
      ];
    }, 0);
  });
  return raids;
}

export function registerWorker() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js')
      .then(function(reg) {
        console.log('Service Worker Registered', reg);
      })
      .catch(function(err) {
        console.log('Service Worker not registered', err);
      });
  }
}

export function sendNotification() {
  if (Notification.permission === 'granted') {
      navigator.serviceWorker.ready.then(registration => {
          registration.showNotification('Hello!', {
              body: 'This is a test notification.',
              icon: 'path/to/icon.png' // Optional
          });
      });
  } else {
      alert('Please enable notifications first.');
  }
}
