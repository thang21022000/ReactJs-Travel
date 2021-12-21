import React, { useState,useEffect} from 'react'
import Pagination from "react-js-pagination";
import queryString from 'query-string'
import './AllHotels.css'
import HotelItem from './HotelItem'
import MapBox from './MapBox'


function AllHotels() {
    const [all, setAll] = useState([]);
    const [showPrice, setShowPrice] = useState(false);
    const [showType, setShowType] = useState(false);
    const [filterPrice, setFilterPrice] = useState({value: 10});
    const [filterType, setFilterType] = useState([]);
    const [filterPage, setFilterPage] = useState({
        _limit: 5,
        _page: 1,
    })
    const [pagination, setPagination] = useState(1);
    const [totalItem, setTotalItem] = useState(1);    

    //lấy ra tổng số nơi theo yêu cầu
    useEffect(() => {
        window.scrollTo(0,0)
        const CountTotalItem = async() => {
            let res = null;
            const parameterType = filterType.map((item) =>{
                return queryString.stringify(item)
            }).join('&');
            if(filterType.length < 0){
                res = await fetch('http://localhost:5000/hotels');
            }else{
                res = await fetch(`http://localhost:5000/hotels?${parameterType}`);

            }
            const data = await res.json();
            const total = data.length;
            setTotalItem(total);       
        }
        CountTotalItem();        
    },[filterType])
    
    // gọi api theo từng trang, tối da 5 nơi 1 trang
    useEffect(() => {
        const fetchAllItem = async () =>{
            let res = null;
            const parameterPage = queryString.stringify(filterPage)
            const parameterType = filterType.map((item) =>{
                return queryString.stringify(item)
            }).join('&');

            if(filterType.length < 0){
                res = await fetch(`http://localhost:5000/hotels?price_gte=${filterPrice.value}&${parameterPage}`);
            }else{
                res = await fetch(`http://localhost:5000/hotels?price_gte=${filterPrice.value}&${parameterPage}&${parameterType}`);
            }
            const data = await res.json();
            setAll(data);

        };
        fetchAllItem();
        // console.log('logic',filterType.length > 0 ? all.length : totalItem)

    }, [filterPrice, filterPage, filterType, totalItem]);
    
    
    const HandleOnchange = (e) =>{
        setFilterPrice({value:e.target.value});
    }

    //hàm xử lý khi người dùng checkbox
    const HandleCheckBox = (e) => {
        if(e.target.checked){
            setFilterType([...filterType,{type : e.target.value}])
        }else{
            setFilterType(filterType.filter(filter => e.target.value !== filter.type))
        }
    }

    //
    const handlePageChange = (e) => {
        setFilterPage({...filterPage, _page: e })
        setPagination(e);
    }
    return (
        <div className="all-hotels-container">
            <div className="all-hotels">
                <div className="all-left">
                    <div className="all-left__title">
                        <h1>chổ ở tại thành phố hồ chí minh</h1>
                        <div className="all-hotels__filter">                 
                            <div className="filter filter-type">
                                <div onClick={(e) => {setShowType(!showType); setShowPrice(false)}} className="filter-label">
                                    loại nơi ở
                                    {
                                        showType ? (<i className="fas fa-arrow-up arrow__icon"></i>) :(  <i className="fas fa-arrow-down arrow__icon"></i>)
                                    }
                                
                                </div> 
                                {showType &&  <div className="form-input form-input-type ">
                                    <form>
                                        <div className="form-input-container" >
                                            <input type="checkbox"  id="wholeroom" value="wholeroom" name="type" onChange={(e) => {HandleCheckBox(e)}}/>
                                            <label htmlFor="wholeroom">Nguyên nhà</label>
                                        </div>
                                        <div className="form-input-container" >
                                            <input type="checkbox"  id="privateroom" value="privateroom" name="type" onChange={(e) => {HandleCheckBox(e)}}/>
                                            <label htmlFor="privateroom">Phòng riêng</label>
                                        </div>
                                        <div className="form-input-container" >
                                            <input type="checkbox"  id="shareroom" value="shareroom" name="type" onChange={(e) => {HandleCheckBox(e)}}/>
                                            <label htmlFor="shareroom">Phòng riêng</label>
                                        </div>
                                        <div className="form-input-container" >
                                            <input type="checkbox"  id="hotelroom" value="hotelroom" name="type" onChange={(e) => {HandleCheckBox(e)}}/>
                                            <label htmlFor="hotelroom">Phòng khách sạn</label>
                                        </div>
                                    </form> 
                                </div>}                               
                            </div>
               
                            <div className="filter filter-price" style={filterPrice.value > 10 ? {boxShadow: "0 0 0 1px #000 inset"} : {}}>
                                <>
                                    {filterPrice.value > 10 ?
                                        <div onClick={(e) => {setShowPrice(!showPrice); setShowType(false)}} className="filter-label" >${filterPrice.value}{
                                            showPrice ? (<i className="fas fa-arrow-up arrow__icon"></i>) :(  <i className="fas fa-arrow-down arrow__icon"></i>)
                                }</div>
                                    :
                                        <div onClick={(e) => {setShowPrice(!showPrice); setShowType(false)}} className="filter-label">
                                            Price
                                            {
                                                showPrice ? (<i className="fas fa-arrow-up arrow__icon"></i>) :(  <i className="fas fa-arrow-down arrow__icon"></i>)
                                    }
                                        </div>
                                    }
                                    
                                </>
                                {showPrice &&
                                <div className="form-input form-input-price ">
                                    <form>
                                        <input type="range" value={filterPrice.value} min="10" max="99" step="1" onChange={(e) => HandleOnchange(e)}/>
                                        <p>Giá phòng: ${filterPrice.value}</p>
                                    </form>
                                    
                                </div>
                                }     
                                 
                            </div> 
                           
                           
                                

                        </div>              
                    </div>
                    {all.length > 0 ? all.map((hotel) => (         
                    <>
                        <HotelItem
                            key={hotel.id}
                            id={hotel.id}
                            popularity={hotel.popularity}
                            image={hotel.image}
                            summary={hotel.summary}
                            hotel={hotel.hotel}
                            desc={hotel.desc}
                            price={hotel.price}
                        />
                        <div key={hotel.hotel} style={{borderBottom:"1px solid var(--borderColor)",  marginBottom:"16px"}}></div>
                       
                    </>
                    ))       
                     : 
                    <>
                        <h3>Không có phòng phù hợp</h3>
                    </>}
                    
                    <Pagination
                        totalItemsCount={totalItem}
                        activePage={pagination}
                        onChange={((e) => handlePageChange(e))}
                        itemsCountPerPage={filterPage._limit}
                        pageRangeDisplayed={5}
                        itemClass="page-item"
                        linkClass="page-link"
                    />

                </div>
                <div className="all-right">
                    <div className="mapbox">
                        {all.length > 0 && 
                            <MapBox 
                                height="87vh" 
                                width="100%" 
                                address={all}
                            />             
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AllHotels
