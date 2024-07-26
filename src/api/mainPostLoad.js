import axios from 'axios';

class MainPostLoad {
    // 페이지 정보 불러오기
    async getPostsPage({search, category}){
        try {
            const res = await axios.post(`http://localhost:3001/post/getposts/page`,{
                search,
                category
            });
            return res.data.result;
        }
        catch(e) {
            console.log(e);
            // alert
            return;
        }
    }

    // 숙소 정보 불러오기
    async getPostsRead({nowpage, search, category}){
        try{
            const res = await axios.post(`http://localhost:3001/post/getposts/page/read`,{
                nowpage,
                search,
                category
            });
            // 기존 db 방식일 때 
            /*
            const posts = res.data.result.map(v => {
                const main_image_link = `data:${v.main_image.contentType};base64,${v.main_image.data}`;
                const sub_image_links = v.sub_images ? v.sub_images.map(i => `data:${i.contentType};base64,${i.data}`) : [];
                return {
                    ...v,
                    main_image_link,
                    sub_image_links
                } 
            });
            */
            console.log(res.data);
            return /*posts*/ res.data.result;
        } catch (e) {
            console.log(e);
            // alert
            return;
        }
    }
}

const mainPostLoad = new MainPostLoad();
export default mainPostLoad;