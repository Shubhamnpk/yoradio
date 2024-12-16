import { useState, useEffect } from 'react';

export type Theme = 
  | 'system'
  | 'theme-dark-blue'   // Default
  | 'theme-dark-purple'
  | 'theme-dark-green'
  | 'theme-dark-red'
  | 'theme-light-blue'
  | 'theme-light-purple'
  | 'theme-light-green'
  | 'theme-light-red'
 ;

export const themes: { value: Theme; label: string; isDark: boolean }[] = [
  { value: 'system', label: 'System', isDark: false },
  { value: 'theme-dark-blue', label: 'Dark Blue', isDark: true },
  { value: 'theme-dark-purple', label: 'Dark Purple', isDark: true },
  { value: 'theme-dark-green', label: 'Dark Green', isDark: true },
  { value: 'theme-dark-red', label: 'Dark Red', isDark: true },
  { value: 'theme-light-blue', label: 'Light Blue', isDark: false },
  { value: 'theme-light-purple', label: 'Light Purple', isDark: false },
  { value: 'theme-light-green', label: 'Light Green', isDark: false },
  { value: 'theme-light-red', label: 'Light Red', isDark: false },
];

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(() => {
    const saved = localStorage.getItem('theme') as Theme;
    return saved || 'theme-dark-blue';
  });

  useEffect(() => {
    const root = window.document.documentElement;
    
    // Remove all theme classes
    themes.forEach(t => {
      if (t.value !== 'system') {
        root.classList.remove(t.value);
      }
    });

    if (theme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'theme-dark-blue'
        : 'theme-light-blue';
      root.classList.add(systemTheme);
    } else {
      root.classList.add(theme);
    }

    localStorage.setItem('theme', theme);
  }, [theme]);

  return { theme, setTheme, themes };
}