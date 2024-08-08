import React, { useEffect, useRef, useState } from 'react';
import styled from "styled-components";
import { QnA, Message } from "../../model/profile/profile"

const ChatBotHeader = styled.div`
    margin-bottom: 15px;
`;

const QnAButtonContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    padding-bottom: 20px;
`;

const QnAButton = styled.button`
    padding: 10px;
    margin-bottom: 5px;
    border: none;
    background: #f87878;
    border-radius: 10px;
    color: white;
    cursor: pointer;

    &:hover {
        background-color: #ff6b6b;
    }

    &:active {
        background: #ff4d4d;
    }
`;

const ChatContainer = styled.div`
    display: flex;
    flex-direction: column;
    /* height: 60vh; */
    overflow-y: auto;
    padding-top: 15px;
    border-top: 1px solid #ddd;
`;

const ChatMessage = styled.div<{$isUser:boolean, $isFirstMessage?:boolean}>`
    margin: 15px 0;
    padding: 10px;
    background-color: ${props => (props.$isUser ? "black" : "#eee")};
    color: ${props => (props.$isUser ? "white" : "black")};
    border-radius: 10px;
    align-self: ${props => (props.$isUser ? "flex-end" : "flex-start")};
    position: relative;
    white-space: pre-wrap; // 답변 메세지 내용 자동 줄바꿈
    font-weight: 500;
`;

const ChatBotName = styled.div`
    font-weight: bold;
    position: absolute;
    top: -25px;
    left: 5px;
    color: #f87878;
    font-size: 15px;
`;

const FollowUpContainer = styled.div`
    margin-top: 10px;
`;

const QnAData: QnA[] = [
    {
        question: "예약 방법",
        answer: "숙소 예약 방법은 다음과 같습니다.\n1. 검색창에 원하는 목적지와 날짜를 입력하고 게스트의 인원을 추가해 주세요.\n2. 검색 결과에서 마음에 드는 숙소를 선택합니다.\n3. '예약하기' 버튼을 클릭하면 예약이 확정됩니다.",
        followUp: ["예약 취소"]
    },
    {
        question: "예약 취소",
        answer: "숙소 예약 취소는 다음과 같습니다.\n1. 예약 취소는 하단 탭에서 '여행' 버튼을 클릭하여 다가오는 여행에서 취소할 수 있습니다.\n* 단! 여행(예약) 취소는 여행 시작일 2일 전까지만 가능합니다.",
        followUp: ["예약 방법"]
    },
    {
        question: "체크인/체크아웃 시간",
        answer: "체크인 시간은 오후 3시 이후이며, 체크아웃 시간은 오전 11시까지입니다. 숙소에 따라 시간이 다를 수 있으니 예약 확인서나 숙소 정보를 확인해 주세요."
    },
    {
        question: "편의시설",
        answer: "숙소마다 제공하는 편의시설은 다를 수 있습니다. 일반적으로 무료 Wi-Fi, 조식, 주차장, 수영장, 헬스장 등이 제공될 수 있습니다.\n예약 전에 숙소의 '숙소 소개' 를 확인해 주세요."
    },
    {
        question: "회원 탈퇴",
        answer: "회원 탈퇴는 다음과 같이 진행할 수 있습니다.\n1. 프로필 페이지에서 '회원 탈퇴' 버튼을 클릭합니다.\n2. 탈퇴가 완료되면 모든 데이터가 삭제됩니다."
    },
    {
        question: "기타 다른 문의",
        answer: "기타 다른 문의는 고객센터 이메일을 통해 문의하실 수 있습니다.\n고객센터 이메일은 'stay_and_go@gmail.com' 입니다."
    }
];

const initialMessages = [
    { text: "안녕하세요 ☺️ 'stay_and_go' 이용 관련해서 궁금하신 내용의 버튼을 클릭해 주세요.", isUser: false, isFirstMessage: true }
];

const ChatBot: React.FC = () => {
    const [messages, setMessages] = useState<Message[]>(initialMessages);
    const chatEndRef = useRef<HTMLDivElement>(null); // 마지막 메세지를 참조하기 위해 useRef 사용

    /** 사용자가 질문 버튼 클릭 시 */
    const onClickHandleQnAMessage = (question: string, answer: string, followUp: string[] = []) => {
        const newMessages = [...messages, { text: question, isUser: true }, { text: answer, isUser: false, followUp }];
        setMessages(newMessages);
    };

    /** 처음으로 돌아가기 버튼 클릭 시 */
    const onClickHandleReset = () => {
        setMessages(initialMessages);
    }

    /** 메세지가 추가될 때마다 실행 */
    useEffect(() => {
        if (chatEndRef.current) {
            chatEndRef.current.scrollIntoView({ behavior: 'smooth' }); // 마지막 메세지로 스크롤
        }
    }, [messages]);

    return (
        <div>
            <ChatBotHeader>
                <h2>안녕하세요!</h2>
                <h2>무엇이 궁금하신가요?</h2>
            </ChatBotHeader>
            <QnAButtonContainer>
                {QnAData.map((qna, index) => (
                    <QnAButton key={index} onClick={() => onClickHandleQnAMessage(qna.question, qna.answer, qna.followUp)}>
                        {qna.question}
                    </QnAButton>
                ))}
            </QnAButtonContainer>
            <ChatContainer>
                {messages.map((msg, index) => (
                    <ChatMessage key={index} $isUser={msg.isUser} $isFirstMessage={msg.isFirstMessage}>
                        {!msg.isUser && <ChatBotName>{msg.isFirstMessage ? "🙇🏻‍♂️" : "stay_and_go ✈️"}</ChatBotName>}
                        {msg.text}
                        {!msg.isUser && msg.followUp && msg.followUp.length > 0 && (
                            <FollowUpContainer>
                                {msg.followUp.map((followUpQuestion, i) => (
                                    <QnAButton key={i} onClick={() => {
                                        const followUpData = QnAData.find(qna => qna.question === followUpQuestion);
                                        if (followUpData) {
                                            onClickHandleQnAMessage(followUpQuestion, followUpData.answer, followUpData.followUp);
                                        }
                                    }}>{followUpQuestion}</QnAButton>
                                ))}
                            </FollowUpContainer>
                        )}
                    </ChatMessage>
                ))}
                {messages.length > 1 && (
                    <QnAButtonContainer>
                        <QnAButton onClick={onClickHandleReset}>처음으로 돌아가기</QnAButton>
                    </QnAButtonContainer>
                )}
                <div ref={chatEndRef} />
            </ChatContainer>
        </div>  
    );
};

export default ChatBot;
