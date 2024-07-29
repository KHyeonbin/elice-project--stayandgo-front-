import axios from 'axios';

export const logoutUser = async () => {
    try {
        const res = await axios.post('http://localhost:3001/users/logout',{}, {
            withCredentials: true // 쿠키를 포함시키기 위해 필요
        });
        return res;
    } catch (e) {
        if(e.response?.data){
            console.log(e.response.data.message);
        } else {
            console.log(e);
        }
    }
};