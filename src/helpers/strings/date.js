export function calculateTimePassed(lastMessageDate) {
  if (!lastMessageDate) return "";

  const currentDate = new Date();
  const date = new Date(lastMessageDate);
  const difference = currentDate - date;

  const seconds = Math.floor(difference / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30);
  const years = Math.floor(months / 12);

  if (seconds < 60) {
    return seconds + " segundos atrás";
  } else if (minutes < 60) {
    return minutes + " minutos atrás";
  } else if (hours < 24) {
    return hours + " horas atrás";
  } else if (days < 30) {
    return days + " dias atrás";
  } else if (months < 12) {
    return months === 1 ? "1 mês atrás" : months + " meses atrás";
  } else {
    return years === 1 ? "1 ano atrás" : years + " anos atrás";
  }
}
