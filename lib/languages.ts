import languagesData from '@/data/languages.json';

export const LANGUAGES = languagesData.languages as readonly string[];
export type Language = (typeof LANGUAGES)[number];

export const DEFAULT_LANGUAGE: Language = languagesData.default;

export const LANGUAGE_MAP: Record<Language, string> = languagesData.languageMap;

export function isValidLanguage(lang: string): lang is Language {
  return LANGUAGES.includes(lang);
}
