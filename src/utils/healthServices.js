// Real Health Data Integrations for Strava, Google Fit, and Samsung/Apple Health

export const STRAVA_CONFIG_KEY = 'fit_tracker_strava_auth';
export const GOOGLE_FIT_CONFIG_KEY = 'fit_tracker_gfit_token';

// 1. STRAVA INTEGRATION
export function getStravaAuthUrl(clientId, redirectUri = window.location.origin) {
  const scope = 'read,activity:read_all';
  return `https://www.strava.com/oauth/authorize?client_id=${clientId}&response_type=token&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${scope}`;
}

export async function fetchStravaActivities(accessToken) {
  if (!accessToken) throw new Error('توکن دسترسی Strava نامعتبر است.');
  
  const response = await fetch('https://www.strava.com/api/v3/athlete/activities?per_page=5', {
    headers: {
      'Authorization': `Bearer ${accessToken}`
    }
  });

  if (!response.ok) {
    throw new Error(`خطای Strava (${response.status}): لطفاً توکن دسترسی را مجدداً بررسی کنید.`);
  }

  const activities = await response.json();
  if (!Array.isArray(activities) || activities.length === 0) {
    return {
      source: 'Strava (فعالیت جدیدی یافت نشد)',
      steps: 0,
      activeCalories: 0,
      avgHeartRate: 0,
      activeMinutes: 0,
      activitiesCount: 0,
      lastSync: new Date().toLocaleTimeString('fa-IR')
    };
  }

  let totalCalories = 0;
  let totalMinutes = 0;
  let heartRateSum = 0;
  let heartRateCount = 0;
  let estimatedSteps = 0;

  activities.forEach(act => {
    totalCalories += act.kilojoules ? Math.round(act.kilojoules / 4.184) : (act.calories || 0);
    totalMinutes += Math.round((act.moving_time || 0) / 60);
    if (act.has_heartrate && act.average_heartrate) {
      heartRateSum += act.average_heartrate;
      heartRateCount++;
    }
    if (act.type === 'Run' || act.type === 'Walk') {
      estimatedSteps += Math.round((act.distance || 0) * 1.3);
    }
  });

  return {
    source: `Strava (${activities[0].name || 'ورزش'})`,
    steps: estimatedSteps,
    activeCalories: totalCalories || Math.round(totalMinutes * 7.5),
    avgHeartRate: heartRateCount > 0 ? Math.round(heartRateSum / heartRateCount) : 0,
    activeMinutes: totalMinutes,
    activitiesCount: activities.length,
    lastSync: new Date().toLocaleTimeString('fa-IR')
  };
}

// 2. GOOGLE FIT REST API INTEGRATION
export async function fetchGoogleFitData(accessToken) {
  if (!accessToken) throw new Error('توکن دسترسی Google Fit موجود نیست.');

  const now = Date.now();
  const startTime = now - (24 * 60 * 60 * 1000); // last 24 hours

  const requestBody = {
    aggregateBy: [
      { dataTypeName: 'com.google.step_count.delta' },
      { dataTypeName: 'com.google.calories.expended' },
      { dataTypeName: 'com.google.heart_minutes' }
    ],
    bucketByTime: { durationMillis: 86400000 },
    startTimeMillis: startTime,
    endTimeMillis: now
  };

  const response = await fetch('https://www.googleapis.com/fitness/v1/users/me/dataset:aggregate', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(requestBody)
  });

  if (!response.ok) {
    throw new Error(`خطای ارتباط با Google Fit (${response.status}).`);
  }

  const data = await response.json();
  let steps = 0;
  let calories = 0;
  let activeMinutes = 0;

  const buckets = data.bucket || [];
  buckets.forEach(b => {
    (b.dataset || []).forEach(ds => {
      (ds.point || []).forEach(pt => {
        const val = pt.value?.[0];
        if (ds.dataSourceId?.includes('step_count')) {
          steps += val?.intVal || 0;
        } else if (ds.dataSourceId?.includes('calories')) {
          calories += Math.round(val?.fpVal || 0);
        } else if (ds.dataSourceId?.includes('heart_minutes')) {
          activeMinutes += Math.round(val?.fpVal || val?.intVal || 0);
        }
      });
    });
  });

  return {
    source: 'Google Fit (همگام‌سازی واقعی)',
    steps,
    activeCalories: calories,
    avgHeartRate: 0,
    activeMinutes,
    lastSync: new Date().toLocaleTimeString('fa-IR')
  };
}

