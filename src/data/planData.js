// Standard Anonymized Reference Fitness & Body Recomposition Plan Data

export const userProfile = {
  name: 'ورزشکار نمونه',
  age: '۳۰ سال',
  height: '۱۷۵ سانتی‌متر',
  weight: '۷۵ کیلوگرم',
  fatPercentage: '۲۰٪',
  muscleMass: '۳۲ کیلوگرم',
  bmr: '۱۶۵۰ کیلوکالری',
  dailyTargetCalories: '۲۲۰۰',
  dailyTargetProtein: '۱۶۵',
  waterTargetLiters: 2.5,
  deskHours: 8,
  goal: 'کاهش چربی احشایی و افزایش توده عضلانی (Body Recomposition)'
};

export const daysSchedule = [
  {
    id: 'saturday',
    dayIndex: 6,
    dayName: 'شنبه',
    title: 'کاردیو زون ۲ و چربی‌سوزی پایه',
    type: 'cardio',
    category: 'هوازی و ارتقای میتوکندری',
    wakeUpTime: '۰۶:۰۰',
    startTime: '۰۶:۴۵',
    duration: '۳۰ دقیقه',
    target: 'حفظ ضربان در محدوده ۶۰٪ تا ۷۰٪ جهت تحریک چربی‌سوزی',
    workoutId: 'workout_sat',
    morningCardioNote: 'قبل از تمرین فقط آب ولرم + ۱ فنجان قهوه تلخ یا کافئین میل شود.'
  },
  {
    id: 'sunday',
    dayIndex: 0,
    dayName: 'یکشنبه',
    title: 'تمرین قدرتی - جلسه اول (Upper Body Push & Pull)',
    type: 'strength',
    category: 'بالاتنه قدرتی و هایپرتروفی',
    wakeUpTime: '۰۶:۳۰',
    startTime: '۱۷:۳۰',
    duration: '۵۰ دقیقه',
    target: 'افزایش حجم سینه، زیربغل و سرشانه با تاکید بر سلامت مهره‌های کمری',
    workoutId: 'workout_sun'
  },
  {
    id: 'monday',
    dayIndex: 1,
    dayName: 'دوشنبه',
    title: 'تمرین قدرتی - جلسه دوم (Lower Body & Spine Stability)',
    type: 'strength',
    category: 'پایین‌تنه و ثبات ستون فقرات',
    wakeUpTime: '۰۶:۳۰',
    startTime: '۱۷:۳۰',
    duration: '۵۰ دقیقه',
    target: 'تقویت چهارسر ران، همسترینگ و عضلات ثبات‌دهنده کور بدون فشار دیسک کمر',
    workoutId: 'workout_mon'
  },
  {
    id: 'tuesday',
    dayIndex: 2,
    dayName: 'سه‌شنبه',
    title: 'استراحت فعال، کشش و تمرینات اصلاحی ارگونومی',
    type: 'recovery',
    category: 'ریکاوری و سلامت مفاصل',
    wakeUpTime: '۰۷:۰۰',
    startTime: 'عصر',
    duration: '۳۰ دقیقه',
    target: 'کاهش انقباضات ناشی از کار پشت میز و بازتوانی مفاصل',
    workoutId: 'workout_tue'
  },
  {
    id: 'wednesday',
    dayIndex: 3,
    dayName: 'چهارشنبه',
    title: 'تمرین قدرتی - جلسه سوم (Full Body Hypertrophy)',
    type: 'strength',
    category: 'فول بادی هایپرتروفی و عضلات مکمل',
    wakeUpTime: '۰۶:۳۰',
    startTime: '۱۷:۳۰',
    duration: '۵۰ دقیقه',
    target: 'تکمیل حجم هفتگی بالاتنه و بازوها با تمرکز بر تنش مکانیکی',
    workoutId: 'workout_wed'
  },
  {
    id: 'thursday',
    dayIndex: 4,
    dayName: 'پنج‌شنبه',
    title: 'کاردیو اینتروال و ثبات مرکزی',
    type: 'cardio',
    category: 'هوازی و شکم',
    wakeUpTime: '۰۶:۳۰',
    startTime: '۱۷:۳۰',
    duration: '۴۰ دقیقه',
    target: 'افزایش توان تنفسی و تمرینات ضد چرخش ستون فقرات (پالوف پرس)',
    workoutId: 'workout_thu'
  },
  {
    id: 'friday',
    dayIndex: 5,
    dayName: 'جمعه',
    title: 'شنا، آب‌درمانی و ریکاوری کامل هفتگی',
    type: 'recovery',
    category: 'ریکاوری در آب',
    wakeUpTime: 'دلخواه',
    startTime: 'صبح یا عصر',
    duration: '۴۵ دقیقه',
    target: 'تخلیه کامل اسید لاکتیک، رهاسازی دیسک‌ها و آمادگی برای هفته جدید',
    workoutId: 'workout_fri'
  }
];

