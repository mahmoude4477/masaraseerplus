"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

type Language = "ar" | "en"

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const translations = {
  ar: {
    // Navigation
    "nav.home": "الصفحة الرئيسية",
    "nav.destination": "اختر وجهتك",
    "nav.plan": "خطتي",
    "nav.experience": "تجربتي",
    "nav.experiences": "تجارب الزوار",
    "nav.language": "اللغة",
    "nav.login": "تسجيل الدخول",
    "nav.logo": "مسار بلس",

    // Home page
    "home.title": "مسار بلس",
    "home.subtitle": "رحلتك تبدأ من اهتمامك..",
    "home.choose_destination": "اختر وجهتك",
    "home.visitor_experiences": "تجارب الزوار",

    // Destination page
    "destination.title": "اختر وجهتك",
    "destination.days": "اختر عدد أيام رحلتك:",
    "destination.kids_question": "هل تهتم بزيارة أماكن مخصصة للأطفال؟",
    "destination.yes": "نعم",
    "destination.no": "لا",
    "destination.discover": "اكتشف عسير",

    // Discover page
    "discover.title": "اختر ما يعجبك من الفعاليات",
    "discover.like": "يعجبني",
    "discover.dislike": "لا يعجبني",
    "discover.my_plan": "خطتي",

    // Common
    "common.loading": "جاري التحميل...",
    "common.error": "حدث خطأ",
    "common.save": "حفظ",
    "common.cancel": "إلغاء",
  },
  en: {
    // Navigation
    "nav.home": "Home",
    "nav.destination": "Choose Destination",
    "nav.plan": "My Plan",
    "nav.experience": "My Experience",
    "nav.experiences": "Visitor Experiences",
    "nav.language": "Language",
    "nav.login": "Login",
    "nav.logo": "Masar Plus",

    // Home page
    "home.title": "Masar Plus",
    "home.subtitle": "Your journey starts with your interest..",
    "home.choose_destination": "Choose Your Destination",
    "home.visitor_experiences": "Visitor Experiences",

    // Destination page
    "destination.title": "Choose Your Destination",
    "destination.days": "Choose the number of days for your trip:",
    "destination.kids_question": "Are you interested in visiting places for children?",
    "destination.yes": "Yes",
    "destination.no": "No",
    "destination.discover": "Discover Asir",

    // Discover page
    "discover.title": "Choose activities you like",
    "discover.like": "Like",
    "discover.dislike": "Dislike",
    "discover.my_plan": "My Plan",

    // Common
    "common.loading": "Loading...",
    "common.error": "An error occurred",
    "common.save": "Save",
    "common.cancel": "Cancel",
  },
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("ar")

  const t = (key: string): string => {
    return translations[language][key as keyof (typeof translations)["ar"]] || key
  }

  return <LanguageContext.Provider value={{ language, setLanguage, t }}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
