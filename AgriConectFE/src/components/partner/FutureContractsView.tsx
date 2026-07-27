import React, { useState } from 'react';
import { FutureContract } from './types';
import { FileText, Calendar, MapPin, ShieldCheck, CheckCircle2 } from 'lucide-react';

interface FutureContractsViewProps {
  contracts: FutureContract[];
  currency: 'VND' | 'USD';
  onRegisterContract: (contract: FutureContract) => void;
}

export const FutureContractsView: React.FC<FutureContractsViewProps> = ({
  contracts,
  currency,
  onRegisterContract,
}) => {
  const [selectedContract, setSelectedContract] = useState<FutureContract | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const formatPrice = (priceVnd: number) => {
    return currency === 'USD'
      ? `$${(priceVnd / 24500).toFixed(2)}`
      : `${priceVnd.toLocaleString('vi-VN')}đ`;
  };

  const handleConfirm = () => {
    if (selectedContract) {
      onRegisterContract(selectedContract);
      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
        setSelectedContract(null);
      }, 1500);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-3xl shadow-xs border border-[#bfcaba]/30">
        <div className="flex items-center gap-3 text-[#176a22] mb-2">
          <FileText className="w-8 h-8" />
          <h2 className="text-2xl font-bold text-[#181d16]">
            Hợp Đồng Tương Lai (Future Contracts)
          </h2>
        </div>
        <p className="text-sm text-[#40493d] max-w-3xl leading-relaxed">
          Cam kết bao tiêu sản lượng nông sản trước vụ thu hoạch. Giúp doanh nghiệp chốt giá cố định chống biến động thị trường và hỗ trợ trang trại chủ động kế hoạch canh tác.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {contracts.map((fc) => (
          <div
            key={fc.id}
            className="bg-white rounded-2xl overflow-hidden border border-[#bfcaba]/30 shadow-xs hover:shadow-md transition-shadow flex flex-col"
          >
            <div className="h-44 relative bg-stone-200">
              <img
                src={fc.image}
                alt={fc.cropName}
                className="w-full h-full object-cover"
              />
              <span className="absolute top-3 left-3 bg-[#176a22] text-white text-[10px] font-extrabold px-2.5 py-1 rounded uppercase tracking-wider">
                {fc.status}
              </span>
            </div>

            <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
              <div>
                <h4 className="font-bold text-base text-[#181d16] line-clamp-2">
                  {fc.title}
                </h4>

                <div className="mt-3 space-y-1.5 text-xs text-[#40493d]">
                  <p className="flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#176a22]" />
                    <span className="font-semibold">{fc.farmName}</span>
                  </p>
                  <p className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#707a6c]" />
                    <span>{fc.location}</span>
                  </p>
                  <p className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-[#176a22]" />
                    <span>Dự kiến thu hoạch: <strong className="text-[#181d16]">{fc.expectedHarvest}</strong></span>
                  </p>
                </div>

                <div className="mt-4 p-3 bg-[#f7fbf0] rounded-xl border border-[#bfcaba]/30 space-y-1 text-xs">
                  <div className="flex justify-between text-[#707a6c]">
                    <span>Sản lượng bao tiêu:</span>
                    <span className="font-bold text-[#181d16]">{fc.estimatedQuantityKg.toLocaleString()} kg</span>
                  </div>
                  <div className="flex justify-between text-[#707a6c]">
                    <span>Tỷ lệ đặt cọc:</span>
                    <span className="font-bold text-[#176a22]">{fc.depositPercent}%</span>
                  </div>
                  <div className="flex justify-between font-bold text-sm pt-1 border-t border-stone-200">
                    <span>Giá hợp đồng:</span>
                    <span className="text-[#176a22] text-base font-extrabold">{formatPrice(fc.contractPriceVnd)}/kg</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setSelectedContract(fc)}
                className="w-full bg-[#176a22] hover:bg-[#358439] text-white py-2.5 rounded-xl font-bold text-sm shadow-xs transition-all active:scale-98"
              >
                Ký Kết Hợp Đồng Tương Lai
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Contract Sign Confirmation Modal */}
      {selectedContract && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-[#bfcaba] relative">
            {isSuccess ? (
              <div className="text-center py-6">
                <CheckCircle2 className="w-12 h-12 text-[#176a22] mx-auto mb-2" />
                <h4 className="text-xl font-bold text-[#181d16]">
                  Gửi Hồ Sơ Ký Kết Thành Công!
                </h4>
                <p className="text-xs text-[#40493d] mt-1">
                  Chuyên viên tư vấn hợp đồng AgriConnect sẽ liên hệ để xác nhận điều khoản và giao kết điện tử.
                </p>
              </div>
            ) : (
              <>
                <h3 className="text-lg font-bold text-[#181d16] mb-1">
                  Xác Nhận Đăng Ký Bao Tiêu
                </h3>
                <p className="text-xs text-[#40493d] mb-3">
                  {selectedContract.title}
                </p>

                <div className="space-y-3 text-xs text-[#40493d]">
                  <div className="p-3 bg-stone-50 rounded-xl space-y-1">
                    <p><strong>Trang trại:</strong> {selectedContract.farmName}</p>
                    <p><strong>Ngày dự kiến giao hàng:</strong> {selectedContract.expectedHarvest}</p>
                    <p><strong>Tổng sản lượng:</strong> {selectedContract.estimatedQuantityKg.toLocaleString()} kg</p>
                    <p><strong>Đơn giá cố định:</strong> {formatPrice(selectedContract.contractPriceVnd)}/kg</p>
                  </div>

                  <p className="text-[11px] text-[#707a6c] leading-relaxed">
                    Bằng việc bấm xác nhận, bạn đồng ý khởi tạo dự thảo hợp đồng tương lai và bảo lưu quyền ưu tiên thu hoạch lô nông sản này.
                  </p>

                  <div className="flex gap-2 pt-2">
                    <button
                      onClick={() => setSelectedContract(null)}
                      className="flex-1 py-2.5 bg-stone-100 hover:bg-stone-200 rounded-xl font-bold text-xs text-stone-700"
                    >
                      Đóng
                    </button>
                    <button
                      onClick={handleConfirm}
                      className="flex-1 py-2.5 bg-[#176a22] hover:bg-[#358439] rounded-xl font-bold text-xs text-white"
                    >
                      Xác Nhận Dự Thảo
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
