export const userProfile = {
  name: "آقای اردالان کتابچی",
  height: "۱۷۸ سانتی‌متر",
  weight: "۷۱.۸ کیلوگرم",
  age: "۳۴ سال",
  fatPercentage: "۳۰.۴٪",
  muscleMass: "۲۷.۳ کیلوگرم",
  bmr: "۱۴۵۰ کیلوکالری",
  dailyTargetCalories: "۲۲۰۰",
  dailyTargetProtein: "۱۹۲",
  waterTargetLiters: 2.5,
  deskHours: 10,
  goal: "کاهش ۱۱ کیلوگرم چربی احشایی/سطحی + افزایش توده عضلانی (Body Recomposition)"
};

export const daysSchedule = [
  {
    id: "saturday",
    dayIndex: 6, // JS getDay: 6 = Saturday
    dayName: "شنبه",
    title: "دویدن ایزی ران (Easy Run)",
    type: "cardio",
    category: "کاردیو و چربی‌سوزی",
    wakeUpTime: "۰۵:۰۰",
    startTime: "۰۵:۴۵",
    duration: "۲۰ تا ۳۰ دقیقه (۵ تا ۸ کیلومتر)",
    target: "ضربان قلب زون ۲ (چربی‌سوزی بهینه و بهبود آستانه هوازی)",
    tag: "دویدن صبحگاهی",
    color: "from-blue-500/20 to-cyan-500/20 border-cyan-500/30 text-cyan-400",
    workoutId: "run_zone2",
    morningCardioNote: "پیش از شروع: صرفاً نوشیدنی ناشتا + ۴ عدد قرص BCAA + قرص کافئین مصرف کنید. صبحانه اصلی را بلافاصله پس از اتمام تمرین و دوش گرفتن میل نمایید."
  },
  {
    id: "sunday",
    dayIndex: 0, // 0 = Sunday
    dayName: "یکشنبه",
    title: "تمرین وزنه - جلسه اول (Full Body A)",
    type: "strength",
    category: "تمرین قدرتی و هایپرتروفی",
    wakeUpTime: "۰۶:۳۰",
    startTime: "۱۷:۳۰ (عصر)",
    duration: "۵۰ دقیقه",
    target: "تمرکز روی الگوی اسکوات، پرس و کشش عمودی",
    tag: "فول بادی A",
    color: "from-emerald-500/20 to-green-500/20 border-emerald-500/30 text-emerald-400",
    workoutId: "full_body_a"
  },
  {
    id: "monday",
    dayIndex: 1, // 1 = Monday
    dayName: "دوشنبه",
    title: "کاردیو و ترکیبی گروهی",
    type: "cardio",
    category: "کاردیو و استقامت",
    wakeUpTime: "۰۵:۴۵",
    startTime: "۰۶:۳۰",
    duration: "۱ ساعت",
    target: "تمرین گروهی (استقامت قلبی-عروقی و تقویت سیستم متابولیک)",
    tag: "کاردیو گروهی",
    color: "from-indigo-500/20 to-purple-500/20 border-indigo-500/30 text-indigo-400",
    workoutId: "group_cardio_1",
    morningCardioNote: "پیش از شروع: نوشیدنی ناشتا + ۴ عدد BCAA + قرص کافئین. صبحانه اصلی پس از تمرین."
  },
  {
    id: "tuesday",
    dayIndex: 2, // 2 = Tuesday
    dayName: "سه‌شنبه",
    title: "تمرین وزنه - جلسه دوم (Full Body B)",
    type: "strength",
    category: "تمرین قدرتی و هایپرتروفی",
    wakeUpTime: "۰۶:۳۰",
    startTime: "۱۷:۳۰ (عصر)",
    duration: "۵۰ دقیقه",
    target: "تمرکز روی الگوی هینج (RDL)، پرس بالای سر و افقی",
    tag: "فول بادی B",
    color: "from-emerald-500/20 to-teal-500/20 border-emerald-500/30 text-emerald-400",
    workoutId: "full_body_b"
  },
  {
    id: "wednesday",
    dayIndex: 3, // 3 = Wednesday
    dayName: "چهارشنبه",
    title: "کاردیو و ترکیبی گروهی",
    type: "cardio",
    category: "کاردیو و استقامت",
    wakeUpTime: "۰۵:۴۵",
    startTime: "۰۶:۳۰",
    duration: "۱ ساعت",
    target: "تمرین گروهی جهت حفظ ضربان قلب و کالری‌سوزی بالا",
    tag: "کاردیو گروهی",
    color: "from-indigo-500/20 to-purple-500/20 border-indigo-500/30 text-indigo-400",
    workoutId: "group_cardio_2",
    morningCardioNote: "پیش از شروع: نوشیدنی ناشتا + ۴ عدد BCAA + قرص کافئین. صبحانه اصلی پس از تمرین."
  },
  {
    id: "thursday",
    dayIndex: 4, // 4 = Thursday
    dayName: "پنج‌شنبه",
    title: "تمرین وزنه - جلسه سوم (Full Body C)",
    type: "strength",
    category: "تمرین قدرتی و هایپرتروفی",
    wakeUpTime: "۰۶:۳۰",
    startTime: "۱۷:۳۰ (عصر)",
    duration: "۵۰ دقیقه",
    target: "تمرکز روی هیپرتروفی عضلات کمکی و ثبات کور و لگن",
    tag: "فول بادی C",
    color: "from-amber-500/20 to-orange-500/20 border-amber-500/30 text-amber-400",
    workoutId: "full_body_c"
  },
  {
    id: "friday",
    dayIndex: 5, // 5 = Friday
    dayName: "جمعه",
    title: "شنا (شناور) + استراحت فعال",
    type: "recovery",
    category: "ریکاوری فعال و مفاصل",
    wakeUpTime: "دلخواه",
    startTime: "صبح یا عصر (دلخواه)",
    duration: "۴۵ دقیقه",
    target: "حرکت در آب و شنای آرام برای ریکاوری مفاصل و تخلیه اسید لاکتیک",
    tag: "ریکاوری در آب",
    color: "from-sky-500/20 to-blue-500/20 border-sky-500/30 text-sky-400",
    workoutId: "active_recovery_swim"
  }
];

