// Google Analytics types
declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
  }
}

/**
 * Initializes Google Analytics dynamically based on environment variables.
 * Checks if the current domain matches the allowed patterns.
 */
export const initializeAnalytics = () => {
  if (typeof window === 'undefined') return;

  const measurementId = import.meta.env.VITE_GA_MEASUREMENT_ID;
  const allowedDomainsStr = import.meta.env.VITE_GA_ALLOWED_DOMAINS || '';
  const allowedDomains = allowedDomainsStr.split(',').filter(Boolean);
  const hostname = window.location.hostname;

  console.log(`[Analytics] Initializing... Hostname: ${hostname}`);

  // Check if hostname matches any allowed pattern
  const isAllowed = allowedDomains.some((pattern: string) => {
    try {
      const regex = new RegExp(pattern);
      return regex.test(hostname);
    } catch (e) {
      console.error(`[Analytics] Invalid regex pattern: ${pattern}`, e);
      return false;
    }
  });

  if (isAllowed && measurementId) {
    console.log(`[Analytics] Domain allowed. Loading GA with ID: ${measurementId}`);

    // Inject GA script
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
    document.head.appendChild(script);

    // Initialize dataLayer and gtag function
    window.dataLayer = window.dataLayer || [];
    window.gtag = function(...args: any[]) {
      window.dataLayer.push(arguments);
    };
    window.gtag('js', new Date());
    window.gtag('config', measurementId);
  } else {
    console.log('[Analytics] Domain not allowed or Measurement ID missing. GA not loaded.');
  }
};

/**
 * Sets user properties in Google Analytics.
 * @param nickname The user's nickname.
 * @param grade The user's grade.
 */
export const setUserProperties = (nickname: string, grade: string) => {
  console.log(`[Analytics] Set user properties: nickname=${nickname}, grade=${grade}`);
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('set', 'user_properties', {
      nickname: nickname,
      grade: grade,
    });
  }
};

/**
 * Tracks the start of a quiz.
 * Fires when the countdown finishes and the game begins.
 * @param levelId The ID of the quiz level.
 */
export const trackQuizStart = (levelId: string) => {
  console.log(`[Analytics] Track event: quiz_start, level_id=${levelId}`);
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'quiz_start', {
      level_id: levelId,
    });
  }
};

/**
 * Tracks the completion of a quiz.
 * @param levelId The ID of the quiz level.
 * @param score The final score (0-100).
 * @param time The elapsed time in milliseconds.
 */
export const trackQuizComplete = (levelId: string, score: number, time: number) => {
  console.log(`[Analytics] Track event: quiz_complete, level_id=${levelId}, score=${score}, time=${time}`);
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'quiz_complete', {
      level_id: levelId,
      score: score,
      time: time,
    });
  }
};
