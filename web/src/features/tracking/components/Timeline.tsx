import { Icon } from '../../../shared/components/Icon'
import type { EventState, TrackingEvent } from '../types'

const DOT_STYLE: Record<EventState, string> = {
  done: 'bg-secondary text-on-secondary shadow-[0_0_10px_rgba(0,255,204,0.5)]',
  active: 'bg-primary text-on-primary shadow-[0_0_15px_rgba(255,45,120,0.8)]',
  pending: 'bg-surface-container-high text-outline-variant',
}
const DOT_ICON: Record<EventState, string> = { done: 'check', active: 'two_wheeler', pending: 'task_alt' }

/** Vertical telemetry log of shipment events */
export function Timeline({ events }: { events: TrackingEvent[] }) {
  return (
    <div className="flex flex-col gap-6 pt-2">
      <div className="flex items-center justify-between">
        <span className="font-headline text-sm font-bold uppercase tracking-wider text-on-surface">บันทึกประวัติการขนส่ง (Telemetry Log)</span>
        <span className="font-label text-xs text-on-surface-variant">Timezone: Asia/Bangkok (+07)</span>
      </div>
      <ol className="relative flex flex-col gap-6 pl-4 before:absolute before:top-3 before:bottom-3 before:left-[19px] before:w-0.5 before:bg-outline-variant before:content-[''] sm:pl-6 sm:before:left-[27px]">
        {events.map((ev) => (
          <li key={ev.id} className={`relative flex items-start gap-4 ${ev.state === 'pending' ? 'opacity-50' : ''}`}>
            <div className={`relative z-10 flex h-7 w-7 shrink-0 items-center justify-center rounded-full sm:h-8 sm:w-8 ${DOT_STYLE[ev.state]}`}>
              <Icon name={DOT_ICON[ev.state]} className="text-base" />
            </div>
            <div className={`flex-1 pt-0.5 ${ev.state === 'active' ? 'rounded-xl bg-surface-container-high/60 p-3.5' : ''}`}>
              <div className="flex items-center justify-between gap-2">
                <span className={`font-headline text-sm ${ev.state === 'active' ? 'font-bold text-primary' : 'font-semibold text-on-surface'}`}>{ev.title}</span>
                <span className="font-label font-mono text-xs text-on-surface-variant">{ev.time}</span>
              </div>
              <p className="mt-0.5 font-body text-xs text-on-surface-variant">{ev.detail}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  )
}
