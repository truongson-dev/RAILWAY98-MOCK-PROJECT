import React, { useState } from 'react';
import { Order } from './types';

interface FeedbackModalProps {
  order: Order;
  onClose: () => void;
  onSubmit: (rating: number, comment: string) => void;
}

export const FeedbackModal: React.FC<FeedbackModalProps> = ({ order, onClose, onSubmit }) => {
  const [rating, setRating] = useState<number>(5);
  const [comment, setComment] = useState('');

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-md overflow-hidden shadow-2xl">
        <div className="p-6 border-b border-gray-100 bg-gray-50 flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-800">Đánh giá đơn hàng {order.id}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Đánh giá (Số sao)</label>
            <div className="flex space-x-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  className={`p-2 rounded-full transition-colors ${rating >= star ? 'text-yellow-400' : 'text-gray-300'}`}
                >
                  <svg className="w-8 h-8 fill-current" viewBox="0 0 24 24">
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                  </svg>
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Nhận xét của bạn</label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#16a34a] focus:border-transparent transition-all resize-none h-32 text-gray-700"
              placeholder="Chia sẻ trải nghiệm của bạn về sản phẩm này..."
            />
          </div>

          <button
            onClick={() => onSubmit(rating, comment)}
            className="w-full py-4 bg-[#16a34a] hover:bg-[#15803d] text-white rounded-xl font-bold text-lg shadow-lg shadow-green-500/30 transition-all hover:-translate-y-0.5 active:translate-y-0"
          >
            Gửi đánh giá
          </button>
        </div>
      </div>
    </div>
  );
};
