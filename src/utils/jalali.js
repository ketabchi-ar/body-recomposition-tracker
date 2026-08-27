// Pure JavaScript Persian (Jalali) Date Converter and Formatter

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

// Convert Latin digits (0-9) to Persian digits (۰-۹)
export function toPersianDigits(num) {
  if (num === null || num === undefined || num === '') return '';
  const str = String(num);
  const persianNums = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
  return str.replace(/[0-9]/g, w => persianNums[+w]);
}

// Convert Persian (۰-۹) and Arabic (٠-٩) digits to standard Latin digits (0-9)
export function parsePersianDigits(str) {
  if (str === null || str === undefined) return '';
  const persianMap = {
    '۰': '0', '۱': '1', '۲': '2', '۳': '3', '۴': '4',
    '۵': '5', '۶': '6', '۷': '7', '۸': '8', '۹': '9',
    '٠': '0', '١': '1', '٢': '2', '٣': '3', '٤': '4',
    '٥': '5', '٦': '6', '٧': '7', '٨': '8', '٩': '9'
  };
  return String(str).replace(/[۰-۹٠-٩]/g, match => persianMap[match] || match);
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
