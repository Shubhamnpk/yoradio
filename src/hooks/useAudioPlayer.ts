import { useState, useRef, useCallback, useEffect } from 'react';
import type { RadioStation } from '@/types/radio';
import { useError } from '@/components/errors/ErrorProvider';

export function useAudioPlayer() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.7);
  const [currentStation, setCurrentStation] = useState<RadioStation | null>(null);
  const { setError, clearError } = useError();

  // Initialize audio element with proper settings
  useEffect(() => {
    if (!audioRef.current) {
      const audio = new Audio();
      audio.preload = 'none';
      audio.crossOrigin = 'anonymous';
      
      audio.addEventListener('waiting', () => {
        console.log('Buffering...');
      });
      
      audio.addEventListener('canplay', () => {
        console.log('Ready to play');
      });

      audioRef.current = audio;
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  // Handle audio errors
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleAudioError = (e: ErrorEvent) => {
      console.error('Audio error:', e);
      setError('Unable to play this station. Please try another one or check your connection.');
      setIsPlaying(false);
    };

    audio.addEventListener('error', handleAudioError as EventListener);
    return () => audio.removeEventListener('error', handleAudioError as EventListener);
  }, [setError]);

  const play = useCallback(async (station: RadioStation) => {
    if (!audioRef.current) return;

    try {
      if (currentStation?.id !== station.id) {
        if (isPlaying) {
          audioRef.current.pause();
        }
        audioRef.current.src = station.streamUrl;
        setCurrentStation(station);
      }

      audioRef.current.volume = volume;
      
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        await playPromise;
        setIsPlaying(true);
        clearError();
      }
    } catch (error) {
      console.error('Error playing audio:', error);
      setError('Failed to play this station. Please try another one.');
      setIsPlaying(false);
    }
  }, [currentStation, isPlaying, volume, clearError, setError]);

  const pause = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  }, []);

  const togglePlay = useCallback(() => {
    if (currentStation) {
      if (isPlaying) {
        pause();
      } else {
        play(currentStation);
      }
    }
  }, [currentStation, isPlaying, pause, play]);

  const adjustVolume = useCallback((value: number) => {
    if (audioRef.current) {
      audioRef.current.volume = value;
      setVolume(value);
    }
  }, []);

  return {
    isPlaying,
    currentStation,
    volume,
    play,
    pause,
    togglePlay,
    adjustVolume,
  };
}