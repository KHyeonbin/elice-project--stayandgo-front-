import React, { useEffect, useRef, useState } from "react";
import SubHeader from "../components/layout/SubHeader";
import Footer from "../components/layout/MainFooter";
import styled from "styled-components";
import addImg from '../assets/icons/addImg.png';
import Select from 'react-select';
import {Checkbox} from 'antd';
import { myPostUpload } from "../api/myPostUpload";
import ReservationModal from "../components/reservation/ReservationModal";
import {optionsRoomArr, personArr, childArr, mainLocationArr} from '../util/data/arrayStaticData';

const Container = styled.div`
    width: 100%;
`

const ImageUploadForm = styled.form`
    width: 100%;
    height: 2900px;
    background-color: white;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
`
// input element 를 숨기고 label 로 대신 기능을 받음 (id <=> for)
// 파일 선택, 선택된 파일 없음 숨기기 위함
const ImageUploadLabel = styled.label.attrs(props => ({
    style: {
        backgroundImage: props.$isUpload === true ? `url(${props.$newImg})` : `url(${addImg})`,
        backgroundSize: props.$isUpload === true ? "cover" : "auto",
        cursor: props.$isUpload === true ? "none" : "pointer",
    }
}))`
    width: 100%;
    height: 300px;
    display: flex;
    justify-content: center;
    align-items: center;

    background-color:#D9D9D9;
    background-position: center;
    background-repeat: no-repeat;

    position: relative;
`
const MainImageSpan = styled.span.attrs(props => ({
    style: {
        display: props.$isUpload === true ? "none" : "block"
    }
}))`
    position: absolute;
    margin-top: 200px;
    color: #E61E51;
    opacity: 0.6;
    font-size: 22px;
    font-weight: bold;
`
const SubImageUploadLabel = styled.label`
    width: 90%;
    height: 50px;
    border: none;
    border-radius: 10px;
    font-size: 15px;
    background-color: #f87878;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    transition: background-color 1s;

    &:hover{
        background-color: #F0586F;
    }

    &:focus {
        outline: none;
    }
`

const ShortInputText = styled.input`
    width: 92%;
    height: 50px;
    border: 1px solid #EBEBEB;
    border-radius: 20px;
    padding: 0 20px 0 20px;
    font-size: 14px;
    // 텍스트가 input 길이 초과 시 숨기기 / 줄바꿈을 사용 안 함 / ... 표시
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;

    &:focus{
        outline-color: #f87878;
    }
`
const OutlineDiv = styled.div`
    width: 90%;
    margin-top: 10px;
    border-bottom: 2px solid #EBEBEB;
`
const InputDiv = styled.div`
    width: 100%;
    padding-left: 5%;
    display: flex;
    flex-direction: column;
    gap: 12px;
`
const InputTitle = styled.span`
    font-size: 21px;
    font-weight: 500;
`
const InputSubTitle = styled.span`
    font-size: 16px;
    font-weight: 400;
`

// react-select css
const selectCustom = {
    option: (provided, state) => {
        let backgroundColor = 'white';
        let color = '#333';
        if(state.isSelected){
            backgroundColor = '#F0586F';
            color = 'white';
        } else if(state.isFocused){
            backgroundColor = '#F07C8C';
            color = 'white';
        }
    return {
      ...provided,
      backgroundColor,
      color,
      padding: 20,
      borderRadius: "5px"
    }},
    control: (provided) => ({
      ...provided,
      border: "1px solid #EBEBEB",
      borderRadius: "10px",
      boxShadow: 'none',
      width: "95%",
      fontSize: "14px"
    }),
    menu: (provided) => ({
      ...provided,
      borderRadius: "10px",
      width: "90%"
    }),
    singleValue: (provided) => ({
      ...provided,
      color: '#333',
    }),
};

// antd 체크박스 그룹 css style 정의
const CategoryCheckbox = styled(Checkbox.Group)`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 10px;

    // 체크박스에 아이콘 붙이기 위한 css
    .ant-checkbox-wrapper {
        display: flex;
        align-items: center;
        text-align: center;
    }
    
    // 체크박스 안 icon css
    .icon {
        width: 20px;
        height: 20px;
        background-size: cover;
        background-position: center;
    }
`
const CategoryCheckboxOption = styled(Checkbox)`
    // 체크'박스' css 
    .ant-checkbox-input:checked + .ant-checkbox-inner {
        background-color: #E61E51;
        border: 1px solid #F0586F;
    }
`
const InputTextArea = styled.textarea`
    width: 95%;
    height: 350px;
    border: 1px solid #EBEBEB;
    border-radius: 20px;
    padding: 20px;
    font-size: 16px;
    // 드래그로 크기 수정 못하게
    resize: none;
    
    &:focus{
        outline-color: #f87878;
    }
`

