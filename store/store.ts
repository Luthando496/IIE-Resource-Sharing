import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

// Define the shape of your user object
export interface User {
  id: string;
  name: string;
  email: string;
  // Add any other user properties you need here
}

// Define the state and actions for the store
export interface UserState {
  user: User | null;
  isLoggedIn: boolean;
  login: (userData: User) => void;
  logout: () => void;
}

// Create the Zustand store with the persist middleware
export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      // Initial state
      user: null,
      isLoggedIn: false,

      // Action to log in a user
      login: (userData) => {
        set({
          user: userData,
          isLoggedIn: true,
        });
      },

      // Action to log out a user
      logout: () => {
        set({
          user: null,
          isLoggedIn: false,
        });
      },
    }),
    {
      name: 'user-storage', // unique name for the storage key
      storage: createJSONStorage(() => localStorage), // use localStorage as the storage medium
      partialize: (state) => ({
        user: state.user,
        isLoggedIn: state.isLoggedIn,
      }), // only persist the user and isLoggedIn fields
    }
  )
);
