export type LocaleCode = "en" | "ko" | "sw";

export type LanguageOption = {
  code: string;
  label: string;
  nativeLabel: string;
  available: boolean;
  locale?: LocaleCode;
};

export const languages: LanguageOption[] = [
  { code: "EN", label: "English", nativeLabel: "English", available: true, locale: "en" },
  { code: "KO", label: "Korean", nativeLabel: "한국어", available: true, locale: "ko" },
  { code: "SW", label: "Swahili (Kenya)", nativeLabel: "Kiswahili", available: true, locale: "sw" },
  { code: "ES", label: "Spanish", nativeLabel: "Español", available: false },
  { code: "DE", label: "German", nativeLabel: "Deutsch", available: false },
  { code: "IT", label: "Italian", nativeLabel: "Italiano", available: false },
  { code: "FR", label: "French", nativeLabel: "Français", available: false },
  { code: "PT", label: "Portuguese", nativeLabel: "Português", available: false },
  { code: "RU", label: "Russian", nativeLabel: "Русский", available: false },
  { code: "TR", label: "Turkish", nativeLabel: "Türkçe", available: false },
  { code: "AR", label: "Arabic", nativeLabel: "العربية", available: false },
  { code: "ZH", label: "Chinese", nativeLabel: "简体中文", available: false },
  { code: "JA", label: "Japanese", nativeLabel: "日本語", available: false },
  { code: "VI", label: "Vietnamese", nativeLabel: "Tiếng Việt", available: false },
  { code: "TH", label: "Thai", nativeLabel: "ไทย", available: false },
  { code: "ID", label: "Indonesian", nativeLabel: "Bahasa Indonesia", available: false },
];

export const LOCALE_STORAGE_KEY = "sowegan.locale";

export function isLocaleCode(value: string | null): value is LocaleCode {
  return value === "en" || value === "ko" || value === "sw";
}
