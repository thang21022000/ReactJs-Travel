import React from 'react'
import './Footer.css'
import {Link} from "react-router-dom";

function Footer() {
    return (
        <footer className="nghiduong footer">
            <div className="container-footer wide">
                <div className="artical">
                    <div className="artical-content">
                        <h5>GIỚI THIỆU</h5>
                        <Link to="/" ><p>Phương thức hoạt động của Airbnb</p></Link>
                        <Link to="/" ><p>Trang tin tức</p></Link>
                        <Link to="/" ><p>Airbnb Plus</p></Link>
                        <Link to="/" ><p>Airbnb Luxe</p></Link>
                        <Link to="/" ><p>Hotel Tonight</p></Link>
                        <Link to="/" ><p>Airbnb for Work</p></Link>
                        <Link to="/" ><p>Thế vận hội</p></Link>
                        <Link to="/" ><p>Cơ hội nghề nghiệp</p></Link>
                    </div>
                    
                    <div className="artical-content">
                        <h5>CỘNG ĐỒNG</h5>
                        <Link to="/" ><p>Sự đa dạng và cảm giác thân thuộc</p></Link>
                        <Link to="/" ><p>Tiện nghi phù hợp cho người khuyết tật</p></Link>
                        <Link to="/" ><p>Đối tác liên kết Airbnb</p></Link>
                        <Link to="/" ><p>Chỗ ở cho tuyến đầu</p></Link>
                        <Link to="/" ><p>Mời bạn bè</p></Link>
                    </div>

                    <div className="artical-content">
                        <h5>ĐÓN TIẾP KHÁCH</h5>
                        <Link to="/" ><p>Cho thuê nhà</p></Link>
                        <Link to="/" ><p>Tổ chức Trải nghiệm thực tế</p></Link>
                        <Link to="/" ><p>Tổ chức trải nghiệm</p></Link>
                        <Link to="/" ><p>Đón tiếp khách có trách nhiệm</p></Link>
                        <Link to="/" ><p>Ngôi nhà rộng mở</p></Link>
                        <Link to="/" ><p>Trung tâm tài nguyên</p></Link>
                        <Link to="/" ><p>Trung tâm cộng đồng</p></Link>
                    </div>

                    <div className="artical-content">
                        <h5>HỔ TRỢ</h5>
                        <Link to="/" ><p>Thông tin cập nhật về COVID-19</p></Link>
                        <Link to="/" ><p>Trung tâm trợ giúp</p></Link>
                        <Link to="/" ><p>Các tùy chọn hủy</p></Link>
                        <Link to="/" ><p>Hổ trợ khu dân cư</p></Link>
                        <Link to="/" ><p>Tin cậy và an toàn</p></Link>
                    </div>
                </div>
                <div className="footer-info">
                    <ul className="footer-list">
                        <p>© 2021 TN2525, Inc. All rights reserved</p>
                        <li className="list-item"><Link to="/" className="item-link">Quyền riêng tư</Link></li>
                        <li className="list-item"><Link to="/" className="item-link">Điều khoản</Link></li>
                        <li className="list-item"><Link to="/" className="item-link">Bản đồ địa điểm</Link></li>
                    </ul>
                    <ul className="footer-list">
                        <li className="list-item"><Link to="/" className="item-link"><img src="/images/facebook.png" className="link-img" alt=""/></Link></li>
                        <li className="list-item"><Link to="/" className="item-link"><img src="/images/twitter.png" className="link-img" alt=""/></Link></li>
                        <li className="list-item"><Link to="/" className="item-link"><img src="/images/instagram.png" className="link-img" alt=""/></Link></li>
                    </ul>
                </div>
            </div> 
        </footer>
    )
}

export default Footer
