'use client';

import { createContext, ReactNode } from 'react';
import { useState } from '@/hooks/use-state';
import { useContext } from '@/hooks/use-context';

export type FormData = {
  name: string;
  email: string;
  message: string;
};

type FormContextType = {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
};

const FormContext = createContext<FormContextType | undefined>(undefined);

export const FormProvider = ({ children }: { children: ReactNode }) => {
  const [formData, setFormData] = useState<FormData>({ name: '', email: '', message: '' });

  return (
    <FormContext.Provider value={{ formData, setFormData }}>
      {children}
    </FormContext.Provider>
  );
};

export const useFormContext = () => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error('useFormContext must be used within a FormProvider');
  }
  return context;
};
