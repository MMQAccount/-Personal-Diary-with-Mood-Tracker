import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import enTranslation from "./locales/en/translation.json";
import arTranslation from "./locales/ar/translation.json";

import enDiary from "./locales/en/diary.json";
import arDiary from "./locales/ar/diary.json";

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: enTranslation,
        diary: enDiary,
      },
      ar: {
        translation: arTranslation,
        diary: arDiary,
      },
    },
    lng: "en",
    fallbackLng: "en",
    ns: ["translation", "diary"],
    defaultNS: "translation",
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
