import React, { useState } from 'react';
import { MessageSquare, X, Send, Bot, Sparkles, Sprout } from 'lucide-react';

export const AiAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputMsg, setInputMsg] = useState('');
  const [chatHistory, setChatHistory] = useState<Array<{ sender: 'user' | 'bot'; text: string }>>([
    {
      sender: 'bot',
      text: 'Xin chào! Tôi là Trợ Lý AI Nông Nghiệp AgriConnect. Tôi có thể hỗ trợ bạn tra cứu giá B2B, tiêu chuẩn MRL xuất khẩu, hoặc tạo hợp đồng Escrow.',
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMsg.trim()) return;

    const userText = inputMsg.trim();
    setChatHistory((prev) => [...prev, { sender: 'user', text: userText }]);
    setInputMsg('');
    setIsLoading(true);

    setTimeout(() => {
      let reply = 'Cảm ơn câu hỏi của bạn. ';
      if (userText.toLowerCase().includes('giá') || userText.toLowerCase().includes('thanh long')) {
        reply += 'Giá Thanh Long ruột đỏ GlobalGAP hôm nay tại Tiền Giang đang dao động từ 24.000 - 27.000 VNĐ/kg tùy phân loại xuất khẩu A/B.';
      } else if (userText.toLowerCase().includes('escrow') || userText.toLowerCase().includes('thanh toán')) {
        reply += 'Thanh toán Escrow bảo vệ bạn: Bên mua đặt cọc 67% vào tài khoản tạm khóa. Tiền chỉ giải ngân 100% khi hàng hóa qua kiểm định Vinacontrol.';
      } else if (userText.toLowerCase().includes('sầu riêng') || userText.toLowerCase().includes('xuất khẩu')) {
        reply += 'Sầu riêng xuất khẩu cần có mã số vùng trồng (PUC) và mã nhà đóng gói được Tổng cục Hải quan Trung Quốc (GACC) phê duyệt.';
      } else {
        reply += 'Hệ thống AgriConnect tự động kết nối hơn 500+ doanh nghiệp thu mua lớn. Bạn có thể mở mục "Sàn B2B" ở menu trên cùng để xem chi tiết lô hàng!';
      }

      setChatHistory((prev) => [...prev, { sender: 'bot', text: reply }]);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <>
      {/* Floating Widget Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full bg-[#176a22] hover:bg-[#12531a] active:scale-95 text-white flex items-center justify-center shadow-2xl transition-all border-2 border-white cursor-pointer group"
        title="Trợ lý AI Nông Nghiệp"
      >
        <MessageSquare className="w-6 h-6 group-hover:scale-110 transition-transform" />
        <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-emerald-400 rounded-full border-2 border-white animate-pulse" />
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-80 sm:w-96 bg-[#f7fbf0] border border-[#e0e4d9] rounded-3xl shadow-2xl overflow-hidden flex flex-col h-[480px] animate-fadeIn">
          
          {/* Header */}
          <div className="px-5 py-4 bg-[#176a22] text-white flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-white/15 flex items-center justify-center">
                <Bot className="w-4 h-4 text-emerald-200" />
              </div>
              <div>
                <h3 className="text-sm font-bold font-sans">Trợ Lý AI AgriConnect</h3>
                <span className="text-[10px] text-emerald-200 flex items-center gap-1">
                  <Sparkles className="w-3 h-3" /> Powered by Gemini
                </span>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 text-white/80 hover:text-white hover:bg-white/10 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 text-xs">
            {chatHistory.map((msg, index) => (
              <div
                key={index}
                className={`flex gap-2 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.sender === 'bot' && (
                  <div className="w-6 h-6 rounded-full bg-[#176a22] text-white flex items-center justify-center shrink-0 mt-1">
                    <Sprout className="w-3.5 h-3.5" />
                  </div>
                )}
                <div
                  className={`max-w-[80%] p-3 rounded-2xl leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-[#176a22] text-white rounded-tr-xs'
                      : 'bg-white border border-[#e0e4d9] text-[#181d16] shadow-2xs rounded-tl-xs'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex gap-2 justify-start items-center text-[#707a6c] text-[11px] italic">
                <div className="w-5 h-5 rounded-full bg-[#176a22] text-white flex items-center justify-center animate-spin">
                  <Sparkles className="w-3 h-3" />
                </div>
                <span>AI đang phân tích thị trường...</span>
              </div>
            )}
          </div>

          {/* Quick Prompts */}
          <div className="px-3 py-2 bg-[#f1f5ea] border-t border-[#e0e4d9] flex items-center gap-1.5 overflow-x-auto scrollbar-none text-[11px]">
            <button
              onClick={() => setInputMsg('Giá Thanh Long hôm nay?')}
              className="px-2.5 py-1 bg-white border border-[#bfcaba] text-[#176a22] rounded-full whitespace-nowrap hover:bg-[#176a22] hover:text-white transition-colors"
            >
              Giá Thanh Long?
            </button>
            <button
              onClick={() => setInputMsg('Thanh toán Escrow hoạt động như thế nào?')}
              className="px-2.5 py-1 bg-white border border-[#bfcaba] text-[#176a22] rounded-full whitespace-nowrap hover:bg-[#176a22] hover:text-white transition-colors"
            >
              Hợp đồng Escrow?
            </button>
          </div>

          {/* Input Bar */}
          <form onSubmit={handleSendMessage} className="p-3 bg-white border-t border-[#e0e4d9] flex items-center gap-2">
            <input
              type="text"
              placeholder="Nhập câu hỏi nông sản..."
              value={inputMsg}
              onChange={(e) => setInputMsg(e.target.value)}
              className="flex-1 px-3 py-2 bg-[#f7fbf0] border border-[#bfcaba] rounded-xl text-xs text-[#181d16] focus:outline-none focus:ring-1 focus:ring-[#176a22]"
            />
            <button
              type="submit"
              className="p-2 bg-[#176a22] hover:bg-[#12531a] text-white rounded-xl transition-colors shrink-0"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

        </div>
      )}
    </>
  );
};
