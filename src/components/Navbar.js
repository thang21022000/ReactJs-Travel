import React, {useState, useEffect, useContext} from 'react'
import {Link, useHistory} from "react-router-dom";
import './Navbar.css'
import { AuthContext } from './AuthContext';


function Navbar() {
    const history = useHistory();
    const {isLogged, user } = useContext(AuthContext);
    const [navbarBackground, setNavbarBackground] = useState("transparent");
    useEffect(() =>{
        const listenScrollEvent = () =>{
            window.scrollY > 10 ? setNavbarBackground("white"): setNavbarBackground("transparent !important");
        }

        window.addEventListener("scroll", listenScrollEvent)

        //cleanup func
        return () =>{
            window.removeEventListener('scroll', listenScrollEvent);
        }
    },[])

    const HandleLogout = () => {
        localStorage.removeItem('user')
        history.push('/');
        history.go(0);

        // setIsLogged(false);
    }

    return (
        <nav>
            <div className="navbar-container"
                style = {{backgroundColor: navbarBackground}}
            >
                <div className="logo">
                    <Link to="/"><img className="img-logo" src="/images/tn2525.png" alt="logo"/></Link>
                </div>

                <div className="header-right">            
                    <div className="header-right-content personal">        
                        <div className="container-img">
                            <img src="/images/menu.png" alt="menu"/>
                            <img src="/images/person-black-user-shape.png" alt="person-black-user-shape"/>                   
                        </div>        
                        <div className="option-toggle">
                            <div >
                                {!isLogged ? (
                                <ul className="personal-list">
                                    <li><Link to="/dangnhap">Đăng nhập</Link></li>
                                    <li><Link to="/dangky">Đăng ký</Link></li>
                                </ul>
                                ):(
                                <ul className="personal-list">
                                    <li style={{textAlign: "center"}}>{user[0].firstName} {user[0].lastName}</li>
                                    <li><Link to="/account">Chuyến đi</Link></li>                               
                                    <li style={{marginTop: 12, borderTop: "1px solid #000"}} onClick={HandleLogout}>Đăng xuất</li>
                                </ul>
                                )}
                            </div> 
                        </div>                       
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar
