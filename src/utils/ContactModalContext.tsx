import React, { createContext, useContext, useState, ReactNode } from "react";
import { useModal } from './ModalContext';

interface ContactFormData {
  interestedUnit?: string;
}

interface ContactModalContextType {
  openModal: (prefill?: ContactFormData) => void;
  closeModal: () => void;
  isOpen: boolean;
  prefillData: ContactFormData;
}

const ContactModalContext = createContext<ContactModalContextType | undefined>(undefined);

export const useContactModal = () => {
  const context = useContext(ContactModalContext);
  if (!context) {
    throw new Error("useContactModal must be used within ContactModalProvider");
  }
  return context;
};

export const ContactModalProvider = ({ children }: { children: ReactNode }) => {
  const [prefillData, setPrefillData] = useState<ContactFormData>({});
  const { activeModal, openModal: openGlobalModal, closeModal: closeGlobalModal } = useModal();

  const openModal = (prefill?: ContactFormData) => {
    if (prefill) setPrefillData(prefill);
    openGlobalModal('contact');
  };

  const closeModal = () => {
    setPrefillData({});
    closeGlobalModal();
  };

  return (
    <ContactModalContext.Provider value={{ openModal, closeModal, isOpen: activeModal === 'contact', prefillData }}>
      {children}
    </ContactModalContext.Provider>
  );
};