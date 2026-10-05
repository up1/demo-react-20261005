import type { TrackingData } from '../types'

/** Error carrying the message returned by the API (or a fallback) */
export class TrackingApiError extends Error {}

/** Calls POST /api/tracking and returns the parcel data */
export async function fetchTracking(trackingCode: string): Promise<TrackingData> {
  let response: Response
  try {
    response = await fetch('/api/tracking', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ trackingCode }),
    })
  } catch {
    throw new TrackingApiError('Internal server error.')
  }

  const body = (await response.json().catch(() => null)) as { data?: TrackingData; error?: string } | null

  if (!response.ok || !body?.data) {
    throw new TrackingApiError(body?.error ?? 'Internal server error.')
  }
  return body.data
}
