export interface MyAccReserveModalProps {
    message: string;
    onConfirm: () => void;
    onCancel: () => void;
  }

export interface MyAccModalProps {
    modalImageIndex: number;
    setModalImageIndex: React.Dispatch<React.SetStateAction<number>>;
    closeModal: () => void;
    author: string;
    imageUrls: string[];
    title: string;
    adult: number;
    child: number;
    baby: number;
    amount: number;
    create_at: string;
  }

export interface MyAccReserveCardProps {
    id: string;
    title: string;
    main_image: string;
    sub_images?: string[];
    author: string;
    startDate: string;
    endDate: string;
    adult: number;
    child: number;
    baby: number;
    amount: number;
    create_at: string;
    onCheckboxChange?: (id: string) => void;
    isChecked: boolean;
    showCheckbox: boolean;
  }

export interface ReserveData {
    _id: string;
    title: string;
    author: { name: string };
    start_date: string;
    end_date: string;
    amount: number;
    main_image: string;
    sub_images: string[];
    adult: number;
    child: number;
    baby: number;
    create_at: string;
    nanoid: string; 
    onCheckboxChange?: (id: string) => void
  }

export interface MyAccCategoryProps {
  title: string;
  reserveData: ReserveData[];
  NoAccReserve: JSX.Element;
  onDataUpdate: () => Promise<void>;
  page: { page: number; perPage: number; total: number; totalPage: number };
  setPage: React.Dispatch<React.SetStateAction<{ page: number; perPage: number; total: number; totalPage: number }>>;
}