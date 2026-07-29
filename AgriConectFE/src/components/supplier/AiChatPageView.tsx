import React, { useState, useRef, useEffect } from 'react';
import { 
  Bot, 
  Sparkles, 
  Send, 
  Paperclip, 
  Image as ImageIcon, 
  RefreshCw, 
  User, 
  ThumbsUp, 
  ThumbsDown, 
  Copy, 
  Check, 
  Zap, 
  Sprout, 
  ShieldAlert, 
  TrendingUp, 
  SunMedium, 
  Mic,
  MessageSquare,
  Info,
  ChevronRight,
  HelpCircle,
  Lightbulb,
  FileText,
  X
} from 'lucide-react';
import { ChatMessage } from './AiChatWidget';

export const AiChatPageView: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'page-msg-1',
      sender: 'ai',
      text: 'Xin chào anh Minh! Tôi là **Trợ Lý AI AgriConnect** - Chuyên gia tư vấn nông nghiệp số hóa 🌾.\n\nTôi có thể hỗ trợ anh:\n- **Chẩn đoán sâu bệnh qua hình ảnh** (Lá lúa, sầu riêng, cà phê, chuối...)\n- **Dự báo thời tiết & thời điểm thu hoạch tối ưu**\n- **Cập nhật biến động giá thị trường nông sản**\n- **Soạn thảo hợp đồng bao tiêu & lộ trình sản xuất VietGAP**',
      timestamp: '10:30 AM',
      cards: [
        {
          type: 'weather',
          title: 'Khuyến cáo thời tiết tuần này',
          details: 'Nhiệt độ Đắk Lắk 28.5°C, độ ẩm cao. Đề phòng bệnh rỉ sắt trên lá cà phê.',
          badge: 'Khuyến cáo kỹ thuật'
        }
      ],
      suggestedActions: [
        '🌿 Báo cáo tình hình lô A2 - Sầu riêng Ri6',
        '📈 Báo giá Cà phê Robusta hôm nay',
        '📜 Quy trình chứng nhận VietGAP'
      ]
    }
  ]);

  const [inputPrompt, setInputPrompt] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [attachedImage, setAttachedImage] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSendMessage = (textToSend?: string) => {
    const text = textToSend || inputPrompt;
    if (!text.trim() && !attachedImage) return;

    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      text: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      attachmentUrl: attachedImage || undefined
    };

    setMessages(prev => [...prev, userMsg]);
    setInputPrompt('');
    setAttachedImage(null);
    setIsTyping(true);

    // AI Response simulation
    setTimeout(() => {
      let replyText = '';
      let replyCards: ChatMessage['cards'] = undefined;
      let replyActions: string[] = [];

      const lower = text.toLowerCase();

      if (lower.includes('sầu riêng') || lower.includes('lô a2') || lower.includes('báo cáo')) {
        replyText = '### 🌿 Phân Tích Lô A2 (Sầu Riêng Ri6):\n\n- **Tình trạng phát triển:** Tiến độ đạt 75% giai đoạn chăm sóc trái.\n- **Độ ẩm đất hiện tại:** 68% (Đạt tiêu chuẩn).\n- **Khuyến nghị phân bón:** Bổ sung Kali hữu cơ đợt cuối trước thu hoạch 20 ngày để tăng độ ngọt cơm sầu.\n- **Dự kiến thu hoạch:** 15/12 - 20/12/2026.';
        replyCards = [
          {
            type: 'harvest',
            title: 'Hồ sơ Lô A2',
            details: 'Sản lượng ước tính 4.2 Tấn. Giá bao tiêu thỏa thuận: 82.000 VNĐ/kg.',
            badge: 'Sắp thu hoạch'
          }
        ];
        replyActions = ['Cập nhật nhật ký canh tác', 'Gửi báo cáo cho đối tác bao tiêu'];
      } else if (lower.includes('giá') || lower.includes('cà phê')) {
        replyText = '### 📈 Cập Nhật Giá Cà Phê Robusta Nhân Xô:\n\n- **Thị trường Tây Nguyên (Đắk Lắk):** 118.500 VNĐ/kg (▲ +1.200 VNĐ)\n- **Giá xuất khẩu FOB:** $4.250 / Tấn.\n- **Đánh giá AI:** Giá đang ở vùng đỉnh lịch sử. Nếu nông trại anh sắp thu hoạch lô B1 (5 ha), đây là thời điểm rất tốt để chốt hợp đồng bao tiêu trả trước 20%.';
        replyCards = [
          {
            type: 'price_forecast',
            title: 'Chỉ số giá Cà phê',
            details: 'Thị trường sôi động. Đơn hàng xuất khẩu Châu Âu tăng 18%.',
            badge: 'Tăng giá'
          }
        ];
        replyActions = ['Xem hợp đồng mẫu', 'Đăng lịch vụ mùa mới'];
      } else if (lower.includes('vietgap') || lower.includes('quy trình')) {
        replyText = '### 📜 Hướng Dẫn Quy Trình Chuẩn VietGAP:\n\n- **Ghi chép nhật ký:** Lưu vết toàn bộ đợt bón phân, phun thuốc & tưới nước.\n- **Thời gian cách ly:** Đảm bảo tối thiểu 14 ngày trước khi hái quả.\n- **Kiểm tra mẫu:** Test dư lượng thuốc BVTV đạt dưới ngưỡng MRL cho phép.';
      } else {
        replyText = `Cảm ơn anh Minh đã nhắn cho Trợ Lý AI AgriConnect!\n\nYêu cầu **"${text}"** đã được xử lý thành công. AI đã đối chiếu dữ liệu nông trường và đề xuất anh kiểm tra thêm số liệu trong mục Quản lý Nông trại.`;
        replyActions = ['Tư vấn kỹ thuật', 'Kiểm tra kho vật tư', 'Dự báo thời tiết'];
      }

      const aiMsg: ChatMessage = {
        id: `msg-${Date.now()}`,
        sender: 'ai',
        text: replyText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        cards: replyCards,
        suggestedActions: replyActions
      };

      setMessages(prev => [...prev, aiMsg]);
      setIsTyping(false);
    }, 1100);
  };

  const handleCopyText = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleSimulatedImageUpload = () => {
    const sampleImage = 'https://images.unsplash.com/photo-1586771107445-d3ca888129ff?auto=format&fit=crop&w=600&q=80';
    setAttachedImage(sampleImage);
  };

  return (
    <div className="space-y-6">
      
      {/* Page Title Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs text-[#5e6958] font-medium mb-1">
            <span>AgriConnect</span>
            <ChevronRight size={14} />
            <span className="text-[#176a22] font-semibold">Trợ Lý AI Nông Nghiệp</span>
          </div>
          <h1 className="text-2xl font-extrabold text-[#181d16] tracking-tight flex items-center gap-2.5">
            Trợ Lý AI Tư Vấn Nông Nghiệp
            <span className="text-xs bg-[#c9ecc1] text-[#176a22] font-extrabold px-3 py-1 rounded-full flex items-center gap-1.5">
              <Sparkles size={14} />
              Powered by Gemini AI
            </span>
          </h1>
        </div>

        <button
          onClick={() => {
            setMessages([
              {
                id: `page-reset-${Date.now()}`,
                sender: 'ai',
                text: 'Đã tạo phiên trò chuyện mới. Tôi có thể giúp gì cho nông trại của anh Minh?',
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
              }
            ]);
          }}
          className="px-4 py-2 bg-white hover:bg-[#ebefe4] border border-[#d0d6c7] text-[#40493d] font-bold text-xs rounded-xl transition-colors flex items-center gap-2 cursor-pointer shadow-2xs"
        >
          <RefreshCw size={16} />
          <span>Tạo đoạn chat mới</span>
        </button>
      </div>

      {/* Main Full Chat Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Side: Prompt Suggestions & Preset Topics (4 Cols) */}
        <div className="lg:col-span-4 space-y-4">
          
          {/* Preset Prompts Box */}
          <div className="bg-white rounded-2xl border border-[#e0e4d9] p-5 shadow-2xs space-y-4">
            <div className="flex items-center gap-2 text-[#176a22]">
              <Lightbulb size={20} />
              <h3 className="font-extrabold text-base text-[#181d16]">Gợi ý câu hỏi phổ biến</h3>
            </div>

            <div className="space-y-2">
              {[
                { title: 'Chẩn đoán rầy nâu Lô A2', desc: 'Phân tích triệu chứng & phác đồ điều trị', icon: Sprout },
                { title: 'Dự báo giá Cà phê Robusta', desc: 'Cập nhật biến động giá xuất khẩu 30 ngày', icon: TrendingUp },
                { title: 'Quy trình bón phân VietGAP', desc: 'Định lượng đạm, lân, kali cho Sầu riêng', icon: FileText },
                { title: 'Cảnh báo thời tiết giông bão', desc: 'Đánh giá nguy cơ ngập úng & sâu bệnh', icon: SunMedium }
              ].map((item, idx) => {
                const IconComp = item.icon;
                return (
                  <button
                    key={idx}
                    onClick={() => handleSendMessage(item.title)}
                    className="w-full text-left p-3.5 bg-[#f8faf5] hover:bg-[#f1f5ea] border border-[#e0e4d9] hover:border-[#a3f69c] rounded-xl transition-all cursor-pointer group space-y-1"
                  >
                    <div className="flex items-center gap-2 font-bold text-xs text-[#181d16] group-hover:text-[#176a22]">
                      <IconComp size={16} className="text-[#176a22]" />
                      <span>{item.title}</span>
                    </div>
                    <p className="text-[11px] text-[#5e6958] pl-6">{item.desc}</p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* AI Capability Banner */}
          <div className="bg-[#176a22] text-white p-5 rounded-2xl shadow-xs space-y-3">
            <div className="flex items-center gap-2 text-[#a3f69c]">
              <Zap size={18} />
              <h4 className="font-extrabold text-xs uppercase tracking-wider">Tính năng nổi bật</h4>
            </div>
            <p className="text-xs text-[#e0f3dd] leading-relaxed">
              Trợ lý AI tích hợp dữ liệu thời tiết thực tế, giá nông sản các tỉnh Tây Nguyên & Miền Tây, cùng mô hình phân tích bệnh cây trồng qua camera.
            </p>
          </div>

        </div>

        {/* Right Side: Large Main Chat Box (8 Cols) */}
        <div className="lg:col-span-8 bg-white rounded-2xl border border-[#e0e4d9] shadow-2xs overflow-hidden flex flex-col h-[680px]">
          
          {/* Chat Header */}
          <div className="bg-[#f8faf5] px-6 py-4 border-b border-[#e0e4d9] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#176a22] text-white flex items-center justify-center font-bold shadow-xs">
                <Bot size={22} className="text-[#a3f69c]" />
              </div>
              <div>
                <h3 className="font-extrabold text-base text-[#181d16]">Phòng Chat Với Trợ Lý AI</h3>
                <p className="text-xs text-[#5e6958]">Trạng thái: Sẵn sàng tư vấn trực tiếp</p>
              </div>
            </div>

            <span className="px-3 py-1 bg-[#c9ecc1] text-[#176a22] font-extrabold text-xs rounded-full flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#176a22] animate-ping" />
              Đang hoạt động
            </span>
          </div>

          {/* Messages Area */}
          <div className="flex-1 p-6 overflow-y-auto space-y-4 bg-[#f7fbf0]">
            {messages.map((msg) => (
              <div 
                key={msg.id} 
                className={`flex gap-3.5 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.sender === 'ai' && (
                  <div className="w-9 h-9 rounded-xl bg-[#176a22] text-white flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                    <Sparkles size={18} />
                  </div>
                )}

                <div className={`max-w-[80%] space-y-2.5 ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}>
                  
                  <div className={`p-4 rounded-2xl text-xs leading-relaxed shadow-2xs ${
                    msg.sender === 'user'
                      ? 'bg-[#176a22] text-white rounded-tr-none font-medium'
                      : 'bg-white text-[#181d16] border border-[#bfcaba]/40 rounded-tl-none'
                  }`}>
                    
                    {msg.attachmentUrl && (
                      <div className="mb-2.5 rounded-xl overflow-hidden border border-white/20 max-h-48">
                        <img src={msg.attachmentUrl} alt="Ảnh gửi" className="w-full h-full object-cover" />
                      </div>
                    )}

                    <div className="whitespace-pre-wrap font-sans space-y-1">
                      {msg.text.split('\n').map((line, idx) => {
                        if (line.startsWith('### ')) {
                          return <h4 key={idx} className="font-extrabold text-sm text-[#176a22] pt-1">{line.replace('### ', '')}</h4>;
                        }
                        return <p key={idx}>{line}</p>;
                      })}
                    </div>

                    <div className={`text-[10px] mt-2 text-right font-medium ${
                      msg.sender === 'user' ? 'text-white/70' : 'text-[#707a6c]'
                    }`}>
                      {msg.timestamp}
                    </div>
                  </div>

                  {/* Optional Rich Cards */}
                  {msg.cards && msg.cards.map((card, cIdx) => (
                    <div key={cIdx} className="bg-white p-3.5 rounded-xl border border-[#a3f69c] shadow-2xs space-y-1">
                      <div className="flex justify-between items-center">
                        <span className="font-extrabold text-xs text-[#176a22] flex items-center gap-1.5">
                          <ShieldAlert size={15} />
                          {card.title}
                        </span>
                        {card.badge && (
                          <span className="text-[10px] bg-[#c9ecc1] text-[#176a22] font-bold px-2.5 py-0.5 rounded-full">
                            {card.badge}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-[#40493d]">{card.details}</p>
                    </div>
                  ))}

                  {/* Actions */}
                  {msg.suggestedActions && msg.suggestedActions.length > 0 && (
                    <div className="flex flex-wrap gap-2 pt-1">
                      {msg.suggestedActions.map((action, aIdx) => (
                        <button
                          key={aIdx}
                          onClick={() => handleSendMessage(action)}
                          className="text-xs bg-white hover:bg-[#ebefe4] text-[#176a22] border border-[#176a22]/30 px-3.5 py-1.5 rounded-full font-bold transition-all shadow-2xs cursor-pointer"
                        >
                          {action}
                        </button>
                      ))}
                    </div>
                  )}

                  {msg.sender === 'ai' && (
                    <div className="flex items-center gap-3 text-[#707a6c] text-[11px] pl-1 pt-0.5">
                      <button 
                        onClick={() => handleCopyText(msg.id, msg.text)}
                        className="hover:text-[#176a22] flex items-center gap-1 cursor-pointer font-semibold"
                      >
                        {copiedId === msg.id ? <Check size={14} className="text-[#176a22]" /> : <Copy size={14} />}
                        <span>{copiedId === msg.id ? 'Đã sao chép' : 'Sao chép nội dung'}</span>
                      </button>
                      <span>•</span>
                      <button className="hover:text-[#176a22] cursor-pointer flex items-center gap-1"><ThumbsUp size={13} /> Thích</button>
                    </div>
                  )}

                </div>

                {msg.sender === 'user' && (
                  <div className="w-9 h-9 rounded-xl bg-[#c9ecc1] text-[#176a22] font-black text-xs flex items-center justify-center shrink-0 mt-0.5">
                    MN
                  </div>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="flex gap-3 items-center">
                <div className="w-9 h-9 rounded-xl bg-[#176a22] text-white flex items-center justify-center shrink-0">
                  <Sparkles size={18} />
                </div>
                <div className="bg-white px-4 py-3 rounded-2xl border border-[#bfcaba]/40 flex items-center gap-2 shadow-2xs">
                  <span className="w-2 h-2 bg-[#176a22] rounded-full animate-bounce" />
                  <span className="w-2 h-2 bg-[#176a22] rounded-full animate-bounce [animation-delay:0.2s]" />
                  <span className="w-2 h-2 bg-[#176a22] rounded-full animate-bounce [animation-delay:0.4s]" />
                  <span className="text-xs text-[#707a6c] font-medium ml-1">Trợ lý AI đang suy nghĩ câu trả lời...</span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Attached image preview */}
          {attachedImage && (
            <div className="px-6 py-2.5 bg-[#ebefe4] border-t border-[#e0e4d9] flex items-center justify-between text-xs">
              <div className="flex items-center gap-2 text-[#176a22] font-bold">
                <ImageIcon size={18} />
                <span>Đã tải lên 1 ảnh thực địa để phân tích sâu bệnh</span>
              </div>
              <button onClick={() => setAttachedImage(null)} className="text-[#ba1a1a] hover:opacity-80">
                <X size={18} />
              </button>
            </div>
          )}

          {/* Footer Input */}
          <div className="p-4 bg-white border-t border-[#e0e4d9]">
            <form 
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex items-center gap-3"
            >
              <div className="flex-1 bg-[#f1f5ea] border border-[#bfcaba] rounded-2xl px-4 py-2 flex items-center gap-3 focus-within:ring-2 focus-within:ring-[#176a22] focus-within:bg-white transition-all">
                <input
                  type="text"
                  value={inputPrompt}
                  onChange={(e) => setInputPrompt(e.target.value)}
                  placeholder="Nhập câu hỏi cho AI về kỹ thuật canh tác, thời tiết, giá cả..."
                  className="flex-1 bg-transparent border-none outline-none text-xs sm:text-sm text-[#181d16] placeholder:text-[#707a6c]"
                />

                <button
                  type="button"
                  onClick={handleSimulatedImageUpload}
                  className="p-1.5 text-[#5e6958] hover:text-[#176a22] hover:bg-[#e0e4d9] rounded-lg transition-colors cursor-pointer"
                  title="Tải ảnh thực địa"
                >
                  <ImageIcon size={20} />
                </button>

                <button
                  type="button"
                  onClick={() => setInputPrompt('Thời tiết tuần này có ảnh hưởng tới thu hoạch không?')}
                  className="p-1.5 text-[#5e6958] hover:text-[#176a22] hover:bg-[#e0e4d9] rounded-lg transition-colors cursor-pointer hidden sm:block"
                  title="Gõ bằng giọng nói"
                >
                  <Mic size={20} />
                </button>
              </div>

              <button
                type="submit"
                disabled={!inputPrompt.trim() && !attachedImage}
                className="px-5 py-3 bg-[#176a22] hover:bg-[#12541b] disabled:bg-[#bfcaba] text-white font-bold text-xs rounded-2xl flex items-center gap-2 transition-colors cursor-pointer shrink-0 shadow-xs"
              >
                <Send size={16} />
                <span className="hidden sm:inline">Gửi câu hỏi</span>
              </button>
            </form>
          </div>

        </div>

      </div>

    </div>
  );
};
