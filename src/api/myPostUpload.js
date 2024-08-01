import axios from 'axios';

export const myPostUpload = async (formData) => {
    try {
        const res = await axios.post('http://localhost:3001/post/write', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
              },
            withCredentials: true // 쿠키를 포함시키기 위해 필요
        });
        console.log(res);
        return res;
    } catch (e) {
        console.log(e);
        // alert 처리
        return;
    }
};