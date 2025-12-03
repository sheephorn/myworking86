import { router } from "@inertiajs/react";
import ResultScreen from "../Components/ResultScreen";
import { GRADES } from "../constants";
import MainLayout from "../Layouts/MainLayout";

export default function Result() {
  const params = new URLSearchParams(window.location.search);
  const score = parseInt(params.get('score') || '0', 10);
  const time = parseInt(params.get('time') || '0', 10);
  const levelId = params.get('level');

  const level = GRADES.flatMap(g => g.levels).find(l => l.id === levelId);
  const medalCriteria = level?.medalCriteria;

  const handleRestart = () => {
    // Go back to quiz with same params
    window.history.back();
    // Or better:
    // router.visit(`/quiz?level=${levelId}&mode=...`)
    // But we lost the mode. Ideally pass it in result URL too.
    // For now, let's just go back, which works well for "Restart".
  };

  const handleGoToTop = () => {
    router.visit('/');
  };

  return (
    <MainLayout>
      <ResultScreen
        score={score}
        finalTime={time}
        onRestart={handleRestart}
        onGoToTop={handleGoToTop}
        medalCriteria={medalCriteria}
      />
    </MainLayout>
  );
}
