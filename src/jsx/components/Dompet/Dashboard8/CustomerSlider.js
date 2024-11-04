import React from 'react';
import {Link} from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';

import  test5 from "../../../../images/testimonial/5.jpg";
import  test6 from "../../../../images/testimonial/6.jpg";
import  test7 from "../../../../images/testimonial/7.jpg";
import  test8 from "../../../../images/testimonial/8.jpg";
import  test9 from "../../../../images/testimonial/9.jpg";

const swiperData = [
    { image: test5, title:'Aria Frost'},
    { image: test6, title:'Giselle Monroe'},
    { image: test7, title:'Harrison Wolfe'},
    { image: test8, title:'Isabella Drake'},
    { image: test9, title:'Jasper Montgomery'},
    { image: test6, title:'Giselle Monroe'},
];

const CustomerSlider = () => {
    return (
        <Swiper
            spaceBetween={30}
            slidesPerView={5}            
            className="swiper mySwiper swiper-container"
            breakpoints= {{
                360: {
                  slidesPerView: 1,
                  spaceBetween: 30,
                },
                600: {
                  slidesPerView: 2,
                  spaceBetween: 30,
                },
                1024: {
                  slidesPerView: 2,
                  spaceBetween: 30,
                },
                1200: {
                  slidesPerView: 3,
                  spaceBetween: 30,
                },
                1600: {
                  slidesPerView: 4,
                  spaceBetween: 30,
                },
                1920: {
                  slidesPerView: 5,
                  spaceBetween: 30,
                },
            }}
        >     
            {swiperData.map((item, ind)=>(
                <SwiperSlide className="swiper-slide" key={ind}>
                    <div className="text-center">
                        <img src={item.image} className="swiper-media" alt="" />
                        <div className="dr-star"><i className="las la-star" /> 4.2</div>
                        <h5 className="fs-16 mb-1 font-w600"><Link className="text-black" to={"/page-review"}>{item.title}</Link></h5>
                        <span className="text-primary mb-2 d-block">React Developer</span>
                        <p className="fs-12">795 Folsom Ave, Suite 600 San Francisco, CADGE 94107</p>
                        <div className="social-media">
                            <Link to="#"><i className="lab la-instagram" /></Link>
                            <Link to="https://www.facebook.com/dexignzone" target='_blank'><i className="lab la-facebook-f" /></Link>
                            <Link to="https://twitter.com/dexignzones" target='_blank'><i className="lab la-twitter" /></Link>
                        </div>
                    </div>
                </SwiperSlide> 
            ))}       
        </Swiper>
    );
};

export default CustomerSlider;