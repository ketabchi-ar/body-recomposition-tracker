// Multi-Provider AI Service Hub with Robust JSON Auto-Repair

export const AI_PROVIDERS = [
  {
    id: 'gemini',
    name: 'Google Gemini (رسمی)',
    defaultModel: 'gemini-1.5-flash',
    popularModels: ['gemini-1.5-flash', 'gemini-1.5-pro', 'gemini-2.0-flash-exp'],
    getKeyUrl: 'https://aistudio.google.com/app/apikey',
    description: 'مدل‌های فوق‌سریع و هوشمند گوگل (نسخه Flash و Pro)'
  },
  {
    id: 'openrouter',
    name: 'OpenRouter (هاب بین‌المللی)',
    defaultModel: 'google/gemini-2.0-flash-lite-preview-02-05:free',
    popularModels: [
      'google/gemini-2.0-flash-lite-preview-02-05:free',
      'meta-llama/llama-3.3-70b-instruct:free',
      'deepseek/deepseek-chat',
      'openai/gpt-4o-mini',
      'anthropic/claude-3.5-haiku'
    ],
    getKeyUrl: 'https://openrouter.ai/keys',
    description: 'دسترسی به بیش از ۱۰۰ مدل برتر جهان (دارای مدل‌های رایگان :free)'
  },
  {
    id: 'openai',
    name: 'OpenAI (ChatGPT)',
    defaultModel: 'gpt-4o-mini',
    popularModels: ['gpt-4o-mini', 'gpt-4o', 'gpt-3.5-turbo'],
    getKeyUrl: 'https://platform.openai.com/api-keys',
    description: 'مدل‌های رسمی شرکت OpenAI'
  },
  {
    id: 'avalai',
    name: 'اول ای‌آی (AvalAI - بدون تحریم)',
    defaultModel: 'gpt-4o-mini',
    popularModels: ['gpt-4o-mini', 'gpt-4o', 'claude-3-5-haiku-20241022', 'gemini-1.5-flash'],
    getKeyUrl: 'https://avalai.ir',
    description: 'سرویس ایرانی تجمیع هوش مصنوعی با درگاه بانکی شتاب و بدون نیاز به تحریم‌شکن'
  },
  {
    id: 'gapgpt',
    name: 'گپ جی‌پی‌تی (GapGPT)',
    defaultModel: 'gpt-4o-mini',
    popularModels: ['gpt-4o-mini', 'gpt-4o', 'gemini-1.5-flash'],
    getKeyUrl: 'https://gapgpt.app',
    description: 'سرویس ایرانی دسترسی پایدار به مدل‌های هوش مصنوعی'
  },
  {
    id: 'custom',
    name: 'سفارشی (Custom OpenAI Compatible)',
    defaultModel: 'custom-model',
    popularModels: ['custom-model'],
    getKeyUrl: '#',
    description: 'اتصال به هر سرور دلخواه سازگار با استاندارد OpenAI'
  }
];

