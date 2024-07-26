import axios from 'axios';

export const myPostUpload = async (formData) => {
    try {
        const res = await axios.post('http://localhost:3001/post/write', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
              }
        });
        return res;
    } catch (e) {
        console.log(e);
        // alert 처리
        return;
    }
};