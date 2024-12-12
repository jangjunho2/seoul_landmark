import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import { parseStringPromise } from "xml2js";

const API_KEY = process.env.SEOUL_API_KEY;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { location } = req.query;
  if (!location || typeof location !== "string") {
    return res.status(400).json({ error: "location 파라미터가 필요합니다." });
  }

  const url = `http://openapi.seoul.go.kr:8088/${API_KEY}/xml/citydata/1/5/${encodeURIComponent(
    location
  )}`;

  try {
    const response = await axios.get(url);
    const jsonResult = await parseStringPromise(response.data);

    // 구조 확인용 로그
    // console.log(JSON.stringify(jsonResult, null, 2));

    const citydata = jsonResult?.["SeoulRtd.citydata"]?.CITYDATA?.[0] || {};

    // 인구분포 정보 접근 (LIVE_PPLTN_STTS가 두 번 중첩되어 있음)
    const demographicsRoot =
      citydata?.LIVE_PPLTN_STTS?.[0]?.LIVE_PPLTN_STTS?.[0] || {};
    const demographics = {
      AREA_CONGEST_LVL: demographicsRoot?.AREA_CONGEST_LVL?.[0] || "정보 없음",
      AREA_CONGEST_MSG: demographicsRoot?.AREA_CONGEST_MSG?.[0] || "정보 없음",
      MALE_PPLTN_RATE: demographicsRoot?.MALE_PPLTN_RATE?.[0] || "정보 없음",
      FEMALE_PPLTN_RATE:
        demographicsRoot?.FEMALE_PPLTN_RATE?.[0] || "정보 없음",
    };

    // 날씨 정보 접근 (기존 코드와 동일하게 WEATHER_STTS가 중첩일 경우에 맞춰 진행)
    const weatherRoot = citydata?.WEATHER_STTS?.[0]?.WEATHER_STTS?.[0] || {};
    const weather = {
      WEATHER_TIME: weatherRoot.WEATHER_TIME?.[0] || "정보 없음",
      TEMP: weatherRoot.TEMP?.[0] || "정보 없음",
      HUMIDITY: weatherRoot.HUMIDITY?.[0] || "정보 없음",
      PM25: weatherRoot.PM25?.[0] || "정보 없음",
      PM10: weatherRoot.PM10?.[0] || "정보 없음",
      SENSIBLE_TEMP: weatherRoot.SENSIBLE_TEMP?.[0] || "정보 없음",
    };

    // 교통 정보 접근 (ROAD_TRAFFIC_STTS 내부의 AVG_ROAD_DATA에서 평균값 추출)
    const roadTrafficRoot = citydata?.ROAD_TRAFFIC_STTS?.[0] || {};
    const avgRoadData = roadTrafficRoot?.AVG_ROAD_DATA?.[0] || {};
    const transport = {
      ROAD_MSG: avgRoadData.ROAD_MSG?.[0] || "정보 없음",
      ROAD_TRAFFIC_IDX: avgRoadData.ROAD_TRAFFIC_IDX?.[0] || "정보 없음",
      ROAD_TRAFFIC_SPD: avgRoadData.ROAD_TRAFFIC_SPD?.[0] || "정보 없음",
    };

    res.status(200).json({
      demographics,
      weather,
      transport,
    });
  } catch (error) {
    console.error("Open API 요청 오류:", error);
    res
      .status(500)
      .json({ error: "데이터를 가져오는 중 오류가 발생했습니다." });
  }
}
