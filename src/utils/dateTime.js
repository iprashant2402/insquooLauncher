const months = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sept',
  'Oct',
  'Nov',
  'Dec',
];

const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat'];

const getTime = hours => {
  if (hours === 0) {
    return {h: 12, suffix: 'am'};
  } else if (hours < 12 && hours > 0) {
    return {h: hours, suffix: 'am'};
  } else if (hours === 12) {
    return {h: 12, suffix: 'pm'};
  } else if (hours > 12) {
    return {h: hours - 12, suffix: 'pm'};
  }
};

export const getDateTime = () => {
  const date = new Date().getDate(); //To get the Current Date
  const month = new Date().getMonth(); //To get the Current Month
  const day = new Date().getDay(); //To get the Current Day of the week
  const hours = new Date().getHours(); //To get the Current Hours
  const time = getTime(hours);
  let min = new Date().getMinutes(); //To get the Current Minutes
  if (min < 10) {
    min = `0${min}`;
  }
  const res = {
    time: `${time.h}:${min} ${time.suffix}`,
    date: `${days[day]}, ${date} ${months[month]}`,
  };
  return res;
};
