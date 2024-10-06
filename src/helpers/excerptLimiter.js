export default function excerptLimiter(str) {
  return `${str.replace(/^(.{100}[^\s]*).*/, "$1")}...`;
}
