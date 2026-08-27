export const foodCategories = [
  { id: 'protein', name: 'منابع پروتئینی (Proteins)' },
  { id: 'carb', name: 'کربوهیدرات‌ها و غلات (Carbs)' },
  { id: 'fruit_veg', name: 'میوه و سبزیجات (Fruits & Veggies)' },
  { id: 'fat', name: 'چربی‌های سالم (Healthy Fats)' },
  { id: 'supplements', name: 'مکمل‌های ورزشی و ویتامین‌ها (Supplements)' }
];

export const foodsBank = [
  // PROTEINS
  {
    id: 'food_chicken_breast',
    nameFa: 'فیله مرغ پخته‌شده',
    category: 'protein',
    unit: 'گرم',
    servingSize: 100,
    calories: 165,
    protein: 31,
    substitutes: ['food_trout_fish', 'food_lean_beef', 'food_egg_white', 'food_greek_yogurt']
  },
  {
    id: 'food_trout_fish',
    nameFa: 'ماهی قزل‌آلا پخته یا کبابی',
    category: 'protein',
    unit: 'گرم',
    servingSize: 100,
    calories: 150,
    protein: 26,
    substitutes: ['food_chicken_breast', 'food_lean_beef']
  },
  {
    id: 'food_lean_beef',
    nameFa: 'گوشت گوساله کم‌چرب پخته',
    category: 'protein',
    unit: 'گرم',
    servingSize: 100,
    calories: 190,
    protein: 29,
    substitutes: ['food_chicken_breast', 'food_trout_fish']
  },
  {
    id: 'food_whole_egg',
    nameFa: 'تخم‌مرغ کامل آبپز یا نیمرو کم‌روغن',
    category: 'protein',
    unit: 'عدد',
    servingSize: 1, // ~50g
    calories: 75,
    protein: 6.5,
    substitutes: ['food_greek_yogurt', 'food_egg_white']
  },
  {
    id: 'food_egg_white',
    nameFa: 'سفیده تخم‌مرغ',
    category: 'protein',
    unit: 'عدد',
    servingSize: 1, // ~35g
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

  // CARBS
  {
    id: 'food_cooked_rice',
    nameFa: 'برنج کته بدون روغن زیاد',
    category: 'carb',
    unit: 'گرم',
    servingSize: 100, // ~5-6 قاشق
    calories: 130,
    protein: 2.7,
    substitutes: ['food_boiled_potato', 'food_lentils', 'food_sangak_bread']
  },
  {
    id: 'food_boiled_potato',
    nameFa: 'سیب‌زمینی آبپز یا تنوری',
    category: 'carb',
    unit: 'عدد متوسط',
    servingSize: 1, // ~150g
    calories: 130,
    protein: 3,
    substitutes: ['food_cooked_rice', 'food_banana']
  },
  {
    id: 'food_lentils',
    nameFa: 'عدسی پخته‌شده',
    category: 'carb',
    unit: 'پیاله (گرم)',
    servingSize: 150,
    calories: 175,
    protein: 13,
    substitutes: ['food_cooked_rice', 'food_sangak_bread']
  },
  {
    id: 'food_sangak_bread',
    nameFa: 'نان سنگک سنتی سبوس‌دار',
    category: 'carb',
    unit: 'کف دست (گرم)',
    servingSize: 30,
    calories: 80,
    protein: 3,
    substitutes: ['food_boiled_potato', 'food_cooked_rice']
  },
  {
    id: 'food_banana',
    nameFa: 'موز متوسط',
    category: 'fruit_veg',
    unit: 'عدد',
    servingSize: 1, // ~100g
    calories: 90,
    protein: 1.1,
    substitutes: ['food_apple', 'food_boiled_potato']
  },
  {
    id: 'food_apple',
    nameFa: 'سیب متوسط',
    category: 'fruit_veg',
    unit: 'عدد',
    servingSize: 1, // ~150g
    calories: 80,
    protein: 0.5,
    substitutes: ['food_banana']
  },

  // FATS
  {
    id: 'food_olive_oil',
    nameFa: 'روغن زیتون فرابکر',
    category: 'fat',
    unit: 'قاشق غذاخوری',
    servingSize: 1, // ~10g/ml
    calories: 88,
    protein: 0,
    substitutes: ['food_olives', 'food_walnuts']
  },
  {
    id: 'food_olives',
    nameFa: 'زیتون بدون هسته',
    category: 'fat',
    unit: 'عدد',
    servingSize: 10, // ~30g
    calories: 45,
    protein: 0.3,
    substitutes: ['food_olive_oil']
  },

  // SUPPLEMENTS
  {
    id: 'supp_whey',
    nameFa: 'پودر پروتئین وی ۱۰۰٪',
    category: 'supplements',
    unit: 'پیمانه (اسکوپ)',
    servingSize: 1, // 30g
    calories: 120,
    protein: 24,
    substitutes: ['food_egg_white', 'food_chicken_breast']
  },
  {
    id: 'supp_creatine',
    nameFa: 'کراتین مونوهیدرات',
    category: 'supplements',
    unit: 'گرم',
    servingSize: 5,
    calories: 0,
    protein: 0,
    substitutes: []
  },
  {
    id: 'supp_glutamine',
    nameFa: 'ال-گلوتامین ریکاوری',
    category: 'supplements',
    unit: 'گرم',
    servingSize: 5,
    calories: 20,
    protein: 5,
    substitutes: []
  },
  {
    id: 'supp_bcaa',
    nameFa: 'آمینو اسید شاخه‌دار BCAA',
    category: 'supplements',
    unit: 'قرص',
    servingSize: 4,
    calories: 20,
    protein: 4,
    substitutes: []
  },
  {
    id: 'supp_protein_bar',
    nameFa: 'پروتئین‌بار ورزشی (کارن)',
    category: 'supplements',
    unit: 'عدد',
    servingSize: 1, // 60g
    calories: 200,
    protein: 18,
    substitutes: ['supp_whey']
  }
];
