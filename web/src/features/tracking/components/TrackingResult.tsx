import { useTrackingStore } from '../store'
import { ParcelSummary } from './ParcelSummary'
import { Timeline } from './Timeline'

/** Shows the loading state or the retrieved parcel data */
export function TrackingResult() {
  const status = useTrackingStore((s) => s.status)
  const data = useTrackingStore((s) => s.data)

  if (status === 'loading') {
    return <p role="status" className="text-center font-label text-sm text-on-surface-variant">กำลังค้นหาข้อมูลพัสดุ...</p>
  }
  if (status !== 'success' || !data) return null

  return (
    <section aria-label="Tracking result" className="flex flex-col gap-6 rounded-2xl bg-surface-container p-6 shadow-xl sm:p-7">
      <ParcelSummary data={data} />
      <Timeline events={data.events} />
    </section>
  )
}
