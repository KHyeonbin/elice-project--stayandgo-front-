import React, { useEffect } from "react";

const KakaoMap = () => {
  useEffect(() => {
    // Kakao Maps API 스크립트를 동적으로 추가
    const script = document.createElement("script");
    script.async = true;
    script.src =
      "https://dapi.kakao.com/v2/maps/sdk.js?appkey=b27bdfb85b1124cb1f51e1859cd1da16&autoload=false";
    document.head.appendChild(script);

    script.onload = () => {
      // Kakao Maps API 로드 후 실행할 함수
      if (window.kakao && window.kakao.maps) {
        window.kakao.maps.load(() => {
          const mapContainer = document.getElementById("map"); // 지도를 표시할 div
          const mapOption = {
            center: new window.kakao.maps.LatLng(37.5665, 126.978), // 지도의 중심 좌표
            level: 3, // 지도의 확대 레벨
          };

          // 지도를 생성합니다
          const map = new window.kakao.maps.Map(mapContainer, mapOption);

          // 마커가 표시될 위치입니다
          const markerPosition = new window.kakao.maps.LatLng(37.5665, 126.978);

          // 마커를 생성합니다
          const marker = new window.kakao.maps.Marker({
            position: markerPosition,
          });

          // 마커가 지도 위에 표시되도록 설정합니다
          marker.setMap(map);
        });
      } else {
        console.error("Kakao Maps script failed to load.");
      }
    };

    script.onerror = () => {
      console.error("Kakao Maps script failed to load.");
    };

    // Cleanup function to remove the script when the component unmounts
    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return <div id="map" style={{ width: "100%", height: "500px" }}></div>;
};

export default KakaoMap;
