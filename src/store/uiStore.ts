import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface UIState {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
  isLayoutGrid: boolean;
  toggleLayoutGrid: () => void;
}

export const useUIStore = create<UIState>()(
  persist(
    (set) => ({
      isSidebarOpen: true,
      toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
      isLayoutGrid: false,
      toggleLayoutGrid: () => set((state) => ({ isLayoutGrid: !state.isLayoutGrid })),
    }),
    {
      name: 'ui-store',
    }
  )
); 