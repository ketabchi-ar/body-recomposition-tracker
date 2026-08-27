export const foodCategories = [
  { id: 'protein', name: 'منابع پروتئینی (Proteins)' },
  { id: 'carb', name: 'کربوهیدرات‌ها و غلات (Carbs)' },
  { id: 'fruit_veg', name: 'میوه و سبزیجات (Fruits & Veggies)' },
  { id: 'fat', name: 'چربی‌های سالم و دانه‌ها (Healthy Fats)' },
  { id: 'supplements', name: 'مکمل‌های ورزشی و ویتامین‌ها (Supplements)' }
];

export const foodsBank = [
  // PROTEINS (منابع پروتئینی)
  {
    id: 'food_chicken_breast',
    nameFa: 'فیله مرغ پخته‌شده (سینه)',
    category: 'protein',
    unit: 'گرم',
    servingSize: 100,
    calories: 165,
    protein: 31,
    substitutes: ['food_trout_fish', 'food_lean_beef', 'food_turkey_breast', 'food_egg_white']
  },
  {
    id: 'food_turkey_breast',
    nameFa: 'سینه بوقلمون پخته',
    category: 'protein',
    unit: 'گرم',
    servingSize: 100,
    calories: 135,
    protein: 30,
    substitutes: ['food_chicken_breast', 'food_trout_fish']
  },
  {
    id: 'food_trout_fish',
    nameFa: 'ماهی قزل‌آلا پخته یا کبابی',
    category: 'protein',
    unit: 'گرم',
    servingSize: 100,
    calories: 150,
    protein: 26,
    substitutes: ['food_chicken_breast', 'food_salmon_fish', 'food_tuna_water']
  },
  {
    id: 'food_salmon_fish',
    nameFa: 'ماهی سالمون گریل (امگا ۳ بالا)',
    category: 'protein',
    unit: 'گرم',
    servingSize: 100,
    calories: 205,
    protein: 25,
    substitutes: ['food_trout_fish']
  },
  {
    id: 'food_tuna_water',
    nameFa: 'کنسرو ماهی تن در آب‌نمک (کم‌چرب)',
    category: 'protein',
    unit: 'گرم',
    servingSize: 100,
    calories: 115,
    protein: 26,
    substitutes: ['food_chicken_breast']
  },
  {
    id: 'food_lean_beef',
    nameFa: 'گوشت راسته گوساله کم‌چرب پخته',
    category: 'protein',
    unit: 'گرم',
    servingSize: 100,
    calories: 190,
    protein: 29,
    substitutes: ['food_chicken_breast', 'food_trout_fish']
  },
  {
    id: 'food_whole_egg',
    nameFa: 'تخم‌مرغ کامل آبپز',
    category: 'protein',
    unit: 'عدد',
    servingSize: 1,
    calories: 75,
    protein: 6.5,
    substitutes: ['food_greek_yogurt', 'food_egg_white']
  },
  {
    id: 'food_egg_white',
    nameFa: 'سفیده تخم‌مرغ',
    category: 'protein',
    unit: 'عدد',
    servingSize: 1,
    calories: 17,
    protein: 3.6,
    substitutes: ['food_whole_egg', 'food_whey_powder']
  },
  {
    id: 'food_greek_yogurt',
    nameFa: 'ماست یونانی پرپروتئین',
    category: 'protein',
    unit: 'گرم',
    servingSize: 100,
    calories: 85,
    protein: 10,
    substitutes: ['food_whole_egg', 'food_cottage_cheese']
  },
  {
    id: 'food_cottage_cheese',
    nameFa: 'پنیر کوتاژ کم‌نمک (کازئین طبیعی)',
    category: 'protein',
    unit: 'گرم',
    servingSize: 100,
    calories: 98,
    protein: 12.5,
    substitutes: ['food_greek_yogurt']
  },
  {
    id: 'food_tofu',
    nameFa: 'توفو سویا (پروتئین گیاهی)',
    category: 'protein',
    unit: 'گرم',
    servingSize: 100,
    calories: 76,
    protein: 8,
    substitutes: ['food_lentils']
  },

  // CARBS (کربوهیدرات‌ها و غلات)
  {
    id: 'food_cooked_rice',
    nameFa: 'برنج کته بدون روغن زیاد',
    category: 'carb',
    unit: 'گرم',
    servingSize: 100,
    calories: 130,
    protein: 2.7,
    substitutes: ['food_boiled_potato', 'food_lentils', 'food_sangak_bread', 'food_oats']
  },
  {
    id: 'food_boiled_potato',
    nameFa: 'سیب‌زمینی آبپز یا تنوری',
    category: 'carb',
    unit: 'عدد متوسط',
    servingSize: 1, // ~150g
    calories: 130,
    protein: 3,
    substitutes: ['food_cooked_rice', 'food_banana', 'food_sweet_potato']
  },
  {
    id: 'food_sweet_potato',
    nameFa: 'سیب‌زمینی شیرین تنوری',
    category: 'carb',
    unit: 'گرم',
    servingSize: 100,
    calories: 86,
    protein: 1.6,
    substitutes: ['food_boiled_potato']
  },
  {
    id: 'food_oats',
    nameFa: 'جو دوسر پرک (Oatmeal)',
    category: 'carb',
    unit: 'گرم',
    servingSize: 50,
    calories: 190,
    protein: 7,
    substitutes: ['food_cooked_rice', 'food_sangak_bread']
  },
  {
    id: 'food_lentils',
    nameFa: 'عدسی پخته‌شده',
    category: 'carb',
    unit: 'پیاله (گرم)',
    servingSize: 150,
    calories: 175,
    protein: 13,
    substitutes: ['food_cooked_rice', 'food_sangak_bread', 'food_chickpeas']
  },
  {
    id: 'food_chickpeas',
    nameFa: 'نخود آبپز / حمص خانگی',
    category: 'carb',
    unit: 'گرم',
    servingSize: 100,
    calories: 164,
    protein: 8.9,
    substitutes: ['food_lentils']
  },
  {
    id: 'food_sangak_bread',
    nameFa: 'نان سنگک سنتی سبوس‌دار',
    category: 'carb',
    unit: 'کف دست (گرم)',
    servingSize: 30,
    calories: 80,
    protein: 3,
    substitutes: ['food_boiled_potato', 'food_cooked_rice', 'food_barbari_bread']
  },
  {
    id: 'food_barbari_bread',
    nameFa: 'نان بربری سبوس‌دار',
    category: 'carb',
    unit: 'کف دست (گرم)',
    servingSize: 30,
    calories: 82,
    protein: 2.8,
    substitutes: ['food_sangak_bread']
  },

  // FRUITS & VEGGIES (میوه و سبزیجات)
  {
    id: 'food_banana',
    nameFa: 'موز متوسط',
    category: 'fruit_veg',
    unit: 'عدد',
    servingSize: 1,
    calories: 90,
    protein: 1.1,
    substitutes: ['food_apple', 'food_boiled_potato']
  },
  {
    id: 'food_apple',
    nameFa: 'سیب متوسط',
    category: 'fruit_veg',
    unit: 'عدد',
    servingSize: 1,
    calories: 80,
    protein: 0.5,
    substitutes: ['food_banana', 'food_orange']
  },
  {
    id: 'food_orange',
    nameFa: 'پرتقال تازه (ویتامین C)',
    category: 'fruit_veg',
    unit: 'عدد',
    servingSize: 1,
    calories: 62,
    protein: 1.2,
    substitutes: ['food_apple']
  },
  {
    id: 'food_spinach',
    nameFa: 'اسفناج تازه خام یا بخارپز',
    category: 'fruit_veg',
    unit: 'گرم',
    servingSize: 100,
    calories: 23,
    protein: 2.9,
    substitutes: ['food_broccoli']
  },
  {
    id: 'food_broccoli',
    nameFa: 'بروکلی بخارپز',
    category: 'fruit_veg',
    unit: 'گرم',
    servingSize: 100,
    calories: 34,
    protein: 2.8,
    substitutes: ['food_spinach']
  },
  {
    id: 'food_mixed_salad',
    nameFa: 'سالاد سبزیجات فصل (کاهو، خیار، کلم)',
    category: 'fruit_veg',
    unit: 'ظرف متوسط',
    servingSize: 1,
    calories: 35,
    protein: 1.5,
    substitutes: []
  },

  // FATS & NUTS (چربی‌های سالم)
  {
    id: 'food_olive_oil',
    nameFa: 'روغن زیتون فرابکر',
    category: 'fat',
    unit: 'قاشق غذاخوری',
    servingSize: 1,
    calories: 88,
    protein: 0,
    substitutes: ['food_olives', 'food_walnuts', 'food_avocado']
  },
  {
    id: 'food_olives',
    nameFa: 'زیتون بدون هسته',
    category: 'fat',
    unit: 'عدد',
    servingSize: 10,
    calories: 45,
    protein: 0.3,
    substitutes: ['food_olive_oil']
  },
  {
    id: 'food_walnuts',
    nameFa: 'مغز گردو خام',
    category: 'fat',
    unit: 'گرم',
    servingSize: 30,
    calories: 195,
    protein: 4.5,
    substitutes: ['food_almonds']
  },
  {
    id: 'food_almonds',
    nameFa: 'بادام درختی خام',
    category: 'fat',
    unit: 'گرم',
    servingSize: 30,
    calories: 175,
    protein: 6,
    substitutes: ['food_walnuts', 'food_peanut_butter']
  },
  {
    id: 'food_peanut_butter',
    nameFa: 'کره بادام زمینی طبیعی بدون شکر',
    category: 'fat',
    unit: 'قاشق غذاخوری',
    servingSize: 1, // 16g
    calories: 95,
    protein: 4,
    substitutes: ['food_almonds']
  },

  // SUPPLEMENTS (مکمل‌ها)
  {
    id: 'supp_whey',
    nameFa: 'پودر پروتئین وی ۱۰۰٪ ایزوله / کنسانتره',
    category: 'supplements',
    unit: 'اسکوپ (پیمانه)',
    servingSize: 1, // 30g
    calories: 120,
    protein: 24,
    substitutes: ['food_egg_white', 'food_chicken_breast']
  },
  {
    id: 'supp_creatine',
    nameFa: 'کراتین مونوهیدرات ۱۰۰٪',
    category: 'supplements',
    unit: 'گرم',
    servingSize: 5,
    calories: 0,
    protein: 0,
    substitutes: []
  },
  {
    id: 'supp_glutamine',
    nameFa: 'ال-گلوتامین ریکاوری عضلات',
    category: 'supplements',
    unit: 'گرم',
    servingSize: 5,
    calories: 20,
    protein: 5,
    substitutes: []
  },
  {
    id: 'supp_bcaa',
    nameFa: 'آمینو اسیدهای شاخه‌دار BCAA',
    category: 'supplements',
    unit: 'قرص / اسکوپ',
    servingSize: 4,
    calories: 20,
    protein: 4,
    substitutes: []
  },
  {
    id: 'supp_protein_bar',
    nameFa: 'پروتئین‌بار ورزشی کم‌شکر',
    category: 'supplements',
    unit: 'عدد',
    servingSize: 1, // 60g
    calories: 210,
    protein: 20,
    substitutes: ['supp_whey']
  },
  {
    id: 'supp_multivitamin',
    nameFa: 'مولتی‌ویتامین و مینرال (Alpha Men / ورزشی)',
    category: 'supplements',
    unit: 'قرص',
    servingSize: 1,
    calories: 0,
    protein: 0,
    substitutes: []
  },
  {
    id: 'supp_omega3',
    nameFa: 'کپسول روغن ماهی امگا ۳ (EPA/DHA)',
    category: 'supplements',
    unit: 'کپسول',
    servingSize: 1,
    calories: 10,
    protein: 0,
    substitutes: []
  },
  {
    id: 'supp_calcium_mg',
    nameFa: 'قرص کلسیم-منیزیم-روی (شب قبل خواب)',
    category: 'supplements',
    unit: 'قرص',
    servingSize: 1,
    calories: 0,
    protein: 0,
    substitutes: []
  }
];
