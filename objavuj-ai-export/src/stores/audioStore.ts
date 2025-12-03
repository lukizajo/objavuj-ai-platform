import { create } from 'zustand'

export interface AudioState {
  // Current audio
  currentSrc: string | null
  currentTitle: string | null
  
  // Playback state
  isPlaying: boolean
  currentTime: number
  duration: number
  volume: number
  isMuted: boolean
  isLoaded: boolean
  
  // Actions
  setCurrentAudio: (src: string, title: string) => void
  play: () => void
  pause: () => void
  togglePlay: () => void
  seek: (time: number) => void
  setVolume: (volume: number) => void
  toggleMute: () => void
  setDuration: (duration: number) => void
  setCurrentTime: (time: number) => void
  clearAudio: () => void
}

export const useAudioStore = create<AudioState>((set, get) => ({
  // Initial state
  currentSrc: null,
  currentTitle: null,
  isPlaying: false,
  currentTime: 0,
  duration: 0,
  volume: 1,
  isMuted: false,
  isLoaded: false,

  // Actions
  setCurrentAudio: (src: string, title: string) => {
    set({
      currentSrc: src,
      currentTitle: title,
      isPlaying: false,
      currentTime: 0,
      isLoaded: false
    })
  },

  play: () => set({ isPlaying: true }),
  
  pause: () => set({ isPlaying: false }),
  
  togglePlay: () => set((state) => ({ isPlaying: !state.isPlaying })),
  
  seek: (time: number) => set({ currentTime: time }),
  
  setVolume: (volume: number) => set({ 
    volume, 
    isMuted: volume === 0 
  }),
  
  toggleMute: () => set((state) => ({ 
    isMuted: !state.isMuted 
  })),
  
  setDuration: (duration: number) => set({ duration }),
  
  setCurrentTime: (time: number) => set({ currentTime: time }),
  
  setIsLoaded: (loaded: boolean) => set({ isLoaded: loaded }),
  
  clearAudio: () => set({
    currentSrc: null,
    currentTitle: null,
    isPlaying: false,
    currentTime: 0,
    duration: 0,
    isLoaded: false
  })
}))

export default useAudioStore