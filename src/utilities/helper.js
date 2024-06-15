export function debounce(func, wait) {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      func(...args);
    }, wait);
  };
}

export function mask(token, maskChar = '•', showChars = 4) {
  return token.slice(0, -showChars).replace(/./g, maskChar) + token.slice(-showChars);
}