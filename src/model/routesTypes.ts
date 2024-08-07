export type routesType = {
    search: search;
    setSearch: React.Dispatch<React.SetStateAction<search>>;
    startSearch: search; 
    setStartSearch: React.Dispatch<React.SetStateAction<search>>;
}

// 전역 타입으로 지정해야 할듯..
export type search = {
    city: string;
    startDate: string;
    endDate: string;
    adult: number;
    child: number;
    baby: number;
}