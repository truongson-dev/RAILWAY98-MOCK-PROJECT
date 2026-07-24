'use client';

// ─── useIoTStream Hook ─────────────────────────────────────────────────────────
// Hook đăng ký nhận dữ liệu cảm biến IoT cold-chain theo thời gian thực.
// Dùng cho Shipper Dashboard để hiển thị nhiệt độ xe vận chuyển live.
//
// Cách dùng:
//   const { reading, isConnected, error } = useIoTStream('vehicle-001');
//
// Hook tự động:
//   - Kết nối SSE khi vehicleId thay đổi
//   - Đóng kết nối cũ và mở kết nối mới nếu vehicleId thay đổi
//   - Dọn dẹp kết nối khi component unmount (tránh memory leak)

import { useEffect, useState } from 'react';
import {
  subscribeIotStream,
  type IotSensorReading,
} from '@/services/iot.service';

interface UseIoTStreamResult {
  /** Dữ liệu cảm biến mới nhất, null khi chưa nhận được lần nào */
  reading: IotSensorReading | null;
  /** true khi kết nối SSE đang hoạt động và nhận được dữ liệu */
  isConnected: boolean;
  /** Thông báo lỗi khi mất kết nối, null khi bình thường */
  error: string | null;
}

export function useIoTStream(vehicleId: string | null): UseIoTStreamResult {
  const [reading, setReading] = useState<IotSensorReading | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Không kết nối nếu chưa có vehicleId (trang chưa chọn xe)
    if (!vehicleId) return;

    // Reset trạng thái khi đổi sang xe mới
    setIsConnected(false);
    setError(null);

    const cleanup = subscribeIotStream(
      vehicleId,
      (data) => {
        setReading(data);
        setIsConnected(true);
        setError(null); // Xóa lỗi nếu kết nối phục hồi
      },
      () => {
        // SSE bị ngắt (mất mạng, server restart, ...)
        setIsConnected(false);
        setError('Mất kết nối cảm biến IoT. Đang thử kết nối lại...');
      },
    );

    // Cleanup: đóng EventSource khi component unmount hoặc vehicleId thay đổi
    return cleanup;
  }, [vehicleId]);

  return { reading, isConnected, error };
}