// 3. SAMSUNG HEALTH & APPLE HEALTH REAL FILE PARSER
export function parseHealthFile(fileContent, fileName = '') {
  const lowerName = fileName.toLowerCase();
  
  // JSON format
  if (lowerName.endsWith('.json') || fileContent.trim().startsWith('{')) {
    try {
      const data = JSON.parse(fileContent);
      const steps = data.steps || data.total_steps || data.step_count || 0;
      const calories = data.calories || data.active_calories || data.burned_calories || 0;
      const avgHeartRate = data.avg_heart_rate || data.heart_rate || 0;
      const activeMinutes = data.active_minutes || data.duration_minutes || 0;

      return {
        source: `Samsung/Apple Health (${fileName})`,
        steps: Number(steps) || 0,
        activeCalories: Number(calories) || 0,
        avgHeartRate: Number(avgHeartRate) || 0,
        activeMinutes: Number(activeMinutes) || 0,
        lastSync: new Date().toLocaleTimeString('fa-IR')
      };
    } catch {
      throw new Error('قالب فایل JSON نامعتبر است.');
    }
  }

  // CSV format (e.g. Samsung Health com.samsung.health.step_count.csv)
  if (lowerName.endsWith('.csv') || fileContent.includes(',')) {
    const lines = fileContent.split('\n').filter(l => l.trim().length > 0);
    if (lines.length < 2) throw new Error('فایل CSV داده‌ای ندارد.');

    const headers = lines[0].toLowerCase().split(',').map(h => h.trim());
    const countIndex = headers.findIndex(h => h.includes('count') || h.includes('step') || h.includes('calorie'));
    
    let totalValue = 0;
    for (let i = 1; i < lines.length; i++) {
      const cols = lines[i].split(',');
      if (countIndex !== -1 && cols[countIndex]) {
        const val = parseFloat(cols[countIndex].replace(/"/g, ''));
        if (!isNaN(val)) totalValue += val;
      }
    }

    const isCalories = lowerName.includes('calorie');
    return {
      source: `Samsung Health (${fileName})`,
      steps: isCalories ? 0 : Math.round(totalValue),
      activeCalories: isCalories ? Math.round(totalValue) : 0,
      avgHeartRate: 0,
      activeMinutes: 0,
      lastSync: new Date().toLocaleTimeString('fa-IR')
    };
  }

  // XML / Apple Health export.xml format
  if (lowerName.endsWith('.xml') || fileContent.includes('<HealthData')) {
    const stepMatches = fileContent.match(/type="HKQuantityTypeIdentifierStepCount"[^>]*value="([^"]+)"/g) || [];
    let totalSteps = 0;
    stepMatches.forEach(m => {
      const match = m.match(/value="([^"]+)"/);
      if (match && match[1]) totalSteps += parseFloat(match[1]) || 0;
    });

    const calMatches = fileContent.match(/type="HKQuantityTypeIdentifierActiveEnergyBurned"[^>]*value="([^"]+)"/g) || [];
    let totalCalories = 0;
    calMatches.forEach(m => {
      const match = m.match(/value="([^"]+)"/);
      if (match && match[1]) totalCalories += parseFloat(match[1]) || 0;
    });

    return {
      source: `Apple Health Export (${fileName})`,
      steps: Math.round(totalSteps),
      activeCalories: Math.round(totalCalories),
      avgHeartRate: 0,
      activeMinutes: 0,
      lastSync: new Date().toLocaleTimeString('fa-IR')
    };
  }

  throw new Error('فرمت فایل پشتیبانی نمی‌شود. لطفاً فایل JSON، CSV یا XML معتبر بارگذاری کنید.');
}
