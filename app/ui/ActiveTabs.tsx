"use client"; // 이 파일이 Client Component임을 선언하여 브라우저에서 실행 가능하도록 함

import { useState, useEffect } from "react"; // 상태 관리와 라이프사이클 훅 사용을 위해 react import
import { Button } from "@/components/ui/button"; // 커스텀 Button 컴포넌트 import

interface ActiveTabsProps {
  location: string; // props로 location(명소 이름)을 받음
}

export function ActiveTabs({ location }: ActiveTabsProps) {
  // activeTab 상태: weather, transport, demographics 중 하나를 관리
  const [activeTab, setActiveTab] = useState<
    "weather" | "transport" | "demographics"
  >("weather");
  const [data, setData] = useState<any>(null); // API에서 받은 데이터를 저장할 상태
  const [loading, setLoading] = useState(false); // 로딩 상태 관리

  // API로부터 데이터 fetch하는 함수
  const fetchData = async () => {
    setLoading(true); // 데이터 로드 시작 시 로딩 true
    try {
      const response = await fetch(
        `/api/citydata?location=${encodeURIComponent(location)}`
      ); // citydata API 엔드포인트로 요청, location 쿼리 전송
      const result = await response.json(); // 응답을 JSON으로 파싱
      console.log("Fetched data:", result); // 디버깅용 콘솔 출력
      setData(result); // 받아온 데이터 상태에 저장
    } catch (error) {
      // 요청 실패 시 에러 로그
      console.error("데이터를 가져오는 중 오류가 발생했습니다:", error);
    } finally {
      // 요청 완료 후 로딩 false
      setLoading(false);
    }
  };

  // location 값이 변경될 때마다 fetchData 재호출 (명소가 바뀌면 다시 데이터 로드)
  useEffect(() => {
    fetchData();
  }, [location]);

  // 현재 activeTab 값에 따라 다른 컨텐츠를 렌더링하는 함수
  const renderContent = () => {
    if (!data) return <p>데이터를 로드 중입니다...</p>; // 아직 data 없으면 로딩 메시지 표시

    if (activeTab === "weather") {
      // weather 탭일 경우
      const { WEATHER_TIME, TEMP, HUMIDITY, PM25, PM10 } = data.weather || {};
      return (
        <div>
          <p>날씨 시간: {WEATHER_TIME}</p>
          <p>기온: {TEMP}℃</p>
          <p>습도: {HUMIDITY}%</p>
          <p>초미세먼지 농도: {PM25}㎍/㎥</p>
          <p>미세먼지 농도: {PM10}㎍/㎥</p>
        </div>
      );
    }

    if (activeTab === "transport") {
      // transport 탭일 경우
      const { ROAD_MSG, ROAD_TRAFFIC_IDX, ROAD_TRAFFIC_SPD } =
        data.transport || {};
      return (
        <div>
          <p>교통 메시지: {ROAD_MSG}</p>
          <p>도로 소통 지표: {ROAD_TRAFFIC_IDX}</p>
          <p>평균 속도: {ROAD_TRAFFIC_SPD} km/h</p>
        </div>
      );
    }

    if (activeTab === "demographics") {
      // demographics 탭일 경우
      const {
        AREA_CONGEST_LVL,
        AREA_CONGEST_MSG,
        MALE_PPLTN_RATE,
        FEMALE_PPLTN_RATE,
      } = data.demographics || {};

      return (
        <div>
          <p>혼잡도 수준: {AREA_CONGEST_LVL}</p>
          <p>혼잡 메시지: {AREA_CONGEST_MSG}</p>
          <p>남성 인구 비율: {MALE_PPLTN_RATE}%</p>
          <p>여성 인구 비율: {FEMALE_PPLTN_RATE}%</p>
        </div>
      );
    }

    // 세 탭 중 어느 것도 해당하지 않는 경우 (이론상 없지만 예외 처리)
    return <p>탭에 해당하는 데이터를 찾을 수 없습니다.</p>;
  };

  return (
    <div>
      {/* 탭 전환용 버튼들 */}
      <div className="flex space-x-2 rounded-lg bg-gray-100 p-1">
        {/* 날씨 탭 버튼: 현재 activeTab이 weather면 볼드와 언더라인 */}
        <Button
          variant="ghost"
          onClick={() => setActiveTab("weather")}
          className={activeTab === "weather" ? "font-bold underline" : ""}
        >
          날씨
        </Button>
        {/* 교통 탭 버튼 */}
        <Button
          variant="ghost"
          onClick={() => setActiveTab("transport")}
          className={activeTab === "transport" ? "font-bold underline" : ""}
        >
          교통
        </Button>
        {/* 인구분포 탭 버튼 */}
        <Button
          variant="ghost"
          onClick={() => setActiveTab("demographics")}
          className={activeTab === "demographics" ? "font-bold underline" : ""}
        >
          인구분포
        </Button>
      </div>

      <div className="mt-4">
        {/* 로딩 중이면 로딩 표시, 아니면 현재 탭 내용 표시 */}
        {loading ? <p>로딩 중...</p> : renderContent()}
      </div>
    </div>
  );
}
