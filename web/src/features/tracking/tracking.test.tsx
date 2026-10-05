import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, beforeEach, vi } from 'vitest'
import App from '../../App'
import { useTrackingStore } from './store'
import type { TrackingData } from './types'

const sample: TrackingData = {
  trackingCode: '1234567890',
  courier: 'Flash Express',
  description: 'พัสดุทดสอบ',
  weightKg: 1,
  estimatedDelivery: 'วันนี้',
  sender: { name: 'Sender Hub', address: 'Bangkok' },
  receiver: { name: 'Receiver Name', address: 'Bangkok' },
  currentStatus: { title: 'Out for Delivery', detail: 'detail', eta: 'ETA: 45 นาที' },
  events: [{ id: 1, state: 'done', title: 'Picked up', time: 'เมื่อวาน', detail: 'ok' }],
}

const fetchMock = vi.fn()

beforeEach(() => {
  vi.stubGlobal('fetch', fetchMock)
  useTrackingStore.setState({ code: '', status: 'idle', data: null, error: null })
})
afterEach(() => {
  fetchMock.mockReset()
  vi.unstubAllGlobals()
})

const submit = async (code: string) => {
  const user = userEvent.setup()
  render(<App />)
  if (code) await user.type(screen.getByLabelText('Tracking code'), code)
  await user.click(screen.getByRole('button', { name: /ตรวจหาและติดตามพัสดุ/ }))
}

describe('Flow 1: search with tracking code', () => {
  it('TC001 valid code displays retrieved data', async () => {
    fetchMock.mockResolvedValue({ ok: true, json: async () => ({ data: sample }) })
    await submit('1234567890')

    expect(await screen.findByText('Receiver Name')).toBeInTheDocument()
    expect(fetchMock).toHaveBeenCalledWith('/api/tracking', expect.objectContaining({ method: 'POST', body: JSON.stringify({ trackingCode: '1234567890' }) }))
    expect(screen.queryByRole('alert')).not.toBeInTheDocument()
  })

  it('TC002 wrong format shows error and does not call API', async () => {
    await submit('12345')
    expect(await screen.findByRole('alert')).toHaveTextContent('Invalid tracking code.')
    expect(fetchMock).not.toHaveBeenCalled()
  })

  it('TC003 empty code shows error', async () => {
    await submit('')
    expect(await screen.findByRole('alert')).toHaveTextContent('Invalid tracking code.')
    expect(fetchMock).not.toHaveBeenCalled()
  })

  it('shows API error message on 400/500', async () => {
    fetchMock.mockResolvedValue({ ok: false, json: async () => ({ error: 'Internal server error.' }) })
    await submit('1234567890')
    await waitFor(() => expect(screen.getByRole('alert')).toHaveTextContent('Internal server error.'))
    expect(screen.queryByText('Receiver Name')).not.toBeInTheDocument()
  })
})
