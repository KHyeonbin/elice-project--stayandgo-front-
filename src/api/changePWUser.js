import axios from 'axios';

export const changePWUser = async (email, password) => {
    try {
        const res = await axios.put("http://localhost:3001/users/", {
        email,
        password,
      });
        return res;
    } catch (e) {
        console.log(e);
        // alert 처리
        return;
    }
};