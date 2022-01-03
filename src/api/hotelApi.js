import axiosClient from './axiosClient';

const hotelApi = {
    getAll : (params) => {
    const url = '/hotẻls';
    return axiosClient.get(url, { params });
    }
}
export default hotelApi;