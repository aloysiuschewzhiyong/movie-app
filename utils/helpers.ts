export const getLanguageName = (code: string) => {
  const languages: { [key: string]: string } = {
    en: "English",
    es: "Spanish",
    fr: "French",
    de: "German",
    it: "Italian",
    ja: "Japanese",
    ko: "Korean",
    zh: "Chinese",
    hi: "Hindi",
    pt: "Portuguese",
    ar: "Arabic",
    af: "Afrikaans",
    tl: "Tagalog",
    pl: "Polish",
    ru: "Russian",
    tr: "Turkish",
    nl: "Dutch",
    da: "Danish",
    sv: "Swedish",
    no: "Norwegian",
    fi: "Finnish",
    th: "Thai",
    cs: "Czech",
    el: "Greek",
    he: "Hebrew",
    id: "Indonesian",
    fa: "Persian",
    vi: "Vietnamese",
    bn: "Bengali",
    ta: "Tamil",
    te: "Telugu",
    ml: "Malayalam",
    hu: "Hungarian",
    ro: "Romanian",
    uk: "Ukrainian",
    bg: "Bulgarian",
    hr: "Croatian",
    sr: "Serbian",
    sk: "Slovak",
    sl: "Slovenian",
    as: "Assamese",
    cn: "Chinese",  // Alternative code for Chinese
    cmn: "Mandarin",
    yue: "Cantonese",
    // Add more as needed
  };
  return languages[code.toLowerCase()] || code.toUpperCase();
};

export const getContentRating = (adult: boolean) => {
  if (adult) return "R21";
  return "PG13";
}; 