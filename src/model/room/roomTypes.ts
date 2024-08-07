export type kakaoMapPropsType = {
    address: string,  
    title: string,
    moveup: number
}


export type RoomInfoType = {
    title: string;
    price: string;
    main_image: string;
    main_location: string;
    max_adult: string;
    max_baby: string;
    category: [];
    contents: string;
    sub_location:string;
    author: authorType;
    host_intro: string;
};

export type authorType = {
    photo: string;
    nickname: string;
    name: string;
    email: string;
    phone: string;
};  