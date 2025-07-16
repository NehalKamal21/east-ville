import React, { createContext, useContext, useState, ReactNode } from "react";

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
  const [isOpen, setIsOpen] = useState(false);
  const [prefillData, setPrefillData] = useState<ContactFormData>({});

  const openModal = (prefill?: ContactFormData) => {
    if (prefill) setPrefillData(prefill);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setPrefillData({});
  };

  return (
    <ContactModalContext.Provider value={{ openModal, closeModal, isOpen, prefillData }}>
      {children}
    </ContactModalContext.Provider>
  );
};