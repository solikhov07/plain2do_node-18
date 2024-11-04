import React, {useState} from 'react'
import russianFlag from "../../../images/russian.png";
import britishFlag from "../../../images/england.png";
import turkishFlag from "../../../images/turkish.png";
import {useLanguage} from '../../../context/LanguageContext'
import './index.css'
const LanguageSelector = ({languageBoxState, setLanguageBoxState}) => {
    const language2 = useLanguage().language || "en"
    const { switchLanguage } = useLanguage()
    const [languages, setLanguages] = useState([
        {
          language: "en",
          src: britishFlag,
        },
        {
          language: "ru",
          src: russianFlag,
        },
        {
          language: "tr",
          src: turkishFlag,
        },
      ]);
      languages.forEach(e => {
        if(e.language === language2){
        languages.unshift(e);
        languages.splice(languages.lastIndexOf(e), 1);}
      })
      const [language, setLanguage] = useState(languages[0].language);
    return (
        <div
        data-select-language="select-language"
        style={languageBoxState ? { right: 0 } : { right: "-170px" }}
        onClick={() => {
          setLanguageBoxState(!languageBoxState);
        }}
        className="registration-demo-select-language"
      >
        {languages.map((e, index) => {
          return (
            <div key={index}
              data-select-language="select-language"
              onClick={() => {
                setLanguage(e.language);
                languages.unshift(e);
                languages.splice(languages.lastIndexOf(e), 1);
                setLanguages(languages);
                switchLanguage(e.language)
              }}
              className="registration-demo-language-option-box"
            >
              <img data-select-language="select-language" src={e.src} />
            </div>
          );
        })}
      </div>
    )
}

export default LanguageSelector
