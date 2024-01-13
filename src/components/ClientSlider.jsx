import React from 'react'
import { Navigation, Pagination, Scrollbar, A11y,Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';



function ClientSlider({sliderPerPage}) {
    const clients = [
        'assets/images/clients/amazon.svg',
        'assets/images/clients/walmart.svg',
        'assets/images/clients/lenovo.svg',
        'assets/images/clients/paypal.svg',
        'assets/images/clients/shopify.svg',
        'assets/images/clients/verizon.svg',
      ];
  return (
    <Swiper
        modules={[Pagination, Scrollbar, A11y,Autoplay]}
        spaceBetween={20}
        slidesPerView={sliderPerPage}
        autoplay={{ delay: 500 }}
        loop={true}
    >
        {clients.map((client, index) => (
            <SwiperSlide key={index}>
                <div className="client-images">
                    <img
                        src={client}
                        alt={`client-img-${index}`}
                        className="mx-auto img-fluid d-block"
                    />
                </div>
            </SwiperSlide>
        ))}
    </Swiper>
  )
}

export default ClientSlider