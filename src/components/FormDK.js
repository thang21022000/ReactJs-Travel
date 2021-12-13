import React, {useRef, useEffect} from 'react'
import './FormDK.css'
import {Link, useHistory} from "react-router-dom";

function FormDK() {
    const emailRef = useRef(null);
    const phoneRef = useRef(null);
    const passRef = useRef(null);
    const birthRef = useRef(null);
    const firstNameRef = useRef(null);
    const lastNameRef = useRef(null);
    const history = useHistory();
    const HandleSubmit = async (e) => {
        e.preventDefault();
        
        //lưu thông tin khách hàng vào biến user
        const user = {
            email: emailRef.current.value,
            phone: phoneRef.current.value,
            pass: passRef.current.value,
            birthDate: birthRef.current.value,
            firstName: firstNameRef.current.value,
            lastName: lastNameRef.current.value,
            didOrder: false,
        }

        //gửi request tạo tài khoản tới server 
        await fetch('http://localhost:5000/users', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user),
        });
        history.push('/dangnhap');
    }

    useEffect(() => {
        window.scrollTo(0,0);
    })

    return (
        <div className="form-container">
        <div className="form">
            <div className="wrap-form">
            <div className="form-above">
                <h3 id="h3">đăng ký</h3>
            </div>
            
            <div className="form-middle">      
                <form onSubmit={(e) => HandleSubmit(e)} >   
                    <div className="form-small account">
                        <input className="" type="email" name="email" required ref={emailRef} />
                        <label htmlFor="name" className="label-name">
                            <span className="content-name">email</span>
                        </label>
                    </div>
                    <div className="form-small account">
                        <input className="" type="text" name="phone" required ref={phoneRef} />
                        <label htmlFor="name" className="label-name">
                            <span className="content-name">số điện thoại</span>
                        </label>
                    </div>
                    <div className="form-small password">
                        <input className="phone" type="password" name="password" required ref={passRef}/>
                        <label htmlFor="name" className="label-name">
                            <span className="content-name">Mật khẩu</span>
                        </label>
                    </div>

                    <div className="form-small birthdate">
                        <input className="phone" type="date" name="birthdate" required ref={birthRef}/>
                        <label htmlFor="name" className="label-name">
                            <span className="content-name">ngày sinh</span>
                        </label>
                    </div>

                    <div className="form-small firstname">
                        <input className="phone" type="text" name="firstname" required ref={firstNameRef}/>
                        <label htmlFor="name" className="label-name">
                            <span className="content-name">first name</span>
                        </label>
                    </div>

                    <div className="form-small lastname">
                        <input className="phone" type="text" name="lastname" required ref={lastNameRef}/>
                        <label htmlFor="name" className="label-name">
                            <span className="content-name">last name</span>
                        </label>
                    </div>
                  
                    <p className="note">Chúng tôi sẽ gọi điện hoặc nhắn tin cho bạn để xác nhận số điện thoại. Có áp dụng phí dữ liệu và phí tin nhắn tiêu chuẩn</p>          
                    <button className="button-continue" type="submit">Đăng ký</button>   
                </form>      
                    <div className="or">
                        <hr />
                        <p>hoặc</p>
                        <hr />
                    </div>
            </div>

            {/* <!--  khung tiếp tục--> */}
            <Link  className="tieptucwith-link" to="/">
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

            <Link className="tieptucwith-link" to="/">
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

            <Link className="tieptucwith-link" to="/">
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

            <Link className="tieptucwith-link" to="/">
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

export default FormDK
