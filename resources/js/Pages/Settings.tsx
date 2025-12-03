import { router } from "@inertiajs/react";
import SettingsScreen from "../Components/SettingsScreen";
import MainLayout from "../Layouts/MainLayout";
import { GameSettings } from "../types";

export default function Settings() {
  const handleBack = () => {
    router.visit('/');
  };

  const handleSettingsChange = (newSettings: GameSettings) => {
    // SettingsScreen saves to storage automatically?
    // Let's check SettingsScreen implementation.
    // It calls onSettingsChange, but usually it also needs to update local state or storage.
    // The original App.tsx updated state.
    // We should probably check if SettingsScreen handles storage or if we need to.
  };

  return (
    <MainLayout>
      <SettingsScreen
        onBack={handleBack}
        onSettingsChange={handleSettingsChange}
      />
    </MainLayout>
  );
}
