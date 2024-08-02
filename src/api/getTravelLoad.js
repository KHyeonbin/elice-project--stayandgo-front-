import axios from 'axios';

class GetTravelLoad {
    // 지난 여행 페이지 정보 불러오기
    async getReservePastPage({mymode}){
        try {
            const res = await axios.post(`http://localhost:3001/reserve/getreservepast/page`,{
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

    // 지난 여행 리스트 정보 불러오기
    async getReservePastRead({nowpage, mymode}){
        try{
            const res = await axios.post(`http://localhost:3001/reserve/getreservepast/page/read`,{
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

    // 다가오는 여행 페이지 정보 불러오기
    async getReserveUpcomingPage({mymode}){
        try {
            const res = await axios.post(`http://localhost:3001/reserve/getreserveupcoming/page`,{
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

    // 지난 여행 리스트 정보 불러오기
    async getReserveUpcomingRead({nowpage, mymode}){
        try{
            const res = await axios.post(`http://localhost:3001/reserve/getreserveupcoming/page/read`,{
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