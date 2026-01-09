import React from 'react';

export default function SwiperErrorBoundary({ children, fallback }) {
  return (
    <div className="swiper-error-boundary">
      {children}
    </div>
  );
}
