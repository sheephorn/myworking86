import { useState, useEffect, ReactNode } from 'react';
import { UserProfile } from '../types';
import { getUserProfile, getUsers, setCurrentUser, deleteUserProfile } from '../utils/storage';
import { setUserProperties } from '../utils/analytics';
import UserSwitchModal from '../Components/UserSwitchModal';
import { router } from '@inertiajs/react';
import FeedbackOverlay from '../Components/FeedbackOverlay';
import UserContext from '../contexts/UserContext';

interface Props {
    children: ReactNode;
}

export default function MainLayout({ children }: Props) {
    const [userProfile, setUserProfile] = useState<UserProfile | null>(() => getUserProfile());
    const [users, setUsers] = useState<UserProfile[]>(() => getUsers());
    const [isUserSwitchModalOpen, setIsUserSwitchModalOpen] = useState(false);

    useEffect(() => {
        // Hydrate from localStorage on client side mount
        const profile = getUserProfile();
        setUserProfile(profile);
        setUsers(getUsers());

        if (profile) {
            setUserProperties(profile.nickname, String(profile.grade));
        } else {
             // If no user is found, force redirection to registration page,
             // unless we are already there.
             if (window.location.pathname !== '/registration') {
                 router.visit('/registration');
             }
        }
    }, []);

    const handleSwitchUser = (userId: string) => {
        setCurrentUser(userId);
        const profile = getUserProfile();
        setUserProfile(profile);
        setIsUserSwitchModalOpen(false);
        // Reload or visit welcome to refresh state/context for the new user
        router.visit('/');
    };

    const handleCreateNewUser = () => {
        setIsUserSwitchModalOpen(false);
        router.visit('/registration');
    };

    const handleDeleteUser = (userId: string) => {
        deleteUserProfile(userId);
        setUsers(getUsers());
        // If current user was deleted, handleSwitchUser might handle it?
        // deleteUserProfile logic in storage.ts might need check.
        // Usually, we should switch to another user if current is deleted.
        // But for now, we just update the list.
        const currentUser = getUserProfile();
        if (!currentUser) {
            router.visit('/registration');
        } else if (currentUser.id !== userProfile?.id) {
             setUserProfile(currentUser);
        }
    };

    return (
       <div className="flex flex-col items-center pt-1 min-h-screen bg-blue-50">
           <div className={`w-full p-6 ${window.location.pathname.startsWith('/quiz') ? 'max-w-7xl' : 'max-w-md'}`}>
               <UserContext.Provider value={{ user: userProfile, openSwitchModal: () => setIsUserSwitchModalOpen(true) }}>
                   {children}
               </UserContext.Provider>
           </div>
           <UserSwitchModal
               isOpen={isUserSwitchModalOpen}
               onClose={() => setIsUserSwitchModalOpen(false)}
               users={users}
               currentUser={userProfile}
               onSwitchUser={handleSwitchUser}
               onCreateNewUser={handleCreateNewUser}
               onDeleteUser={handleDeleteUser}
           />
           <FeedbackOverlay />
       </div>
    );
}
