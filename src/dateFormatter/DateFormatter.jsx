const dateFormatter = new Intl.DateTimeFormat("en-US", {
  year: "numeric",
  month: "short",
  day: "2-digit",
  weekday: "short",
});
const shortDateFormatter = new Intl.DateTimeFormat("en-US", {
  day: "2-digit",
  month: "numeric",
  year: "numeric",
  // weekday: "short",
});
export { dateFormatter, shortDateFormatter };