// Robust Fuzzy JSON Auto-Repair Function
export const safeParseJSON = (rawStr) => {
  if (!rawStr || typeof rawStr !== 'string') return null;

  // 1. Strip markdown code fence
  let cleaned = rawStr.replace(/```json/gi, '').replace(/```/g, '').trim();

  // 2. Find first { and last }
  const firstBrace = cleaned.indexOf('{');
  if (firstBrace === -1) return null;
  cleaned = cleaned.substring(firstBrace);

  // 3. Try standard parse
  try {
    return JSON.parse(cleaned);
  } catch (e1) {
    // 4. Try auto-closing open strings and braces
    let repaired = cleaned;
    
    // If ending with unclosed string
    const quoteCount = (repaired.match(/"/g) || []).length;
    if (quoteCount % 2 !== 0) {
      repaired += '"';
    }

    // Count open braces and brackets
    const openCurly = (repaired.match(/{/g) || []).length;
    const closeCurly = (repaired.match(/}/g) || []).length;
    const openSquare = (repaired.match(/\[/g) || []).length;
    const closeSquare = (repaired.match(/]/g) || []).length;

    for (let i = 0; i < (openSquare - closeSquare); i++) repaired += ']';
    for (let i = 0; i < (openCurly - closeCurly); i++) repaired += '}';

    try {
      return JSON.parse(repaired);
    } catch (e2) {
      console.warn("Fuzzy JSON repair failed:", e2);
      return null;
    }
  }
};

export async function fetchAvailableModels(provider, apiKey, customBaseUrl = '') {
  if (!apiKey) return [];

  try {
    if (provider === 'gemini') {
      const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`;
      const res = await fetch(url);
      if (!res.ok) return [];
      const data = await res.json();
      return (data.models || [])
        .filter(m => m.supportedGenerationMethods?.includes('generateContent'))
        .map(m => m.name.replace('models/', ''));
    }

    if (provider === 'openrouter') {
      const res = await fetch('https://openrouter.ai/api/v1/models', {
        headers: { 'Authorization': `Bearer ${apiKey}` }
      });
      if (!res.ok) return [];
      const data = await res.json();
      return (data.data || []).map(m => m.id).slice(0, 40);
    }

    if (['openai', 'avalai', 'gapgpt', 'custom'].includes(provider)) {
      let baseUrl = 'https://api.openai.com/v1';
      if (provider === 'avalai') baseUrl = 'https://api.avalai.ir/v1';
      if (provider === 'gapgpt') baseUrl = 'https://api.gapgpt.app/v1';
      if (provider === 'custom' && customBaseUrl) baseUrl = customBaseUrl.replace(/\/$/, '');

      const res = await fetch(`${baseUrl}/models`, {
        headers: { 'Authorization': `Bearer ${apiKey}` }
      });
      if (!res.ok) return [];
      const data = await res.json();
      return (data.data || []).map(m => m.id);
    }
  } catch {
    return [];
  }
  return [];
}

export async function testAIConnection(provider, apiKey, model, customBaseUrl = '') {
  if (!apiKey) throw new Error('کلید API خالی است.');

  const testPrompt = 'Hello, reply with only the word OK in English.';

  return await callAIProvider({
    provider,
    apiKey,
    model,
    customBaseUrl,
    prompt: testPrompt,
    maxTokens: 50
  });
}

export async function callAIProvider({
  provider = 'gemini',
  apiKey = '',
  model = '',
  customBaseUrl = '',
  prompt = '',
  systemInstruction = '',
  maxTokens = 2500
}) {
  if (!apiKey) {
    throw new Error('کلید API وارد نشده است. لطفاً در تب تنظیمات هوش مصنوعی کلید را ثبت کنید.');
  }

  // GOOGLE GEMINI
  if (provider === 'gemini') {
    const cleanModel = (model || 'gemini-1.5-flash').replace('models/', '');
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${cleanModel}:generateContent?key=${apiKey}`;

    const body = {
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: {
        maxOutputTokens: maxTokens,
        temperature: 0.7
      }
    };

    if (systemInstruction) {
      body.systemInstruction = {
        parts: [{ text: systemInstruction }]
      };
    }

    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });

    if (!response.ok) {
      const errJson = await response.json().catch(() => ({}));
      const errorDetail = errJson.error?.message || response.statusText;
      throw new Error(`خطای Google Gemini (${response.status}): ${errorDetail}`);
    }

    const data = await response.json();
    const candidate = data.candidates?.[0];
    if (!candidate || !candidate.content?.parts?.[0]?.text) {
      throw new Error('پاسخی از Gemini دریافت نشد.');
    }
    return candidate.content.parts[0].text;
  }

  // OPENAI-COMPATIBLE (OpenRouter, OpenAI, AvalAI, GapGPT, Custom)
  let endpoint = 'https://api.openai.com/v1/chat/completions';
  let defaultHeaders = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${apiKey}`
  };

  if (provider === 'openrouter') {
    endpoint = 'https://openrouter.ai/api/v1/chat/completions';
    defaultHeaders['HTTP-Referer'] = window.location.origin || 'https://fit-tracker.app';
    defaultHeaders['X-Title'] = 'Body Recomposition FitTracker';
  } else if (provider === 'avalai') {
    endpoint = 'https://api.avalai.ir/v1/chat/completions';
  } else if (provider === 'gapgpt') {
    endpoint = 'https://api.gapgpt.app/v1/chat/completions';
  } else if (provider === 'custom' && customBaseUrl) {
    endpoint = `${customBaseUrl.replace(/\/$/, '')}/chat/completions`;
  }

  const messages = [];
  if (systemInstruction) {
    messages.push({ role: 'system', content: systemInstruction });
  }
  messages.push({ role: 'user', content: prompt });

  const chosenModel = model || (provider === 'openrouter' ? 'google/gemini-2.0-flash-lite-preview-02-05:free' : 'gpt-4o-mini');

  const reqBody = {
    model: chosenModel,
    messages,
    max_tokens: maxTokens,
    temperature: 0.7
  };

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: defaultHeaders,
    body: JSON.stringify(reqBody)
  });

  if (!response.ok) {
    const errJson = await response.json().catch(() => ({}));
    const errorDetail = errJson.error?.message || errJson.message || response.statusText;
    throw new Error(`خطای ${provider} (${response.status}): ${errorDetail}`);
  }

  const data = await response.json();
  const choice = data.choices?.[0];
  if (!choice || !choice.message?.content) {
    throw new Error(`پاسخ متنی از مدل ${chosenModel} دریافت نشد.`);
  }
  return choice.message.content;
}

export async function generateAIPlanWithAI(userStats, aiConfig) {
  const prompt = `شما متخصص فیزیولوژی ورزش و تغذیه بالینی هستید.
مشخصات ورزشکار:
- جنسیت: ${userStats.gender || 'مرد'}
- سن: ${userStats.age} سال | قد: ${userStats.height} سانتی‌متر | وزن: ${userStats.weight} کیلوگرم
- درصد چربی: ${userStats.fatPercentage || 'نامشخص'} | هدف: ${userStats.goal}
- تعداد روزهای تمرین در هفته: ${userStats.daysPerWeek || 4} روز
- تجهیزات موجود: ${userStats.equipment || 'باشگاه با تجهیزات کامل'}

یک خروجی JSON کامپکت و معتبر با ساختار زیر بسازید:
{
  "profile": {
    "bmr": "عدد",
    "dailyTargetCalories": "عدد",
    "dailyTargetProtein": "عدد"
  },
  "daysSchedule": [
    {
      "id": "saturday",
      "dayIndex": 6,
      "dayName": "شنبه",
      "title": "عنوان",
      "type": "strength",
      "category": "بالاتنه",
      "wakeUpTime": "06:30",
      "startTime": "17:30",
      "duration": "50 دقیقه",
      "target": "توضیح هدف",
      "workoutId": "plan_day_sat"
    }
  ],
  "workouts": {
    "plan_day_sat": {
      "id": "plan_day_sat",
      "title": "عنوان تمرین",
      "exercises": [
        {
          "id": "ex_1",
          "nameFa": "نام حرکت",
          "nameEn": "English Name",
          "targetMuscle": "سینه",
          "setsCount": 4,
          "setsReps": "4 × 10",
          "biomechanics": "نکته ایمنی دیسک و مفاصل"
        }
      ]
    }
  },
  "dietMeals": [
    {
      "id": "m_1",
      "time": "07:30",
      "title": "صبحانه",
      "subtitle": "پروتئینی",
      "items": ["۳ عدد تخم‌مرغ", "نان سنگک"],
      "calories": 400,
      "protein": 28,
      "icon": "Egg",
      "category": "وعده اصلی"
    }
  ]
}`;

  const reply = await callAIProvider({
    ...aiConfig,
    prompt,
    systemInstruction: 'شما یک تولیدکننده داده‌های ساختاریافته ورزشی هستید. فقط و فقط یک شیء JSON معتبر خروجی دهید و از هرگونه متن اضافی خودداری کنید.',
    maxTokens: 4000
  });

  const parsed = safeParseJSON(reply);
  if (!parsed || !parsed.daysSchedule || !parsed.workouts) {
    throw new Error('Unexpected end of JSON input');
  }
  return parsed;
}

export async function generateDailyAIReport(aiConfig, contextData) {
  const { profile, dayName, workoutLogsToday = {}, mealLogsToday = {}, waterToday = 0, mealNotesToday = {}, workoutDetail } = contextData;

  const prompt = `شما مربی اختصاصی و فیزیولوژیست ورزشی هستید.
تحلیل عملکرد امروز ورزشکار را با لحنی صمیمی، علمی، انگیزشی و دقیق بنویسید:

مشخصات ورزشکار:
- نام: ${profile.name || 'ورزشکار'}
- قد: ${profile.height} | وزن: ${profile.weight} | سن: ${profile.age}
- هدف اصلی: ${profile.goal}
- کالری هدف: ${profile.dailyTargetCalories} kcal | پروتئین هدف: ${profile.dailyTargetProtein} g
- ساعت کار روزانه پشت میز: ${profile.deskHours || 8} ساعت

عملکرد امروز (${dayName}):
- جلسه تمرینی: ${workoutDetail?.title || 'استراحت / تمرین'}
- ست‌های تکمیل‌شده: ${Object.values(workoutLogsToday).filter(s => s?.done).length} ست
- وعده‌های مصرف‌شده: ${Object.values(mealLogsToday).filter(Boolean).length} وعده
- آب مصرفی: ${waterToday} میلی‌لیتر (هدف: ${(profile.waterTargetLiters || 2.5) * 1000}ml)
- یادداشت‌های تغذیه‌ای امروز: ${Object.values(mealNotesToday).filter(Boolean).join(' | ') || 'بدون یادداشت انحراف'}

لطفاً در ۴ بخش پاسخ دهید:
۱. ارزیابی نمره عملکرد امروز (از ۱۰۰)
۲. تحلیل رعایت رژیم، پروتئین و مصرف آب
۳. نکات بیومکانیک و ریکاوری ستون فقرات برای کارمندان پشت‌میزنشین
۴. توصیه کلیدی برای برنامه فردا`;

  return await callAIProvider({
    ...aiConfig,
    prompt,
    systemInstruction: 'شما یک مربی ارشد تناسب اندام و متخصص بیومکانیک هستید. پاسخ باید به زبان فارسی، علمی، ساختاریافته و با ایموجی‌های متناسب باشد.',
    maxTokens: 1800
  });
}

export async function generateAISubstituteAdvice(itemName, type = 'exercise', aiConfig) {
  const prompt = `یک جایگزین هوشمند برای آیتم «${itemName}» در دسته «${type === 'exercise' ? 'حرکات ورزشی' : 'مواد غذایی'}» با در نظر گرفتن اهداف ترکیب بدنی، محافظت از ستون فقرات و ماکروهای تغذیه‌ای پیشنهاد دهید.
پاسخ خلاصه و ساختاریافته در ۳ نکته کوتاه باشد.`;

  return await callAIProvider({
    ...aiConfig,
    prompt,
    systemInstruction: 'شما متخصص تمرین و تغذیه هستید.',
    maxTokens: 500
  });
}

// Local offline fallback algorithms
export function getLocalExerciseSubstitutes(exercise) {
  const name = exercise.nameFa || '';
  if (name.includes('پرس سینه') || name.includes('دمبل') && exercise.muscleGroup === 'chest') {
    return [
      { nameFa: 'پرس بالا سینه دمبل', nameEn: 'Incline Dumbbell Press', reason: 'تاکید بیشتر بر بخش ترقوه‌ای سینه' },
      { nameFa: 'شنا سوئدی استاندارد', nameEn: 'Standard Push-up', reason: 'تمرین با وزن بدن بدون نیاز به دمبل' },
      { nameFa: 'کراس‌اور با سیم‌کش', nameEn: 'Cable Crossover', reason: 'کاهش فشار روی مفاصل شانه' }
    ];
  }
  if (name.includes('اسکوات') || exercise.muscleGroup === 'legs') {
    return [
      { nameFa: 'لگ پرس ۴۵ درجه', nameEn: 'Leg Press', reason: 'فشار صفر به دیسک کمر' },
      { nameFa: 'لانج دمبل گام به جلو', nameEn: 'Dumbbell Lunges', reason: 'تقویت تعادل و تقارن عضلانی' },
      { nameFa: 'هیپ تراست با هالتر', nameEn: 'Hip Thrust', reason: 'ایزولاسیون کامل عضلات باسن' }
    ];
  }
  return [
    { nameFa: 'پلانک سخت RKC', nameEn: 'RKC Plank', reason: 'تقویت کمربند کور و محافظت ستون فقرات' },
    { nameFa: 'پرنده-سگ مک‌گیل', nameEn: 'Bird-Dog', reason: 'ثبات‌بخشی عضلات اکستنسور کمر' }
  ];
}

export function getLocalFoodSubstitutes(title = '', subtitle = '') {
  const combined = (title + ' ' + subtitle).toLowerCase();
  if (combined.includes('مرغ') || combined.includes('فیله') || combined.includes('ناهار') || combined.includes('شام')) {
    return [
      { nameFa: '۱۵۰ گرم ماهی سالمون یا قزل‌آلا', reason: 'غنی از اسیدهای چرب امگا ۳ و پروتئین ۲۵g' },
      { nameFa: '۱۸۰ گرم سینه بوقلمون گریل‌شده', reason: 'چربی بسیار پایین و پروتئین ۳۰g' },
      { nameFa: '۱۵۰ گرم راسته گوساله بدون چربی', reason: 'غنی از آهن، روی و کراتین طبیعی' }
    ];
  }
  if (combined.includes('تخم‌مرغ') || combined.includes('صبحانه')) {
    return [
      { nameFa: '۱ پیاله ماست یونانی ایسلندی + ۳۰g گردو', reason: 'پروتئین کلسیم‌دار با جذب پیوسته' },
      { nameFa: '۱ پیاله عدسی یا لوبیا پخته + ۱ عدد تخم‌مرغ', reason: 'کربوهیدرات پیچیده با فیبر بالا' }
    ];
  }
  return [
    { nameFa: '۱ اسکوپ پروتئین وی + ۱ عدد سیب', reason: 'ریکاوری سریع پروتئینی' },
    { nameFa: '۱ لیوان شیر کم‌چرب + ۳۰g بادام خام', reason: 'چربی‌های غیراشباع و کلسیم' }
  ];
}
