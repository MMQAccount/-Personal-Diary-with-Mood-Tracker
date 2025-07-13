// src/i18n.ts
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      welcome: "Welcome,",
      search_placeholder: "Search ...",
      mood: "Mood",
      no_result: "No Result",
      cant_find: "Can't Find Any Diary, Try To Add Some",
      input: "input",
      voice: "voice",
      image: "image",
      mood_option: "mood",
      Family: "Family",
      Work: "Work",
      School: "School",
      Friends: "Friends",
      // ... أضف باقي النصوص الثابتة هنا
    },
  },
  ar: {
    translation: {
      welcome: "مرحبا،",
      search_placeholder: "ابحث ...",
      mood: "المزاج",
      no_result: "لا توجد نتائج",
      cant_find: "لا يمكن العثور على أي يوميات، حاول إضافة بعضها",
      input: "نص",
      voice: "صوت",
      image: "صورة",
      mood_option: "مزاج",
      Family: "العائلة",
      Work: "العمل",
      School: "المدرسة",
      Friends: "الأصدقاء",
      // ... أضف باقي النصوص هنا بالعربي
    },
  },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',  // اللغة الافتراضية
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
