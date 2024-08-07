// app.tsx
export type LoginStateType = {
    name: string,
    nickname: string,
    email: string,
    phone: string,
    is_admin: boolean,
    is_logined: boolean,
    photo: string
};
export type SearchType = {
    city: string,
    startDate: string,
    endDate: string,
    adult: number,
    child: number,
    baby: number,
};


// mainPage.tsx
export interface MainPageProps {
    search: SearchType;
    setSearch: React.Dispatch<React.SetStateAction<SearchType>>;
    startSearch: SearchType;
    setStartSearch: React.Dispatch<React.SetStateAction<SearchType>>;
};
export type PageType = {
    page: number,
    perPage: number,
    total: number,
    totalPage: number,
};


// mainHeader.tsx
export interface HeaderProps {
    user: LoginStateType;
    isModal: boolean;
};


// mainFooter.tsx
export interface WebpackRequireContext {
    (id: string): any;
    keys(): string[];
    resolve(id: string): string;
    id: string;
};
export interface ContextImageData {
    src: string;
    name: string;
};


// Pagination.tsx
export interface PagenationProps {
    page: PageType;
    setPage: React.Dispatch<React.SetStateAction<PageType>>;
};
export interface PaginationSpanProps {
    disabled: boolean;
};


// Search.tsx
export interface SearchProps {
    setPage: React.Dispatch<React.SetStateAction<PageType>>;
    search: SearchType;
    setSearch: React.Dispatch<React.SetStateAction<SearchType>>;
    startSearch: SearchType;
    setStartSearch: React.Dispatch<React.SetStateAction<SearchType>>;
    isModal: boolean;
    setIsModal: React.Dispatch<React.SetStateAction<boolean>>;
};
export type optionType = {
    value: string,
    label: string
};
export interface AdultProps {
    $adult: number;
};


// SearchGuestSetting.tsx
export interface SearchGuestSettingProps {
    search: SearchType;
    setSearch: React.Dispatch<React.SetStateAction<SearchType>>;
};
export interface ChildProps {
    $child: number;
};
export interface BabyProps {
    $baby: number;
};


// Category.tsx
export interface CategoryProps {
    setCategory: React.Dispatch<React.SetStateAction<string>>;
    setPage: React.Dispatch<React.SetStateAction<PageType>>;
};


// Items.tsx
export interface ItemsProps {
    page: PageType;
    setPage: React.Dispatch<React.SetStateAction<PageType>>;
    startSearch: SearchType;
    category: string;
};
export interface NoItemProps {
    $main_no_data: string;
};
export interface AuthorInfo {
    email: string,
    name: string,
    nickname: string,
    phone: string,
    photo: string
}
export type PostType = {
    author: string,
    authorInfo: AuthorInfo,
    category: string[],
    contents: string,
    create_at: string,
    createdAt: string,
    updatedAt: string,
    host_intro: string,
    main_image: string,
    main_location: string,
    max_adult: number,
    max_baby: number,
    max_child: number,
    nanoid: string,
    price: number,
    reservations: [],
    room_num: number,
    sub_images: string[],
    sub_location: string,
    title: string,
    update_at: string,
    __v: number,
    _id: string
};


// postUpload.tsx
export interface UploadPostType {
    main_image: File[];
    sub_images: File[];
    title: string;
    room_num: number;
    max_adult: number;
    max_child: number;
    max_baby: number;
    price: number;
    main_location: string;
    sub_location: string;
    contents: string;
    category: string[];
    host_intro: string;
};
export type imageNameType = {
    main_image: string,
    sub_images: string[]
}
export interface ImageUploadSpanProps {
    $isUpload: boolean;
};
export interface ImageUploadLabelProps {
    $isUpload: boolean;
    $newImg: string;
};
export interface CategoryCheckboxProps {
    value: string[],
    onChange: void
};


// OneItem.tsx
export interface OneItemProps {
    v: PostType;
    startSearch: SearchType;
};
export interface ItemBackgroundDivProps {
    $background: string;
};
export interface DotDivProps {
    $dotNum: number;
};
export interface DotProps {
    $index: number;
    $imgIndex: number;
};

// Details.tsx
export interface CSSPropertiesExtended extends React.CSSProperties {
    '--swiper-pagination-bottom'?: string;
    '--swiper-theme-color'?: string;
    '--swiper-pagination-bullet-inactive-color'?: string;
    '--swiper-pagination-bullet-inactive-opacity'?: string;
};