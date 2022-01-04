import axiosClient from './axiosClient';

const hotelApi = {
    getAll : (params) => {
        const url = '/hotels';
        return axiosClient.get(url, { params });
    },
    getHotelById : (id) =>{
     const url = `/hotels/${id}`;
     return axiosClient.get(url);
    }
}
export default hotelApi;