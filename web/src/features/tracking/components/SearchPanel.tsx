import type { FormEvent } from 'react'
import { Icon } from '../../../shared/components/Icon'
import { useTrackingStore } from '../store'

const SAMPLES = [
  { label: 'Flash Express', code: 'TH24098571', dot: 'bg-secondary', text: 'text-secondary' },
  { label: 'Thailand Post', code: 'EF58291048', dot: 'bg-primary', text: 'text-on-surface' },
  { label: 'KEX (Kerry)', code: 'KEX9948201', dot: 'bg-tertiary', text: 'text-tertiary' },
]

/** Hero search console: tracking code input + submit button + error message */
export function SearchPanel() {
  const code = useTrackingStore((s) => s.code)
  const status = useTrackingStore((s) => s.status)
  const error = useTrackingStore((s) => s.error)
  const setCode = useTrackingStore((s) => s.setCode)
  const search = useTrackingStore((s) => s.search)

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    void search()
  }

  return (
    <section className="relative w-full overflow-hidden rounded-2xl bg-surface-container-low p-6 shadow-2xl sm:p-10">
      <div className="pointer-events-none absolute -top-24 -right-24 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-20 -left-20 h-80 w-80 rounded-full bg-secondary/10 blur-3xl" />
      <div className="relative z-10 mx-auto flex max-w-5xl flex-col gap-6">
        <div>
          <div className="mb-2 flex items-center gap-2">
            <span className="h-2 w-2 animate-ping rounded-full bg-secondary" />
            <span className="font-label text-xs font-semibold uppercase tracking-widest text-secondary">NEURAL COURIER RADAR v4.8</span>
          </div>
          <h1 className="font-headline text-2xl font-bold tracking-tight text-on-surface sm:text-3xl lg:text-4xl">
            ค้นหาสถานะพัสดุอัจฉริยะ <span className="tracking-normal text-primary">(Multi-Courier Smart Track)</span>
          </h1>
          <p className="mt-1.5 font-body text-sm text-on-surface-variant sm:text-base">
            ระบบตรวจสอบและจำแนกผู้ให้บริการจัดส่งอัตโนมัติด้วย AI Matching ตรวจจับโครงสร้างหมายเลขพัสดุแบบเรียลไทม์
          </p>
        </div>

        <form onSubmit={onSubmit} noValidate className="flex flex-col gap-3">
          <div className="flex flex-col items-stretch gap-2.5 rounded-xl bg-surface-container p-2 shadow-[inset_0_2px_8px_rgba(0,0,0,0.5)] lg:flex-row">
            <div className="relative flex min-w-0 flex-1 items-center pr-2 pl-3.5">
              <Icon name="travel_explore" className="mr-3 text-2xl text-primary select-none" />
              <input
                id="trackingInput"
                type="text"
                aria-label="Tracking code"
                aria-invalid={status === 'error'}
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="กรอกเลขพัสดุ Tracking Number เช่น 1234567890"
                className="w-full bg-transparent font-label text-base tracking-wide text-on-surface placeholder:text-on-surface-variant/50 focus:outline-none sm:text-lg"
              />
              {code && (
                <button type="button" title="Clear input" aria-label="Clear input" onClick={() => setCode('')} className="p-1.5 text-on-surface-variant transition-colors hover:text-on-surface">
                  <Icon name="close" className="text-lg" />
                </button>
              )}
            </div>
            <button
              type="submit"
              disabled={status === 'loading'}
              className="flex items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3 font-headline text-sm font-semibold text-on-primary shadow-[0_0_20px_rgba(255,45,120,0.45)] transition-all duration-300 hover:bg-primary-container hover:shadow-[0_0_25px_rgba(255,45,120,0.7)] active:scale-[0.98] disabled:opacity-60"
            >
              <Icon name="radar" className="text-lg" />
              <span>ตรวจหาและติดตามพัสดุ</span>
            </button>
          </div>

          {status === 'error' && error && (
            <p role="alert" className="flex items-center gap-2 rounded-lg bg-error-container px-3.5 py-2.5 font-label text-sm text-on-error-container">
              <Icon name="error" className="text-lg text-error" />
              {error}
            </p>
          )}

          <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
            <span className="mr-1 flex items-center gap-1 font-label text-on-surface-variant">
              <Icon name="bolt" className="text-xs" /> ตัวอย่างด่วน:
            </span>
            {SAMPLES.map((s) => (
              <button key={s.code} type="button" onClick={() => setCode(s.code)} className={`flex items-center gap-1.5 rounded bg-surface-container-high/60 px-2.5 py-1 font-label transition-colors hover:bg-surface-container-highest ${s.text}`}>
                <span className={`h-1.5 w-1.5 rounded-full ${s.dot}`} />
                {s.label}: {s.code}
              </button>
            ))}
          </div>
        </form>
      </div>
    </section>
  )
}
