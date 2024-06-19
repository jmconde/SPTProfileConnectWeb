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