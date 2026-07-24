'use client';

// ─── UI Store (Zustand) ────────────────────────────────────────────────────────
// Quản lý trạng thái giao diện toàn cục: mở/đóng modal, số thông báo chưa đọc.
//
// Tại sao dùng Zustand thay vì prop drilling?
//   → Trang Landing có 6 modal, mỗi modal cần mở từ nhiều nơi khác nhau
//     (Navbar, Hero, TechSection, RoleSection, ...). Nếu truyền props sẽ rất rối.
//   → Với uiStore, bất kỳ component nào cũng gọi openMarketplace() trực tiếp.
//
// Cách dùng:
//   const { openMarketplace } = useUIStore();
//   <button onClick={openMarketplace}>Mở sàn B2B</button>

import { create } from 'zustand';
import type { AgProduct } from '@/types/product.type';
import type { UserRole } from '@/types/account.type';

interface UIState {
  // ── Marketplace Modal (Sàn B2B) ──────────────────────────────────────────
  isMarketplaceOpen: boolean;
  openMarketplace: () => void;
  closeMarketplace: () => void;

  // ── QR Trace Modal (Truy xuất nguồn gốc) ─────────────────────────────────
  isQrModalOpen: boolean;
  selectedBatchCode: string; // Mã lô đang xem, ví dụ: 'LOT-TL-2026-009'
  openQrModal: (batchCode?: string) => void;
  closeQrModal: () => void;

  // ── Escrow Modal (Hợp đồng tạm khóa) ────────────────────────────────────
  isEscrowModalOpen: boolean;
  selectedEscrowProduct: AgProduct | null; // Nếu null → dùng dữ liệu mock mặc định
  openEscrowModal: (product?: AgProduct | null) => void;
  closeEscrowModal: () => void;

  // ── Register / Auth Modal (Đăng ký / Đăng nhập) ──────────────────────────
  isRegisterModalOpen: boolean;
  registerRole: UserRole;              // Vai trò được chọn trước khi mở modal
  authInitialTab: 'login' | 'register'; // Tab hiển thị khi modal mở
  openRegisterModal: (role?: UserRole, tab?: 'login' | 'register') => void;
  closeRegisterModal: () => void;

  // ── Cert Details Modal (Chi tiết chứng nhận) ─────────────────────────────
  isCertModalOpen: boolean;
  openCertModal: () => void;
  closeCertModal: () => void;

  // ── Notifications Modal (Trung tâm thông báo) ────────────────────────────
  isNotificationsOpen: boolean;
  unreadCount: number;       // Số thông báo chưa đọc → hiển thị badge đỏ trên chuông
  openNotifications: () => void;
  closeNotifications: () => void;
  setUnreadCount: (count: number) => void;
}

export const useUIStore = create<UIState>()((set) => ({
  // ── Marketplace ───────────────────────────────────────────────────────────
  isMarketplaceOpen: false,
  openMarketplace: () => set({ isMarketplaceOpen: true }),
  closeMarketplace: () => set({ isMarketplaceOpen: false }),

  // ── QR Trace ──────────────────────────────────────────────────────────────
  isQrModalOpen: false,
  selectedBatchCode: 'LOT-TL-2026-009',
  openQrModal: (code = 'LOT-TL-2026-009') =>
    set({ isQrModalOpen: true, selectedBatchCode: code }),
  closeQrModal: () => set({ isQrModalOpen: false }),

  // ── Escrow ────────────────────────────────────────────────────────────────
  isEscrowModalOpen: false,
  selectedEscrowProduct: null,
  openEscrowModal: (product = null) =>
    set({ isEscrowModalOpen: true, selectedEscrowProduct: product }),
  closeEscrowModal: () => set({ isEscrowModalOpen: false }),

  // ── Register / Auth ───────────────────────────────────────────────────────
  isRegisterModalOpen: false,
  registerRole: 'Supplier',  // Mặc định vai trò Nhà cung cấp
  authInitialTab: 'register',
  openRegisterModal: (role = 'Supplier', tab = 'register') =>
    set({ isRegisterModalOpen: true, registerRole: role, authInitialTab: tab }),
  closeRegisterModal: () => set({ isRegisterModalOpen: false }),

  // ── Cert ──────────────────────────────────────────────────────────────────
  isCertModalOpen: false,
  openCertModal: () => set({ isCertModalOpen: true }),
  closeCertModal: () => set({ isCertModalOpen: false }),

  // ── Notifications ─────────────────────────────────────────────────────────
  isNotificationsOpen: false,
  unreadCount: 2,  // Demo: có 2 thông báo chưa đọc khi vào lần đầu
  openNotifications: () => set({ isNotificationsOpen: true }),
  closeNotifications: () => set({ isNotificationsOpen: false }),
  setUnreadCount: (count) => set({ unreadCount: count }),
}));
