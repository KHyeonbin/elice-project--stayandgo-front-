import axios from 'axios';

export const findIDUser = async (name, phone) => {
    try {
        const res = await axios.post('/users/findid',{
            name: name,
            phone: phone
        });
        return res;
    } catch (e) {
        console.log(e);
        // alert 처리
        return;
    }
};