export const workoutsData = {
  full_body_a: {
    id: "full_body_a",
    title: "جلسه اول (Full Body A) - روز یکشنبه",
    duration: "۵۰ دقیقه",
    restBetweenSets: "۶۰ تا ۹۰ ثانیه",
    totalExercises: 6,
    description: "تمرکز روی الگوی اسکوات، پرس و کشش عمودی با حداکثر ایمنی ستون فقرات",
    exercises: [
      {
        id: "fb_a_1",
        nameFa: "پرس سینه دمبل روی میز صاف",
        nameEn: "Dumbbell Bench Press",
        setsReps: "4 × (12 - 10 - 8 - 6)",
        setsCount: 4,
        suggestedReps: [12, 10, 8, 6],
        calories: 60,
        proteinRequired: 10,
        biomechanics: "آرنج‌ها زاویه ۴۵ درجه با بدن داشته باشند (نه ۹۰ درجه). سینه را بالا نگه داشته و در پایین حرکت کشش ملایم احساس کنید.",
        youtubeId: "VmB1G1K7v94",
        youtubeTitle: "How To Properly Dumbbell Bench Press (Scott Herman)",
        targetMuscle: "سینه، پشت بازو، دلتوئید قدامی"
      },
      {
        id: "fb_a_2",
        nameFa: "زیربغل لت سیمکش دست باز",
        nameEn: "Lat Pulldown",
        setsReps: "4 × (12 - 10 - 8 - 8)",
        setsCount: 4,
        suggestedReps: [12, 10, 8, 8],
        calories: 55,
        proteinRequired: 9,
        biomechanics: "کشش کامل در بالای حرکت بدون لم دادن یا تاب خوردن به عقب. میله را تا بالای استخوان جناغ سینه پایین بکشید.",
        youtubeId: "CAwf7n6Luuc",
        youtubeTitle: "Lat Pulldown Form Guide (Renaissance Periodization)",
        targetMuscle: "زیربغل (پشتی بزرگ)، جلوبازو"
      },
      {
        id: "fb_a_3",
        nameFa: "ددلیفت رومانیایی با دمبل (جایگزین فیله کمر)",
        nameEn: "Dumbbell Romanian Deadlift (RDL)",
        setsReps: "4 × (12 - 10 - 8 - 8)",
        setsCount: 4,
        suggestedReps: [12, 10, 8, 8],
        calories: 70,
        proteinRequired: 12,
        biomechanics: "خم شدن فقط از مفصل ران (Hip Hinge) با کمر کاملاً صاف؛ تقویت همسترینگ و باسن بدون هیچ‌گونه فشار دیسک کمر.",
        youtubeId: "_oyxCanto28",
        youtubeTitle: "Dumbbell RDL Proper Technique (Jeff Nippard)",
        targetMuscle: "همسترینگ، سرینی، فیله کمر ایمن"
      },
      {
        id: "fb_a_4",
        nameFa: "جلو پا دستگاه",
        nameEn: "Leg Extension",
        setsReps: "3 × (15 - 12 - 10)",
        setsCount: 3,
        suggestedReps: [15, 12, 10],
        calories: 40,
        proteinRequired: 7,
        biomechanics: "مکث ۱ ثانیه‌ای در اوج انقباض بالایی حرکت و برگشت کنترل‌شده در ۲ الی ۳ ثانیه.",
        youtubeId: "YyvSfVQIaoE",
        youtubeTitle: "Leg Extension Exercise Tutorial (Scott Herman)",
        targetMuscle: "چهارسر ران (کوادریسپس)"
      },
      {
        id: "fb_a_5",
        nameFa: "سوپرست: جلو بازو دمبل چرخشی + پشت بازو طناب",
        nameEn: "Superset: DB Supinating Curl + Rope Tricep Pushdown",
        setsReps: "3 × (12 - 10)",
        setsCount: 3,
        suggestedReps: [12, 10, 10],
        calories: 45,
        proteinRequired: 8,
        biomechanics: "تمرکز روی کنترل بخش منفی حرکت (۳ ثانیه پایین آوردن). در حرکت طناب، دست‌ها در انتها کمی باز شوند.",
        youtubeId: "in7PaeYlhrM",
        youtubeTitle: "Bicep Curl & Tricep Rope Form (Athlean-X)",
        targetMuscle: "دو سر و سه سر بازویی"
      },
      {
        id: "fb_a_6",
        nameFa: "پالوف پرس با کش/سیمکش (ضد چرخش)",
        nameEn: "Pallof Press",
        setsReps: "3 × 12 (هر طرف)",
        setsCount: 3,
        suggestedReps: [12, 12, 12],
        calories: 25,
        proteinRequired: 4,
        biomechanics: "تقویت عمیق دیواره شکم و ثبات لومبار برای افراد پشت‌میزنشین؛ حفظ ثبات کامل تنه در حین هل دادن دست به جلو.",
        youtubeId: "AH_QZLm_0-s",
        youtubeTitle: "Pallof Press Core Exercise (Squat University)",
        targetMuscle: "عضلات مورب شکمی، ثبات‌دهنده‌های ستون فقرات"
      }
    ]
  },
  full_body_b: {
    id: "full_body_b",
    title: "جلسه دوم (Full Body B) - روز سه‌شنبه",
    duration: "۵۰ دقیقه",
    restBetweenSets: "۶۰ تا ۹۰ ثانیه",
    totalExercises: 6,
    description: "تمرکز روی الگوی هینج (RDL)، پرس بالای سر و عضلات پشتی افقی",
    exercises: [
      {
        id: "fb_b_1",
        nameFa: "پرس سرشانه نشسته با دمبل",
        nameEn: "Seated DB Shoulder Press",
        setsReps: "4 × (12 - 10 - 8 - 8)",
        setsCount: 4,
        suggestedReps: [12, 10, 8, 8],
        calories: 50,
        proteinRequired: 8,
        biomechanics: "تکیه‌گاه صندلی روی زاویه ۷۵ تا ۸۰ درجه تنظیم شود تا از ایجاد قوس شدید در پایین کمر جلوگیری شود.",
        youtubeId: "qEwKCR5JCog",
        youtubeTitle: "Seated Dumbbell Shoulder Press Tutorial",
        targetMuscle: "دلتوئید قدامی و میانی، پشت بازو"
      },
      {
        id: "fb_b_2",
        nameFa: "زیربغل قایقی سیمکش (موازی)",
        nameEn: "Seated Cable Row",
        setsReps: "4 × (12 - 10 - 8 - 8)",
        setsCount: 4,
        suggestedReps: [12, 10, 8, 8],
        calories: 55,
        proteinRequired: 9,
        biomechanics: "انقباض کامل عضلات میان‌پشتی و جمع کردن استخوان کتف به عقب، زانوها کمی خم و بالاتنه کاملاً ثابت.",
        youtubeId: "GZbfZ033fBo",
        youtubeTitle: "Seated Cable Row Proper Form (Jeff Nippard)",
        targetMuscle: "رومبوئید، متوازی‌الاضلاع، بخش میانی پشت"
      },
      {
        id: "fb_b_3",
        nameFa: "پشت پا دستگاه خوابیده",
        nameEn: "Lying Leg Curl",
        setsReps: "4 × (12 - 10 - 8 - 8)",
        setsCount: 4,
        suggestedReps: [12, 10, 8, 8],
        calories: 45,
        proteinRequired: 8,
        biomechanics: "لگن حتماً به تشک چسبیده باشد تا فشار اضافی به مهره‌های کمر وارد نشود. نوک پا متمایل به ساق.",
        youtubeId: "1Tq3QdYUuHs",
        youtubeTitle: "Lying Leg Curl Technique (Renaissance Periodization)",
        targetMuscle: "همسترینگ (پشت پا)"
      },
      {
        id: "fb_b_4",
        nameFa: "نشر جانب با سیمکش یا دمبل",
        nameEn: "Lateral Raise",
        setsReps: "3 × (15 - 12 - 10)",
        setsCount: 3,
        suggestedReps: [15, 12, 10],
        calories: 30,
        proteinRequired: 5,
        biomechanics: "دست‌ها کمی متمایل به جلو در صفحه اسکاپولار (زاویه ۳۰ درجه به جلو). بالا آوردن تا راستای شانه بدون پرتاب وزن.",
        youtubeId: "3VcKaXpzqRo",
        youtubeTitle: "Side Lateral Raise Form & Mistakes (Athlean-X)",
        targetMuscle: "دلتوئید میانی (بخش پهن سرشانه)"
      },
      {
        id: "fb_b_5",
        nameFa: "پل لگن با وزنه / هیپ تراست",
        nameEn: "Hip Thrust / Glute Bridge",
        setsReps: "3 × (12 - 10)",
        setsCount: 3,
        suggestedReps: [12, 10, 10],
        calories: 60,
        proteinRequired: 10,
        biomechanics: "بهترین حرکت تقویت عضلات سرینی بدون هیچ‌گونه فشار به ستون فقرات؛ انقباض ۲ ثانیه‌ای باسن در بالاترین نقطه.",
        youtubeId: "SEdqd1n0cvg",
        youtubeTitle: "How to Hip Thrust Properly (Bret Contreras)",
        targetMuscle: "عضلات سرینی بزرگ، همسترینگ"
      },
      {
        id: "fb_b_6",
        nameFa: "پرنده-سگ مک‌گیل (تثبیت‌کننده کور)",
        nameEn: "McGill Bird-Dog",
        setsReps: "3 × 10 (مکث ۵ ثانیه)",
        setsCount: 3,
        suggestedReps: [10, 10, 10],
        calories: 20,
        proteinRequired: 3,
        biomechanics: "دست و پای مخالف در امتداد مستقیم بدن کشیده شوند بدون چرخش لگن؛ فوق‌العاده برای سلامت دیسک کمر.",
        youtubeId: "4_A7G7_sO78",
        youtubeTitle: "McGill Bird Dog Technique (Dr. Stuart McGill)",
        targetMuscle: "عضلات عمقی ستون فقرات و ثبات مرکزی"
      }
    ]
  },
  full_body_c: {
    id: "full_body_c",
    title: "جلسه سوم (Full Body C) - روز پنج‌شنبه",
    duration: "۵۰ دقیقه",
    restBetweenSets: "۶۰ تا ۹۰ ثانیه",
    totalExercises: 6,
    description: "تمرکز روی هیپرتروفی عضلات کمکی، ثبات کور و ساختار پایه‌ای بدن",
    exercises: [
      {
        id: "fb_c_1",
        nameFa: "اسکوات با دمبل یا گابلت اسکوات",
        nameEn: "Goblet Squat",
        setsReps: "4 × (12 - 10 - 8 - 8)",
        setsCount: 4,
        suggestedReps: [12, 10, 8, 8],
        calories: 75,
        proteinRequired: 12,
        biomechanics: "نگه داشتن دمبل چسبیده به سینه باعث حفظ راستای عمودی ستون فقرات و کاهش فشار بر مهره‌های کمری می‌شود.",
        youtubeId: "MeIiIdhvXT4",
        youtubeTitle: "Goblet Squat Form and Benefits (Squat University)",
        targetMuscle: "چهارسر ران، سرینی، عضلات مرکزی"
      },
      {
        id: "fb_c_2",
        nameFa: "پرس بالا سینه با دمبل",
        nameEn: "Incline DB Press",
        setsReps: "4 × (12 - 10 - 8 - 8)",
        setsCount: 4,
        suggestedReps: [12, 10, 8, 8],
        calories: 55,
        proteinRequired: 9,
        biomechanics: "شیب میز روی ۳۰ درجه تنظیم شود (شیب زیاد فشار را از بالای سینه به مفصل سرشانه منتقل می‌کند).",
        youtubeId: "8iPEnn-ltC8",
        youtubeTitle: "Incline Dumbbell Press Mastery (Scott Herman)",
        targetMuscle: "بخش بالایی سینه (Clavicular Head)، پشت بازو"
      },
      {
        id: "fb_c_3",
        nameFa: "زیربغل تک دمبل خم (با تکیه‌گاه)",
        nameEn: "One-Arm DB Row",
        setsReps: "3 × (12 - 10 - 8)",
        setsCount: 3,
        suggestedReps: [12, 10, 8],
        calories: 50,
        proteinRequired: 8,
        biomechanics: "دست و زانوی مخالف روی میز قرار گیرد جهت به حداقل رساندن گشتاور و فشار روی مهره‌های کمری.",
        youtubeId: "pYcpY20QaE8",
        youtubeTitle: "One Arm Dumbbell Row Tutorial (Jeff Nippard)",
        targetMuscle: "عضله پشتی بزرگ، رومبوئید"
      },
      {
        id: "fb_c_4",
        nameFa: "پشت بازو دیپ دستگاه یا پارالل کمکی",
        nameEn: "Machine Dip / Assisted Dip",
        setsReps: "3 × (12 - 10)",
        setsCount: 3,
        suggestedReps: [12, 10, 10],
        calories: 40,
        proteinRequired: 7,
        biomechanics: "بدن کمی به جلو متمایل باشد، آرنج‌ها در دامنه ۹۰ درجه خم شوند و از قفل کردن ناگهانی مفصل خودداری کنید.",
        youtubeId: "2z8JmcrW-As",
        youtubeTitle: "Machine Dip Form Guide",
        targetMuscle: "سه سر بازویی، بخش پایینی سینه"
      },
      {
        id: "fb_c_5",
        nameFa: "جلو بازو لاری دستگاه یا هالتر EZ",
        nameEn: "Preacher Curl",
        setsReps: "3 × (12 - 10)",
        setsCount: 3,
        suggestedReps: [12, 10, 10],
        calories: 35,
        proteinRequired: 6,
        biomechanics: "ایزوله کردن کامل عضله دو سر بازویی بدون استفاده از پرتاب بالاتنه. کشش کنترل‌شده در پایین حرکت.",
        youtubeId: "fIWP-FRFNU0",
        youtubeTitle: "Preacher Curl Proper Execution (RP Strength)",
        targetMuscle: "دو سر بازویی (بخش کوتاه و ضخامت بازو)"
      },
      {
        id: "fb_c_6",
        nameFa: "پلانک ساعد با انقباض فعال",
        nameEn: "RKC Plank",
        setsReps: "3 × ۳۰ ثانیه",
        setsCount: 3,
        suggestedReps: [30, 30, 30],
        calories: 25,
        proteinRequired: 4,
        biomechanics: "سفت کردن همزمان عضلات شکم، سرینی و کوادریسپس؛ فشار دادن آرنج‌ها به سمت پاها برای انقباض حداکثری.",
        youtubeId: "6TKwMm6v0q8",
        youtubeTitle: "RKC Plank Technique for Core Strength",
        targetMuscle: "راست شکمی، عرضی شکم، سرینی"
      }
    ]
  },
  run_zone2: {
    id: "run_zone2",
    title: "دویدن ایزی ران (Zone 2) - روز شنبه",
    duration: "۲۰ تا ۳۰ دقیقه",
    restBetweenSets: "پیوسته با ضربان کنترل‌شده",
    totalExercises: 2,
    description: "دویدن ملایم ۵ تا ۸ کیلومتر در محدوده ضربان زون ۲ (قابلیت صحبت کردن بدون تنگی نفس)",
    exercises: [
      {
        id: "run_1",
        nameFa: "گرم کردن پویا و فعال‌سازی مفاصل",
        nameEn: "Dynamic Warm-up & Hip Mobility",
        setsReps: "۵ دقیقه",
        setsCount: 1,
        suggestedReps: [1],
        calories: 30,
        proteinRequired: 2,
        biomechanics: "حرکات پروانه‌ای، چرخش مچ پا، لانج کوتاه و کشش پویا برای آماده‌سازی عضلات و مفاصل.",
        youtubeId: "nPHfEnScdvU",
        youtubeTitle: "Dynamic Warmup for Runners",
        targetMuscle: "مفاصل مچ، زانو، ران و سیستم قلبی"
      },
      {
        id: "run_2",
        nameFa: "دویدن ایزی ران (Zone 2 Heart Rate)",
        nameEn: "Zone 2 Easy Aerobic Run (5-8 km)",
        setsReps: "۲۰-۳۰ دقیقه",
        setsCount: 1,
        suggestedReps: [1],
        calories: 220,
        proteinRequired: 15,
        biomechanics: "ضربان قلب در محدوده ۶۰٪ تا ۷۰٪ حداکثر ضربان (حالت تنفس راحت). گام‌های کوتاه و فرود ملایم روی میانه پا.",
        youtubeId: "03X0_wFqX2M",
        youtubeTitle: "Zone 2 Training Explained for Fat Loss",
        targetMuscle: "سیستم قلبی‌عروقی، چربی‌سوزی میتوکندریایی"
      }
    ]
  },
  group_cardio_1: {
    id: "group_cardio_1",
    title: "کاردیو و ترکیبی گروهی - روز دوشنبه",
    duration: "۶۰ دقیقه",
    restBetweenSets: "طبق ریتم مربی گروهی",
    totalExercises: 2,
    description: "تمرین استقامتی و تنفسی همراه با گروه برای تقویت سیستم قلبی و سوزاندن چربی",
    exercises: [
      {
        id: "gc1_1",
        nameFa: "آمادگی پیش از تمرین و کشش سبک",
        nameEn: "Pre-Workout Prep",
        setsReps: "۱۰ دقیقه",
        setsCount: 1,
        suggestedReps: [1],
        calories: 40,
        proteinRequired: 3,
        biomechanics: "تنظیم تنفس و گرم کردن عضلات مرکزی قبل از استارت فاز پرشدت.",
        youtubeId: "nPHfEnScdvU",
        youtubeTitle: "Cardio Warmup",
        targetMuscle: "عمومی بدن"
      },
      {
        id: "gc1_2",
        nameFa: "تمرین ترکیبی و هیت هوازی گروهی",
        nameEn: "Group Functional Cardio",
        setsReps: "۵۰ دقیقه",
        setsCount: 1,
        suggestedReps: [1],
        calories: 380,
        proteinRequired: 20,
        biomechanics: "حفظ ریتم پیوسته، جلوگیری از جهش‌های ناگهانی به مفصل زانو در پرش‌ها، مصرف متناوب جرعه‌های آب.",
        youtubeId: "ml6cT4AZdqI",
        youtubeTitle: "Full Body HIIT Cardio Workout",
        targetMuscle: "کل عضلات بدن و ظرفیت ریوی"
      }
    ]
  },
  group_cardio_2: {
    id: "group_cardio_2",
    title: "کاردیو و ترکیبی گروهی - روز چهارشنبه",
    duration: "۶۰ دقیقه",
    restBetweenSets: "طبق ریتم مربی گروهی",
    totalExercises: 2,
    description: "جلسه دوم هفتگی تمرین گروهی با تمرکز بر توان هوازی و چربی‌سوزی عمیق",
    exercises: [
      {
        id: "gc2_1",
        nameFa: "آمادگی و فعال‌سازی مفاصل",
        nameEn: "Pre-Workout Prep",
        setsReps: "۱۰ دقیقه",
        setsCount: 1,
        suggestedReps: [1],
        calories: 40,
        proteinRequired: 3,
        biomechanics: "کشش پویا و بالا بردن تدریجی ضربان قلب.",
        youtubeId: "nPHfEnScdvU",
        youtubeTitle: "Cardio Prep",
        targetMuscle: "عمومی بدن"
      },
      {
        id: "gc2_2",
        nameFa: "تمرین ترکیبی و هوازی پرنشاط",
        nameEn: "Group Functional Cardio Session 2",
        setsReps: "۵۰ دقیقه",
        setsCount: 1,
        suggestedReps: [1],
        calories: 380,
        proteinRequired: 20,
        biomechanics: "حفظ فرم ستون فقرات حین حرکات فانکشنال؛ استفاده از تنفس شکمی منظم.",
        youtubeId: "ml6cT4AZdqI",
        youtubeTitle: "Cardio Conditioning Session",
        targetMuscle: "کل عضلات بدن"
      }
    ]
  },
  active_recovery_swim: {
    id: "active_recovery_swim",
    title: "شنا (شناور) + استراحت فعال - روز جمعه",
    duration: "۴۵ دقیقه",
    restBetweenSets: "شناوری و ریکاوری پیوسته",
    totalExercises: 2,
    description: "۴۵ دقیقه حرکت در آب و شنای آرام برای ریکاوری مفاصل و تخلیه اسید لاکتیک",
    exercises: [
      {
        id: "swim_1",
        nameFa: "شناوری و راه رفتن در آب ولرم",
        nameEn: "Water Walking & Floating",
        setsReps: "۱۵ دقیقه",
        setsCount: 1,
        suggestedReps: [1],
        calories: 60,
        proteinRequired: 4,
        biomechanics: "بی‌وزنی در آب فشارهای مهره‌های کمری و مفصل زانو را کاملاً خنثی می‌کند.",
        youtubeId: "pfn8_d_Wb08",
        youtubeTitle: "Water Aerobics & Pool Recovery",
        targetMuscle: "کاهش التهاب و آرامش عضلانی"
      },
      {
        id: "swim_2",
        nameFa: "شنای کرال سینه یا قورباغه آرام",
        nameEn: "Easy Swimming Laps",
        setsReps: "۳۰ دقیقه",
        setsCount: 1,
        suggestedReps: [1],
        calories: 180,
        proteinRequired: 10,
        biomechanics: "کشش دست‌ها در آب و تنفس عمیق، بدون تلاش برای سرعت بالا.",
        youtubeId: "gh5mAtmeR3Y",
        youtubeTitle: "Smooth Swimming Form for Recovery",
        targetMuscle: "انعطاف شانه‌ها، عضلات پشتی و ریه‌ها"
      }
    ]
  }
};

