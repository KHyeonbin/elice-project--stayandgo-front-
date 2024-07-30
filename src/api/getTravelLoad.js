import axios from 'axios';

class GetTravelLoad {
    // 페이지 정보 불러오기
    async getReservePage({mymode}){
        try {
            const res = await axios.post(`http://localhost:3001/reserve/getreserve/page`,{
                mymode
            }, {
                withCredentials: true // 쿠키를 포함시키기 위해 필요
            });
            return res.data.result;
        }
        catch(e) {
            console.log(e);
            return;
        }
    }

    // 숙소 정보 불러오기
    async getReserveRead({nowpage, mymode}){
        try{
            const res = await axios.post(`http://localhost:3001/reserve/getreserve/page/read`,{
                mymode, nowpage
            }, {
                withCredentials: true // 쿠키를 포함시키기 위해 필요
            });
            return /*posts*/ res.data.result;
        } catch (e) {
            console.log(e);
            return;
        }
    }
}

const getTravelLoad = new GetTravelLoad();
export default getTravelLoad;