export const workoutsData = {
  workout_sat: {
    id: 'workout_sat',
    title: 'کاردیو زون ۲ و چربی‌سوزی پایه',
    exercises: [
      {
        id: 'ex_cardio_zone2_run',
        nameFa: 'دویدن ایزی ران زون ۲ (Zone 2 Easy Run)',
        nameEn: 'Zone 2 Aerobic Running',
        targetMuscle: 'قلبی‌عروقی و میتوکندری',
        metricType: 'time_seconds',
        setsCount: 1,
        setsReps: '۲۵ دقیقه مداوم',
        defaultSeconds: 1500,
        calories: 220,
        proteinRequired: 10,
        biomechanics: 'ضربان قلب در محدوده ۶۰٪ تا ۷۰٪ باشد؛ تنفس باید به گونه‌ای باشد که بتوانید به راحتی صحبت کنید.',
        youtubeId: '03X0_wFqX2M',
        aparatId: ''
      }
    ]
  },
  workout_sun: {
    id: 'workout_sun',
    title: 'بالاتنه قدرتی و هایپرتروفی',
    exercises: [
      {
        id: 'ex_chest_db_bench',
        nameFa: 'پرس سینه دمبل روی میز صاف',
        nameEn: 'Dumbbell Bench Press',
        targetMuscle: 'سینه، پشت بازو، دلتوئید قدامی',
        metricType: 'weight_reps',
        setsCount: 4,
        setsReps: '4 × (12 - 10 - 8 - 6)',
        suggestedReps: [12, 10, 8, 6],
        calories: 60,
        proteinRequired: 10,
        biomechanics: 'زاویه آرنج‌ها با تنه ۴۵ درجه باشد. سینه منبسط و قوس ملایم کمر حفظ شود.',
        youtubeId: 'VmB1G1K7v94',
        aparatId: ''
      },
      {
        id: 'ex_back_lat_pulldown',
        nameFa: 'زیربغل لت سیمکش دست باز',
        nameEn: 'Wide-Grip Lat Pulldown',
        targetMuscle: 'زیربغل (پشتی بزرگ)',
        metricType: 'weight_reps',
        setsCount: 4,
        setsReps: '4 × (12 - 10 - 8 - 8)',
        suggestedReps: [12, 10, 8, 8],
        calories: 55,
        proteinRequired: 9,
        biomechanics: 'کشش کامل در بالای حرکت بدون لم دادن شدید به عقب. میله تا بالای سینه پایین کشیده شود.',
        youtubeId: 'CAwf7n6Luuc',
        aparatId: ''
      },
      {
        id: 'ex_sh_seated_db_press',
        nameFa: 'پرس سرشانه نشسته با دمبل',
        nameEn: 'Seated DB Shoulder Press',
        targetMuscle: 'دلتوئید قدامی و میانی',
        metricType: 'weight_reps',
        setsCount: 3,
        setsReps: '3 × (12 - 10 - 8)',
        suggestedReps: [12, 10, 8],
        calories: 40,
        proteinRequired: 8,
        biomechanics: 'شیب صندلی حدود ۷۵ درجه تنظیم شود تا از قوس کمر جلوگیری شود.',
        youtubeId: 'qEwKCR5JCog',
        aparatId: ''
      },
      {
        id: 'ex_arm_supinating_curl',
        nameFa: 'جلو بازو دمبل چرخشی',
        nameEn: 'DB Supinating Bicep Curl',
        targetMuscle: 'دو سر بازویی',
        metricType: 'weight_reps',
        setsCount: 3,
        setsReps: '3 × (12 - 10 - 10)',
        suggestedReps: [12, 10, 10],
        calories: 35,
        proteinRequired: 6,
        biomechanics: 'چرخش کامل مچ در بالاترین نقطه بدون پرتاب و تاب دادن کمر.',
        youtubeId: 'in7PaeYlhrM',
        aparatId: ''
      },
      {
        id: 'ex_arm_tricep_rope',
        nameFa: 'پشت بازو سیمکش طناب',
        nameEn: 'Tricep Rope Pushdown',
        targetMuscle: 'سه سر بازویی',
        metricType: 'weight_reps',
        setsCount: 3,
        setsReps: '3 × (12 - 10 - 10)',
        suggestedReps: [12, 10, 10],
        calories: 35,
        proteinRequired: 6,
        biomechanics: 'باز کردن دست‌ها در پایین حرکت و ثابت نگه داشتن آرنج در پهلو.',
        youtubeId: 'vB5OHsJ3EME',
        aparatId: ''
      }
    ]
  },
  workout_mon: {
    id: 'workout_mon',
    title: 'پایین‌تنه و ثبات ستون فقرات',
    exercises: [
      {
        id: 'ex_leg_goblet_squat',
        nameFa: 'گابلت اسکوات با دمبل',
        nameEn: 'Goblet Squat',
        targetMuscle: 'چهارسر ران، سرینی، کور',
        metricType: 'weight_reps',
        setsCount: 4,
        setsReps: '4 × (12 - 10 - 8 - 8)',
        suggestedReps: [12, 10, 8, 8],
        calories: 70,
        proteinRequired: 12,
        biomechanics: 'نگه داشتن دمبل چسبیده به سینه، تنه را کاملاً عمود و ایمن نگه می‌دارد.',
        youtubeId: 'MeIiIdhvXT4',
        aparatId: ''
      },
      {
        id: 'ex_leg_rdl',
        nameFa: 'ددلیفت رومانیایی با دمبل (RDL)',
        nameEn: 'Dumbbell Romanian Deadlift',
        targetMuscle: 'همسترینگ و سرینی (ایمن برای کمر)',
        metricType: 'weight_reps',
        setsCount: 4,
        setsReps: '4 × (12 - 10 - 8 - 8)',
        suggestedReps: [12, 10, 8, 8],
        calories: 70,
        proteinRequired: 12,
        biomechanics: 'خم شدن فقط از مفصل ران (Hip Hinge) با کمر کاملاً صاف؛ زانوها زاویه ثابت و فرستادن باسن به عقب.',
        youtubeId: '_oyxCanto28',
        aparatId: ''
      },
      {
        id: 'ex_core_pallof_press',
        nameFa: 'پالوف پرس با کش یا سیمکش (ضد چرخش)',
        nameEn: 'Pallof Press',
        targetMuscle: 'عضلات مورب و ثبات‌دهنده عمیق ستون فقرات',
        metricType: 'weight_reps',
        setsCount: 3,
        setsReps: '3 × (12 - 12 - 12)',
        suggestedReps: [12, 12, 12],
        calories: 25,
        proteinRequired: 4,
        biomechanics: 'مقاومت در برابر چرخش تنه در حین جلو بردن دست‌ها؛ فوق‌العاده برای پشت‌میزنشینان.',
        youtubeId: 'AH_QZLm_0-s',
        aparatId: ''
      },
      {
        id: 'ex_core_bird_dog',
        nameFa: 'پرنده-سگ مک‌گیل (McGill Bird-Dog)',
        nameEn: 'McGill Bird-Dog',
        targetMuscle: 'ثبات مرکزی و سلامت دیسک کمر',
        metricType: 'time_seconds',
        setsCount: 3,
        setsReps: '۳ ست ۳۰ ثانیه (مکث ۵ ثانیه)',
        defaultSeconds: 30,
        calories: 20,
        proteinRequired: 3,
        biomechanics: 'دست و پای مخالف در امتداد بدن با مکث ۵ ثانیه‌ای بدون چرخش لگن.',
        youtubeId: '4_A7G7_sO78',
        aparatId: ''
      }
    ]
  },
  workout_tue: {
    id: 'workout_tue',
    title: 'ریکاوری و حرکات اصلاحی',
    exercises: [
      {
        id: 'ex_core_deadbug',
        nameFa: 'ددباگ (حشره مرده - ثبات ستون فقرات)',
        nameEn: 'Dead Bug Exercise',
        targetMuscle: 'عرضی شکم و تثبیت لگن بدون فشار کمر',
        metricType: 'weight_reps',
        setsCount: 3,
        setsReps: '3 × 12',
        suggestedReps: [12, 12, 12],
        calories: 20,
        proteinRequired: 3,
        biomechanics: 'پایین کمر کاملاً چسبیده به زمین، دست و پای مخالف با بازدم عمیق به پایین می‌روند.',
        youtubeId: 'g_BYB0R-4Ws',
        aparatId: ''
      }
    ]
  },
  workout_wed: {
    id: 'workout_wed',
    title: 'فول بادی هایپرتروفی و عضلات کمکی',
    exercises: [
      {
        id: 'ex_chest_inc_db',
        nameFa: 'پرس بالاسینه با دمبل',
        nameEn: 'Incline Dumbbell Press',
        targetMuscle: 'بخش بالایی سینه',
        metricType: 'weight_reps',
        setsCount: 4,
        setsReps: '4 × (12 - 10 - 8 - 8)',
        suggestedReps: [12, 10, 8, 8],
        calories: 55,
        proteinRequired: 9,
        biomechanics: 'شیب میز روی ۳۰ درجه تنظیم شود تا فشار از مفصل سرشانه به بالاسینه منتقل شود.',
        youtubeId: '8iPEnn-ltC8',
        aparatId: ''
      },
      {
        id: 'ex_back_seated_cable_row',
        nameFa: 'زیربغل قایقی سیمکش (موازی)',
        nameEn: 'Seated Cable Row',
        targetMuscle: 'رومبوئید و بخش میانی پشت',
        metricType: 'weight_reps',
        setsCount: 4,
        setsReps: '4 × (12 - 10 - 8 - 8)',
        suggestedReps: [12, 10, 8, 8],
        calories: 55,
        proteinRequired: 9,
        biomechanics: 'جمع کردن کتف‌ها به عقب، زانوها کمی خم و کمر کاملاً صاف بدون قوز.',
        youtubeId: 'GZbfZ033fBo',
        aparatId: ''
      },
      {
        id: 'ex_sh_lateral_raise',
        nameFa: 'نشر جانب با سیمکش یا دمبل',
        nameEn: 'Lateral Raise',
        targetMuscle: 'دلتوئید میانی',
        metricType: 'weight_reps',
        setsCount: 3,
        setsReps: '3 × (15 - 12 - 10)',
        suggestedReps: [15, 12, 10],
        calories: 30,
        proteinRequired: 5,
        biomechanics: 'حرکت در صفحه اسکاپولار (دست‌ها ۳۰ درجه متمایل به جلو) تا ارتفاع شانه.',
        youtubeId: '3VcKaXpzqRo',
        aparatId: ''
      }
    ]
  },
  workout_thu: {
    id: 'workout_thu',
    title: 'کاردیو اینتروال و عضلات شکم',
    exercises: [
      {
        id: 'ex_cardio_cycling',
        nameFa: 'دوچرخه ثابت هوازی (Zone 2)',
        nameEn: 'Stationary Bike (Zone 2)',
        targetMuscle: 'قلبی‌عروقی و پاها',
        metricType: 'time_seconds',
        setsCount: 1,
        setsReps: '۳۰ دقیقه مداوم',
        defaultSeconds: 1800,
        calories: 230,
        proteinRequired: 12,
        biomechanics: 'تنظیم ارتفاع زین به اندازه سطح لگن، رکاب زدن با کادنس روان ۸۰ تا ۹۰.',
        youtubeId: 'r4D3lB6VvG8',
        aparatId: ''
      }
    ]
  },
  workout_fri: {
    id: 'workout_fri',
    title: 'شناوری و استراحت فعال',
    exercises: [
      {
        id: 'ex_cardio_swim',
        nameFa: 'شنای آرام و ریکاوری در آب',
        nameEn: 'Recovery Swimming',
        targetMuscle: 'مفاصل، ریه‌ها، رهاسازی ستون فقرات',
        metricType: 'time_seconds',
        setsCount: 1,
        setsReps: '۳۰ الی ۴۵ دقیقه آرام',
        defaultSeconds: 1800,
        calories: 200,
        proteinRequired: 10,
        biomechanics: 'شناوری و تخلیه اسید لاکتیک بدون خستگی شدید عضلانی.',
        youtubeId: 'pfn8_d_Wb08',
        aparatId: ''
      }
    ]
  }
};

