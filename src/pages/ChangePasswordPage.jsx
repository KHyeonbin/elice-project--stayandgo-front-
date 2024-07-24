import SubLayout from "../components/layout/SubLayout";
import ChangePassword from "../components/account/ChangePassword";

const ChangePasswordPage = () => {
  return (
    <>
      <SubLayout pageTitle="비밀번호 변경">
        <ChangePassword />
      </SubLayout>
    </>
  );
};

export default ChangePasswordPage;
