// Pure JavaScript Persian (Jalali) Date Converter and Formatter
// Algorithm based on Kazimierz M. Borkowski astronomical algorithm

export function gregorianToJalali(gy, gm, gd) {
  const g_d_m = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];
  let gy2 = (gm > 2) ? (gy + 1) : gy;
  let days = 355666 + (365 * gy) + Math.floor((gy2 + 3) / 4) - Math.floor((gy2 + 99) / 100) + Math.floor((gy2 + 399) / 400) + gd + g_d_m[gm - 1];
  let jy = -1595 + (33 * Math.floor(days / 12053));
  days %= 12053;
  jy += 4 * Math.floor(days / 1461);
  days %= 1461;
  if (days > 365) {
    jy += Math.floor((days - 1) / 365);
    days = (days - 1) % 365;
  }
  let jm, jd;
  if (days < 186) {
    jm = 1 + Math.floor(days / 31);
    jd = 1 + (days % 31);
  } else {
    jm = 7 + Math.floor((days - 186) / 30);
    jd = 1 + ((days - 186) % 30);
  }
  return { jy, jm, jd };
}

const persianMonths = [
  'فروردین', 'اردیبهشت', 'خرداد',
  'تیر', 'مرداد', 'شهریور',
  'مهر', 'آبان', 'آذر',
  'دی', 'بهمن', 'اسفند'
];

const persianWeekDays = [
  'یکشنبه', 'دوشنبه', 'سه‌شنبه', 'چهارشنبه', 'پنج‌شنبه', 'جمعه', 'شنبه'
];

// Convert Latin digits to Persian digits
export function toPersianDigits(num) {
  if (num === null || num === undefined) return '';
  const str = String(num);
  const persianNums = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
  return str.replace(/[0-9]/g, w => persianNums[+w]);
}

// Get full formatted Persian date string e.g. "جمعه ۷ شهریور ۱۴۰۵"
export function getPersianDateFormatted(date = new Date()) {
  const gy = date.getFullYear();
  const gm = date.getMonth() + 1;
  const gd = date.getDate();
  const dayOfWeek = date.getDay(); // 0 = Sunday

  const { jy, jm, jd } = gregorianToJalali(gy, gm, gd);
  const weekDayName = persianWeekDays[dayOfWeek];
  const monthName = persianMonths[jm - 1];

  return `${weekDayName} ${toPersianDigits(jd)} ${monthName} ${toPersianDigits(jy)}`;
}

// Get short Jalali key e.g. "1405/06/07"
export function getJalaliDateShort(date = new Date()) {
  const gy = date.getFullYear();
  const gm = date.getMonth() + 1;
  const gd = date.getDate();
  const { jy, jm, jd } = gregorianToJalali(gy, gm, gd);
  return `${jy}/${String(jm).padStart(2, '0')}/${String(jd).padStart(2, '0')}`;
}
