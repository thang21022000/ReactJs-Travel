import axiosClient from './axiosClient'

const userApi = {
    getUser: (params) =>{
        const url = '/users';
        return axiosClient.get(url, { params });
    },
    postUser: (id) =>{
        const url = `/users/${id}`;
        return axiosClient.post(url)
    }
}

export default userApi