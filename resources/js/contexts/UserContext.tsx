import { createContext, useContext } from 'react';
import { UserProfile } from '../types';

interface UserContextType {
    user: UserProfile | null;
    openSwitchModal: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function useUser() {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
}

export default UserContext;
