import React from 'react'
import Admin from "./Admin"
import SubLayout from "../layout/SubLayout"

const AdminPage = () => {
    return (
        <>
        <SubLayout pageTitle="관리자 페이지">
            <Admin />
        </SubLayout>
    </>
    )
}

export default AdminPage;