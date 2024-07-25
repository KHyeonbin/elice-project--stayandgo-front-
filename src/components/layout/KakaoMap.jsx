import React, { useEffect, useState } from "react";
import axios from "axios";

const KakaoMap = () => {
  useEffect(() => {
    // 카카오맵 스크립트 추가
    const mapScript = document.createElement("script");
    mapScript.async = true;
    mapScript.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=b27bdfb85b1124cb1f51e1859cd1da16&autoload=false`;
    document.head.appendChild(mapScript);

    const locationKeyword = "경복궁";

    const response = axios.get(
      `https://dapi.kakao.com/v2/local/search/keyword.${locationKeyword}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "KakaoAK d4e0adae8bfeddb6ca502b3fcaf81599",
        },
      }
    );

    console.log(response);

    const onLoadKakaoMap = () => {
      window.kakao.maps.load(() => {
        const mapContainer = document.getElementById("map");
        const mapOption = {
          center: new window.kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표
          level: 3, // 지도의 확대 레벨
        };
        new window.kakao.maps.Map(mapContainer, mapOption);
      });
    };
    mapScript.addEventListener("load", onLoadKakaoMap);
  }, []);

  return <div id="map" style={{ width: "100%", height: "100%" }}></div>;
};

export default KakaoMap;
