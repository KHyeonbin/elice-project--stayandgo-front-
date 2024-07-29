import axios from 'axios';

export const logoutUser = async () => {
    try {
        const res = await axios.post('http://localhost:3001/users/logout');
        return res;
    } catch (e) {
        console.log(e);
        // alert 처리
        return;
    }
};