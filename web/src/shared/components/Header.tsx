import { Icon } from './Icon'

const NAV_ITEMS = [
  { icon: 'radar', label: 'ค้นหาพัสดุ', active: true },
  { icon: 'manage_history', label: 'ประวัติการค้นหา', active: false },
  { icon: 'hub', label: 'สถิติและขนส่ง', active: false },
  { icon: 'notifications_active', label: 'ตั้งค่าแจ้งเตือน', active: false },
]

/** Fixed top navigation bar */
export function Header() {
  return (
    <header className="fixed top-0 left-0 z-50 h-16 w-full bg-surface-container-lowest/80 shadow-[0_1px_8px_rgba(0,0,0,0.35)] backdrop-blur-xl">
      <div className="flex h-full w-full items-center justify-between gap-6 px-6">
        <div className="flex items-center gap-6">
          <div className="flex min-w-[200px] flex-col">
            <span className="font-headline text-lg font-bold uppercase tracking-wider text-on-surface">CYBERLOG</span>
            <span className="font-label text-[10px] font-medium uppercase tracking-widest text-secondary">NeonTrack Node 07</span>
          </div>
          <nav className="hidden items-center gap-1.5 lg:flex">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.label}
                href="#"
                aria-current={item.active ? 'page' : undefined}
                className={
                  item.active
                    ? 'flex items-center gap-2 rounded-lg bg-primary-container px-3.5 py-1.5 text-sm font-semibold text-on-primary-container shadow-[0_0_15px_rgba(255,45,120,0.3)]'
                    : 'flex items-center gap-2 rounded-lg px-3.5 py-1.5 text-sm text-on-surface-variant transition-all hover:bg-surface-container-high hover:text-on-surface'
                }
              >
                <Icon name={item.icon} className="text-lg" />
                <span>{item.label}</span>
              </a>
            ))}
          </nav>
        </div>
        <div className="hidden items-center gap-3 rounded-full bg-surface-container-low/70 px-3 py-1.5 sm:flex">
          <div className="flex flex-col text-right">
            <span className="font-headline text-xs font-bold leading-tight text-on-surface">คุณอมรา</span>
            <span className="font-label text-[10px] text-on-surface-variant">Logistics Lead</span>
          </div>
          <span className="h-2.5 w-2.5 rounded-full bg-secondary" />
        </div>
      </div>
    </header>
  )
}
