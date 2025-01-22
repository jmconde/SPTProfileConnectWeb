import { itemIconsUrls, NavigationRoutes, securePathPrefix } from "./constants.js";

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

export function isInRoutes(path) {
  return Object.values(NavigationRoutes).includes(path);
}

export function isSecurePath(path) {
  return path.startsWith(securePathPrefix);
}

export function getHeaderHeight() {
  return document.querySelector('#app > nav.navbar').offsetHeight;
}

export function getItemIconUrls() {
  const urlsMap = {};
  const original = import.meta.glob(
    ["../lib/assets/images/items/*.jpg", "../lib/assets/images/items/*.png", "../lib/assets/images/items/*.gif"],
    { eager: true, query: "?url", import: "default" }
  )
  return original;
}

export function getItemIconUrl(itemImageName) {
  return itemIconsUrls[`../lib/assets/images/items/${itemImageName}`]  || '';
}

export function isDarkColor(hexColor) {
  if (hexColor.startsWith('#')) {
    hexColor = hexColor.substring(1);
  }
  // Convert hex to RGB first
  let r = 0, g = 0, b = 0;
  
  // 3 digits
  if (hexColor.length === 4) {
      r = parseInt(hexColor[1] + hexColor[1], 16);
      g = parseInt(hexColor[2] + hexColor[2], 16);
      b = parseInt(hexColor[3] + hexColor[3], 16);
  }
  // 6 digits
  else if (hexColor.length === 7) {
      r = parseInt(hexColor[1] + hexColor[2], 16);
      g = parseInt(hexColor[3] + hexColor[4], 16);
      b = parseInt(hexColor[5] + hexColor[6], 16);
  }

  // Normalize RGB values
  r /= 255;
  g /= 255;
  b /= 255;

  // Calculate luminance
  let luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;

  // Determine if color is dark
  return luminance < 0.5;
}

export function getColorForText(text, colorsArray) {
  let sum = 0;
  for (let i = 0; i < text.length; i++) {
    sum += text.charCodeAt(i);
  }
  return colorsArray[sum % colorsArray.length];
}