const SubmitButton = styled.button`
    width: 90%;
    height: 50px;
    border: none;
    border-radius: 15px;
    cursor: pointer;

    background-color: #f87878;
    color: white;
    transition: background-color 1s;

    &:hover{
        background-color: #F0586F;
    }
`

const PostUpload = () => {
    // 등록 데이터 state
    const [data, setData] = useState({
        main_image: "",
        sub_images: [], // [string]
        title: "",
        room_num: 1, // number
        max_adult: 1, // number
        max_child: 0, // number
        max_baby: 0, // number
        price: 1000, // number
        main_location: "서울",
        sub_location: "",
        contents: "",
        category: [], // [string]
        host_intro: ""
    }); 
    
    // 첨부된 images 이름 state
    const [imageName, setImageName] = useState({
        main_image: "",
        sub_images: ""
    });
    // main_image 가 업로드 된 상태, 라벨에 넣을 배경 이미지 상태, URL 해제
    const [isUpload, setIsUpload] = useState(false);
    const [labelBackground, setLabelBackground] = useState('');
    useEffect(() => {
        return () => {
            if(labelBackground){
                URL.revokeObjectURL(labelBackground);
            }
        };
    }, [labelBackground]);
    
    
    // 방 갯수 state
    // 방 갯수 옵션 상태 정의
    const optionsRoom = optionsRoomArr.map((v) => {
        return {value: v, label: v};
    });
    const [optionRoom, setOptionRoom] = useState(optionsRoom[0]);

    // 어른/어린이/아기 state
    // 인원 수 옵션 상태 정의
    const optionsPerson = personArr.map((v) => {
        return {value: v, label: v};
    });
    const optionsChild = childArr.map((v) => {
        return {value: v, label: v};
    });
    const optionsBaby = childArr.map((v) => {
        return {value: v, label: v};
    });
    const [optionPerson, setOptionPerson] = useState(optionsPerson[0]);
    const [optionChild, setOptionChild] = useState(optionsChild[0]);
    const [optionBaby, setOptionBaby] = useState(optionsBaby[0]);

    // 주요 행정구역 옵션 상태 정의
    const optionsMainLocation = mainLocationArr.map((v) => {
        return {value: v, label: v};
    });
    const [optionMainLocation, setoptionMainLocation] = useState(optionsMainLocation[0]);

    // model 팝업 띄우기 위한 상태
    const [showFinishModal, setshowFinishModal] = useState(false);

    // 숙소 이름 data 반영
    const onChangeTitle = (e) => {
        setData((current) => {
            const newData = {...current};
            newData.title = e.target.value;
            return newData;
        });
    };

    // 메인이미지 file input 변경 시 적용
    const onChangeFiles = (e) => {
        // 모든 파일이 이미지 파일이 아닐 때 오류 반환 및 종료
        if(e.target.files && e.target.files.length > 0){
            const filesNameArray = Array.from(e.target.files);
            const notImages = filesNameArray.filter(
                v => {
                    const extension = v.name.split('.').pop().toLowerCase();
                    return !['jpg', 'png', 'jpeg'].includes(extension);
            });
            if(notImages && notImages.length > 0){
                alert("이미지 파일만(jpg, png, jpeg) 첨부할 수 있습니다.");
                return;
            }
            if(filesNameArray.length > 1){
                alert("메인 이미지는 한 장만 첨부할 수 있습니다!");
                return;
            }
    
            setImageName((current) => {
                const newName = {...current};
                newName.main_image = filesNameArray[0].name;
                return newName;
            });

            // label 배경 입히기 선작업
            setIsUpload(true);
            const labelUrl = URL.createObjectURL(e.target.files[0]);
            setLabelBackground(labelUrl);
            
            setData((current) => {
                const newData = {...current};
                newData.main_image = e.target.files;
                return newData;
            });
        }
        return;
    };
    // 서브이미지 변경 시 적용
    const onChangeSubFiles = (e) => {
        if(e.target.files && e.target.files.length > 0){
            const filesNameArray = Array.from(e.target.files);
            const notImages = filesNameArray.filter(
                v => {
                    const extension = v.name.split('.').pop().toLowerCase();
                    return !['jpg', 'png', 'jpeg'].includes(extension);
            });
            if(notImages && notImages.length > 0){
                alert("이미지 파일만(jpg, png, jpeg) 첨부할 수 있습니다.");
                return;
            }
            if(filesNameArray.length >= 5){
                alert("서브 이미지는 5장 이내로 첨부할 수 있습니다!");
                return;
            }
    
            setImageName((current) => {
                const newName = {...current};
                const subImagesNames = filesNameArray.map(v => v.name);
                newName.sub_images = subImagesNames;
                return newName;
            });
            
            setData((current) => {
                const newData = {...current};
                newData.sub_images = e.target.files;
                return newData;
            });
        }
        return;
    }
    

    // 방 갯수 상태 및 data 상태 변경
    const onChangeSelectRoom = (e) => {
        setOptionRoom(e);
        setData((current) => {
            const newData = {...current};
            newData.room_num = Number(e.value[0]);
            return newData;
        });
    };

    // 어른 옵션 상태 및 data 상태 변경
    const onChangeSelectPerson = (e) => {
        setOptionPerson(e);

        setData((current) => {
            const newData = {...current};
            newData.max_adult = Number(e.value.slice(0, e.value.indexOf("명")));
            return newData;
        });
    };
    // 어린이 옵션 상태 및 data 상태 변경
    const onChangeSelectChild = (e) => {
        setOptionChild(e);

        setData((current) => {
            const newData = {...current};
            newData.max_child = Number(e.value.slice(0, e.value.indexOf("명")));
            return newData;
        });
    };
    // 유아 옵션 상태 및 data 상태 변경
    const onChangeSelectBaby = (e) => {
        setOptionBaby(e);

        setData((current) => {
            const newData = {...current};
            newData.max_baby = Number(e.value.slice(0, e.value.indexOf("명")));
            return newData;
        });
    }
    
    // 카테고리 상태 값 및 data 상태 변경
    const onChangeCategory = (e) => {
        if(e.length > 3){
            alert("카테고리는 최대 3개까지 지정 가능합니다!");
            return;
        }
        setData((current) => {
            const newData = {...current};
            newData.category = e;
            return newData;
        });
    };
    // mainCatetory 디렉토리 이미지 가져오기
    const importAllImages = (v) => {
        return v.keys().map((key) => ({
            src: v(key),
            name: key.match(/[^/]+$/)[0], // 파일 이름만 추출
          }));
    };
    const images = importAllImages(require.context('../assets/icons/mainCategory', false, /\.(png|jpe?g)$/));
    // 파일 이름 순으로 정렬
    const sortedImages = images.sort((a, b) => {
        const aNumber = parseInt(a.name.split('_')[0], 10);
        const bNumber = parseInt(b.name.split('_')[0], 10);
        return aNumber - bNumber;
    });
    const notAllSortedImages = sortedImages.slice(1, sortedImages.length);
    const optionValues = ['멋진 수영장', '한적한 시골', '해변 근처', '캠핑장', '한옥', '최고의 전망', '산 근처', '방', '호수 근처'
        ,'통나무집', '캠핑카', '특이한 숙소', '농장', '디자인', '섬', '예술 공간'];
    const optionIcons = notAllSortedImages;
    const optionWithIcon = optionValues.map((v, i) => ({label: v, value: v, icon: optionIcons[i].src}));

    // 숙소 소개 data 상태 반영
    const onChangeContents = (e) => {
        setData((current) => {
            const newData = {...current};
            newData.contents = e.target.value;
            return newData;
        });
    };

    // 숙소 주요 위치 option 및 data 상태 반영
    const onChangeMainLocation = (e) => {
        setoptionMainLocation(e);
        
        setData((current) => {
            const newData = {...current};
            newData.main_location = e.value;
            return newData;
        });
    }
    
    // 숙소 상세 주소 data 상태 반영
    // 다음 주소 api load 와 컴포넌트 언마운트 시 정리 작업
    const onClickSubLocation = () => {
        // 스크립트 동적 로드
        const script = document.createElement('script');
        script.src = '//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js';
        script.async = true;
        document.body.appendChild(script);
    
        // 스크립트 로드 후 실행 함수
        script.onload = () => {
          if (window.daum) {
            window.daum.postcode.load(() => {
              new window.daum.Postcode({
                oncomplete: function(data) {
                  // 주소를 선택했을 때 호출 함수
                  setData((current) => {
                    const newData = {...current};
                    newData.sub_location = data.address;
                    return newData;
                  });
                }
              }).open();
            });
          }
        }
        return () => {
          document.body.removeChild(script);
        };      
    }
    
    // 숙소 가격 입력 data 반영 전 유효성 검사(1000 단위 검사)
    // 1. 입력한 문자에서 숫자만 추출
    // 2. 끝 자리 자동으로 1000 단위로 강제 변경
    // 3. 수정된 string은 숫자로 변경 후 data 반영
    const onChangePrice = (e) => {
        // 1. 입력한 문자에서 숫자만 추출
        const inputPrice = e.target.value.replace(/[^0-9]/g, '').toString();
        if(inputPrice.length >= 4){
            // 2. 끝 자리 자동으로 1000 단위로 강제 변경
            const convert1000EndPrice = "000";
            const remain1000Price = inputPrice.slice(0, inputPrice.length - 3);
            const returnDataPrice = `${remain1000Price}${convert1000EndPrice}`;
            
            // 5 억 이상일 경우 차단
            if(Number(returnDataPrice) >= 500000000){
                alert("5억 원 이상으로 설정은 불가합니다.");
                return;
            }

            // 3. 수정된 string은 숫자로 변경 후 data 반영
            setData((current) => {
                const newData = {...current};
                newData.price = Number(returnDataPrice);
                return newData;
            });

            e.target.value = e.target.value.replace(/[^0-9]/g, '').toString();
        }
    };
    // input 필드 벗어날 때 input value 교체
    const onBlurPrice = (e) => {
        e.target.value = data.price;
    }

    // 호스트 소개 data 반영
    const onChangeHostIntro = (e) => {
        setData((current) => {
            const newData = {...current};
            newData.host_intro = e.target.value;
            return newData;
        });
    };

    // 등록 하기 !
    // form submit 시 formData 생성해서 formData에 입력 정보를 대입 후 백엔드로 전송 및 응답 요청
    const onSubmitPost = async (e) => {
        e.preventDefault();

        if(!data.main_image || !data.title || data.price < 1000 || !data.main_location
            || !data.sub_location || !data.contents || !data.host_intro){
                alert("입력이 누락되거나 잘못된 항목을 확인해주세요.");
                return;
        }
        // 카테고리가 없을 때는 서버에서 판단하여 "전체" 로 넣어줌


        // formdata 생성 및 데이터 추가
        const formData = new FormData();
        // 파일들을 'images'라는 필드 이름으로 추가 (서버에는 images 에 main 첫번째 나머지 subimage로 들어가야 함)
        // 백엔드에서 main_image <-> sub_images 분리시킴
        formData.append('images', data.main_image[0]);
        for (let i = 0; i < data.sub_images.length; i++) {
            formData.append('images', data.sub_images[i]);
        }
        if(data.category.length > 0){
            for (let k = 0; k < data.category.length; k++) {
                formData.append('category', data.category[k]);
            }
        } else {
            // category 가 없을 시 서버에서 length 확인 후 "전체" 로 삽입
            formData.append('category', data.category);
        }
        formData.append('title', data.title);
        formData.append('max_adult', data.max_adult);
        formData.append('max_child', data.max_child);
        formData.append('max_baby', data.max_baby);
        formData.append('price', data.price);
        formData.append('main_location', data.main_location);
        formData.append('sub_location', data.sub_location);
        formData.append('contents', data.contents);
        formData.append('room_num', data.room_num);
        formData.append('host_intro', data.host_intro);
        
        myPostUpload(formData)
        .then(res => {
            console.log(res)
            if(res.data.code === 200){
                // 성공 모달 창을 띄우며 메인 페이지로 이동(모달 및 메인 페이지 이동은 ~Modal 컴포넌트 활용)
                setshowFinishModal(true);
            } else {
                alert(res.data.message);
            }
        }); 
    };

    // enter 클릭 시에는 폼이 제출되지 않음.
    const onHandleEnter = (e) => {
        if(e.key === "Enter"){
            e.preventDefault();
        }
    }

    console.log(data, imageName)

    return (
        <Container>
            <SubHeader/>
                <ImageUploadForm onSubmit={onSubmitPost} onKeyDown={onHandleEnter}>
                    <ImageUploadLabel htmlFor="inputFileOne" $isUpload={isUpload} $newImg={labelBackground}>
                        <MainImageSpan $isUpload={isUpload}>숙소 대표 이미지를 추가하세요 !</MainImageSpan>
                    </ImageUploadLabel>
                    <input type="file" id="inputFileOne" style={{display:"none"}} onChange={onChangeFiles} />
                    <ShortInputText placeholder="대표 이미지를 첨부해주세요." value={imageName.main_image} disabled />
                    <OutlineDiv />
                    <SubImageUploadLabel htmlFor="inputFiles">추가 숙소 이미지 등록</SubImageUploadLabel>
                    <input type="file" id="inputFiles" style={{display:"none"}} multiple onChange={onChangeSubFiles} />
                    <ShortInputText placeholder="추가 이미지를 첨부해주세요. 최대 4장" value={imageName.sub_images} disabled />
                    <OutlineDiv />
                    <InputDiv>
                        <InputTitle>숙소 이름</InputTitle>
                        <ShortInputText onChange={onChangeTitle} maxLength="20" placeholder="숙소 이름을 작성해주세요. 20자 이내" />
                    </InputDiv>    
                    <OutlineDiv />
                    <InputDiv>
                        <InputTitle>옵션</InputTitle>
                        <InputSubTitle>객실 갯수</InputSubTitle>
                        <Select styles={selectCustom} options={optionsRoom} onChange={onChangeSelectRoom} value={optionRoom} />
                        <InputSubTitle>최대 인원(어른: 17세 이상)</InputSubTitle>
                        <Select styles={selectCustom} options={optionsPerson} onChange={onChangeSelectPerson} value={optionPerson} />
                        <InputSubTitle>최대 인원(어린이: 7~16세)</InputSubTitle>
                        <Select styles={selectCustom} options={optionsChild} onChange={onChangeSelectChild} value={optionChild} />
                        <InputSubTitle>최대 인원(유아: ~ 6세)</InputSubTitle>
                        <Select styles={selectCustom} options={optionsBaby} onChange={onChangeSelectBaby} value={optionBaby} />
                        <InputSubTitle>숙소 카테고리 선택(최대 3개)</InputSubTitle>
                        <CategoryCheckbox value={data.category} onChange={onChangeCategory}>
                            {optionWithIcon.map((v, i) => (
                                <CategoryCheckboxOption key={i} value={v.value}>
                                <div className="icon" style={{ backgroundImage: `url(${v.icon})` }} />
                                {v.label}
                                </CategoryCheckboxOption>
                            ))}
                        </CategoryCheckbox>
                    </InputDiv>
                    <OutlineDiv />
                    <InputDiv>
                        <InputTitle>숙소 소개</InputTitle>
                        <InputTextArea onChange={onChangeContents} maxLength="1000" placeholder="숙소를 자세히 소개해주세요! (1000자)" />
                    </InputDiv>
                    <OutlineDiv />
                    <InputDiv>
                        <InputTitle>숙소 위치</InputTitle>
                        <InputSubTitle>주요 위치</InputSubTitle>
                        <Select styles={selectCustom} options={optionsMainLocation} onChange={onChangeMainLocation} value={optionMainLocation} />
                        <InputSubTitle>상세 위치</InputSubTitle>
                        {/* 커서 투명화 css 추가 */}
                        <ShortInputText id="inputSubLocation" placeholder="상세 주소를 입력해주세요." onClick={onClickSubLocation} value={data.sub_location} style={{caretColor: "transparent"}} readOnly />
                    </InputDiv>
                    <OutlineDiv />
                    <InputDiv>
                        <InputTitle>숙소 가격 (성인 기준)</InputTitle>
                        <InputSubTitle>성인: 1인 1박 가격<br />어린이: 성인의 50% 가격<br/>유아:   성인의 20% 가격으로 반영</InputSubTitle>
                        <ShortInputText type="number" placeholder="1,000원 단위로 숫자만 입력됩니다." onChange={onChangePrice} onBlur={onBlurPrice}/>
                    </InputDiv>
                    <OutlineDiv />
                    <InputDiv>
                        <InputTitle>호스트 소개</InputTitle>
                        <InputTextArea maxLength="500" placeholder="호스트님에 대해 소개해 주세요. 500자 이내" onChange={onChangeHostIntro} />
                    </InputDiv>
                    <OutlineDiv />
                    <SubmitButton>등록</SubmitButton>
                </ImageUploadForm>
            <Footer/>
            {showFinishModal && <ReservationModal message="숙소 등록이 완료되었습니다 !"
                onClose={() => setshowFinishModal(false)} />}
        </Container>
    );
};

export default PostUpload;