// ─── IoT Service ──────────────────────────────────────────────────────────────
// Xử lý dữ liệu cảm biến IoT cold-chain theo thời gian thực cho Shipper Dashboard.
//
// Công nghệ dùng: SSE (Server-Sent Events) — backend đẩy dữ liệu liên tục,
// client không cần polling. Phù hợp với dữ liệu cảm biến cập nhật mỗi 30 giây.
//
// Cách dùng (qua hook useIoTStream thay vì gọi trực tiếp):
//   const { reading, isConnected } = useIoTStream('vehicle-123');

const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? '';

/** Dữ liệu một lần đọc từ cảm biến IoT trên xe vận chuyển */
export interface IotSensorReading {
  vehicleId: string;
  licensePlate: string;       // Biển số xe, ví dụ: '63C-129.88'
  temperatureCelsius: number; // Nhiệt độ thùng bảo quản (°C), tiêu chuẩn 3.5–5.0°C
  humidityPercent: number;    // Độ ẩm (%), tiêu chuẩn 80–90%
  location: string;           // Vị trí GPS dạng text, ví dụ: 'Cao tốc Trung Lương'
  timestamp: string;          // ISO timestamp của lần đọc
}

/**
 * Lấy snapshot dữ liệu cảm biến mới nhất cho một xe.
 * Dùng cho lần đầu load trang, sau đó dùng subscribeIotStream để cập nhật realtime.
 */
export async function getLatestReading(vehicleId: string): Promise<IotSensorReading> {
  const res = await fetch(`${API_BASE}/api/iot/sensors/${vehicleId}/latest`);
  if (!res.ok) throw new Error(await res.text());
  return res.json() as Promise<IotSensorReading>;
}

/**
 * Đăng ký nhận dữ liệu cảm biến theo thời gian thực qua SSE.
 *
 * @param vehicleId  ID xe cần theo dõi
 * @param onData     Callback nhận dữ liệu mỗi khi cảm biến gửi mới
 * @param onError    Callback khi mất kết nối (tự động hiển thị thông báo cho user)
 * @returns          Hàm cleanup — gọi khi component unmount để đóng kết nối SSE
 *
 * Ví dụ:
 *   const cleanup = subscribeIotStream('v-001', (data) => setReading(data));
 *   return () => cleanup(); // trong useEffect
 */
export function subscribeIotStream(
  vehicleId: string,
  onData: (reading: IotSensorReading) => void,
  onError?: (err: Event) => void,
): () => void {
  const source = new EventSource(`${API_BASE}/api/iot/sensors/${vehicleId}/stream`);

  source.onmessage = (event) => {
    try {
      const reading = JSON.parse(event.data as string) as IotSensorReading;
      onData(reading);
    } catch {
      // Bỏ qua frame lỗi định dạng JSON, không crash app
    }
  };

  if (onError) source.onerror = onError;

  // Trả về hàm cleanup để đóng kết nối khi component unmount
  return () => source.close();
}
