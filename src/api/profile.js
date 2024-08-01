import axios from 'axios';

/**  사용자 정보 불러오기 (개인정보 수정 페이지) */
export const fetchEditUserData = async (id) => {
    try {
        const response = await axios.get(`/users/edit/${id}`); // 임시 엔드포인트
        return response.data;
    } catch (error) {
        console.error("사용자 정보를 불러오는데 실패했습니다.");
        throw error;
    }
};

/**  사용자 정보 수정 */
export const editUserData = async (id, data) => {
    try {
        await axios.put(`/users/${id}`, data); // 임시 엔드포인트
    } catch (error) {
        console.error("사용자 정보를 수정하는데 실패했습니다.");
        throw error;
    }
};

/**  유저 데이터 가져오기 (프로필 페이지) */
export const fetchUserData = async () => {
    try {
        const response = await axios.get("/users"); // 임시 엔드포인트
        return response.data;
    } catch (error) {
        console.error("유저의 데이터를 찾을 수 없습니다.", error);
        throw error;
    }
};

/**  회원 탈퇴 */
export const deleteUser = async (id) => {
    try {
        await axios.delete(`users/${id}`); // 임시 엔드포인트
    } catch (error) {
        console.error("회원 탈퇴에 실패했습니다.", error);
        throw error;
    }
};
