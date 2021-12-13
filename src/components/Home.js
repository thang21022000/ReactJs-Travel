import React, { useState,useEffect} from 'react'
import {Link} from "react-router-dom"

import TypeHotel from './TypeHotel'
import HotelItem from './HotelItem'
import Feature from './Feature'
import Button from './Button'

function Home() {
    const [hotels, setHotels] = useState([]);
  
    useEffect(() => {
      const fetchAllItem = async () =>{
        const res = await fetch('http://localhost:5000/hotels');
        const data = await res.json();
        setHotels(data);
      };
      
      fetchAllItem();
    }, []);

    return (
        <React.Fragment>
        <div className="fullpage-img"
          style = {{
              backgroundImage: "url(/images/manor-house.jpg)"
          }}
        />
        <TypeHotel
          class = "item-3" //hiển thị 3 item trên một dòng
          title = "Nhà nghĩ dưỡng cho thuê được xếp hạng cao nhất tại Ho Chi Minh City"
          subTitle = "Khách đồng ý: những chổ ở được đánh giá cao về vị trí, mức độ sạch sẽ và những tiêu chí khác.">
            {hotels.length > 0 && hotels.slice(0,3).map((hotel) => (         
              <HotelItem key ={hotel.id}
              id = {hotel.id}
              popularity = {hotel.popularity}
              image={hotel.image.slice(0,1)}
              summary={hotel.summary}
              hotel={hotel.hotel}
              desc={hotel.desc}
              price={hotel.price} />
            ))}
      </TypeHotel> 
      
      {/* hotel phong cách  */}
      <TypeHotel 
        class = "phongcach item-3" //hiển thị 3 item trên một dòng
        title = "Nhà nghỉ dưỡng cho thuê cho mọi phong cách"
        subTitle = "Tìm không gian phù hợp với bạn.">
          <div className="hotel-item">
              <div className="hotel-item-left">                   
                    <div className="hotel-container-img">
                            <Link to={"/allhotels"}>
                                <img src={"./images/france-airbnb-corpse-0add9-1456923239306.jpg"} className="hotel-img" alt={"những chỗ ở thoải mái với tất cả thiết bị thiết yếu"} />
                            </Link>
                  </div>             
              </div>
          </div>
          <div className="hotel-item">
              <div className="hotel-item-left">                   
                    <div className="hotel-container-img">
                            <Link to={"/allhotels"}>
                                <img src={"./images/hotel.jpg"} className="hotel-img" alt={"chổ ỡ và tiện nghi đầy sang trọng"} />
                            </Link>
                  </div>             
              </div>
          </div>
        <div className="hotel-item">
              <div className="hotel-item-left">                   
                    <div className="hotel-container-img">
                            <Link to={"/allhotels"}>
                                <img src={"./images/docdao.jpg"} className="hotel-img" alt={"cho phép mang theo thú cưng"} />
                            </Link>
                  </div>             
              </div>
          </div>
    
      </TypeHotel>

      <TypeHotel
        class = "item-5" //hiển thị 5 item trên một dòng
        title = "Tiện nghi phổ biến đối với nhà nghĩ dưỡng cho thuê ở Ho Chi Minh City"
        subTitle = "Khách đồng ý: những chổ ở được đánh giá cao về vị trí, mức độ sạch sẽ và những tiêu chí khác."
      >
        <Feature 
          image = "./images/kitchen.png"
          type="bếp"/>
        
        <Feature 
          image = "./images/wifi-signal.png"
          type="wifi"/>
        
        <Feature 
          image = "./images/pool.png"
          type="hồ bơi"/>
        
        <Feature 
          image = "./images/parking.png"
          type="chỗ để xe miễn phí"/>
        
        <Feature 
          image = "./images/air-conditioner.png"
          type="điều hòa nhiệt độ"/>
      </TypeHotel>

      <TypeHotel
        class = "item-4"
        title = "Nhà nghỉ dưỡng cho thuê tuyệt vời khác ở Ho Chi Minh City"
        subTitle = "Khách đồng ý: những chổ ở được đánh giá cao về vị trí, mức độ sạch sẽ và những tiêu chí khác."
      >
        {hotels.length > 0 && hotels.slice(4).map((hotel) => (         
          <HotelItem key ={hotel.id}
          id = {hotel.id}
          popularity = {hotel.popularity}
          image={hotel.image.slice(0,1)}
          summary={hotel.summary}
          hotel={hotel.hotel}
          desc={hotel.desc}
          price={hotel.price} />
        ))}


      </TypeHotel>
        <Link to="/allhotels" className = "btn-link">
          <Button 
            content = "hiển thị tất cả" //nội dung hiển thị trên nút
          />
        </Link>

      </React.Fragment>
    )
}

export default Home
