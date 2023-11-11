import React, { useEffect, useState } from 'react'
import './Hero.scss'
import { apiInstance } from '../../api'

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { Container } from '../../utils/Util';


const Hero = () => {
  const [data, setData] = useState([])
  // const [page, setPage] = useState(+new URLSearchParams(location.search).get("offset") || 1)

  useEffect(() => {
    apiInstance('/')
      .then(res => {
        // console.log(res.data)
        setData(res.data)
      })
      .catch(error => console.log(error))
  }, [])

  return (
    <div className='hero'>
      <h2 className='hero__title'>CRYPTOFOLIO WATCH LIST</h2>
      <p className='hero__text'>Get all the Info regarding your favorite Crypto Currency</p>

      <Container>
        <div className="swiper-wrapper">
          <Swiper
            spaceBetween={30}
            startedSlides={true}
            slidesPerView={4}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            // pagination={{
            //   clickable: true,
            // }}
            // navigation={true}
            modules={[Autoplay, Pagination, Navigation]}
            className="mySwiper"
          >
            {
              data.slice(0, 10).map(corusel =>
                <SwiperSlide key={corusel.id}>
                  <img src={corusel.image.small} alt="" />
                  <p className='corusel-name'>{corusel.id} <strong>{corusel.market_data.price_change_24h.toFixed(2)}</strong></p>
                  <p style={{color: corusel.market_data.current_price.aed > 0 ? '#0ECB81' : '#F00'}} className='corusel-price '>&#163;{corusel.market_data.current_price.aed}</p>
                </SwiperSlide>
              )
            }
          </Swiper>
        </div>
      </Container>
    </div>


  )
}

export default Hero