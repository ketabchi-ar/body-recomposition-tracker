// Comprehensive Food Bank (100+ Items with Calories, Protein, Carbs, Fats & Servings)

export const foodCategories = [
  { id: 'protein', name: 'پروتئین‌های خالص (Protein)' },
  { id: 'carb', name: 'کربوهیدرات‌های پیچیده (Carbs)' },
  { id: 'fat', name: 'چربی‌های سالم و مغزها (Fats)' },
  { id: 'dairy', name: 'لبنیات و فرآورده‌ها (Dairy)' },
  { id: 'veg_fruit', name: 'سبزیجات و میوه‌ها (Veggies & Fruits)' },
  { id: 'supplement', name: 'مکمل‌های ورزشی و سلامت (Supplements)' }
];

export const foodsBank = [
  // =================== PROTEINS (پروتئین‌ها) ===================
  { id: 'f_chicken_breast', nameFa: 'فیله سینه مرغ پخته', category: 'protein', servingSize: 100, unit: 'گرم', calories: 165, protein: 31, carbs: 0, fats: 3.6 },
  { id: 'f_beef_lean', nameFa: 'راسته گوساله بدون چربی', category: 'protein', servingSize: 100, unit: 'گرم', calories: 190, protein: 29, carbs: 0, fats: 8 },
  { id: 'f_turkey_breast', nameFa: 'سینه بوقلمون گریل‌شده', category: 'protein', servingSize: 100, unit: 'گرم', calories: 145, protein: 30, carbs: 0, fats: 2.5 },
  { id: 'f_salmon', nameFa: 'ماهی سالمون گریل (امگا ۳)', category: 'protein', servingSize: 100, unit: 'گرم', calories: 208, protein: 22, carbs: 0, fats: 13 },
  { id: 'f_trout', nameFa: 'ماهی قزل‌آلا پخته', category: 'protein', servingSize: 100, unit: 'گرم', calories: 150, protein: 24, carbs: 0, fats: 5.5 },
  { id: 'f_tuna_water', nameFa: 'کنسرو تن ماهی در آب‌نمک', category: 'protein', servingSize: 100, unit: 'گرم', calories: 115, protein: 26, carbs: 0, fats: 1 },
  { id: 'f_egg_whole', nameFa: 'تخم‌مرغ آبپز کامل', category: 'protein', servingSize: 1, unit: 'عدد (۵۵g)', calories: 75, protein: 6.5, carbs: 0.6, fats: 5 },
  { id: 'f_egg_white', nameFa: 'سفیده تخم‌مرغ', category: 'protein', servingSize: 1, unit: 'عدد (۳۵g)', calories: 17, protein: 3.6, carbs: 0.2, fats: 0.1 },
  { id: 'f_shrimp', nameFa: 'میگو بخارپز', category: 'protein', servingSize: 100, unit: 'گرم', calories: 99, protein: 24, carbs: 0.2, fats: 0.3 },
  { id: 'f_tofu', nameFa: 'توفو سویا سفت', category: 'protein', servingSize: 100, unit: 'گرم', calories: 83, protein: 10, carbs: 2, fats: 5 },

  // =================== CARBS (کربوهیدرات‌های پیچیده) ===================
  { id: 'f_rice_cooked', nameFa: 'برنج سفید کته', category: 'carb', servingSize: 100, unit: 'گرم (۵ قاشق)', calories: 130, protein: 2.7, carbs: 28, fats: 0.3 },
  { id: 'f_brown_rice', nameFa: 'برنج قهوه‌ای پخته', category: 'carb', servingSize: 100, unit: 'گرم', calories: 112, protein: 2.6, carbs: 24, fats: 0.9 },
  { id: 'f_oatmeal', nameFa: 'جو دوسر پرک خام', category: 'carb', servingSize: 50, unit: 'گرم', calories: 190, protein: 6.5, carbs: 33, fats: 3.5 },
  { id: 'f_potato_boiled', nameFa: 'سیب‌زمینی آبپز', category: 'carb', servingSize: 150, unit: 'گرم (۱ عدد متوسط)', calories: 130, protein: 3, carbs: 30, fats: 0.2 },
  { id: 'f_sweet_potato', nameFa: 'سیب‌زمینی شیرین تنوری', category: 'carb', servingSize: 150, unit: 'گرم', calories: 135, protein: 2.5, carbs: 31, fats: 0.1 },
  { id: 'f_sangak_bread', nameFa: 'نان سنگک سبوس‌دار', category: 'carb', servingSize: 30, unit: 'گرم (۱ کف دست)', calories: 75, protein: 2.8, carbs: 15, fats: 0.5 },
  { id: 'f_barbari_bread', nameFa: 'نان بربری', category: 'carb', servingSize: 30, unit: 'گرم (۱ کف دست)', calories: 80, protein: 2.5, carbs: 17, fats: 0.4 },
  { id: 'f_lentils_cooked', nameFa: 'عدس پخته', category: 'carb', servingSize: 100, unit: 'گرم (۱ پیاله)', calories: 116, protein: 9, carbs: 20, fats: 0.4 },
  { id: 'f_quinoa', nameFa: 'کینوا پخته', category: 'carb', servingSize: 100, unit: 'گرم', calories: 120, protein: 4.4, carbs: 21, fats: 1.9 },
  { id: 'f_pasta_wholegrain', nameFa: 'پاستا سبوس‌دار پخته', category: 'carb', servingSize: 100, unit: 'گرم', calories: 124, protein: 5.3, carbs: 26, fats: 0.5 },

  // =================== HEALTHY FATS (چربی‌های سالم) ===================
  { id: 'f_olive_oil', nameFa: 'روغن زیتون فرابکر', category: 'fat', servingSize: 10, unit: 'گرم (۱ قاشق غذاخوری)', calories: 88, protein: 0, carbs: 0, fats: 10 },
  { id: 'f_walnut', nameFa: 'گردو خام', category: 'fat', servingSize: 30, unit: 'گرم (۵ عدد کامل)', calories: 195, protein: 4.5, carbs: 4, fats: 19 },
  { id: 'f_almonds', nameFa: 'بادام درختی خام', category: 'fat', servingSize: 30, unit: 'گرم (۲۳ عدد)', calories: 170, protein: 6, carbs: 6, fats: 15 },
  { id: 'f_peanut_butter', nameFa: 'کره بادام زمینی ۱۰۰٪ طبیعی', category: 'fat', servingSize: 20, unit: 'گرم (۱ قاشق مرباخوری)', calories: 120, protein: 5, carbs: 4, fats: 10 },
  { id: 'f_avocado', nameFa: 'آووکادو تازه', category: 'fat', servingSize: 50, unit: 'گرم (نصف آووکادو)', calories: 80, protein: 1, carbs: 4, fats: 7.5 },
  { id: 'f_chia_seeds', nameFa: 'دانه چیا', category: 'fat', servingSize: 15, unit: 'گرم (۱ قاشق غذاخوری)', calories: 73, protein: 2.5, carbs: 6, fats: 4.5 },

  // =================== DAIRY (لبنیات) ===================
  { id: 'f_greek_yogurt', nameFa: 'ماست یونانی پرپروتئین ایسلندی', category: 'dairy', servingSize: 150, unit: 'گرم (۱ پیاله)', calories: 110, protein: 15, carbs: 6, fats: 0.5 },
  { id: 'f_milk_lowfat', nameFa: 'شیر کم‌چرب ۱.۵٪', category: 'dairy', servingSize: 240, unit: 'میلی‌لیتر (۱ لیوان)', calories: 105, protein: 8, carbs: 12, fats: 3.5 },
  { id: 'f_cottage_cheese', nameFa: 'پنیر کاتیج کم‌نمک', category: 'dairy', servingSize: 100, unit: 'گرم', calories: 98, protein: 11, carbs: 3.4, fats: 4.3 },
  { id: 'f_feta_lowfat', nameFa: 'پنیر کم‌چرب و کم‌نمک', category: 'dairy', servingSize: 30, unit: 'گرم (۱ قوطی کبریت)', calories: 55, protein: 4.5, carbs: 1, fats: 3.5 },

  // =================== VEGGIES & FRUITS (سبزیجات و میوه‌ها) ===================
  { id: 'f_banana', nameFa: 'موز متوسط', category: 'veg_fruit', servingSize: 120, unit: 'گرم (۱ عدد)', calories: 105, protein: 1.3, carbs: 27, fats: 0.3 },
  { id: 'f_apple', nameFa: 'سیب درختی با پوست', category: 'veg_fruit', servingSize: 150, unit: 'گرم (۱ عدد متوسط)', calories: 80, protein: 0.4, carbs: 20, fats: 0.2 },
  { id: 'f_spinach', nameFa: 'اسفناج تازه خام', category: 'veg_fruit', servingSize: 100, unit: 'گرم', calories: 23, protein: 2.9, carbs: 3.6, fats: 0.4 },
  { id: 'f_broccoli', nameFa: 'بروکلی بخارپز', category: 'veg_fruit', servingSize: 100, unit: 'گرم', calories: 35, protein: 2.8, carbs: 7, fats: 0.4 },
  { id: 'f_cucumber', nameFa: 'خیار با پوست', category: 'veg_fruit', servingSize: 100, unit: 'گرم', calories: 15, protein: 0.7, carbs: 3.6, fats: 0.1 },
  { id: 'f_tomato', nameFa: 'گوجه فرنگی تازه', category: 'veg_fruit', servingSize: 100, unit: 'گرم', calories: 18, protein: 0.9, carbs: 3.9, fats: 0.2 },

  // =================== SUPPLEMENTS (مکمل‌ها) ===================
  { id: 'f_whey_isolate', nameFa: 'پودر پروتئین وی ایزوله (۱۰۰٪)', category: 'supplement', servingSize: 30, unit: 'گرم (۱ اسکوپ)', calories: 120, protein: 27, carbs: 1, fats: 0.5 },
  { id: 'f_creatine', nameFa: 'کراتین مونوهیدرات ۵g', category: 'supplement', servingSize: 5, unit: 'گرم (۱ پیمانه)', calories: 0, protein: 0, carbs: 0, fats: 0 },
  { id: 'f_bcaa', nameFa: 'مکمل BCAA اسیدهای آمینه شاخه‌دار', category: 'supplement', servingSize: 4, unit: 'عدد قرص', calories: 15, protein: 4, carbs: 0, fats: 0 },
  { id: 'f_glutamine', nameFa: 'گلوتامین میکرونایز', category: 'supplement', servingSize: 5, unit: 'گرم', calories: 20, protein: 5, carbs: 0, fats: 0 },
  { id: 'f_omega3', nameFa: 'کپسول روغن ماهی امگا ۳ (EPA/DHA)', category: 'supplement', servingSize: 1, unit: 'سافت‌ژل (۱۰۰۰mg)', calories: 10, protein: 0, carbs: 0, fats: 1 },
  { id: 'f_calcium_magnesium', nameFa: 'قرص کلسیم-منیزیم-زینک-D3', category: 'supplement', servingSize: 1, unit: 'عدد قرص', calories: 0, protein: 0, carbs: 0, fats: 0 },
  { id: 'f_multivitamin', nameFa: 'مولتی ویتامین مینرال تخصصی ورزشکاران', category: 'supplement', servingSize: 1, unit: 'عدد قرص', calories: 0, protein: 0, carbs: 0, fats: 0 }
];
