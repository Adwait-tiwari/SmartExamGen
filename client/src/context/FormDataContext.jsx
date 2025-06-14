import React, { createContext, useState, useContext, useEffect } from 'react';

const FormDataContext = createContext();

export const FormDataProvider = ({ children }) => {
  const [formDataList, setFormDataList] = useState(() => {
    const saved = localStorage.getItem('formDataList');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('formDataList', JSON.stringify(formDataList));
  }, [formDataList]);

  const addFormData = (data) => {
    setFormDataList((prev) => [...prev, data]);
  };

  return (
    <FormDataContext.Provider value={{ formDataList, addFormData }}>
      {children}
    </FormDataContext.Provider>
  );
};

export const useFormData = () => useContext(FormDataContext);
