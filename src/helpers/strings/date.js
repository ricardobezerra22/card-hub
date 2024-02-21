export function compareTime(dateString) {
  const pastDate = new Date(dateString);
  const now = new Date();

  const timeDifferenceInMilliseconds = now - pastDate;
  const secondsPassed = Math.floor(timeDifferenceInMilliseconds / 1000);
  const minutesPassed = Math.floor(secondsPassed / 60);
  const hoursPassed = Math.floor(minutesPassed / 60);
  const daysPassed = Math.floor(hoursPassed / 24);
  const monthsPassed = Math.floor(daysPassed / 30);
  const yearsPassed = Math.floor(daysPassed / 365);

  if (yearsPassed > 0) {
    return `${yearsPassed} ano${yearsPassed > 1 ? "s" : ""} atrás`;
  } else if (monthsPassed > 0) {
    return `${monthsPassed} mês${monthsPassed > 1 ? "es" : ""} atrás`;
  } else if (daysPassed > 0) {
    return `${daysPassed} dia${daysPassed > 1 ? "s" : ""} atrás`;
  } else if (hoursPassed > 0) {
    return `${hoursPassed} hora${hoursPassed > 1 ? "s" : ""} atrás`;
  } else if (minutesPassed > 0) {
    return `${minutesPassed} minuto${minutesPassed > 1 ? "s" : ""} atrás`;
  } else {
    return `${secondsPassed} segundo${secondsPassed > 1 ? "s" : ""} atrás`;
  }
}