export const dietMealsData = [
  {
    id: 'm_breakfast',
    time: '۰۷:۰۰ - ۰۷:۳۰',
    title: 'صبحانه کامل پروتئینی',
    subtitle: 'تخم‌مرغ + نان سنگک + عدسی',
    items: ['۳ عدد تخم‌مرغ کامل آبپز', '۱ کف دست نان سنگک (۳۰g)', '۱ پیاله عدسی پخته (۱۵۰g)', '۱ لیوان چای سبز'],
    calories: 420,
    protein: 30,
    icon: 'Egg',
    category: 'وعده اصلی'
  },
  {
    id: 'm_snack1',
    time: '۱۰:۳۰',
    title: 'میان‌وعده صبح و میوه',
    subtitle: 'سیب تازه + مغز گردو',
    items: ['۱ عدد سیب متوسط', '۳۰ گرم گردوی خام', '۱ لیوان آب بزرگ'],
    calories: 220,
    protein: 5,
    icon: 'Apple',
    category: 'میان‌وعده'
  },
  {
    id: 'm_lunch',
    time: '۱۳:۳۰',
    title: 'ناهار پروتئینی و کربوهیدرات کمپلکس',
    subtitle: 'فیله مرغ + برنج کته + سالاد',
    items: ['۱۸۰ گرم فیله مرغ گریل', '۸ قاشق برنج کته بدون روغن زیاد', '۱ پیاله ماست پرپروتئین', '۱ ظرف سالاد با ۱ قاشق روغن زیتون'],
    calories: 620,
    protein: 55,
    icon: 'Utensils',
    category: 'وعده اصلی'
  },
  {
    id: 'm_preworkout',
    time: '۱۶:۳۰',
    title: 'پیش از تمرین',
    subtitle: 'انرژی و تمرکز',
    items: ['۱ فنجان قهوه اسپرسو تلخ', '۱ عدد موز متوسط', '۴ عدد قرص BCAA'],
    calories: 120,
    protein: 5,
    icon: 'Zap',
    category: 'مکمل'
  },
  {
    id: 'm_postworkout',
    time: '۱۸:۴۵',
    title: 'بلافاصله بعد از تمرین',
    subtitle: 'پروتئین وی و ریکاوری سریع',
    items: ['۱ پیمانه پودر پروتئین وی (۳۰g)', '۵ گرم گلوتامین', '۱ عدد سیب‌زمینی متوسط آبپز'],
    calories: 240,
    protein: 26,
    icon: 'Activity',
    category: 'ریکاوری'
  },
  {
    id: 'm_dinner',
    time: '۲۱:۰۰',
    title: 'شام سبک و غنی',
    subtitle: 'ماهی قزل‌آلا + سبزیجات بخارپز',
    items: ['۱۵۰ گرم ماهی قزل‌آلا کبابی', '۱ ظرف اسفناج و بروکلی بخارپز', '۱ قاشق چایخوری روغن زیتون'],
    calories: 320,
    protein: 38,
    icon: 'Moon',
    category: 'وعده اصلی'
  },
  {
    id: 'm_bedtime',
    time: '۲۲:۱۵',
    title: 'قبل از خواب',
    subtitle: 'کیفیت خواب و کلسیم',
    items: ['۱ لیوان شیر کم‌چرب ولرم', '۱ عدد قرص کلسیم-منیزیم'],
    calories: 90,
    protein: 7,
    icon: 'Bed',
    category: 'مکمل خواب'
  }
];

