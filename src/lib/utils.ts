import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatFrequency(frequency: number): string {
  return `${frequency.toFixed(1)} MHz`;
}

export function formatDuration(seconds: number): string {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
}

export function calculateSignalStrength(frequency: number | null): number {
  if (!frequency) return 0;
  // Simulate signal strength based on frequency
  // Higher frequencies typically have shorter range
  return Math.min(1, Math.max(0, 1 - (frequency - 87.5) / 20));
}