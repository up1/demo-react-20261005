/** Party (sender or receiver) of a parcel */
export interface Party {
  name: string
  address: string
}

export type EventState = 'done' | 'active' | 'pending'

/** One step in the shipment timeline (newest first) */
export interface TrackingEvent {
  id: number
  state: EventState
  title: string
  time: string
  detail: string
}

/** Payload returned in `data` by POST /api/tracking */
export interface TrackingData {
  trackingCode: string
  courier: string
  description: string
  weightKg: number
  estimatedDelivery: string
  sender: Party
  receiver: Party
  currentStatus: { title: string; detail: string; eta: string }
  events: TrackingEvent[]
}

export type SearchStatus = 'idle' | 'loading' | 'success' | 'error'
