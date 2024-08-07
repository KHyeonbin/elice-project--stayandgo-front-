export const PasswordRegex = (password: string): [boolean, boolean, boolean] => {
    const hasLetter = /[a-zA-Z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecialChar = /[^a-zA-Z0-9]/.test(password);

    return [hasLetter, hasNumber, hasSpecialChar];
};

export const PhoneNumberRegex = (phoneNumber: string): string => {
    phoneNumber = phoneNumber.replace(/\D/g, ""); // 문자 입력 제거
    phoneNumber = phoneNumber.replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3"); // 000-0000-0000 형태로 리턴

    return phoneNumber;
};
