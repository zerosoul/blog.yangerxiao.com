export function pad(n) {
  return n < 10 ? `0${n} ` : n;
}
export function getYMD(date = new Date()) {
  const tmpDate = new Date(date);
  const Y = tmpDate.getFullYear();
  const M = tmpDate.getMonth() + 1;
  const D = tmpDate.getDate();
  return `${Y}-${M}-${D}`;
}
