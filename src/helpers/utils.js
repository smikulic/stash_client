export function sanitizeValue(value) {
  return value.replace(/[,. ]+/g, '').trim();
}