export const ergonomicGuidelines = {
  rule: 'قانون ۳۰/۲ (Cornell & Stuart McGill Protocol)',
  description: 'هر ۳۰ دقیقه نشستن پشت میز کار = ۲ دقیقه ایستادن، کشش فعال و پیاده‌روی کوتاه',
  drMcGillBig3: [
    {
      title: 'کرل‌آپ اصلاح‌شده مک‌گیل (McGill Curl-up)',
      description: 'یک پا صاف، یک پا خم، دست‌ها زیر قوس کمر. بالا آوردن سر و شانه بدون گرد کردن ستون فقرات کمری.',
      target: 'تقویت عضله راست شکمی بدون بار برشی دیسک'
    },
    {
      title: 'پل پهلو (Side Plank)',
      description: 'روی ساعد و لبه بیرونی پا. بدن در خط مستقیم کامل.',
      target: 'تقویت عضلات مربع کمری (Quadratus Lumborum)'
    },
    {
      title: 'پرنده-سگ (Bird-Dog)',
      description: 'چهار دست و پا، دست و پای مخالف کشیده و افقی. مکث ۵ ثانیه با بازدم عمیق.',
      target: 'ثبات عضلات اکستنسور و چندسرای (Multifidus)'
    }
  ],
  stretches: [
    {
      name: 'کشش فلکسور ران (Half-Kneeling Hip Flexor Stretch)',
      timing: 'هر ۲ ساعت یک‌بار',
      duration: '۳۰ ثانیه هر طرف',
      effect: 'خنثی‌سازی کوتاهی عضلهسوآس (Psoas) ناشی از صندلی'
    },
    {
      name: 'انبساط قفسه سینه در درگاه در (Doorway Pec Stretch)',
      timing: 'در حین استراحت‌های ۲ دقیقه‌ای',
      duration: '۳۰ ثانیه',
      effect: 'اصلاح شانه جلوآمده و قوز پشتی پشت میز'
    },
    {
      name: 'چین‌تاک گردن (Chin Tucks)',
      timing: 'هر ۱ ساعت',
      duration: '۱۰ تکرار با مکث ۲ ثانیه',
      effect: 'کاهش سندرم سر به جلو (Forward Head Posture)'
    }
  ]
};
