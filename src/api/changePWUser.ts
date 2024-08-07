import axios from 'axios';

export const changePWUser = async (email: string, password: string) => {
    try {
        const res = await axios.put("/users/", {
        email,
        password,
      });
        return res;
    } catch (e) {
        alert(e.response?.data?.message);
        console.log(e);
        return;
    }
};