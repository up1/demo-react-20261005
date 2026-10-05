import type { Plugin } from 'vite'

const TRACKING_PATTERN = /^[a-zA-Z0-9]{10}$/

const sampleData = (trackingCode: string) => ({
  trackingCode,
  courier: 'Flash Express',
  description: 'พัสดุด่วน Gadget อิเล็กทรอนิกส์',
  weightKg: 1.45,
  estimatedDelivery: 'วันนี้ ภายใน 16:30 น.',
  sender: { name: 'CyberHub BKK (พระราม 9)', address: 'กรุงเทพมหานคร 10310' },
  receiver: {
    name: 'คุณอมรา (Logistics Lead)',
    address: 'แขวงจอมพล เขตจตุจักร ลาดพร้าว กทม. 10900',
  },
  currentStatus: {
    title: 'กำลังจัดส่งถึงผู้รับ (Out for Delivery)',
    detail: 'พนักงานนำส่งกำลังเดินทางมายังสถานที่จัดส่งของคุณ',
    eta: 'ETA: 45 นาที',
  },
  events: [
    { id: 4, state: 'pending', title: 'นำส่งสำเร็จ (Package Delivered)', time: '16:30 น. (ประมาณการ)', detail: 'รอเซ็นรับพัสดุผ่าน Smart Sign OTP' },
    { id: 3, state: 'active', title: 'พนักงานกำลังนำจ่ายพัสดุ', time: 'วันนี้ 10:20 น.', detail: 'สมชาย รวดเร็ว (รหัสพนักงาน: FL-9942)' },
    { id: 2, state: 'done', title: 'สินค้าถึงสาขาปลายทาง (DC ลาดพร้าว)', time: 'วันนี้ 07:15 น.', detail: 'คัดแยกสู่สายนำจ่ายพื้นที่ Zone 4-จตุจักรเรียบร้อย' },
    { id: 1, state: 'done', title: 'เข้ารับพัสดุแล้ว (Hub พระราม 9)', time: 'เมื่อวาน 09:30 น.', detail: 'บันทึกข้อมูลเข้าระบบ Flash Express Node BKK-09' },
  ],
})

/** Dev-only mock of POST /api/tracking following requirements/flow1.md */
export function mockTrackingApi(): Plugin {
  return {
    name: 'mock-tracking-api',
    configureServer(server) {
      server.middlewares.use('/api/tracking', (req, res) => {
        res.setHeader('Content-Type', 'application/json')
        if (req.method !== 'POST') {
          res.statusCode = 405
          res.end(JSON.stringify({ error: 'Method not allowed.' }))
          return
        }
        let body = ''
        req.on('data', (chunk) => (body += chunk))
        req.on('end', () => {
          try {
            const { trackingCode } = JSON.parse(body) as { trackingCode?: unknown }
            if (typeof trackingCode !== 'string' || !TRACKING_PATTERN.test(trackingCode)) {
              res.statusCode = 400
              res.end(JSON.stringify({ error: 'Invalid tracking code.' }))
              return
            }
            res.end(JSON.stringify({ data: sampleData(trackingCode) }))
          } catch {
            res.statusCode = 500
            res.end(JSON.stringify({ error: 'Internal server error.' }))
          }
        })
      })
    },
  }
}
