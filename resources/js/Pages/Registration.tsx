import { router } from "@inertiajs/react";
import UserRegistrationScreen from "../Components/UserRegistrationScreen";
import MainLayout from "../Layouts/MainLayout";
import { UserProfile } from "../types";
import { saveUserProfile, getUsers, getUserProfile } from "../utils/storage";
import { setUserProperties } from "../utils/analytics";

export default function Registration() {
  const handleComplete = (profile: UserProfile) => {
    saveUserProfile(profile);
    setUserProperties(profile.nickname, String(profile.grade));
    router.visit('/');
  };

  return (
    <MainLayout>
      <UserRegistrationScreen
        onComplete={handleComplete}
      />
    </MainLayout>
  );
}
