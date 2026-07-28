import React, { useState, useEffect, useRef } from 'react';
import { Phone, PhoneOff, Mic, MicOff, Volume2, VolumeX, FileText, Send, X, Check, RotateCcw, MessageSquare, Square } from 'lucide-react';

interface DriverCallModalProps {
  isOpen: boolean;
  onClose: () => void;
  driverName: string;
  driverAvatar?: string;
  driverPhone?: string;
  vehiclePlate?: string;
}

type CallMode = 'calling' | 'connected' | 'unanswered' | 'rejected' | 'voice_record' | 'chat';

export const DriverCallModal: React.FC<DriverCallModalProps> = ({
  isOpen,
  onClose,
  driverName,
  driverAvatar,
  vehiclePlate = '29H-123.45',
}) => {
  const avatarUrl = driverAvatar || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80';
  const [mode, setMode] = useState<CallMode>('calling');
  const [isMuted, setIsMuted] = useState(false);
  const [isSpeaker, setIsSpeaker] = useState(false);
  const [showNotePanel, setShowNotePanel] = useState(false);
  const [noteText, setNoteText] = useState('');
  const [noteSavedToast, setNoteSavedToast] = useState(false);
  
  // Call duration timer
  const [callSeconds, setCallSeconds] = useState(0);
  const callTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Voice recording timer
  const [recordSeconds, setRecordSeconds] = useState(0);
  const recordTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Chat state
  const [chatMessages, setChatMessages] = useState<Array<{ id: string; sender: 'driver' | 'user'; text: string; time: string }>>([
    {
      id: '1',
      sender: 'driver',
      text: `Chào bạn, tôi là ${driverName}. Tôi đang trên đường giao hàng.`,
      time: '14:30',
    },
    {
      id: '2',
      sender: 'user',
      text: 'Chào anh, anh đang ở đâu rồi ạ?',
      time: '14:32',
    },
  ]);
  const [inputChatText, setInputChatText] = useState('');

  // Reset state on open
  useEffect(() => {
    if (!isOpen) return;

    // Reset states on open
    setMode('calling');
    setCallSeconds(0);
    setRecordSeconds(0);
    setIsMuted(false);
    setIsSpeaker(false);
    setShowNotePanel(false);
  }, [isOpen]);

  // Connected Call Timer
  useEffect(() => {
    if (mode === 'connected') {
      setCallSeconds(0);
      callTimerRef.current = setInterval(() => {
        setCallSeconds((prev) => prev + 1);
      }, 1000);
    } else {
      if (callTimerRef.current) clearInterval(callTimerRef.current);
    }
    return () => {
      if (callTimerRef.current) clearInterval(callTimerRef.current);
    };
  }, [mode]);

  // Voice Recording Timer
  useEffect(() => {
    if (mode === 'voice_record') {
      setRecordSeconds(0);
      recordTimerRef.current = setInterval(() => {
        setRecordSeconds((prev) => prev + 1);
      }, 1000);
    } else {
      if (recordTimerRef.current) clearInterval(recordTimerRef.current);
    }
    return () => {
      if (recordTimerRef.current) clearInterval(recordTimerRef.current);
    };
  }, [mode]);

  if (!isOpen) return null;

  const formatSeconds = (totalSec: number) => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSaveNote = () => {
    if (!noteText.trim()) return;
    setNoteSavedToast(true);
    setTimeout(() => {
      setNoteSavedToast(false);
      setShowNotePanel(false);
    }, 1500);
  };

  const handleSendChatMessage = (textToSend?: string) => {
    const msg = textToSend || inputChatText;
    if (!msg.trim()) return;

    const currentTime = new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' });
    const newMsg = {
      id: Date.now().toString(),
      sender: 'user' as const,
      text: msg,
      time: currentTime,
    };

    setChatMessages((prev) => [...prev, newMsg]);
    if (!textToSend) setInputChatText('');

    // Driver auto reply simulation after 1.5s
    setTimeout(() => {
      setChatMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: 'driver' as const,
          text: 'Dạ tôi đã nhận được thông tin, khoảng 15-20 phút nữa tôi tới điểm giao ạ.',
          time: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
      {/* Main Dialog Container */}
      <div className="w-full max-w-sm bg-[#f8faf4] border border-[#d8e2d4] rounded-3xl shadow-2xl overflow-hidden relative text-[#181d16] transition-all">
        
        {/* Header Close Button (for Chat mode or Modal close) */}
        {mode === 'chat' ? (
          <div className="flex items-center justify-between p-4 border-b border-[#e2e8da] bg-[#f0f4ea]">
            <div className="flex items-center gap-3">
              <div className="relative">
                <img
                  src={avatarUrl}
                  alt={driverName}
                  className="w-10 h-10 rounded-full object-cover border border-[#a5d6a7]"
                />
                <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full absolute bottom-0 right-0 border-2 border-white" />
              </div>
              <div>
                <h3 className="font-bold text-sm text-[#181d16]">Nhắn tin cho tài xế</h3>
                <p className="text-[11px] text-[#63705d]">{driverName} ({vehiclePlate})</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 text-[#63705d] hover:text-[#181d16] hover:bg-black/5 rounded-full transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        ) : (
          /* Subtle close button top-right for call modal */
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-1.5 text-[#63705d] hover:text-[#181d16] hover:bg-black/5 rounded-full transition-colors cursor-pointer"
            title="Đóng"
          >
            <X className="w-5 h-5" />
          </button>
        )}

        {/* ================= MODE 1: CALLING / CONNECTED / UNANSWERED / VOICE RECORD ================= */}
        {mode !== 'chat' && (
          <div className="p-6 flex flex-col items-center text-center space-y-4">
            
            {/* Driver Avatar with Status Badge */}
            <div className="relative my-2">
              <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-white shadow-md mx-auto">
                <img
                  src={avatarUrl}
                  alt={driverName}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Status Badge Icon on Avatar */}
              <div className="absolute bottom-1 right-1 w-8 h-8 rounded-full bg-[#176a22] text-white flex items-center justify-center border-2 border-white shadow-xs">
                {mode === 'connected' ? (
                  <span className="w-3.5 h-3.5 bg-white rounded-full" />
                ) : (
                  <Phone className="w-4 h-4" />
                )}
              </div>
            </div>

            {/* Driver Name & Status Title */}
            <div>
              <h2 className="text-xl font-black text-[#181d16]">{driverName}</h2>

              {/* Status Labels */}
              {mode === 'calling' && (
                <div className="flex items-center justify-center gap-2 mt-1">
                  <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping" />
                  <p className="text-sm font-semibold text-[#176a22]">Đang gọi...</p>
                </div>
              )}

              {mode === 'connected' && (
                <p className="text-2xl font-bold font-mono text-[#176a22] mt-1 tracking-wider">
                  {formatSeconds(callSeconds)}
                </p>
              )}

              {mode === 'unanswered' && (
                <div className="mt-1 space-y-0.5">
                  <p className="text-sm font-bold text-red-600">Tài xế không nhấc máy</p>
                  <p className="text-xs text-[#63705d]">14:32 - Hôm nay</p>
                </div>
              )}

              {mode === 'rejected' && (
                <div className="mt-1 space-y-0.5">
                  <p className="text-sm font-bold text-red-600">Cuộc gọi bị từ chối</p>
                  <p className="text-xs text-[#63705d]">14:32 - Hôm nay</p>
                </div>
              )}

              {mode === 'voice_record' && (
                <p className="text-xs font-bold text-[#176a22] uppercase tracking-wider mt-1">
                  ĐỂ LẠI LỜI NHẮN THOẠI
                </p>
              )}
            </div>

            {/* Simulated Tester Toggle Bar for user to easily test all views */}
            {mode === 'calling' && (
              <div className="flex flex-wrap items-center justify-center gap-1.5 pt-1 text-[11px]">
                <button
                  onClick={() => setMode('connected')}
                  className="px-2.5 py-1 bg-[#e6f4ea] text-[#176a22] rounded-full font-bold hover:bg-[#d0ebda] cursor-pointer"
                >
                  Giả lập: Nhấc máy
                </button>
                <button
                  onClick={() => setMode('unanswered')}
                  className="px-2.5 py-1 bg-red-50 text-red-600 rounded-full font-bold hover:bg-red-100 cursor-pointer"
                >
                  Giả lập: Không nghe
                </button>
                <button
                  onClick={() => setMode('rejected')}
                  className="px-2.5 py-1 bg-amber-50 text-amber-700 rounded-full font-bold hover:bg-amber-100 cursor-pointer"
                >
                  Giả lập: Từ chối
                </button>
              </div>
            )}

            {/* ================= CONTROLS & ACTIONS PER MODE ================= */}

            {/* CALLING OR CONNECTED CONTROLS */}
            {(mode === 'calling' || mode === 'connected') && (
              <div className="w-full space-y-4 pt-2">
                <div className="flex items-center justify-center gap-4">
                  {/* Mute Button */}
                  <button
                    onClick={() => setIsMuted(!isMuted)}
                    className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors cursor-pointer ${
                      isMuted ? 'bg-amber-100 text-amber-700' : 'bg-stone-200/80 text-[#181d16] hover:bg-stone-300/80'
                    }`}
                    title={isMuted ? 'Bật mic' : 'Tắt mic'}
                  >
                    {isMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
                  </button>

                  {/* End Call Button */}
                  <button
                    onClick={() => setMode('unanswered')}
                    className="w-14 h-14 rounded-full bg-red-600 hover:bg-red-700 text-white flex items-center justify-center shadow-md ring-4 ring-blue-100/90 hover:scale-105 transition-all cursor-pointer"
                    title="Tắt máy"
                  >
                    <PhoneOff className="w-6 h-6" />
                  </button>

                  {/* Speaker Button */}
                  <button
                    onClick={() => setIsSpeaker(!isSpeaker)}
                    className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors cursor-pointer ${
                      isSpeaker ? 'bg-[#176a22] text-white' : 'bg-stone-200/80 text-[#181d16] hover:bg-stone-300/80'
                    }`}
                    title={isSpeaker ? 'Tắt loa ngoài' : 'Bật loa ngoài'}
                  >
                    {isSpeaker ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
                  </button>

                  {/* Quick Note Toggle (Only available in connected mode) */}
                  {mode === 'connected' && (
                    <button
                      onClick={() => setShowNotePanel(!showNotePanel)}
                      className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors cursor-pointer ${
                        showNotePanel ? 'bg-[#176a22] text-white' : 'bg-stone-200/80 text-[#181d16] hover:bg-stone-300/80'
                      }`}
                      title="Ghi chú nhanh"
                    >
                      <FileText className="w-5 h-5" />
                    </button>
                  )}
                </div>

                {/* Quick Note Panel Drawer in Call */}
                {mode === 'connected' && showNotePanel && (
                  <div className="bg-white p-3 rounded-2xl border border-[#bfcaba] text-left space-y-2 animate-fadeIn">
                    <div className="flex justify-between items-center text-xs font-bold text-[#63705d]">
                      <span>GHI CHÚ NHANH</span>
                      {noteSavedToast && <span className="text-emerald-600 flex items-center gap-1"><Check className="w-3.5 h-3.5" /> Đã lưu</span>}
                    </div>
                    <textarea
                      value={noteText}
                      onChange={(e) => setNoteText(e.target.value)}
                      placeholder="Nhập ghi chú nhanh tại đây..."
                      className="w-full h-20 p-2 text-xs border border-[#bfcaba] rounded-xl outline-none focus:border-[#176a22] resize-none"
                    />
                    <div className="flex justify-end">
                      <button
                        onClick={handleSaveNote}
                        className="px-3 py-1.5 bg-[#176a22] text-white text-xs font-bold rounded-lg hover:bg-[#12541a] cursor-pointer"
                      >
                        Lưu ghi chú
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* UNANSWERED / REJECTED OPTIONS */}
            {(mode === 'unanswered' || mode === 'rejected') && (
              <div className="w-full space-y-2.5 pt-2">
                {/* Voice message button */}
                <button
                  onClick={() => setMode('voice_record')}
                  className="w-full py-3 bg-[#176a22] hover:bg-[#12541a] text-white font-bold rounded-2xl flex items-center justify-center gap-2 shadow-xs transition-colors cursor-pointer text-sm"
                >
                  <Mic className="w-4 h-4" />
                  Để lại lời nhắn thoại
                </button>

                {/* Secondary buttons row */}
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => {
                      setMode('calling');
                    }}
                    className="py-2.5 bg-[#176a22] text-white hover:bg-[#12541a] font-bold rounded-2xl flex items-center justify-center gap-1.5 cursor-pointer text-xs transition-colors"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    Thử lại
                  </button>

                  <button
                    onClick={() => setMode('chat')}
                    className="py-2.5 bg-stone-200/80 hover:bg-stone-300 text-[#181d16] font-bold rounded-2xl flex items-center justify-center gap-1.5 cursor-pointer text-xs transition-colors"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    Nhắn tin
                  </button>
                </div>
              </div>
            )}

            {/* VOICE RECORDING MODE */}
            {mode === 'voice_record' && (
              <div className="w-full space-y-4 pt-1">
                {/* Waveform & timer block */}
                <div className="bg-white p-3 rounded-2xl border border-[#bfcaba] space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-bold text-[#176a22] flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                      ĐANG GHI ÂM...
                    </span>
                    <span className="font-mono font-bold text-[#181d16]">{formatSeconds(recordSeconds)}</span>
                  </div>

                  {/* Animated recording progress bar */}
                  <div className="w-full h-2 bg-stone-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#176a22] transition-all duration-300"
                      style={{ width: `${Math.min(100, (recordSeconds / 30) * 100)}%` }}
                    />
                  </div>
                </div>

                {/* Send / Stop Buttons */}
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => {
                      alert('Lời nhắn thoại đã được gửi tới tài xế!');
                      onClose();
                    }}
                    className="py-2.5 bg-[#176a22] hover:bg-[#12541a] text-white font-bold rounded-2xl flex items-center justify-center gap-1.5 cursor-pointer text-xs transition-colors"
                  >
                    <Send className="w-3.5 h-3.5" />
                    Gửi lời nhắn
                  </button>

                  <button
                    onClick={() => setMode('unanswered')}
                    className="py-2.5 bg-stone-200/80 hover:bg-stone-300 text-[#181d16] font-bold rounded-2xl flex items-center justify-center gap-1.5 cursor-pointer text-xs transition-colors"
                  >
                    <Square className="w-3.5 h-3.5 fill-current" />
                    Dừng
                  </button>
                </div>
              </div>
            )}

            {/* Footer Tag */}
            <div className="pt-2">
              <span className="text-[9px] font-bold text-[#63705d] tracking-widest uppercase">
                AGRISHIPPER VOICE
              </span>
            </div>

          </div>
        )}

        {/* ================= MODE 2: CHAT WITH DRIVER ================= */}
        {mode === 'chat' && (
          <div className="p-4 space-y-3">
            {/* Chat Messages Area */}
            <div className="h-64 overflow-y-auto space-y-2.5 pr-1 text-xs">
              {chatMessages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
                >
                  <div
                    className={`max-w-[85%] p-3 rounded-2xl ${
                      msg.sender === 'user'
                        ? 'bg-[#176a22] text-white rounded-br-none'
                        : 'bg-[#eef3e8] text-[#181d16] rounded-bl-none border border-[#d8e2d4]'
                    }`}
                  >
                    <p className="leading-relaxed">{msg.text}</p>
                    <span
                      className={`text-[9px] block mt-1 text-right ${
                        msg.sender === 'user' ? 'text-white/70' : 'text-[#63705d]'
                      }`}
                    >
                      {msg.time}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Suggestion Pills */}
            <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-none">
              {['Đang ở đâu?', 'Bao lâu nữa đến?', 'Cần hỗ trợ không?'].map((pill, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSendChatMessage(pill)}
                  className="px-2.5 py-1 bg-stone-200/70 hover:bg-[#e6f4ea] hover:text-[#176a22] text-[#40493d] rounded-full text-[11px] font-medium shrink-0 transition-colors cursor-pointer"
                >
                  {pill}
                </button>
              ))}
            </div>

            {/* Input Row */}
            <div className="flex items-center gap-2 pt-1 border-t border-[#e2e8da]">
              <input
                type="text"
                value={inputChatText}
                onChange={(e) => setInputChatText(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendChatMessage()}
                placeholder="Nhập tin nhắn..."
                className="flex-1 px-3 py-2 text-xs border border-[#bfcaba] rounded-full outline-none focus:border-[#176a22] bg-white"
              />
              <button
                onClick={() => handleSendChatMessage()}
                className="w-9 h-9 rounded-full bg-[#176a22] hover:bg-[#12541a] text-white flex items-center justify-center shrink-0 cursor-pointer shadow-xs transition-colors"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
