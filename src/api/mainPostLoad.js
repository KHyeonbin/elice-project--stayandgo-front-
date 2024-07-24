import axios from 'axios';

class MainPostLoad {
    // 페이지 정보 불러오기
    async getPostsPage({search, category}){
        try {
            const res = await axios.post(`http://172.30.1.15:3001/post/getposts/page`,{
                search: search && search.is_start === true ? search : [],
                category
            });
            return res.data.result;
        }
        catch(e) {
            console.log(e);
            return;
        }
    }

    // 숙소 정보 불러오기
    async getPostsRead({nowpage, search, category}){
        try{
            const res = await axios.post(`http://172.30.1.15:3001/post/getposts/page/read`,{
                nowpage,
                search: search && search.is_start === true ? search : [],
                category
            });
            const posts = res.data.result.map(v => {
                const main_image_link = `data:${v.main_image.contentType};base64,${v.main_image.data}`;
                const sub_image_links = v.sub_images ? v.sub_images.map(i => `data:${i.contentType};base64,${i.data}`) : [];
                return {
                    ...v,
                    main_image_link,
                    sub_image_links
                } 
            });
            return posts;
        } catch (e) {
            console.log(e);
            return;
        }
    }
}

const mainPostLoad = new MainPostLoad();
export default mainPostLoad;