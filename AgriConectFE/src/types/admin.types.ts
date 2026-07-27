// Định nghĩa các loại (types) và giao diện (interfaces) sử dụng trong Giao diện Admin
// Các loại dữ liệu này đảm bảo tính nhất quán của dữ liệu trên toàn bộ ứng dụng

// Các tab điều hướng trong sidebar
export type NavTab =
  | 'overview'
  | 'users'
  | 'users-suppliers'
  | 'users-partners'
  | 'users-logistics'
  | 'users-permissions'
  | 'users-pending'
  | 'kyc'
  | 'products'
  | 'products-categories'
  | 'products-items'
  | 'products-certificates'
  | 'inventory'
  | 'orders'
  | 'shipping'
  | 'contracts'
  | 'payments'
  | 'credit'
  | 'reports'
  | 'ai-analytics'
  | 'system';

// Dữ liệu cho thẻ thống kê (Metric Card)
export interface MetricCardData {
  id: string; // Định danh duy nhất
  title: string; // Tiêu đề thẻ
  value: string; // Giá trị hiển thị
  change?: string; // Mức thay đổi
  changeType?: 'positive' | 'negative' | 'neutral' | 'urgent'; // Loại thay đổi (tích cực, tiêu cực, trung lập, khẩn cấp)
  badgeText?: string; // Chữ hiển thị trên huy hiệu (badge)
  icon: string; // Tên biểu tượng
}

// Điểm dữ liệu cho biểu đồ
export interface ChartDataPoint {
  month: string; // Tháng
  revenue: number; // Doanh thu
  profit: number; // Lợi nhuận
}

// Phân bổ người dùng (ví dụ: theo vùng miền hoặc loại)
export interface UserDistribution {
  name: string; // Tên phân loại
  percentage: number; // Tỷ lệ phần trăm
  count: number; // Số lượng
  color: string; // Màu sắc trên biểu đồ
}

// Hạng mục cảnh báo rủi ro từ AI
export interface AiRiskItem {
  id: string; // Định danh
  title: string; // Tiêu đề cảnh báo
  description: string; // Mô tả chi tiết
  timestamp: string; // Thời gian cảnh báo
  level: 'high' | 'medium' | 'low'; // Mức độ rủi ro (cao, trung bình, thấp)
  location: string; // Vị trí liên quan
  category: 'financial' | 'supply_chain' | 'weather' | 'quality'; // Danh mục rủi ro
}

// Hoạt động gần đây trong hệ thống
export interface RecentActivity {
  id: string; // Định danh
  type: 'approval' | 'system' | 'contract' | 'payment'; // Loại hoạt động
  title: string; // Tiêu đề hoạt động
  subtitle: string; // Tiêu đề phụ (mô tả thêm)
  timestamp: string; // Thời gian diễn ra
  author: string; // Người thực hiện
  iconType: 'check' | 'settings' | 'document' | 'alert'; // Biểu tượng liên quan
}

// Bản ghi xác minh danh tính (KYC)
export interface KycRecord {
  id: string; // Định danh
  name: string; // Tên doanh nghiệp/cá nhân
  category: string; // Ngành nghề
  type: 'supplier' | 'partner' | 'logistics'; // Loại hình
  status: 'pending' | 'approved' | 'rejected' | 'needs_info'; // Trạng thái (đang chờ, đã duyệt, từ chối, cần thêm thông tin)
  submittedDate: string; // Ngày nộp
  location: string; // Địa chỉ
  taxCode: string; // Mã số thuế
  representative: string; // Người đại diện
  phone: string; // Số điện thoại
  email: string; // Email
  documents: {
    businessLicense: boolean; // Giấy phép kinh doanh
    landCertificate?: boolean; // Giấy chứng nhận quyền sử dụng đất (tùy chọn)
    vietGapCert?: boolean; // Chứng chỉ VietGAP (tùy chọn)
    idCard: boolean; // Căn cước công dân
  };
  missingDocNote?: string; // Ghi chú về tài liệu còn thiếu
}

// Thông tin Nhà cung cấp
export interface SupplierItem {
  id: string; // Định danh
  code: string; // Mã nhà cung cấp
  name: string; // Tên nhà cung cấp
  type: string; // Loại hình (ví dụ: Nông dân, HTX)
  region: string; // Khu vực
  products: string[]; // Danh sách sản phẩm
  certifications: string[]; // Danh sách chứng nhận (VietGAP, GlobalGAP...)
  creditLimit: string; // Hạn mức tín dụng
  status: 'active' | 'suspended' | 'pending'; // Trạng thái
  rating: number; // Đánh giá (số sao)
  totalVolume: string; // Tổng sản lượng
}

// Thông tin Đối tác mua hàng
export interface PartnerItem {
  id: string; // Định danh
  code: string; // Mã đối tác
  name: string; // Tên đối tác
  type: string; // Loại hình
  region: string; // Khu vực
  products: string[]; // Danh mục sản phẩm quan tâm
  certifications: string[]; // Yêu cầu chứng nhận
  creditLimit: string; // Hạn mức tín dụng
  status: 'active' | 'suspended' | 'pending'; // Trạng thái
  rating: number; // Đánh giá
  totalVolume: string; // Tổng khối lượng giao dịch
}

// Thông tin Đơn vị vận chuyển (Logistics)
export interface LogisticsItem {
  id: string; // Định danh
  code: string; // Mã đơn vị vận chuyển
  name: string; // Tên đơn vị
  type: string; // Loại hình vận chuyển (Đường bộ, Đường biển...)
  region: string; // Khu vực hoạt động
  products: string[]; // Loại hàng hóa hỗ trợ
  certifications: string[]; // Chứng chỉ vận tải
  fleetCapacity: string; // Năng lực đội xe
  creditLimit?: string; // Hạn mức tín dụng
  status: 'active' | 'suspended' | 'pending'; // Trạng thái
  rating: number; // Đánh giá
  totalVolume: string; // Tổng khối lượng đã vận chuyển
}

// Thông tin Hợp đồng
export interface ContractItem {
  id: string; // Định danh
  contractNo: string; // Số hợp đồng
  buyer: string; // Bên mua
  seller: string; // Bên bán
  product: string; // Sản phẩm
  quantity: string; // Số lượng
  totalValue: string; // Tổng giá trị
  escrowStatus: 'locked' | 'partially_released' | 'released' | 'disputed'; // Trạng thái ký quỹ (đã khóa, giải ngân một phần, đã giải ngân, tranh chấp)
  status: 'active' | 'completed' | 'pending' | 'cancelled'; // Trạng thái hợp đồng
  startDate: string; // Ngày bắt đầu
  endDate: string; // Ngày kết thúc
}