export const dietMealsData = [
  {
    id: "meal_fasting",
    time: "۰۵:۰۰ - ۰۵:۴۵",
    title: "نوشیدنی ناشتا + مکمل‌ها",
    subtitle: "بلافاصله پس از بیداری",
    items: [
      "۱ لیوان آب گرم (۲۵۰ml)",
      "۲ قاشق غذاخوری گلاب (۳۰ml)",
      "۱ قاشق غذاخوری آبلیمو تازه (۱۵ml)",
      "۱ قاشق چایخوری عسل (۱۰g)",
      "۵ گرم کراتین مونوهیدرات",
      "۵ گرم گلوتامین"
    ],
    calories: 40,
    protein: 0,
    icon: "Sunrise",
    category: "مکمل و پاکسازی",
    notes: "در روزهای شنبه، دوشنبه و چهارشنبه که ۶:۳۰ یا ۵:۴۵ تمرین دارید: ۴ عدد قرص BCAA + ۱ عدد قرص کافئین نیز اضافه شود."
  },
  {
    id: "meal_breakfast",
    time: "۰۶:۴۵ - ۰۷:۱۵",
    title: "صبحانه مقوی و پروتئینی",
    subtitle: "املت یا تخم‌مرغ آبپز + عدسی",
    items: [
      "۳ عدد تخم‌مرغ کامل (۱۵۰g)",
      "۱ پیاله عدسی پخته (۱۵۰g)",
      "۱ کف دست نان سنگک (۳۰g)",
      "۱ لیوان چای سبز"
    ],
    calories: 420,
    protein: 31,
    icon: "Egg",
    category: "وعده اصلی",
    notes: "در روزهای کاردیو صبحگاهی، این صبحانه بلافاصله پس از اتمام تمرین و دوش میل شود."
  },
  {
    id: "meal_snack1",
    time: "۱۰:۳۰",
    title: "میان‌وعده صبح + ویتامین‌ها",
    subtitle: "میوه تازه و ریزمغذی‌ها",
    items: [
      "۱ عدد موز متوسط (۱۰۰g)",
      "۱ عدد سیب متوسط (۱۵۰g)",
      "۱ عدد مولتی‌ویتامین Alpha Men",
      "۱ عدد کپسول D3 / K2",
      "۱ عدد کپسول Omega 3"
    ],
    calories: 180,
    protein: 2,
    icon: "Apple",
    category: "میان‌وعده و ویتامین",
    notes: "همراه با یک لیوان بزرگ آب میل شود."
  },
  {
    id: "meal_lunch",
    time: "۱۳:۳۰",
    title: "ناهار کامل و حجیم پروتئینی",
    subtitle: "مرغ/گوشت + برنج کته + سالاد",
    items: [
      "۲۰۰ گرم فیله مرغ یا گوشت کم‌چرب (وزن پخته)",
      "۸ قاشق غذاخوری برنج کته (۱۵۰g)",
      "۱۰ عدد زیتون (۳۰g)",
      "۱ پیاله ماست یونانی (۱۵۰g)",
      "۱ ظرف سالاد با ۱ قاشق غذاخوری روغن زیتون (۱۰ml)"
    ],
    calories: 660,
    protein: 62,
    icon: "Utensils",
    category: "وعده اصلی",
    notes: "اصلی‌ترین وعده بارگیری عضلانی روزانه."
  },
  {
    id: "meal_preworkout",
    time: "۱۶:۳۰",
    title: "پیش از تمرین عصرگاهی",
    subtitle: "انرژی، تمرکز و جلوگیری از کاتابولیسم",
    items: [
      "۱ عدد قرص کافئین (یا ۱ شات اسپرسو دوبل)",
      "۴ عدد قرص BCAA",
      "۱ عدد پروتئین‌بار کارن (۶۰g)"
    ],
    calories: 220,
    protein: 20,
    icon: "Zap",
    category: "مکمل پیش از تمرین",
    notes: "حدود ۴۵ تا ۶۰ دقیقه قبل از شروع وزنه مصرف شود."
  },
  {
    id: "meal_postworkout",
    time: "۱۸:۴۵",
    title: "بلافاصله بعد از تمرین",
    subtitle: "ریکاوری سریع و پر کردن گلیکوژن",
    items: [
      "۱ پیمانه پودر پروتئین وی (۳۰g)",
      "۵ گرم گلوتامین",
      "۱ عدد سیب‌زمینی آبپز متوسط (۱۵۰g) یا ۱ عدد موز"
    ],
    calories: 250,
    protein: 26,
    icon: "Activity",
    category: "ریکاوری بعد تمرین",
    notes: "تا حداکثر ۳۰ دقیقه پس از آخرین ست تمرینی مصرف شود."
  },
  {
    id: "meal_dinner",
    time: "۲۱:۰۰",
    title: "شام سبک و غنی از اسیدآمینه",
    subtitle: "فیله مرغ / ماهی قزل‌آلا + سالاد",
    items: [
      "۱۵۰ گرم فیله مرغ یا ماهی قزل‌آلا (پخته)",
      "۱ ظرف سالاد سبزیجات (کاهو، خیار، اسفناج تازه)",
      "۱ قاشق چایخوری روغن زیتون فرابکر (۵ml)",
      "۱ پیاله ماست یونانی (۱۰۰g)"
    ],
    calories: 320,
    protein: 42,
    icon: "Moon",
    category: "وعده اصلی",
    notes: "کم‌کربوهیدرات جهت ترشح بهینه هورمون رشد در خواب."
  },
  {
    id: "meal_bedtime",
    time: "۲۲:۱۵",
    title: "قبل از خواب",
    subtitle: "جذب کلسیم و کیفیت خواب عمیق",
    items: [
      "۱ لیوان شیر کم‌چرب ولرم (۲۰۰ml)",
      "۱ عدد قرص کلسیم - منیزیم"
    ],
    calories: 90,
    protein: 7,
    icon: "Bed",
    category: "مکمل خواب",
    notes: "کلسیم در شب همراه شیر بیشترین جذب و اثر آرام‌بخشی بر عضلات را دارد."
  }
];

