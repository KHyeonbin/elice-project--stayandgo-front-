export interface User {
    is_logined: boolean;
    id?: string;
    email: string;
    name: string;
    nickname: string;
    phone?: string;
    photo?: string;
    password?: string;
    is_admin: boolean;
    nanoid?: string;
    create_at?: string;
    update_at?: string;
  }

export interface ProfileModalProps {
    message: string;
    onClose?: () => void;
    onConfirm?: () => void;
    onCancel?: () => void;
    isDelete?: boolean;
  }
  
export interface ProfileInputProps {
    type: string;
    name: string;
    value: string;
    placeholder?: string;
    required?: boolean;
    onChange?: React.ChangeEventHandler<HTMLInputElement>;
    maxLength?: number
    disabled?: boolean;
    error?: string;
  }

export interface EmojiModalProps {
    onSelect: (emoji: string) => void;
    onClose: () => void;
}

export interface QnA {
    question: string;
    answer: string;
    followUp?: string[];
}

export interface Message {
    text: string;
    isUser: boolean;
    isFirstMessage?: boolean;
    followUp?: string[];
}

export interface UserData {
    email: string;
    password: string;
    passwordCheck: string;
    name: string;
    nickname: string;
    phone: string;
    photo: string;
  }