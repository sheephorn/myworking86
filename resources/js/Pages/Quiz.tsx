import { router } from "@inertiajs/react";
import QuizScreen from "../Components/QuizScreen";
import { GRADES } from "../constants";
import { AnswerMode } from "../types";
import MainLayout from "../Layouts/MainLayout";
import { saveRecord, getHistory, updateLevelStats, getSettings } from "../utils/storage";
import { trackQuizComplete } from "../utils/analytics";
import { useState } from "react";

// In a real app, these props would come from the server via Inertia
// But here we rely on URL params if server doesn't pass them?
// Actually Inertia passes props.
// We can use a small hack: read window.location.search if props are missing.
// Or assume the server (routes/web.php) will pass them.

export default function Quiz() {
  // Parse URL params for client-side logic
  const params = new URLSearchParams(window.location.search);
  const levelId = params.get('level');
  const answerMode = (params.get('mode') as AnswerMode) || 'choice';

  const level = GRADES.flatMap(g => g.levels).find(l => l.id === levelId);
  const settings = getSettings();

  // Key to force remount on restart
  const [quizKey, setQuizKey] = useState(0);

  if (!level) {
      return (
          <MainLayout>
              <div className="text-center p-8">
                  <h2 className="text-2xl font-bold text-red-500">エラー: レベルが見つかりません</h2>
                  <button onClick={() => router.visit('/')} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">
                      トップへ戻る
                  </button>
              </div>
          </MainLayout>
      );
  }

  const handleQuizComplete = (score: number, time: number) => {
    const gradeInfo = GRADES.find((g) =>
      g.levels.some((l) => l.id === level.id)
    );
    const grade = gradeInfo ? gradeInfo.grade : undefined;

    saveRecord({
      timestamp: Date.now(),
      score,
      level: level.id,
      time,
      grade,
    });

    updateLevelStats(level.id, score, time);
    trackQuizComplete(level.id, score, time);

    router.visit(`/result?score=${score}&time=${time}&level=${level.id}`);
  };

  const handleGoToTop = () => {
    router.visit('/');
  };

  return (
    <MainLayout>
      <QuizScreen
        key={`${level.id}-${answerMode}-${quizKey}`}
        level={level}
        answerMode={answerMode}
        onQuizComplete={handleQuizComplete}
        onGoToTop={handleGoToTop}
        showTimer={settings.showTimer}
      />
    </MainLayout>
  );
}
