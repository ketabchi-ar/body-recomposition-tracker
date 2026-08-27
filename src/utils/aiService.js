import { exercisesBank } from '../data/exercisesBank';
import { foodsBank } from '../data/foodsBank';

// Local rule-based substitute finder
export function getLocalExerciseSubstitutes(exercise) {
  if (!exercise) return [];
  
  // Find in exercisesBank
  const found = exercisesBank.find(e => 
    e.id === exercise.id || 
    e.nameEn?.toLowerCase() === exercise.nameEn?.toLowerCase() ||
    e.nameFa === exercise.nameFa
  );

  if (found && found.substitutes && found.substitutes.length > 0) {
    return exercisesBank.filter(e => found.substitutes.includes(e.id));
  }

  // Fallback: search by same muscleGroup
  if (found && found.muscleGroup) {
    return exercisesBank.filter(e => e.muscleGroup === found.muscleGroup && e.id !== found.id).slice(0, 3);
  }

  return exercisesBank.slice(0, 3);
}

// Local rule-based food substitute finder
export function getLocalFoodSubstitutes(mealTitle, itemText = '') {
  const query = (itemText + ' ' + mealTitle).toLowerCase();
  
  let matchedCategory = 'protein';
  if (query.includes('برنج') || query.includes('نان') || query.includes('سیب') || query.includes('عدس') || query.includes('موز')) {
    matchedCategory = 'carb';
  } else if (query.includes('مرغ') || query.includes('ماهی') || query.includes('گوشت') || query.includes('تخم') || query.includes('وی')) {
    matchedCategory = 'protein';
  } else if (query.includes('روغن') || query.includes('زیتون')) {
    matchedCategory = 'fat';
  }

  return foodsBank.filter(f => f.category === matchedCategory).slice(0, 4);
}

// Google Gemini API client
export async function callGeminiAPI(apiKey, prompt, systemInstruction = '') {
  if (!apiKey || apiKey.trim() === '') {
    throw new Error('لطفاً ابتدا کلید Gemini API خود را در بخش تنظیمات یا بالای پنل هوش مصنوعی وارد نمایید.');
  }

  const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey.trim()}`;

  const body = {
    contents: [
      {
        role: 'user',
        parts: [{ text: prompt }]
      }
    ],
    generationConfig: {
      temperature: 0.7,
      topK: 40,
      topP: 0.95,
      maxOutputTokens: 1500
    }
  };

  if (systemInstruction) {
    body.systemInstruction = {
      parts: [{ text: systemInstruction }]
    };
  }

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error?.message || `خطا در برقراری ارتباط با Gemini API (کد وضعیت: ${response.status})`);
  }

  const data = await response.json();
  const textOutput = data.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!textOutput) {
    throw new Error('پاسخی از مدل هوش مصنوعی دریافت نشد.');
  }

  return textOutput;
}

// Generate Daily AI Analysis
export async function generateDailyAIReport(apiKey, { profile, dayName, workoutLogsToday, mealLogsToday, waterToday, mealNotesToday, workoutDetail }) {
  const systemPrompt = `شما یک مربی ارشد فیزیولوژی ورزشی و متخصص تغذیه بالینی تناسب اندام (Body Recomposition) هستید. لحن شما صمیمی، دقیق، علمی و انگیزشی به زبان فارسی است. پاسخ را با فرمت زیبای Markdown به همراه تیترها و ایموجی‌ها ارائه دهید.`;

  const userPrompt = `
لطفاً عملکرد امروز ورزشکار را به صورت جامع تحلیل کنید:

مشخصات ورزشکار:
- نام: ${profile.name || 'ورزشکار'}
- قد: ${profile.height || '۱۷۸'} | وزن: ${profile.weight || '۷۱.۸'}
- درصد چربی: ${profile.fatPercentage || '۳۰.۴٪'} | توده عضلانی: ${profile.muscleMass || '۲۷.۳ kg'}
- هدف: ${profile.goal || 'کاهش ۱۱ کیلو چربی و بازسازی ترکیب بدنی (Body Recomposition)'}
- ساعت کار پشت میز: ${profile.deskHours || 10} ساعت

وضعیت امروز (${dayName}):
- جلسه تمرینی: ${workoutDetail?.title || 'تمرین روز'}
- ست‌های ثبت‌شده تمرین: ${JSON.stringify(workoutLogsToday || {})}
- وضعیت رعایت وعده‌ها و مکمل‌ها: ${JSON.stringify(mealLogsToday || {})}
- میزان آب مصرفی: ${waterToday || 0} میلی‌لیتر (هدف: ۲۵۰۰ میلی‌لیتر)
- یادداشت‌ها، تغییرات و انحرافات غذایی گزارش‌شده توسط کاربر: ${JSON.stringify(mealNotesToday || {})}

لطفاً در تحلیل خود موارد زیر را پوشش دهید:
۱. تحلیل حجم تمرین و کیفیت اجرای ست‌ها
۲. تحلیل رعایت کالری و پروتئین خالص + بررسی یادداشت‌ها و انحرافات غذایی
۳. وضعیت هیدراتاسیون و ارگونومی پشت‌میزنشینی
۴. ۳ توصیه کلیدی و کاربردی برای فردا
`;

  return await callGeminiAPI(apiKey, userPrompt, systemPrompt);
}

// Generate Exercise / Diet Substitute Recommendation with AI
export async function generateAISubstituteAdvice(apiKey, itemName, itemType = 'exercise', userCondition = '') {
  const prompt = `
ورزشکار ما می‌خواهد برای آیتم زیر یک جایگزین مناسب دریافت کند:
- نوع آیتم: ${itemType === 'exercise' ? 'حرکت ورزشی' : 'ماده غذایی / وعده'}
- نام آیتم: ${itemName}
- وضعیت / علت تعویض (در صورت وجود): ${userCondition || 'عدم دسترسی به دستگاه یا تنوع'}

لطفاً ۳ جایگزین عالی با ذکر علت بیومکانیکی یا تطابق ماکروها و کالری پیشنهاد دهید و نکات کلیدی اجرای ایمن برای دیسک کمر را متذکر شوید. پاسخ را به زبان فارسی و با فرمت مارک‌داون کوتاه و خوانا بنویسید.
`;

  return await callGeminiAPI(apiKey, prompt);
}
