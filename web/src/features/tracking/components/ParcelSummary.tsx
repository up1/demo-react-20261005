import { Icon } from '../../../shared/components/Icon'
import type { Party, TrackingData } from '../types'

function PartyCard({ icon, iconClass, label, party }: { icon: string; iconClass: string; label: string; party: Party }) {
  return (
    <div className="flex items-start gap-3 rounded-lg bg-surface-container-low p-3.5">
      <Icon name={icon} className={`mt-0.5 text-lg ${iconClass}`} />
      <div className="flex flex-col text-xs">
        <span className="font-label text-[10px] uppercase tracking-wider text-on-surface-variant">{label}</span>
        <span className="mt-0.5 font-headline font-semibold text-on-surface">{party.name}</span>
        <span className="text-[11px] text-on-surface-variant">{party.address}</span>
      </div>
    </div>
  )
}

/** Parcel header, sender/receiver cards and current-stage banner */
export function ParcelSummary({ data }: { data: TrackingData }) {
  return (
    <>
      <div className="flex flex-col justify-between gap-4 rounded-xl bg-surface-container-low/50 p-4 sm:flex-row sm:items-center">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary shadow-[0_0_15px_rgba(255,45,120,0.3)]">
            <Icon name="local_shipping" className="text-2xl" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-headline text-lg font-bold tracking-wider text-on-surface">{data.trackingCode}</span>
              <span className="rounded bg-primary-container px-2 py-0.5 font-label text-[10px] font-bold uppercase tracking-wider text-on-primary-container">{data.courier}</span>
            </div>
            <div className="mt-0.5 flex items-center gap-3 font-body text-xs text-on-surface-variant">
              <span>{data.description}</span>
              <span>•</span>
              <span className="font-label">น้ำหนัก: {data.weightKg} kg</span>
            </div>
          </div>
        </div>
        <div className="flex flex-col sm:text-right">
          <span className="font-label text-xs uppercase text-on-surface-variant">กำหนดส่งโดยประมาณ</span>
          <span className="font-headline text-base font-bold text-tertiary sm:text-lg">{data.estimatedDelivery}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <PartyCard icon="trip_origin" iconClass="text-secondary" label="ผู้ส่งต้นทาง (Sender Hub)" party={data.sender} />
        <PartyCard icon="location_on" iconClass="text-primary" label="ผู้รับปลายทาง (Destination)" party={data.receiver} />
      </div>

      <div className="relative flex items-center justify-between overflow-hidden rounded-xl bg-surface-container-highest p-4">
        <div className="absolute inset-y-0 left-0 w-1.5 bg-secondary shadow-[0_0_10px_#00ffcc]" />
        <div className="flex items-center gap-3 pl-2">
          <div className="h-3 w-3 animate-ping rounded-full bg-secondary" />
          <div>
            <div className="font-headline text-sm font-bold text-on-surface">{data.currentStatus.title}</div>
            <p className="font-body text-xs text-on-surface-variant">{data.currentStatus.detail}</p>
          </div>
        </div>
        <span className="hidden rounded-full bg-secondary/10 px-3 py-1 font-label text-xs font-bold text-secondary sm:block">{data.currentStatus.eta}</span>
      </div>
    </>
  )
}
