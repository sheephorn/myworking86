import { router } from "@inertiajs/react";
import HistoryScreen from "../Components/HistoryScreen";
import MainLayout from "../Layouts/MainLayout";
import { getHistory, clearHistory } from "../utils/storage";
import { useState, useEffect } from "react";
import { HistoryRecord } from "../types";

export default function History() {
  const [history, setHistory] = useState<HistoryRecord[]>([]);

  useEffect(() => {
      setHistory(getHistory());
  }, []);

  const handleBack = () => {
    router.visit('/');
  };

  const handleClearHistory = () => {
    clearHistory();
    setHistory([]);
  };

  return (
    <MainLayout>
      <HistoryScreen
        history={history}
        onBack={handleBack}
        onClearHistory={handleClearHistory}
      />
    </MainLayout>
  );
}
