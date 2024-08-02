import axios from 'axios';

export const allUserLoad = async () => {
    try {
        const res = await axios.get("/users/alluserdata", {
        withCredentials: true
      });
        return res;
    } catch (e) {
        console.log(e);
        // alert 처리
        return;
    }
};