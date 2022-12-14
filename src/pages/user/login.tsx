import LoginForm from "components/organisms/user/LoginForm";
import Layout from "components/template/Layout";
import React from "react";

const UserLoginPage = () => {
  return (
    <Layout title="ログイン">
      <LoginForm />
    </Layout>
  );
};

export default UserLoginPage;
