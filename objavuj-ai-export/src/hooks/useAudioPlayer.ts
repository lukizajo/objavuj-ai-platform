import { useEffect, useRef } from 'react'
import { useAudioStore } from '@/stores/audioStore'

interface UseAudioPlayerProps {
  src?: string
  title?: string
  autoPlay?: boolean
}

/**
 * Custom hook to manage audio playback with global state sync
 * @param src - Audio source URL
 * @param autoPlay - Whether to auto-play when source changes
 * @returns Audio element ref
 */
export const useAudioPlayer = ({ src, title, autoPlay = false }: UseAudioPlayerProps = {}) => {
  const audioRef = useRef<HTMLAudioElement>(null)
  
  const {
    isPlaying,
    volume,
    isMuted,
    currentTime,
    setDuration,
    setCurrentTime,
    setCurrentAudio,
    play,
    pause,
    clearAudio,
    setIsLoaded
  } = useAudioStore()

  // Initialize audio element
  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const handleLoadedMetadata = () => {
      setDuration(audio.duration)
      setIsLoaded(true)
      
      // Set current time if it was set before loading
      if (currentTime > 0 && currentTime < audio.duration) {
        audio.currentTime = currentTime
      }
    }

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime)
    }

    const handleEnded = () => {
      pause()
      setCurrentTime(0)
    }

    const handleLoadStart = () => {
      setIsLoaded(false)
    }

    const handleCanPlay = () => {
      setIsLoaded(true)
    }

    const handleWaiting = () => {
      pause()
    }

    const handlePlaying = () => {
      play()
    }

    const handlePause = () => {
      pause()
    }

    const handleError = () => {
      console.error('Audio playback error')
      pause()
    }

    // Add event listeners
    audio.addEventListener('loadedmetadata', handleLoadedMetadata)
    audio.addEventListener('timeupdate', handleTimeUpdate)
    audio.addEventListener('ended', handleEnded)
    audio.addEventListener('loadstart', handleLoadStart)
    audio.addEventListener('canplay', handleCanPlay)
    audio.addEventListener('waiting', handleWaiting)
    audio.addEventListener('playing', handlePlaying)
    audio.addEventListener('pause', handlePause)
    audio.addEventListener('error', handleError)

    return () => {
      // Clean up event listeners
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata)
      audio.removeEventListener('timeupdate', handleTimeUpdate)
      audio.removeEventListener('ended', handleEnded)
      audio.removeEventListener('loadstart', handleLoadStart)
      audio.removeEventListener('canplay', handleCanPlay)
      audio.removeEventListener('waiting', handleWaiting)
      audio.removeEventListener('playing', handlePlaying)
      audio.removeEventListener('pause', handlePause)
      audio.removeEventListener('error', handleError)
    }
  }, [src])

  // Handle source changes
  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    if (src && src !== audio.src) {
      // Set new source
      audio.src = src
      audio.load()
      
      // Set current audio in global state
      setCurrentAudio(src, title || 'Lekcia')
      
      // Auto play if requested
      if (autoPlay) {
        audio.play().catch(console.error)
      }
    } else if (!src) {
      // Clear audio
      clearAudio()
    }
  }, [src, title, autoPlay, setCurrentAudio, clearAudio])

  // Sync play/pause state
  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    if (isPlaying) {
      audio.play().catch(console.error)
    } else {
      audio.pause()
    }
  }, [isPlaying])

  // Sync volume state
  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    audio.volume = isMuted ? 0 : volume
  }, [volume, isMuted])

  return audioRef
}

export default useAudioPlayer