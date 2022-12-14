import RegisterForm from 'components/organisms/user/RegisterForm'
import Layout from 'components/template/Layout'
import React from 'react'

const UserCreatePage = () => {
  return (
    <Layout title="新規会員登録">
      <RegisterForm />
    </Layout>
  );
}

export default UserCreatePage
