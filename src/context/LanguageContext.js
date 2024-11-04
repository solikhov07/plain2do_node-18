import React, { createContext, useState, useEffect, useContext } from "react";

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const browserLanguage = navigator.language.slice(0, 2);

  const [language, setLanguage] = useState(
    localStorage.getItem("appLanguage") ||
      (["en", "tr", "ru"].includes(browserLanguage) ? browserLanguage : "en")
  );

  const switchLanguage = (lang) => {
    setLanguage(lang);
    localStorage.setItem("appLanguage", lang);
  };

  useEffect(() => {
    if (!localStorage.getItem("appLanguage")) {
      switchLanguage(browserLanguage);
    }
  }, [browserLanguage]);

  return (
    <LanguageContext.Provider value={{ language, switchLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