export const ergonomicGuidelines = {
  ruleName: "قانون ۳۰/۲ ارگونومی میز کار",
  description: "به ازای هر ۳۰ دقیقه نشستن مداوم، ۲ دقیقه بایستید یا حرکات کششی سینه و فلكسورهای ران (Hip Flexors) را انجام دهید تا جلوگردنی و قوز پشتی ایجاد نشود.",
  waterGoal: "۲.۵ لیتر آب روزانه در طول ۱۰ ساعت کار (جلوگیری از خشکی مفاصل و کندی متابولیسم)",
  calciumNote: "قرص کلسیم را حتماً شب‌ها همراه ۱ لیوان شیر میل کنید تا خواب عمیق‌تر و ریکاوری بافت استخوانی تکمیل شود.",
  deskWorkerStretches: [
    {
      title: "کشش فلکسورهای ران (Hip Flexor Stretch)",
      duration: "۳۰ ثانیه هر پا",
      benefit: "آزاد کردن گرفتگی لگن ناشی از نشستن طولانی و محافظت از دیسک کمر",
      youtubeId: "Jbg_vUvNl_Q"
    },
    {
      title: "کشش گوشه دیوار برای سینه و شانه (Doorway Pec Stretch)",
      duration: "۳۰ ثانیه",
      benefit: "اصلاح شانه به جلو (Rounded Shoulders) و باز شدن قفسه سینه",
      youtubeId: "W1sXm_xX-kU"
    },
    {
      title: "حرکت چانه به داخل (Chin Tucks)",
      duration: "۱۰ تکرار",
      benefit: "اصلاح جلوآمدگی سر و گردن (Forward Head Posture)",
      youtubeId: "wQYL_XhH2vI"
    }
  ]
};
