export function pad(n) {
  return n < 10 ? `0${n} ` : n;
}
export function getYMD(date = new Date()) {
  const Y = date.getFullYear();
  const M = date.getMonth() + 1;
  const D = date.getDate();
  return `${Y}-${M}-${D}`;
}
