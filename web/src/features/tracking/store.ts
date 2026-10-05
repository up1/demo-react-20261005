import { create } from 'zustand'
import { fetchTracking } from './services/trackingService'
import type { SearchStatus, TrackingData } from './types'
import { validateTrackingCode } from './validation'

interface TrackingState {
  code: string
  status: SearchStatus
  data: TrackingData | null
  error: string | null
  setCode: (code: string) => void
  /** Validate the code, then call the API; sets data or error */
  search: () => Promise<void>
}

export const useTrackingStore = create<TrackingState>((set, get) => ({
  code: '',
  status: 'idle',
  data: null,
  error: null,

  setCode: (code) => set({ code }),

  search: async () => {
    const code = get().code.trim()
    const validationError = validateTrackingCode(code)
    if (validationError) {
      set({ status: 'error', error: validationError, data: null })
      return
    }

    set({ status: 'loading', error: null })
    try {
      const data = await fetchTracking(code)
      set({ status: 'success', data, error: null })
    } catch (e) {
      set({ status: 'error', data: null, error: e instanceof Error ? e.message : 'Internal server error.' })
    }
  },
}))
