import React, { useState } from "react";

const LatinToCyrillicConverter = () => {
  const [latinText, setLatinText] = useState("");
  const [cyrillicText, setCyrillicText] = useState("");

  // Extended character mapping for Latin to Cyrillic, including uppercase
  const latinToCyrillicMap = {
    a: "а",
    b: "б",
    v: "в",
    g: "г",
    d: "д",
    e: "е",
    yo: "ё",
    j: "ж",
    z: "з",
    i: "и",
    y: "й",
    k: "к",
    l: "л",
    m: "м",
    n: "н",
    o: "о",
    p: "п",
    r: "р",
    s: "с",
    t: "т",
    u: "у",
    f: "ф",
    x: "х",
    ch: "ч",
    sh: "ш",
    "'": "ъ",
    yu: "ю",
    ya: "я",
    "o'": "ў",
    "g'": "ғ",
    q: "қ",
    h: "ҳ",
    ye: "е",
    // Uppercase mappings
    A: "А",
    B: "Б",
    V: "В",
    G: "Г",
    D: "Д",
    E: "Э",
    Yo: "Ё",
    J: "Ж",
    Z: "З",
    I: "И",
    Y: "Й",
    K: "К",
    L: "Л",
    M: "М",
    N: "Н",
    O: "О",
    P: "П",
    R: "Р",
    S: "С",
    T: "Т",
    U: "У",
    F: "Ф",
    X: "Х",
    Ch: "Ч",
    Sh: "Ш",
    Yu: "Ю",
    Ya: "Я",
    "O'": "Ў",
    "G'": "Ғ",
    Q: "Қ",
    H: "Ҳ",
    Ye: "Е",
  };

  // Function to convert Latin to Cyrillic
  const convertToCyrillic = (latin) => {
    let result = "";
    let i = 0;

    while (i < latin.length) {
      // Check for two-character combinations first
      const twoChar = latin.slice(i, i + 2);
      const oneChar = latin[i];

      if (latinToCyrillicMap[twoChar]) {
        result += latinToCyrillicMap[twoChar];
        i += 2; // Skip the second character since it's already mapped
      } else if (latinToCyrillicMap[oneChar]) {
        result += latinToCyrillicMap[oneChar];
        i += 1;
      } else {
        // If no match, just add the character as-is
        result += oneChar;
        i += 1;
      }
    }

    return result;
  };

  // Handle Latin input change
  const handleLatinChange = (e) => {
    const value = e.target.value;
    setLatinText(value);
    setCyrillicText(convertToCyrillic(value));
  };

  return (
    <div style={{ padding: "20px" }}>
      <h3>Latin to Cyrillic Converter</h3>
      <div>
        <label>Latin Name:</label>
        <input
          type="text"
          value={latinText}
          onChange={handleLatinChange}
          placeholder="Enter Latin text"
          style={{
            display: "block",
            margin: "10px 0",
            padding: "5px",
            width: "300px",
          }}
        />
      </div>
      <div>
        <label>Cyrillic Name:</label>
        <input
          type="text"
          value={cyrillicText}
          placeholder="Generated Cyrillic text"
          style={{
            display: "block",
            margin: "10px 0",
            padding: "5px",
            width: "300px",
          }}
          readOnly
        />
      </div>
    </div>
  );
};

export default LatinToCyrillicConverter;