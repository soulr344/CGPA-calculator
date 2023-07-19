import { create } from "zustand";

type ModalStore = {
  infoModal: boolean;
  toggleInfoModal: () => void;
  helpModal: boolean;
  toggleHelpModal: () => void;
  settingsModal: boolean;
  toggleSettingsModal: () => void;
  darkMode: boolean;
  toggleDarkMode: () => void;
  resultOpen: boolean;
  toggleResult: () => void;
};

const useModalStore = create<ModalStore>((set) => ({
  infoModal: false,
  toggleInfoModal: () =>
    set((state) => ({ ...state, infoModal: !state.infoModal })),
  helpModal: false,
  toggleHelpModal: () =>
    set((state) => ({ ...state, helpModal: !state.helpModal })),
  settingsModal: false,
  toggleSettingsModal: () =>
    set((state) => ({ ...state, settingsModal: !state.settingsModal })),
  darkMode: false,
  toggleDarkMode: () => {
    set((state) => {
      document.documentElement.classList.toggle("dark", !state.darkMode);
      return {
        ...state,
        darkMode: !state.darkMode,
      };
    });
  },
  resultOpen: false,
  toggleResult: () =>
    set((state) => ({
      ...state,
      resultOpen: !state.resultOpen,
    })),
}));

export type { ModalStore };
export { useModalStore };
