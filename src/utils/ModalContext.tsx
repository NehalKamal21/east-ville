import React, { createContext, useContext, useState, ReactNode } from 'react';

export type ModalType = 'contact' | 'kasakoun' | 'callback' | 'floorPlan' | 'success' | 'compound';

interface ModalContextType {
  activeModal: ModalType | null;
  openModal: (modalType: ModalType) => void;
  closeModal: () => void;
  closeAllModals: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModal must be used within ModalProvider");
  }
  return context;
};

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [activeModal, setActiveModal] = useState<ModalType | null>(null);

  const openModal = (modalType: ModalType) => {
    // Close any existing modal before opening a new one
    setActiveModal(modalType);
  };

  const closeModal = () => {
    setActiveModal(null);
  };

  const closeAllModals = () => {
    setActiveModal(null);
  };

  return (
    <ModalContext.Provider value={{ activeModal, openModal, closeModal, closeAllModals }}>
      {children}
    </ModalContext.Provider>
  );
}; 