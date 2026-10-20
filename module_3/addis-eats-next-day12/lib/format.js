/** Shared display formatting. Keep currency/date formatting consistent across UI and exports. */
const etbFormatter = new Intl.NumberFormat("en-ET", { style: "currency", currency: "ETB", maximumFractionDigits: 2 });
const dateFormatter = new Intl.DateTimeFormat("en-ET", { dateStyle: "medium", timeStyle: "short" });

export function etb(value) {
  const amount = Number(value);
  return etbFormatter.format(Number.isFinite(amount) ? amount : 0);
}

export function when(value) {
  const date = value instanceof Date ? value : new Date(value);
  return Number.isNaN(date.getTime()) ? "Date unavailable" : dateFormatter.format(date);
}

export function relative(value, now = Date.now()) {
  const date = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(date.getTime())) return "Time unavailable";
  const seconds = Math.round((date.getTime() - now) / 1000);
  const abs = Math.abs(seconds);
  const unit = abs < 60 ? "second" : abs < 3600 ? "minute" : abs < 86400 ? "hour" : "day";
  const divisor = unit === "second" ? 1 : unit === "minute" ? 60 : unit === "hour" ? 3600 : 86400;
  return new Intl.RelativeTimeFormat("en", { numeric: "auto" }).format(Math.round(seconds / divisor), unit);
}
