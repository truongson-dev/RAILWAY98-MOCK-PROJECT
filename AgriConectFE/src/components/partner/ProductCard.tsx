import React from 'react';
import { Heart, MapPin, Plus, Check } from 'lucide-react';
import { Product } from './types';

interface ProductCardProps {
  product: Product;
  currency: 'VND' | 'USD';
  isFavorite: boolean;
  onToggleFavorite: (e: React.MouseEvent, id: string) => void;
  onAddToCart: (e: React.MouseEvent, product: Product) => void;
  onSelectProduct: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  currency,
  isFavorite,
  onToggleFavorite,
  onAddToCart,
  onSelectProduct,
}) => {
  const formattedPrice = `${product.priceVnd.toLocaleString('vi-VN')}đ`;

  return (
    <div
      onClick={() => onSelectProduct(product)}
      className="bg-[#EFEFE9] rounded-2xl overflow-hidden flex flex-col shadow-xs border border-[#bfcaba]/20 hover:shadow-md transition-all duration-300 group cursor-pointer"
    >
      {/* Product Image & Badges */}
      <div className="h-48 relative overflow-hidden bg-stone-200">
        <img
          src={product.image}
          alt={product.imageAlt || product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        {/* Badges Stack */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          {product.badges.map((badge, idx) => (
            <span
              key={idx}
              className="bg-[#176a22] text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider shadow-xs"
            >
              {badge}
            </span>
          ))}
        </div>

        {/* Favorite Button */}
        <button
          onClick={(e) => onToggleFavorite(e, product.id)}
          className={`absolute bottom-3 right-3 w-10 h-10 rounded-full flex items-center justify-center transition-all shadow-sm ${
            isFavorite
              ? 'bg-[#176a22] text-white'
              : 'bg-white/90 backdrop-blur text-[#176a22] hover:bg-[#176a22] hover:text-white'
          }`}
          title={isFavorite ? 'Yêu thích' : 'Thêm vào yêu thích'}
        >
          <Heart className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`} />
        </button>
      </div>

      {/* Card Body */}
      <div className="p-4 flex flex-col flex-1">
        <div className="mb-2">
          <h4 className="text-base font-bold text-[#181d16] group-hover:text-[#176a22] transition-colors line-clamp-1">
            {product.name}
          </h4>
          <p className="text-xs text-[#40493d] flex items-center gap-1 mt-0.5 font-medium">
            <MapPin className="w-3.5 h-3.5 text-[#707a6c] shrink-0" />
            <span className="truncate">{product.location}</span>
          </p>
        </div>

        {/* Card Footer */}
        <div className="mt-auto pt-3 flex justify-between items-end border-t border-[#bfcaba]/30">
          <div>
            <p className="text-xs text-[#40493d] font-semibold">
              Tối thiểu: {product.minOrderKg}kg
            </p>
            <p className="text-[#176a22] font-extrabold text-lg leading-snug">
              {formattedPrice}
              <span className="text-xs font-normal text-[#40493d]">
                /{product.unit}
              </span>
            </p>
          </div>

          <button
            onClick={(e) => onAddToCart(e, product)}
            className="bg-[#176a22] text-white w-10 h-10 rounded-xl flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-xs hover:bg-[#358439]"
            title="Thêm số lượng tối thiểu vào giỏ hàng"
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};
