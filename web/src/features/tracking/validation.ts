export const INVALID_TRACKING_CODE = 'Invalid tracking code.'

// Alphanumeric (a-z, A-Z, 0-9), exactly 10 characters
const TRACKING_CODE_PATTERN = /^[a-zA-Z0-9]{10}$/

/** Returns an error message when the code is invalid, otherwise null */
export function validateTrackingCode(code: string): string | null {
  return TRACKING_CODE_PATTERN.test(code.trim()) ? null : INVALID_TRACKING_CODE
}
