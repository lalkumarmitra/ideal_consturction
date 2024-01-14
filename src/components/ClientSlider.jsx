import React from 'react'
import { Navigation, Pagination, Scrollbar, A11y,Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';



import logo1 from '../assets/images/clientlogo/clientsLogo1.png';
import logo2 from '../assets/images/clientlogo/clientsLogo2.png';
import logo3 from '../assets/images/clientlogo/clientsLogo3.png';
import logo4 from '../assets/images/clientlogo/clientsLogo4.png';
import logo5 from '../assets/images/clientlogo/clientsLogo5.png';
import logo6 from '../assets/images/clientlogo/clientsLogo6.png';



function ClientSlider({sliderPerPage}) {
    const clients = [
        logo1,
        logo2,
        logo3,
        logo4,
        logo5,
        logo6,
      ];
  return (
    <Swiper
        modules={[Pagination, Scrollbar, A11y,Autoplay]}
        spaceBetween={20}
        slidesPerView={sliderPerPage}
        autoplay={{ delay: 800 }}
        loop={true}
    >
        {clients.map((client, index) => (
            <SwiperSlide key={index}>
                <div className="bg-light py-1 rounded">
                    <img
                        style={{height:'112px',aspectRatio:'16/9', objectFit:'contain'}}
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