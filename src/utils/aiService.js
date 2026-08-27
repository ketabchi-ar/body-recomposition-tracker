import { exercisesBank } from '../data/exercisesBank';
import { foodsBank } from '../data/foodsBank';

export const AI_PROVIDERS = [
  {
    id: 'gemini',
    name: 'Google Gemini',
    description: 'مدل‌های هوش مصنوعی رسمی گوگل (سریع و بهینه‌سازی‌شده)',
    defaultEndpoint: 'https://generativelanguage.googleapis.com/v1beta',
    defaultModel: 'gemini-1.5-flash',
    popularModels: [
      'gemini-1.5-flash',
      'gemini-2.0-flash',
      'gemini-2.5-flash',
      'gemini-1.5-pro'
    ],
    getKeyUrl: 'https://aistudio.google.com/app/apikey'
  },
  {
    id: 'openrouter',
    name: 'OpenRouter (جهانی و رایگان)',
    description: 'دسترسی به Claude 3.5، DeepSeek و مدل‌های رایگان بین‌المللی',
    defaultEndpoint: 'https://openrouter.ai/api/v1',
    defaultModel: 'google/gemini-2.0-flash-lite-preview-02-05:free',
    popularModels: [
      'google/gemini-2.0-flash-lite-preview-02-05:free',
      'meta-llama/llama-3.3-70b-instruct:free',
      'deepseek/deepseek-chat',
      'openai/gpt-4o-mini',
      'anthropic/claude-3.5-sonnet'
    ],
    getKeyUrl: 'https://openrouter.ai/keys'
  },
  {
    id: 'openai',
    name: 'OpenAI (ChatGPT)',
    description: 'مدل‌های رسمی شرکت OpenAI',
    defaultEndpoint: 'https://api.openai.com/v1',
    defaultModel: 'gpt-4o-mini',
    popularModels: [
      'gpt-4o-mini',
      'gpt-4o',
      'gpt-3.5-turbo'
    ],
    getKeyUrl: 'https://platform.openai.com/api-keys'
  },
  {
    id: 'avalai',
    name: 'AvalAI (پلتفرم ایرانی)',
    description: 'سرویس ایرانی بدون فیلترشکن و پرداخت ریالی',
    defaultEndpoint: 'https://api.avalai.ir/v1',
    defaultModel: 'gpt-4o-mini',
    popularModels: [
      'gpt-4o-mini',
      'gpt-4o',
      'claude-3-5-sonnet-20241022'
    ],
    getKeyUrl: 'https://avalai.ir'
  },
  {
    id: 'gapgpt',
    name: 'GapGPT (پلتفرم ایرانی)',
    description: 'سرویس ابری هوش مصنوعی داخلی',
    defaultEndpoint: 'https://api.gapgpt.app/v1',
    defaultModel: 'gpt-4o-mini',
    popularModels: [
      'gpt-4o-mini',
      'gpt-4o'
    ],
    getKeyUrl: 'https://gapgpt.app'
  }
];

// Local rule-based substitute finder
export function getLocalExerciseSubstitutes(exercise) {
  if (!exercise) return [];
  const found = exercisesBank.find(e => 
    e.id === exercise.id || 
    e.nameEn?.toLowerCase() === exercise.nameEn?.toLowerCase() ||
    e.nameFa === exercise.nameFa
  );

  if (found && found.substitutes && found.substitutes.length > 0) {
    return exercisesBank.filter(e => found.substitutes.includes(e.id));
  }
  if (found && found.muscleGroup) {
    return exercisesBank.filter(e => e.muscleGroup === found.muscleGroup && e.id !== found.id).slice(0, 4);
  }
  return exercisesBank.slice(0, 4);
}

export function getLocalFoodSubstitutes(mealTitle, itemText = '') {
  const query = (itemText + ' ' + mealTitle).toLowerCase();
  let matchedCategory = 'protein';
  if (query.includes('برنج') || query.includes('نان') || query.includes('سیب') || query.includes('عدس') || query.includes('موز') || query.includes('جو')) {
    matchedCategory = 'carb';
  } else if (query.includes('مرغ') || query.includes('ماهی') || query.includes('گوشت') || query.includes('تخم') || query.includes('وی') || query.includes('ماست')) {
    matchedCategory = 'protein';
  } else if (query.includes('روغن') || query.includes('زیتون') || query.includes('گردو') || query.includes('بادام')) {
    matchedCategory = 'fat';
  }
  return foodsBank.filter(f => f.category === matchedCategory).slice(0, 4);
}

