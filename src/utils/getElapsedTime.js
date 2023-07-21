import moment from "moment";

export const getElapsedTime = timestamp => {
  const currentTime = moment();
  const postTime = moment(parseInt(timestamp, 10));
  const daysDiff = currentTime.diff(postTime, 'days');
  if (daysDiff === 0) {
    return 'Postado Hoje';
  } else if (daysDiff === 1) {
    return 'Postado Ontem';
  } else if (daysDiff <= 7) {
    return `Postado há ${daysDiff} dias`;
  } else if (daysDiff <= 28) {
    const weeks = Math.floor(daysDiff / 7);
    return `Postado há ${weeks} semana${weeks > 1 ? 's' : ''}`;
  } else if (daysDiff <= 365) {
    const months = Math.floor(daysDiff / 30);
    const remainingDays = daysDiff % 30;
    if (remainingDays === 0) {
      return `Postado há ${months} ${months === 1 ? 'mês' : 'meses'}`;
    } else {
      return `Postado há ${months} ${months === 1 ? 'mês' : 'meses'} e ${remainingDays} dia${
        remainingDays > 1 ? 's' : ''
      }`;
    }
  } else {
    const years = Math.floor(daysDiff / 365);
    const remainingMonths = Math.floor((daysDiff % 365) / 30);
    return `Postado há ${years} ano${years > 1 ? 's' : ''} e ${remainingMonths} ${
      remainingMonths > 1 ? 'meses' : 'mês'
    }`;
  }
};
