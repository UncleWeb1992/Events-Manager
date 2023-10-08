const months = [
  "Января",
  "Февраля",
  "Марта",
  "Апреля",
  "Мая",
  "Июня",
  "Июля",
  "Августа",
  "Сентября",
  "Октября",
  "Ноября",
  "Декабря",
];

const normalizeDate = (num: number) => (num < 9 ? `0` + num : num);

export function getDate() {
  const date = new Date(Date.now());
  const Month = date.getMonth();
  const Year = date.getFullYear();
  const Day = date.getDate();

  return `${normalizeDate(Day)} ${months[Month]} ${Year}`;
}
