import { useState } from "react";
import { Link, router } from "@inertiajs/react";
import { Level } from "../types";
import { GRADES } from "../constants";
import QuestionIcon from "../Components/icons/QuestionIcon";
import MainLayout from "../Layouts/MainLayout";
import { useUser } from "../contexts/UserContext";
import AnswerModeModal from "../Components/AnswerModeModal";
import { AnswerMode } from "../types";

export default function Welcome() {
  const { user, openSwitchModal } = useUser();
  const [selectedGrade, setSelectedGrade] = useState<number | null>(null);
  const [isAnswerModeModalOpen, setIsAnswerModeModalOpen] = useState(false);
  const [pendingLevel, setPendingLevel] = useState<Level | null>(null);

  const handleStartGameRequest = (level: Level) => {
    if (level.calculationPadAvailable) {
      setPendingLevel(level);
      setIsAnswerModeModalOpen(true);
    } else {
      startGame(level, 'choice');
    }
  };

  const handleAnswerModeSelect = (mode: AnswerMode) => {
    if (pendingLevel) {
      startGame(pendingLevel, mode);
    }
    setIsAnswerModeModalOpen(false);
    setPendingLevel(null);
  };

  const startGame = (level: Level, mode: AnswerMode) => {
    router.visit(`/quiz?level=${level.id}&mode=${mode}`);
  };

  const gradeSelection = (
    <div className="space-y-4">
      {GRADES.map((grade) => (
        <button
          key={grade.grade}
          onClick={() => setSelectedGrade(grade.grade)}
          className="w-full bg-brand-yellow hover:bg-yellow-300 text-slate-800 font-black text-2xl py-4 rounded-2xl shadow-[0_6px_0_rgb(217,179,16)] active:shadow-[0_0px_0_rgb(217,179,16)] active:translate-y-[6px] transition-all"
        >
          {grade.name}
        </button>
      ))}
      {/* History Button */}
       <Link
        href="/history"
        className={`block w-full font-black text-xl py-4 rounded-2xl transition-all text-center ${
            // Ideally check if history exists, but simplistic for now
             "bg-slate-200 hover:bg-slate-300 text-slate-600 shadow-[0_6px_0_rgb(170,178,189)] active:shadow-[0_0px_0_rgb(170,178,189)] active:translate-y-[6px]"
          }`}
      >
        履歴を見る
      </Link>

      <Link
        href="/gacha"
        className="block w-full bg-purple-100 hover:bg-purple-200 text-purple-600 font-black text-xl py-4 rounded-2xl shadow-[0_6px_0_rgb(216,180,254)] active:shadow-[0_0px_0_rgb(216,180,254)] active:translate-y-[6px] transition-all text-center"
      >
        🎁 ガチャへ
      </Link>
    </div>
  );

  const levelSelection = (
    <div className="space-y-4">
      {GRADES.find((g) => g.grade === selectedGrade)?.levels.map((level: Level) => (
        <div key={level.id} className="flex items-center space-x-2">
          <button
            onClick={() => handleStartGameRequest(level)}
            className="w-full bg-brand-blue hover:bg-blue-300 text-slate-800 font-black text-2xl py-4 rounded-2xl shadow-[0_6px_0_rgb(74,168,209)] active:shadow-[0_0px_0_rgb(74,168,209)] active:translate-y-[6px] transition-all"
          >
            {level.name}
          </button>
          {level.textbookUrl && (
            <a
              href={level.textbookUrl}
              className="text-slate-300 hover:text-slate-500 transition-colors duration-200 p-2"
              aria-label={`${level.name}の教科書を開く`}
            >
              <QuestionIcon />
            </a>
          )}
        </div>
      ))}
      <button
        onClick={() => setSelectedGrade(null)}
        className="w-full bg-slate-200 hover:bg-slate-300 text-slate-600 font-black text-xl py-4 rounded-2xl shadow-[0_6px_0_rgb(170,178,189)] active:shadow-[0_0px_0_rgb(170,178,189)] active:translate-y-[6px] transition-all"
      >
        もどる
      </button>
    </div>
  );

  return (
    <MainLayout>
      <div className="bg-white rounded-3xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)] p-8 text-center transform transition-all hover:scale-[1.02] duration-300 border-4 border-white ring-4 ring-blue-100 relative">
        <Link
          href="/settings"
          className="absolute top-4 right-4 text-slate-300 hover:text-slate-500 transition-colors duration-200"
          aria-label="Settings"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.1a2 2 0 0 1-1-1.74v-.47a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
            <circle cx="12" cy="12" r="3" />
          </svg>
        </Link>

        <div className="mb-8 relative">
          <div className="absolute -top-16 left-1/2 transform -translate-x-1/2 text-6xl animate-bounce">
            🎓
          </div>
          <h1 className="text-4xl font-extrabold text-slate-800 mt-8 mb-2 tracking-tight">
            さんすう
            <br />
            <span className="text-brand-blue">クイズ</span>
          </h1>
          {user && (
            <div className="mb-2 flex items-center justify-center gap-2">
              <div className="text-xl font-black text-slate-700 bg-blue-50 py-2 px-4 rounded-xl">
                {user.nickname}さん <span className="text-slate-500 text-lg font-bold">({user.grade}ねんせい)</span>
              </div>
              <button
                onClick={openSwitchModal}
                className="bg-slate-100 hover:bg-slate-200 text-slate-500 p-2 rounded-xl transition-colors"
                aria-label="ユーザーを切り替える"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                </svg>
              </button>
            </div>
          )}
          <p className="text-slate-500 font-bold text-lg">
            {selectedGrade === null
              ? "がくねんをえらんでね！"
              : "たんげんをえらんでね！"}
          </p>
        </div>

        {selectedGrade === null ? gradeSelection : levelSelection}
      </div>

      <AnswerModeModal
          isOpen={isAnswerModeModalOpen}
          onSelect={handleAnswerModeSelect}
          onClose={() => setIsAnswerModeModalOpen(false)}
      />
    </MainLayout>
  );
}
