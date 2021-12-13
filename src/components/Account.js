import React, {useContext, useEffect, useState} from 'react'
import {Link, useHistory} from 'react-router-dom'
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

import './Account.css'
import Navbar from './Navbar'
import Button from './Button'
import Slider from './Slider'
import {AuthContext} from './AuthContext';
function Account() {
    const {isLogged ,user} = useContext(AuthContext);
    const history = useHistory();

    const [userData, setUserData] = useState({
        didOrder : false,
        quantityOrder: {},
    });

    useEffect(() => {
        if(!isLogged){
            history.push('/dangnhap');
        }
    },[isLogged, history])

    useEffect(() => {
        window.scrollTo(0,0)
    },[])

    useEffect(() => {
        const fetchUserData = async () =>{
            const res = await fetch(`http://localhost:5000/users/${user[0].id}`);
            const data = await res.json();
            setUserData(data);
        };
        fetchUserData();
    
    },[user])

    const HandleRemove = () => {
        confirmAlert({
            title: 'Xóa Chuyến Đi',
            message: 'Bạn Có Muốn Lịch Hẹn Chứ ? ',
            buttons: [
              {
                label: 'Có',
                onClick: async () => {
                  await fetch(`http://localhost:5000/users/${user[0].id}`, {
                  method: 'PUT',
                  body: JSON.stringify(...user),
                  headers: {'Content-type': 'application/json'}
                  });
                  history.go(0)
                }
              },
              {
                label: 'Không',
                // onClick: () => history.go(0)
              }
            ]
          });
    }

    return (
        <React.Fragment >
            <Navbar />

            <section className="trips">
                <h1 className="trips-title">Chuyến đi</h1>
                <h3 className="upcoming">Sắp đến</h3>
                {!userData.didOrder ? 
                    (
                    <div className="trip-background" style={{backgroundImage:"url(./images/10751.jpg)"}}>
                        <div className="trip-explore">
                            <h3>Hãy chọn ngay cho mình một điểm đến ngay thôi nào !</h3>
                            <Link to="/allhotels" style={{textDecoration: "none", marginTop: 20}}><Button content="Khám phá"></Button></Link>
                        </div>
                    </div>)  
                 : (                       
                    <>
                        <h3 className="trip-hotel-name">{userData.placeOrder.hotel.hotel}</h3>
                        <div className="trips-container">
                        <Slider image = {userData.placeOrder.hotel.image} id = {userData.placeOrder.hotel.id}/>
                    
                             <div>
                                <div className="part-right__dated">
                                    <div className="part-right__day-in">
                                        <span className="date-label">Ngày nhận</span>{' '}
                                        <br />
                                        <span className="date-picked">{userData.detailOrder.datein}</span>
                                    </div>
                                    <div className="part-right__day-out">
                                        <span className="date-label">Ngày trả</span>{' '}
                                        <br />
                                        <span className="date-picked">{userData.detailOrder.dateOut}</span>
                                    </div>
                                </div>
                                <div className="cost">
                                    <div className="cost-left">
                                         <span>${userData.placeOrder.hotel.price}</span> 
                                        <span>x</span>
                                        <span>{userData.detailOrder.datePicked} ngày</span>
                                    </div>
                                    <div className="cost-right">
                                        <span>{userData.detailOrder.feeTotalOfDay}</span>
                                    </div>
                                </div>
                                <div className="cost">
                                    <span>Phí dịch vụ</span>
                                    <span>${userData.detailOrder.feeService}</span>
                                </div>
                                <div className="cost">
                                    <span>Phí vệ sinh</span>
                                    <span>${userData.detailOrder.feeCleaning}</span>
                                </div>
                                <div className="cost total">
                                    <span>Tổng</span>
                                    <span>${userData.detailOrder.feeTotal}</span>
                                </div>
                            </div>
                            <div className="remove-btn" onClick ={HandleRemove}>
                                <i className="fas fa-trash-alt"></i>
                            </div>
                    </div> 
                    </>
                )
            }

            </section>

        </React.Fragment>
    )
}

export default Account
