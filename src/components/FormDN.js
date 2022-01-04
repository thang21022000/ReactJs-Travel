import React, {useRef, useState} from 'react'
import './FormDK.css'
import {Link, useHistory} from "react-router-dom";

function FormDN() {
    const history = useHistory();
    const containerRef = useRef(null);
    const emailRef = useRef(null);
    const passRef = useRef(null);
    const [warning, setWarning] = useState('');
    
    const HandleLogin =  async (e) => {
        e.preventDefault();

        const email = emailRef.current.value;
        const pass = passRef.current.value;
    
        //lấy dữ liệu theo email
        const res = await fetch(`https://api-travel-react-app.herokuapp.com/users?email=${email}`);
        const data = await res.json();
        //lấy dữ liệu theo mật khẩu
        const res2 = await fetch(`https://api-travel-react-app.herokuapp.com/users?pass=${pass}`);
        const data2 = await res2.json();
        if(data.length > 0){
            if(data2.length > 0){
                localStorage.setItem('user', JSON.stringify(data));
                history.push('/');
                history.go(0);

            }else{
                setWarning('Quý khách vui lòng kiểm tra lại mật khẩu')
            }
        }else{
            setWarning('Quý khách vui lòng kiểm tra lại Email')
        }
  
        history.push('/');
    }

    return (
        <div className="form-container">
        <div className="form">
            <div className="wrap-form">
            <div className="form-above">
                <h3 id="h3">đăng nhập</h3>
            </div>
            
            <div className="form-middle" ref={containerRef}>     
            <form onSubmit={(e) => HandleLogin(e)}>
                <div className="form-small account">
                    <input className="" type="email" name="account" required ref={emailRef}/>
                    <label htmlFor="name" className="label-name">
                        <span className="content-name">email</span>
                    </label>
                </div>
                <div className="form-small password">
                    <input className="phone" type="password" name="password" required ref={passRef}/>
                    <label htmlFor="name" className="label-name">
                        <span className="content-name">Mật khẩu</span>
                    </label>
                </div>
                <div style={{fontSize: 12, color: "red", textAlign: "center"}}>{warning}</div>
                <p className="note">Chúng tôi sẽ gọi điện hoặc nhắn tin cho bạn để xác nhận số điện thoại. Có áp dụng phí dữ liệu và phí tin nhắn tiêu chuẩn</p>          
                <button className="button-continue" type="submit">Đăng nhập</button>   
            </form>          
                <div className="or">
                    <hr />
                    <p>hoặc</p>
                    <hr />
                </div>
            </div>

            {/* <!--  khung tiếp tục--> */}
            <Link  className="tieptucwith-link" to="#">
                <div className="tieptucwith">           
                    <div className="img">
                        <img src="/images/letter.png" alt="icon-letter" />
                    </div>
                    <div className="textcontent">
                        <p>Tiếp tục với Email</p>
                    </div>
                    <div></div>
                </div>
            </Link>

            <Link className="tieptucwith-link" to="#">
                <div className="tieptucwith">           
                    <div className="img">
                        <img src="/images/facebook (1).png" alt="icon-fb" />
                    </div>
                    <div className="textcontent">
                        <p>Tiếp tục với Facebook</p>
                    </div>
                    <div></div>
                </div>
            </Link>

            <Link className="tieptucwith-link" to="#">
                <div className="tieptucwith">           
                    <div className="img">
                        <img src="/images/google.png" alt="icon-gg" />
                    </div>
                    <div className="textcontent">
                        <p>Tiếp tục với Google</p>
                    </div>
                    <div></div>
                </div>
            </Link>

            <Link className="tieptucwith-link" to="#">
                <div className="tieptucwith">           
                    <div className="img">
                        <img src="/images/apple.png" alt="icon-apple" />
                    </div>
                    <div className="textcontent">
                        <p>Tiếp tục với Apple</p>
                    </div>
                    <div></div>
                </div>
            </Link>
            </div>      
        </div>
        </div>
    )
}

export default FormDN
