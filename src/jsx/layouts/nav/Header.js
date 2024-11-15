import React from "react";
import { useLanguage } from "../../../context/LanguageContext";
// import translations from "../../../translation/translation";
import translations from "../../../translation/urlTranslations";
import { useState } from "react";
import { Link } from "react-router-dom";
import enFlag from "../../../images/england.png";
import trFlag from "../../../images/turkish.png";
import ruFlag from "../../../images/russian.png";
// import uzFlag from "../../../images/uzb.png";

const Header = ({ onNote }) => {
  const { switchLanguage } = useLanguage();
  const { language } = useLanguage();

  var path = window.location.pathname.split("/");
  var name = path[path.length - 1].split("-");
  var filterName = name.length >= 3 ? name.filter((n, i) => i > 0) : name;
  var finalName = filterName.includes("app")
    ? filterName.filter((f) => f !== "app")
    : filterName.includes("ui")
    ? filterName.filter((f) => f !== "ui")
    : filterName.includes("uc")
    ? filterName.filter((f) => f !== "uc")
    : filterName.includes("basic")
    ? filterName.filter((f) => f !== "basic")
    : filterName.includes("jquery")
    ? filterName.filter((f) => f !== "jquery")
    : filterName.includes("table")
    ? filterName.filter((f) => f !== "table")
    : filterName.includes("page")
    ? filterName.filter((f) => f !== "page")
    : filterName.includes("email")
    ? filterName.filter((f) => f !== "email")
    : filterName.includes("ecom")
    ? filterName.filter((f) => f !== "ecom")
    : filterName.includes("chart")
    ? filterName.filter((f) => f !== "chart")
    : filterName.includes("editor")
    ? filterName.filter((f) => f !== "editor")
    : filterName;

  const languages = [
    { code: "en", name: "English", flag: enFlag },
    { code: "tr", name: "Türkçe", flag: trFlag },
    { code: "ru", name: "Русский", flag: ruFlag },
    // { code: "uz", name: "O'zbek", flag: uzFlag },
  ];

  const LanguageSwitcher = () => {
    const { language, switchLanguage } = useLanguage();
    const [isOpen, setIsOpen] = useState(false);

    const handleSelect = (code) => {
      switchLanguage(code);
      setIsOpen(false);
    };

    return (
      <li>
        <div
          className={`custom-dropdown m-0 d-flex align-items-center language-wrapper ${
            isOpen ? "open" : ""
          }`}
          onClick={() => setIsOpen(!isOpen)}
          onBlur={() => setIsOpen(false)}
          tabIndex="0"
          style={{ position: "relative" }}
        >
          <img
            src={languages.find((lang) => lang.code === language)?.flag}
            alt={language}
            style={{
              width: "30px",
              height: "30px",
              borderRadius: "50%",
              marginRight: "5px",
            }}
          />
          <div style={{ color: "black" }}>{language.toUpperCase()}</div>
          <div
            className={`dropdown-options language-wrapper pb-0 ${
              isOpen ? "open" : ""
            }`}
            style={{
              position: "absolute",
              top: "100%",
              left: 0,
              backgroundColor: "#f6f6f6",
              overflow: "hidden",
              transition:
                "max-height 0.3s ease-out, opacity 0.3s ease-out, visibility 0.3s ease-out",
              maxHeight: isOpen ? "200px" : "0",
              opacity: isOpen ? 1 : 0,
              visibility: isOpen ? "visible" : "hidden",
            }}
          >
            {languages
              .filter((lang) => lang.code !== language) // Exclude the selected language
              .map((lang) => (
                <div
                  key={lang.code}
                  onClick={() => handleSelect(lang.code)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: "5px",
                  }}
                >
                  <img
                    src={lang.flag}
                    alt={lang.code}
                    style={{
                      width: "30px",
                      height: "30px",
                      borderRadius: "50%",
                      marginRight: "5px",
                    }}
                  />
                  <div style={{ color: "black", marginBottom: "5px" }}>
                    {lang.code.toUpperCase()}
                  </div>
                </div>
              ))}
          </div>
        </div>
      </li>
    );
  };

  const SearchBar = () => {
    const { language } = useLanguage();

    return (
      <li className="nav-item">
        <div className="input-group search-area">
          <input
            type="text"
            className="form-control"
            placeholder={translations[language].searchPlaceholder}
          />
          <span className="input-group-text">
            <Link to={"#"}>
              <i className="flaticon-381-search-2"></i>
            </Link>
          </span>
        </div>
      </li>
    );
  };

  const camelCaseSegment = finalName
    .map((word, index) =>
      index === 0 ? word : word.charAt(0).toUpperCase() + word.slice(1)
    )
    .join("");

  const t = translations[language][camelCaseSegment] || camelCaseSegment;

  console.log(t);

  return (
    <div className="header">
      <div className="header-content">
        <nav className="navbar navbar-expand">
          <div className="collapse navbar-collapse justify-content-between">
            <div className="header-left">
              <div
                className="dashboard_bar"
                style={{ textTransform: "capitalize" }}
              >
                {t}
              </div>
            </div>
            <ul className="navbar-nav header-right main-notification align-items-center">
              <SearchBar />
              <LanguageSwitcher />
            </ul>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Header;