import React, { useState } from 'react';
import styled from "styled-components";

const QnAButtonContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin-top: 15px;
`;

const QnAButton = styled.button`
    padding: 10px;
    border: none;
    background: #f87878;
    border-radius: 10px;
    color: white;
    cursor: pointer;
`;

const ChatContainer = styled.div`
    display: flex;
    flex-direction: column;
    height: 70vh;
    overflow-y: auto;
    margin-top: 30px;
`;

const ChatMessage = styled.div`
    margin: 5px 0;
    padding: 10px;
    background-color: ${props => (props.$isUser ? "black" : "#eee")};
    color: ${props => (props.$isUser ? "white" : "black")};
    border-radius: 10px;
    align-self: ${props => (props.$isUser ? "flex-end" : "flex-start")};
    position: relative;
`;

const ChatBotName = styled.div`
    font-weight: bold;
    position: absolute;
    top: -25px;
    left: 5px;
    color: #f87878;
`;

const QnAData = [
    { question: "예약 방법을 알고 싶어요", answer: "예약 방법은 다음과 같습니다..." },
    { question: "취소 정책을 알고 싶어요", answer: "취소 정책은 다음과 같습니다..." },
    { question: "기타 문의", answer: "기타 문의는 다음과 같습니다..." },
    { question: "숙소 이용 규칙", answer: "숙소 이용 규칙은 다음과 같습니다..." },
    { question: "회원 탈퇴 방법", answer: "회원 탈퇴 방법은 다음과 같습니다..." }
];

const ChatBot = () => {
    const [messages, setMessages] = useState([]);

    const handleQnAMessage = (question, answer) => {
        const newMessages = [...messages, { text: question, isUser: true }, { text: answer, isUser: false }];
        setMessages(newMessages);
    };

    return (
        <div>
            <div>
                <h2>안녕하세요!</h2>
                <h2>무엇이 궁금하신가요?</h2>
            </div>
            <QnAButtonContainer>
                {QnAData.map((qna, index) => (
                    <QnAButton key={index} onClick={() => handleQnAMessage(qna.question, qna.answer)}>
                        {qna.question}
                    </QnAButton>
                ))}
            </QnAButtonContainer>
            <ChatContainer>
                {messages.map((msg, index) => (
                    <ChatMessage key={index} $isUser={msg.isUser}>
                        {!msg.isUser && <ChatBotName>stay_and_go ✈️</ChatBotName>}
                        {msg.text}
                    </ChatMessage>
                ))}
            </ChatContainer>
        </div>  
    );
};

export default ChatBot;
