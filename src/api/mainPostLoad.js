import axios from 'axios';

class MainPostLoad {
    // 처음 메인 페이지 진입 시 전체 숙소, 페이지네이션 값 불러오기 (1page, not category)
    async importAll({nowpage}){
        const res = await axios.get(`http://localhost:3001/post/getallposts/${nowpage}`);
        const posts = res.data.posts.map(v => {
            const main_image_link = `data:${v.main_image.contentType};base64,${v.main_image.data}`;
            const sub_image_links = v.sub_images ? v.sub_images.map(i => `data:${i.contentType};base64,${i.data}`) : [];
            return {
                ...v,
                main_image_link,
                sub_image_links
            } 
        });
        const page = {
            page: res.data.page,
            perPage: res.data.perPage,
            total: res.data.total,
            totalPage: res.data.totalPage
        }
        const data = {
            posts: posts,
            page: page
        }
        return data;
    }
}

const mainPostLoad = new MainPostLoad();
export default mainPostLoad;