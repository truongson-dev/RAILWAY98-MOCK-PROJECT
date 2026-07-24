// ─── Product & Traceability Types ─────────────────────────────────────────────
// Định nghĩa kiểu dữ liệu cho sản phẩm nông sản và lô hàng truy xuất nguồn gốc.
// Các interface này ánh xạ trực tiếp từ ERD của backend.

/**
 * CertificationLabel — các chứng nhận chất lượng được hỗ trợ trên AgriConnect.
 * Dùng để filter sản phẩm trên Sàn B2B.
 */
export type CertificationLabel = 'VietGAP' | 'GlobalGAP' | 'Organic' | 'HACCP';

/**
 * AgProduct — sản phẩm nông sản được niêm yết trên sàn giao dịch B2B.
 *
 * Lưu ý:
 * - `pricePerKg` đơn vị VNĐ/kg
 * - `availableQuantityTons` và `minOrderTons` đơn vị Tấn
 * - `qrBatchCode` là mã lô để tra cứu TraceBatch
 */
export interface AgProduct {
  id: string;
  name: string;
  category: string;               // Ví dụ: 'Trái cây xuất khẩu', 'Gia vị'
  origin: string;                 // Vùng trồng: 'Chợ Gạo, Tiền Giang'
  seller: string;                 // Tên HTX hoặc doanh nghiệp bán
  certifications: CertificationLabel[];
  pricePerKg: number;             // Giá sỉ B2B (VNĐ/kg)
  availableQuantityTons: number;  // Số lượng tồn kho (Tấn)
  minOrderTons: number;           // Số lượng đặt hàng tối thiểu (Tấn)
  image: string;                  // URL ảnh đại diện sản phẩm
  harvestDate: string;            // Ngày thu hoạch (ISO format: YYYY-MM-DD)
  qrBatchCode: string;            // Mã lô QR để tra cứu TraceBatch
  rating: number;                 // Đánh giá trung bình (1.0 - 5.0)
  featured?: boolean;             // Có phải sản phẩm nổi bật không
}

/**
 * TraceBatch — hồ sơ truy xuất nguồn gốc cho một lô hàng cụ thể.
 * Dữ liệu này được lưu bất biến trên Blockchain AgriLedger.
 */
export interface TraceBatch {
  batchCode: string;
  productName: string;
  farmName: string;
  location: string;               // Địa chỉ trang trại (xã, huyện, tỉnh)
  certifications: string[];       // Số hiệu chứng chỉ cụ thể, ví dụ 'GlobalGAP GG-883920'
  harvestDate: string;            // Thời điểm thu hoạch có giờ cụ thể
  packagingDate: string;          // Thời điểm đóng gói
  fertilizerLog: string[];        // Nhật ký bón phân (theo ngày)
  pestControlLog: string[];       // Nhật ký thuốc BVTV và cách ly MRL
  coldChainTemp: string;          // Nhiệt độ bảo quản cold-chain
  inspector: string;              // Đơn vị kiểm định (Vinacontrol, ...)
  qrImage: string;                // URL ảnh mã QR để quét
  status: 'Xác thực' | 'Đang vận chuyển' | 'Đã giao hàng';
}