// Universal AI Caller Supporting Gemini, OpenAI, OpenRouter, AvalAI, GapGPT
export async function callAIProvider({ 
  provider = 'gemini', 
  apiKey, 
  model, 
  customBaseUrl = '', 
  prompt, 
  systemInstruction = '',
  maxTokens = 1500 
}) {
  if (!apiKey || apiKey.trim() === '') {
    throw new Error('لطفاً ابتدا کلید API خود را وارد کنید.');
  }

  const key = apiKey.trim();
  const providerInfo = AI_PROVIDERS.find(p => p.id === provider) || AI_PROVIDERS[0];
  let selectedModel = (model || providerInfo.defaultModel || 'gemini-1.5-flash').trim();

  if (provider === 'gemini') {
    // Google Gemini REST API v1beta
    // Remove "models/" prefix if user included it
    const cleanModel = selectedModel.replace(/^models\//, '');
    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${cleanModel}:generateContent?key=${key}`;

    const body = {
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: Math.min(2048, maxTokens)
      }
    };
    if (systemInstruction) {
      body.systemInstruction = { parts: [{ text: systemInstruction }] };
    }

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });

    if (!response.ok) {
      const err = await response.json().catch(() => ({}));
      throw new Error(err.error?.message || `خطای Gemini API (${response.status})`);
    }

    const data = await response.json();
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!text) throw new Error('پاسخی از مدل Gemini دریافت نشد.');
    return text;
  } else {
    // OpenAI Compatible API (OpenRouter, OpenAI, AvalAI, GapGPT)
    let baseUrl = customBaseUrl.trim();
    if (!baseUrl) {
      baseUrl = providerInfo.defaultEndpoint;
    }

    baseUrl = baseUrl.replace(/\/+$/, '');
    const endpoint = `${baseUrl}/chat/completions`;

    const messages = [];
    if (systemInstruction) {
      messages.push({ role: 'system', content: systemInstruction });
    }
    messages.push({ role: 'user', content: prompt });

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${key}`
    };

    if (provider === 'openrouter') {
      headers['HTTP-Referer'] = window.location.origin;
      headers['X-Title'] = 'FitTracker Pro';
    }

    const response = await fetch(endpoint, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        model: selectedModel,
        messages,
        temperature: 0.7,
        max_tokens: Math.min(1500, maxTokens) // Enforce small token cap to prevent OpenRouter insufficient credit errors
      })
    });

    if (!response.ok) {
      const err = await response.json().catch(() => ({}));
      throw new Error(err.error?.message || `خطای API ارائه‌دهنده ${provider} (${response.status})`);
    }

    const data = await response.json();
    const text = data.choices?.[0]?.message?.content;
    if (!text) throw new Error('پاسخی از مدل دریافت نشد.');
    return text;
  }
}

// Fetch available models from Provider
export async function fetchAvailableModels(provider, apiKey, customBaseUrl = '') {
  if (!apiKey || !apiKey.trim()) return [];
  const key = apiKey.trim();

  try {
    if (provider === 'gemini') {
      const endpoint = `https://generativelanguage.googleapis.com/v1beta/models?key=${key}`;
      const res = await fetch(endpoint);
      if (!res.ok) return [];
      const data = await res.json();
      return (data.models || [])
        .filter(m => m.supportedGenerationMethods?.includes('generateContent'))
        .map(m => m.name.replace('models/', ''));
    } else {
      let baseUrl = customBaseUrl.trim() || (AI_PROVIDERS.find(p => p.id === provider)?.defaultEndpoint) || 'https://api.openai.com/v1';
      baseUrl = baseUrl.replace(/\/+$/, '');
      const endpoint = `${baseUrl}/models`;
      const res = await fetch(endpoint, {
        headers: { Authorization: `Bearer ${key}` }
      });
      if (!res.ok) return [];
      const data = await res.json();
      return (data.data || []).map(m => m.id || m.name);
    }
  } catch (e) {
    console.warn('Error fetching models list:', e);
    return [];
  }
}

// Test AI Connection with very low token requirement
export async function testAIConnection(provider, apiKey, model, customBaseUrl = '') {
  const prompt = 'تست اتصال: لطفا در یک کلمه پاسخ دهید «آماده».';
  const response = await callAIProvider({
    provider,
    apiKey,
    model,
    customBaseUrl,
    prompt,
    systemInstruction: 'پاسخ بسیار کوتاه دهید.',
    maxTokens: 50 // Ultra low token limit for zero-cost connection testing
  });
  return response;
}

