import axios from 'axios';

export const findIDUser = async (name, phone) => {
    try {
        const res = await axios.post('http://localhost:3001/users/findid',{
            name: name,
            phone: phone
        }, {
            withCredentials: true
          });
        return res;
    } catch (e) {
        console.log(e);
        // alert 처리
        return;
    }
};