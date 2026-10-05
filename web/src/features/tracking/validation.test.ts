import { validateTrackingCode } from './validation'

describe('validateTrackingCode', () => {
  it.each(['1234567890', 'abcDEF1234'])('accepts %s', (code) => {
    expect(validateTrackingCode(code)).toBeNull()
  })

  it.each(['', '12345', '12345678901', '123456789!', 'กขคงจฉชซฌญ'])('rejects "%s"', (code) => {
    expect(validateTrackingCode(code)).toBe('Invalid tracking code.')
  })
})
