export function debounce(func, wait) {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      func(...args);
    }, wait);
  };
}

export function mask({token, maskChar = '•', showChars = 4, start = 10}) {
  if (start === 0) {
    return token.slice(0, -showChars).replace(/./g, maskChar) + token.substring(-showChars);
  }
  const last = token.length - showChars;
  const startMask = last - start;
  return token.slice(startMask, last).replace(/./g, maskChar) + token.substring(last);
}

export function defaultImage(node, defaultSrc) {
  const handleError = () => {
    node.src = defaultSrc;
    node.onerror = null; // Prevent loop if default image fails to load
  };
  node.addEventListener('error', handleError);
  return {
    destroy() {
      node.removeEventListener('error', handleError);
    }
  };
}


export const CURRENCIES_MAP = {
  roubles: {
    symbol: '₽',
    name: 'Roubles',
    code: 'RUB',
  },
  dollars: {
    symbol: '$',
    name: 'Dollars',
    code: 'USD',
  },
  euros: {
    symbol: '€',
    name: 'Euros',
    code: 'EUR',
  },
};

export function startPolling(fn, millis = import.meta.env.VITE_POLLING_INTERVAL) {
  return setInterval(async () => {
    await fn();
  }, millis);
}

export function stopPolling(pollInterval) {
  clearInterval(pollInterval);
}

export async function wait(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
