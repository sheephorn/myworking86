import { router } from "@inertiajs/react";
import GachaScreen from "../Components/GachaScreen";
import MainLayout from "../Layouts/MainLayout";

export default function Gacha() {
  const handleBack = () => {
    router.visit('/');
  };

  return (
    <MainLayout>
      <GachaScreen
        onBack={handleBack}
      />
    </MainLayout>
  );
}
