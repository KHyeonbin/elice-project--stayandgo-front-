import React from "react";
import SubHeader from "../layout/SubHeader";
import Footer from "../layout/MainFooter";
import styled from "styled-components";

const Container = styled.div`
    width: 100%;
`

const ImageUploadForm = styled.form`
    width: 100%;
    

`



const PostUpload = () => {
    return (
        <Container>
            <SubHeader></SubHeader>

            <Footer></Footer>
        </Container>
    );
};

export default PostUpload;