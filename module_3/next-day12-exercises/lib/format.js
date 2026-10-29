export const etb = (value) => new Intl.NumberFormat('en-ET', { style: 'currency', currency: 'ETB', maximumFractionDigits: 0 }).format(value);
export const when = (value) => new Intl.DateTimeFormat('en-ET', { dateStyle: 'medium', timeStyle: 'short', timeZone: 'Africa/Addis_Ababa' }).format(new Date(value));
export const relative = (value, now = Date.now()) => {
  const seconds = Math.round((new Date(value).getTime() - now) / 1000);
  const unit = Math.abs(seconds) < 60 ? 'second' : Math.abs(seconds) < 3600 ? 'minute' : Math.abs(seconds) < 86400 ? 'hour' : 'day';
  const amount = unit === 'second' ? seconds : unit === 'minute' ? Math.round(seconds / 60) : unit === 'hour' ? Math.round(seconds / 3600) : Math.round(seconds / 86400);
  return new Intl.RelativeTimeFormat('en', { numeric: 'auto' }).format(amount, unit);
};
