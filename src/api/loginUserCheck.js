import axios from 'axios';

export const loginUserCheck = async () => {
    try {
        const res = await axios.get('http://localhost:3001/users/getuser');
        return res.data;
    } catch (e) {
        console.log(e);
        return;
    }
};