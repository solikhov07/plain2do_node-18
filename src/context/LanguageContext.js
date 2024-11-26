import React, { createContext, useState, useEffect, useContext } from "react";

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  // Detect browser's language and fall back to 'en' if necessary
  const browserLanguage = navigator.language.slice(0, 2); // Get the first two characters of the browser language

  // Initially get the language from local storage, or default to 'ru', or 'en'
  const [language, setLanguage] = useState(
    localStorage.getItem("appLanguage") ||
      (["en", "tr", "ru"].includes(browserLanguage) ? browserLanguage : "ru") // Default to 'ru'
  );

  const switchLanguage = (lang) => {
    setLanguage(lang);
    localStorage.setItem("appLanguage", lang); // Save to local storage
  };

  useEffect(() => {
    // If no language is set in local storage, set it to the default 'ru'
    if (!localStorage.getItem("appLanguage")) {
      switchLanguage("ru"); // Default language is 'ru'
    }
  }, []);

  return (
    <LanguageContext.Provider value={{ language, switchLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);