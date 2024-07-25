import React from "react";
import SubHeader from "../components/layout/SubHeader";
import Footer from "../components/layout/MainFooter";
import styled from "styled-components";

const Container = styled.div`
    width: 100%;
`

const ImageUploadForm = styled.form`
    width: 100%;
    //
    height: 1000px;
    background-color: yellow;
    display: flex;
    flex-direction: column;
    align-items: center;
`



const SubmitButton = styled.button`
    width: 90%;
    height: 50px;
    border: none;
    border-radius: 15px;

    background-color: #E61E51;
    color: white;
    transition: background-color 1s;

    &:hover{
        background-color: #F0586F;
    }
`

const PostUpload = () => {






    const onSubmitPost = async (e) => {
        e.preventDefault();
        
        const formData = new FormData();
        const files = document.querySelector('input[type="file"]').files;

        // 파일들을 'images'라는 필드 이름으로 추가
        for (let i = 0; i < files.length; i++) {
            formData.append('images', files[i]);
            // formData test 필드에 value 추가
            
        }
        formData.append('test', 'value');
        try {
            const response = await fetch('/upload', {
                method: 'POST',
                body: formData
            });

            
        } catch (e) {
            console.log(e);
        }
        
    }
    // enter 클릭 시에는 폼이 제출되지 않음.
    const onHandleEnter = (e) => {
        if(e.key === "Enter"){
            e.preventDefault();
        }
    }

    return (
        <Container>
            <SubHeader></SubHeader>
                <ImageUploadForm onSubmit={onSubmitPost} onKeyDown={onHandleEnter}>
                    <SubmitButton>등록</SubmitButton>
                </ImageUploadForm>
            <Footer></Footer>
        </Container>
    );
};

export default PostUpload;