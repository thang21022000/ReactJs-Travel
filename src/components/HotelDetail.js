import React, {useState, useEffect, useContext} from 'react'
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { useHistory } from 'react-router'
import Calendar from 'react-calendar'
import MapBox from './MapBox'

import './HotelDetail.css'
import 'react-calendar/dist/Calendar.css'
import './Calendar2.css'
import {AuthContext} from './AuthContext'

function HotelDetail({match}) { 
    const {isLogged, user} = useContext(AuthContext);
    const [warningOrder, setWarningOrder] = useState("");
    const [date, setDate] = useState(new Date());   
    const [datePicked, setDatePicked] = useState(0)
    const [totalFeeOfDay, setTotalFeeOfDay] = useState(0)
    const [totalFee, setTotalFee] = useState(0)
    const [turnToArray, setTurnToArray] = useState([]);

    const history = useHistory();
    // trượt tới đầu trang khi render trang
    useEffect(() => {
        window.scrollTo(0,0)
    },[])

    //
    const [hotel, setHotel] = useState({
        image: [],
        fees: {},
        address: "",
        complaint: [],
        price: 0,

    });
    useEffect(() => {
        const fetchApi = async () =>{
            const res = await fetch(`http://localhost:5000/hotels/${match.params.id}`);
            const data = await res.json();
            setHotel(data);
            setTurnToArray([data]);
        };    
        fetchApi();  
        },[match]);

    //day
    useEffect(() => {
        const CaculateDay = () => {
            if(date.length > 1){
                setDatePicked(Math.round((date[1] - date[0])/(1000*60*60*24)))
            }
        }
        CaculateDay();
    },[date])

    //fee for day
    useEffect(() => {
        const CaculatePrice = () => {
                if(datePicked){
                    setTotalFeeOfDay(datePicked * hotel.price)
                }
            }
        CaculatePrice();
    },[datePicked, hotel])

    //total fee
    useEffect(() => {
        const CaculateTotal = () => {
                const total = parseInt(hotel.fees.service) + parseInt(hotel.fees.cleaning) + totalFeeOfDay;
                setTotalFee(total)
                
            }
            CaculateTotal();
    },[totalFeeOfDay, hotel])

    const submitAlert = () => {
        confirmAlert({
          title: 'Xác Nhận',
          message: 'Bạn Có Muốn Đặt Chổ Chứ ? ',
          buttons: [
            {
              label: 'Có',
              onClick: async () => {
                   const dataOrder = {
                    didOrder: true,
                    placeOrder: {hotel},
                    detailOrder: {
                        datein: date[0].toLocaleDateString(),
                        dateOut: date[1].toLocaleDateString(),
                        feeService: hotel.fees.service,
                        feeCleaning: hotel.fees.cleaning,
                        feeTotalOfDay: totalFeeOfDay,
                        feeTotal: totalFee,
                        datePicked: datePicked,
                    }
                    
                }
                await fetch(`http://localhost:5000/users/${user[0].id}`, {
                method: 'PATCH',
                body: JSON.stringify(dataOrder),
                headers: {'Content-type': 'application/json'}
                });
                history.push('/account')
              }
            },
            {
              label: 'Không',
              onClick: () => history.goBack()
            }
          ]
        });
    };

    const CheckOrder = () => {
        if(datePicked <= 0){
            setWarningOrder("Vui lòng đặt tối thiểu 1 ngày");
        }else{
            if(isLogged){
                submitAlert();
            }else{
                history.push('/dangnhap');
            }
        }
    

    }
    return (
        <div className="hotel-detail">
             {hotel && 
             <><div className="title-container">
                    <h1 className="name">{hotel.hotel}</h1>
                    <div className="rate-address">
                        <span className="address">{hotel.address}</span>
                    </div>
                </div><div className="list-img">
                        <div className="left-img">
                            <img alt="" className="hotel-detail-img" src={hotel.image[0]}></img>
                        </div>
                        <div className="right-img">
                            {hotel.image.slice(1).map((img, index) => {
                                return <img alt="" className="hotel-detail-img" src={hotel.image[index]} key={index}></img>
                            })}
                        </div>
                    </div><div className="desc">
                        <div className="two-part">
                            <div className="part-left">
                                <div className="desc-title">
                                    <h3>toàn bộ căn hộ cho thuê</h3>
                                    <div className="desc-list">
                                        <span>3 khách</span>
                                        <span>phòng studio</span>
                                        <span>1 giường</span>
                                        <span>1 phòng tắm</span>
                                    </div>
                                </div>

                                <div className="desc-highlight">
                                    <div className="highlight-container">
                                        <div className="highlight-icon">
                                            <i className="fas fa-home fa-2x"></i>
                                        </div>
                                        <div className="highlight-text">
                                            <h4>toàn bộ nhà</h4>
                                            <p>bạn sẽ có căn hộ cho riêng mình</p>
                                        </div>
                                    </div>
                                    <div className="highlight-container">
                                        <div className="highlight-icon">
                                            <i className="fas fa-door-closed fa-2x"></i>
                                        </div>
                                        <div className="highlight-text">
                                            <h4>tự nhận phòng</h4>
                                            <p>tự nhận phòng với hộp khóa an toàn</p>
                                        </div>
                                    </div>
                                    <div className="highlight-container">
                                        <div className="highlight-icon">
                                            <i className="fas fa-pump-medical fa-2x"></i>
                                        </div>
                                        <div className="highlight-text">
                                            <h4>vệ sinh tăng cường</h4>
                                            <p>chủ nhà này đã cam kết thực hiện quy trình vệ sinh tăng cường 5 bước</p>
                                        </div>
                                    </div>
                                    <div className="highlight-container">
                                        <div className="highlight-icon">
                                            <i className="far fa-calendar-alt fa-2x"></i>
                                        </div>
                                        <div className="highlight-text">
                                            <h4>hủy lịch nhanh gọn</h4>
                                            <p></p>
                                        </div>
                                    </div>
                                </div>

                                <div className="facility">
                                    <div className="facility-container">
                                        <h3>nơi này có những gì cho bạn</h3>
                                        <div className="facility-list">
                                            <div className="facility-item">
                                                <i className="fas fa-car fa-2x facility-icon"></i>
                                                <p>chổ đỗ xe miễn phí tại nơi ở</p>
                                            </div>
                                            <div className="facility-item">
                                                <i className="fas fa-paw fa-2x facility-icon"></i>
                                                <p>cho phép thú cưng</p>
                                            </div>
                                            <div className="facility-item">
                                                <i className="fas fa-car fa-2x facility-icon"></i>
                                                <p>máy giặt</p>
                                            </div>
                                            <div className="facility-item">
                                                <i className="fas fa-wifi fa-2x facility-icon"></i>
                                                <p>wi-fi</p>
                                            </div>
                                            <div className="facility-item">
                                                <i className="fas fa-tv fa-2x facility-icon"></i>
                                                <p>TV</p>
                                            </div>
                                            <div className="facility-item">
                                                <i className="fas fa-camera fa-2x facility-icon"></i>
                                                <p>camera an ninh</p>
                                            </div>
                                            <div className="facility-item">
                                                <i className="fas fa-sink fa-2x facility-icon"></i>
                                                <p>nhà bếp</p>
                                            </div>
                                            <div className="facility-item">
                                                <i className="fas fa-snowflake fa-2x facility-icon"></i>
                                                <p>điều hòa</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="calendar">
                                    <div className="calendar-container">
                                        <h3>chọn ngày bạn đến</h3>
                                        <Calendar
                                            onChange={setDate} //xử lý sự kiện thay đổi ngày
                                            value={date} //ngày đã chọn
                                            selectRange={true} //cho phép chọn khoảng thời gian  
                                            minDate={new Date()} // không được chọn những ngày đã qua
                                        />
                                    </div>
                                </div>

                            </div>

                            <div className="part-right">
                                <div className="part-right-wrapped">
                                    <div className="part-right__price">
                                        <span>${hotel.price}</span>
                                        <span> / đêm</span>
                                    </div>
                                    {date.length > 0 ? (
                                        <div>
                                            <div className="part-right__dated">
                                                <div className="part-right__day-in">
                                                    <span className="date-label">Ngày nhận</span>{' '}
                                                    <br />
                                                    <span className="date-picked">{date[0].toLocaleDateString()}</span>
                                                </div>
                                                <div className="part-right__day-out">
                                                    <span className="date-label">Ngày trả</span>{' '}
                                                    <br />
                                                    <span className="date-picked">{date[1].toLocaleDateString()}</span>
                                                </div>
                                            </div>
                                            <div className="cost">
                                                <div className="cost-left">
                                                    <span>${hotel.price}</span>
                                                    <span>x</span>
                                                    <span>{datePicked} ngày</span>
                                                </div>
                                                <div className="cost-right">
                                                    <span>{totalFeeOfDay}</span>
                                                </div>
                                            </div>
                                            <div className="cost">
                                                <span>Phí dịch vụ</span>
                                                <span>${hotel.fees.service}</span>
                                            </div>
                                            <div className="cost">
                                                <span>Phí vệ sinh</span>
                                                <span>${hotel.fees.cleaning}</span>
                                            </div>
                                            <div className="cost total">
                                                <span>Tổng</span>
                                                <span>${totalFee}</span>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="part-right__dated">
                                            <div className="part-right__day-in">
                                                <span className="date-label">Ngày nhận:</span>{' '}
                                            </div>
                                            <div className="part-right__day-out">
                                                <span className="date-label">Ngày trả:</span>{' '}
                                            </div>
                                        </div>
                                    )}  
                                    {datePicked <= 0 && <div style={{textAlign: "center", padding: "12px 4px", color: "red"}}>{warningOrder}</div>  }        
                                    <div className="container-btn">
                                        <button type="submit" className="price-button fullwidth" onClick={CheckOrder}>đặt phòng</button>
                                    </div>     
                                </div>

                            </div>
                        </div>
                        <div className="complaint">
                            <h3>nhận xét & đánh giá</h3>
                            <div className="complaint-container">
                                {hotel.complaint.length > 0 && hotel.complaint.map((cmt,index) => (
                                    <div className="complaint-item" key={index}>
                                    <div className="complaint-icon">
                                        <i className="fas fa-user fa-2x"></i>
                                    </div>
                                    {cmt}
                                </div>
                                ))}
                                
                            </div>
                        </div>


                        <div className="location">
                            {turnToArray.length > 0 && <MapBox address={turnToArray}
                                    width="100vw"
                                    height="100vh"
                            />}
                        </div>
                    </div></>
        
        }
            
        </div>

    )
}

export default HotelDetail
