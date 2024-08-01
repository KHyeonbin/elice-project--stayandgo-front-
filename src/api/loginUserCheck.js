import axios from 'axios';

export const loginUserCheck = async () => {
    try {
        const res = await axios.get('http://localhost:3001/users/getuser', {
            withCredentials: true // 쿠키를 포함시키기 위해 필요
        });
        return res.data;
    } catch (e) {
        if(e.response?.data){
            console.log(e.response.data.message);
        } else {
            console.log(e);
        }
        return;
    }
};