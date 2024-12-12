"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

interface ActiveTabsProps {
  location: string;
}

export function ActiveTabs({ location }: ActiveTabsProps) {
  const [activeTab, setActiveTab] = useState<
    "weather" | "transport" | "demographics"
  >("weather");
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  // API 호출 함수
  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `/api/citydata?location=${encodeURIComponent(location)}`
      );
      const result = await response.json();
      console.log("Fetched data:", result); // 디버깅용
      setData(result);
    } catch (error) {
      console.error("데이터를 가져오는 중 오류가 발생했습니다:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [location]);

  const renderContent = () => {
    if (!data) return <p>데이터를 로드 중입니다...</p>;

    if (activeTab === "weather") {
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

    return <p>탭에 해당하는 데이터를 찾을 수 없습니다.</p>;
  };

  return (
    <div>
      <div className="flex space-x-2 rounded-lg bg-gray-100 p-1">
        <Button
          variant="ghost"
          onClick={() => setActiveTab("weather")}
          className={activeTab === "weather" ? "font-bold underline" : ""}
        >
          날씨
        </Button>
        <Button
          variant="ghost"
          onClick={() => setActiveTab("transport")}
          className={activeTab === "transport" ? "font-bold underline" : ""}
        >
          교통
        </Button>
        <Button
          variant="ghost"
          onClick={() => setActiveTab("demographics")}
          className={activeTab === "demographics" ? "font-bold underline" : ""}
        >
          인구분포
        </Button>
      </div>

      <div className="mt-4">
        {loading ? <p>로딩 중...</p> : renderContent()}
      </div>
    </div>
  );
}
