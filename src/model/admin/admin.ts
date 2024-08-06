export interface User {
    email: string;
    name: string;
    nickname: string;
    phone: string;
    photo: string;
    is_admin: boolean;
    create_at: string;
    update_at: string;
}

export interface UserDetailType extends User {
    isAdmin: boolean;
}