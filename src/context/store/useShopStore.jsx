import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { STORAGE_KEYS } from '@/utils/config/constants';

const initialState = {
  badgeSearchTerm: '',
  selectedBadges: [],
  iconSearchTerm: '',
  themeMode: 'dark',
  loading: false,
  error: null,
};

export const useShopStore = create(
  persist(
    (set) => ({
      ...initialState,
      // Search terms
      setBadgeSearchTerm: (badgeSearchTerm) => set({ badgeSearchTerm }),
      setIconSearchTerm: (iconSearchTerm) => set({ iconSearchTerm }),
      // Selected badges
      setSelectedBadges: (selectedBadges) => set({ selectedBadges }),
      addBadge: (badge) =>
        set((state) => ({ selectedBadges: [...state.selectedBadges, badge] })),
      removeBadge: (badgeName) =>
        set((state) => ({
          selectedBadges: state.selectedBadges.filter((b) => b !== badgeName),
        })),
      // Theme
      setThemeMode: (themeMode) => set({ themeMode }),
      toggleTheme: () =>
        set((state) => ({
          themeMode: state.themeMode === 'light' ? 'dark' : 'light',
        })),
      // Loading/Error
      setLoading: (loading) => set({ loading }),
      setError: (error) => set({ error }),
    }),
    {
      name: STORAGE_KEYS.SELECTED_BADGES,
    }
  )
);