// AI Plan Generator: Generates customized 7-day workout & diet structure
export async function generateAIPlanWithAI(userSpecs, aiConfig) {
  const systemPrompt = `شما یک هوش مصنوعی ارشد فیزیولوژی ورزشی و تغذیه بالینی هستید. خروجی شما باید **دقیقاً یک آبجکت JSON معتبر** بدون هیچ متن اضافی قبل یا بعد از JSON باشد.`;

  const userPrompt = `
ورزشکار با مشخصات زیر خواهان یک برنامه اختصاصی و دقیق است:
- نام: ${userSpecs.name || 'ورزشکار'}
- سن: ${userSpecs.age || 30} سال | جنسیت: ${userSpecs.gender || 'مرد'}
- قد: ${userSpecs.height || 175} سانتی‌متر | وزن: ${userSpecs.weight || 75} کیلوگرم
- درصد چربی تخمینی: ${userSpecs.fatPercentage || 'نامشخص'}
- هدف: ${userSpecs.goal || 'بازسازی ترکیب بدنی (Body Recomposition)'}
- روزهای تمرین در هفته: ${userSpecs.daysPerWeek || 4} روز
- تجهیزات دسترسی: ${userSpecs.equipment || 'باشگاه با تجهیزات کامل'}
- ساعت کار پشت میز: ${userSpecs.deskHours || 8} ساعت

لطفاً یک خروجی JSON با ساختار زیر تولید کنید:
{
  "profile": {
    "dailyTargetCalories": "۲۲۰۰",
    "dailyTargetProtein": "۱۶۰",
    "waterTargetLiters": 2.5,
    "bmr": "۱۶۰۰ کیلوکالری"
  },
  "daysSchedule": [
    {
      "id": "saturday",
      "dayIndex": 6,
      "dayName": "شنبه",
      "title": "عنوان تمرین",
      "type": "strength",
      "category": "فول بادی A",
      "wakeUpTime": "۰۶:۳۰",
      "startTime": "۱۷:۳۰",
      "duration": "۵۰ دقیقه",
      "target": "هدف جلسه",
      "workoutId": "workout_sat"
    }
  ],
  "workouts": {
    "workout_sat": {
      "id": "workout_sat",
      "title": "فول بادی جلسه اول",
      "exercises": [
        {
          "id": "ex_1",
          "nameFa": "نام فارسی حرکت",
          "nameEn": "Dumbbell Press",
          "targetMuscle": "سینه",
          "metricType": "weight_reps",
          "setsReps": "4 × (12 - 10 - 8 - 8)",
          "setsCount": 4,
          "suggestedReps": [12, 10, 8, 8],
          "calories": 60,
          "proteinRequired": 10,
          "biomechanics": "نکته ایمنی فرم و دیسک کمر",
          "youtubeId": "VmB1G1K7v94",
          "aparatId": ""
        }
      ]
    }
  },
  "dietMeals": [
    {
      "id": "meal_breakfast",
      "time": "۰۷:۰۰",
      "title": "صبحانه پروتئینی",
      "subtitle": "تخم مرغ + جو دوسر",
      "items": ["۳ عدد تخم مرغ", "۵۰ گرم جو دوسر"],
      "calories": 400,
      "protein": 30,
      "icon": "Egg",
      "category": "وعده اصلی",
      "notes": "همراه با چای سبز"
    }
  ]
}
فقط و فقط JSON معتبر برگردانید.`;

  const raw = await callAIProvider({
    ...aiConfig,
    prompt: userPrompt,
    systemInstruction: systemPrompt,
    maxTokens: 2000
  });

  const cleaned = raw.replace(/^```json/m, '').replace(/^```/m, '').replace(/```$/m, '').trim();
  return JSON.parse(cleaned);
}

// Generate Daily AI Report
export async function generateDailyAIReport(aiConfig, { profile, dayName, workoutLogsToday, mealLogsToday, waterToday, mealNotesToday, workoutDetail }) {
  const systemPrompt = `شما یک مربی ارشد فیزیولوژی ورزشی و متخصص تغذیه بالینی هستید. لحن شما صمیمی، علمی و انگیزشی به زبان فارسی است. پاسخ را با فرمت مارک‌داون زیبا همراه با ایموجی ارائه دهید.`;

  const userPrompt = `
تحلیل عملکرد امروز ورزشکار:
- نام: ${profile.name || 'ورزشکار'} | قد: ${profile.height} | وزن: ${profile.weight}
- هدف: ${profile.goal}
- جلسه امروز (${dayName}): ${workoutDetail?.title || 'تمرین روز'}
- ست‌های ثبت‌شده: ${JSON.stringify(workoutLogsToday || {})}
- وضعیت وعده‌ها: ${JSON.stringify(mealLogsToday || {})}
- آب مصرفی: ${waterToday || 0} میلی‌لیتر
- یادداشت‌ها و تغییرات غذایی: ${JSON.stringify(mealNotesToday || {})}

تحلیل را در ۴ بخش شامل: ۱. تحلیل تمرین ۲. تحلیل تغذیه و یادداشت‌ها ۳. آب و ارگونومی ۴. توصیه‌های کلیدی فردا بنویسید.`;

  return await callAIProvider({
    ...aiConfig,
    prompt: userPrompt,
    systemInstruction: systemPrompt,
    maxTokens: 1500
  });
}

// Generate AI Substitute Advice
export async function generateAISubstituteAdvice(aiConfig, itemName, itemType = 'exercise', userCondition = '') {
  const prompt = `
ورزشکار می‌خواهد برای ${itemType === 'exercise' ? 'حرکت ورزشی' : 'ماده غذایی'} «${itemName}» جایگزین دریافت کند.
علت یا شرایط: ${userCondition || 'تنوع یا نبود تجهیزات'}

لطفاً ۳ جایگزین علمی با ذکر علت بیومکانیکی/ماکروها و نکات حفظ سلامت دیسک کمر به زبان فارسی پیشنهاد دهید.`;

  return await callAIProvider({
    ...aiConfig,
    prompt,
    maxTokens: 800
  });
}
