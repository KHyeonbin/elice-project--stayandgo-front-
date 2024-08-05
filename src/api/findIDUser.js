import axios from 'axios';

export const findIDUser = async (name, phone) => {
    try {
        const res = await axios.post('/users/findid',{
            name: name,
            phone: phone
        });
        return res;
    } catch (e) {
        alert(e.response?.data?.message);
        console.log(e);
        return;
    }
};