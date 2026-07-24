// ─── Mock Data ────────────────────────────────────────────────────────────────
// Dữ liệu giả lập dùng cho landing page demo và preview trong modal.
//
// ⚠️  QUAN TRỌNG CHO TEAM:
//   File này CHỈ dùng trong giai đoạn phát triển khi backend chưa sẵn sàng.
//   Khi backend có API thật, hãy:
//     1. Xóa các import MOCK_* trong component
//     2. Thay bằng gọi hàm từ src/services/ (getProducts, getBatchTrace, ...)
//     3. Giữ nguyên file này để dùng trong unit test / Storybook
//
// Cấu trúc dữ liệu ánh xạ 1-1 với interface trong src/types/

import type { AgProduct, TraceBatch } from '@/types/product.type';
import type { EscrowContract } from '@/types/escrow.type';

export const MOCK_PRODUCTS: AgProduct[] = [
  {
    id: 'p1', name: 'Thanh Long Ruột Red GlobalGAP',
    category: 'Trái cây xuất khẩu', origin: 'Chợ Gạo, Tiền Giang',
    seller: 'HTX Nông Nghiệp Tiền Giang',
    certifications: ['GlobalGAP', 'VietGAP'], pricePerKg: 25000,
    availableQuantityTons: 45, minOrderTons: 5,
    image: 'https://images.unsplash.com/photo-1527133256227-cf37781c6325?auto=format&fit=crop&q=80&w=800',
    harvestDate: '2026-07-20', qrBatchCode: 'LOT-TL-2026-009', rating: 4.9, featured: true,
  },
  {
    id: 'p2', name: 'Sầu Riêng Ri6 Hạt Lép Đắk Lắk',
    category: 'Trái cây xuất khẩu', origin: 'Krông Pắc, Đắk Lắk',
    seller: 'Công ty Nông Sản Tây Nguyên Bio',
    certifications: ['VietGAP', 'HACCP'], pricePerKg: 78000,
    availableQuantityTons: 120, minOrderTons: 10,
    image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&q=80&w=800',
    harvestDate: '2026-07-18', qrBatchCode: 'LOT-SR-2026-014', rating: 4.95, featured: true,
  },
  {
    id: 'p3', name: 'Bưởi Da Xanh Bến Tre Loại 1',
    category: 'Trái cây', origin: 'Châu Thành, Bến Tre',
    seller: 'HTX Bưởi Da Xanh Mỏ Cày',
    certifications: ['GlobalGAP'], pricePerKg: 42000,
    availableQuantityTons: 30, minOrderTons: 3,
    image: 'https://images.unsplash.com/photo-1557800636-894a64c1696f?auto=format&fit=crop&q=80&w=800',
    harvestDate: '2026-07-21', qrBatchCode: 'LOT-BDX-2026-003', rating: 4.85,
  },
  {
    id: 'p4', name: 'Cà Phê Arabica Cầu Đất Lâm Đồng',
    category: 'Nông sản chế biến', origin: 'Cầu Đất, Đà Lạt',
    seller: 'Nông Trường Cà Phê Cầu Đất',
    certifications: ['Organic', 'HACCP'], pricePerKg: 110000,
    availableQuantityTons: 80, minOrderTons: 2,
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&q=80&w=800',
    harvestDate: '2026-07-15', qrBatchCode: 'LOT-CF-2026-088', rating: 5.0, featured: true,
  },
  {
    id: 'p5', name: 'Xoài Cát Hòa Lộc Tiêu Chuẩn Xuất Mỹ',
    category: 'Trái cây xuất khẩu', origin: 'Cái Bè, Tiền Giang',
    seller: 'HTX Xoài Cát Hòa Lộc',
    certifications: ['GlobalGAP'], pricePerKg: 65000,
    availableQuantityTons: 25, minOrderTons: 2,
    image: 'https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&q=80&w=800',
    harvestDate: '2026-07-19', qrBatchCode: 'LOT-XHL-2026-021', rating: 4.8,
  },
  {
    id: 'p6', name: 'Hồ Tiêu Đen Chư Sê Chất Lượng Cao',
    category: 'Gia vị & Nông sản khô', origin: 'Chư Sê, Gia Lai',
    seller: 'Gia Lai Pepper Exporters Co.',
    certifications: ['VietGAP', 'HACCP'], pricePerKg: 95000,
    availableQuantityTons: 200, minOrderTons: 10,
    image: 'https://images.unsplash.com/photo-1599940824399-b87987ceb72a?auto=format&fit=crop&q=80&w=800',
    harvestDate: '2026-07-10', qrBatchCode: 'LOT-HT-2026-005', rating: 4.9,
  },
];

export const MOCK_TRACE_BATCH: TraceBatch = {
  batchCode: 'LOT-TL-2026-009',
  productName: 'Thanh Long Ruột Đỏ GlobalGAP Exporter Grade',
  farmName: 'Trang Trại Nông Nghiệp Thông Minh Chợ Gạo #04',
  location: 'Xã Mỹ Tịnh An, Huyện Chợ Gạo, Tỉnh Tiền Giang',
  certifications: ['GlobalGAP GG-883920', 'VietGAP VG-2026-TG01'],
  harvestDate: '2026-07-20 06:30 AM',
  packagingDate: '2026-07-20 02:00 PM',
  fertilizerLog: [
    '01/05/2026: Bón phân hữu cơ sinh học Komix (200kg/ha)',
    '15/06/2026: Bổ sung vi lượng Canxi-Bo chống rụng trái',
    '05/07/2026: Tưới bùn sinh học vi sinh trùn quế',
  ],
  pestControlLog: [
    'Cách ly thuốc BVTV sinh học 21 ngày trước thu hoạch (Tuân thủ kiểm định MRL EU/Mỹ)',
    'Sử dụng bẫy pheromone sinh học diệt ruồi giấm',
  ],
  coldChainTemp: '3.5°C - 5.0°C (Cảm biến IoT kết nối thời gian thực)',
  inspector: 'Trung Tâm Kiểm Định Chất Lượng Nông Sản Vinacontrol',
  qrImage: 'https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=LOT-TL-2026-009',
  status: 'Xác thực',
};

export const MOCK_ESCROW: EscrowContract = {
  id: 'ESC-2026-8842',
  buyerName: 'Công ty CP Tập Đoàn Chế Biến Thực Phẩm VinAgri',
  sellerName: 'HTX Nông Nghiệp Tiền Giang GlobalGAP',
  productName: '50 Tấn Thanh Long Ruột Đỏ Loại A',
  quantityTons: 50,
  totalValueVND: 1_250_000_000,
  status: 'Đã ký quỹ 67%',
  progressPercent: 67,
  milestones: [
    { title: 'Tạo hợp đồng B2B & Chốt điều khoản chất lượng', completed: true, date: '21/07/2026' },
    { title: 'Bên mua đặt cọc 67% vốn vào tài khoản Tạm khóa Escrow', completed: true, date: '22/07/2026' },
    { title: 'Đơn vị kiểm định Vinacontrol nghiệm thu tại kho nông trại', completed: true, date: '22/07/2026' },
    { title: 'Vận chuyển logistics IoT bảo quản lạnh', completed: false, date: 'Đang thực hiện (67%)' },
    { title: 'Xác nhận giao hàng tại cảng Cát Lái & Giải ngân 100%', completed: false, date: 'Dự kiến 24/07/2026' },
  ],
};
