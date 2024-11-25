export const latinToCyrillicMap = {
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
    h: "х",
    ye: "е",
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
  
  export const convertToCyrillic = (latin) => {
    let result = "";
    let i = 0;
  
    while (i < latin.length) {
      const twoChar = latin.slice(i, i + 2);
      const oneChar = latin[i];
  
      if (latinToCyrillicMap[twoChar]) {
        result += latinToCyrillicMap[twoChar];
        i += 2;
      } else if (latinToCyrillicMap[oneChar]) {
        result += latinToCyrillicMap[oneChar];
        i += 1;
      } else {
        result += oneChar;
        i += 1;
      }
    }
  
    return result;
  };