import axios from "axios"; // axios 라이브러리를 통해 HTTP 요청을 보내기 위해 import
import { NextApiRequest, NextApiResponse } from "next"; // Next.js의 API Route 타입 정의를 위해 import
import { parseStringPromise } from "xml2js"; // xml2js 라이브러리를 통해 XML 데이터를 JS 객체로 파싱하기 위해 import

const API_KEY = process.env.SEOUL_API_KEY; // 환경변수에서 서울시 오픈API 키를 가져옴

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // handler 함수: Next.js API Route 엔트리 포인트
  const { location } = req.query; // 쿼리스트링에서 location 파라미터 추출
  if (!location || typeof location !== "string") {
    // location이 없거나 문자열이 아니면 클라이언트 요청이 잘못된 것으로 간주
    return res.status(400).json({ error: "location 파라미터가 필요합니다." });
  }

  // 서울시 오픈API 엔드포인트 구성
  const url = `http://openapi.seoul.go.kr:8088/${API_KEY}/xml/citydata/1/5/${encodeURIComponent(
    location
  )}`;

  try {
    const response = await axios.get(url); // axios를 사용해 GET 요청
    const jsonResult = await parseStringPromise(response.data); // 응답받은 XML 데이터를 JSON 객체로 변환

    // 응답에서 CITYDATA 부분 추출
    const citydata = jsonResult?.["SeoulRtd.citydata"]?.CITYDATA?.[0] || {};

    // 인구분포 정보 접근: LIVE_PPLTN_STTS 안에 LIVE_PPLTN_STTS가 중첩되어 있음
    const demographicsRoot =
      citydata?.LIVE_PPLTN_STTS?.[0]?.LIVE_PPLTN_STTS?.[0] || {};
    // 인구분포 관련 필드 추출
    const demographics = {
      AREA_CONGEST_LVL: demographicsRoot?.AREA_CONGEST_LVL?.[0] || "정보 없음",
      AREA_CONGEST_MSG: demographicsRoot?.AREA_CONGEST_MSG?.[0] || "정보 없음",
      MALE_PPLTN_RATE: demographicsRoot?.MALE_PPLTN_RATE?.[0] || "정보 없음",
      FEMALE_PPLTN_RATE:
        demographicsRoot?.FEMALE_PPLTN_RATE?.[0] || "정보 없음",
    };

    // 날씨 정보 접근: WEATHER_STTS 안에 WEATHER_STTS가 중첩 구조일 수 있으므로 동일한 방식으로 접근
    const weatherRoot = citydata?.WEATHER_STTS?.[0]?.WEATHER_STTS?.[0] || {};
    const weather = {
      WEATHER_TIME: weatherRoot.WEATHER_TIME?.[0] || "정보 없음",
      TEMP: weatherRoot.TEMP?.[0] || "정보 없음",
      HUMIDITY: weatherRoot.HUMIDITY?.[0] || "정보 없음",
      PM25: weatherRoot.PM25?.[0] || "정보 없음",
      PM10: weatherRoot.PM10?.[0] || "정보 없음",
      SENSIBLE_TEMP: weatherRoot.SENSIBLE_TEMP?.[0] || "정보 없음",
    };

    // 교통 정보 접근: ROAD_TRAFFIC_STTS 내부의 AVG_ROAD_DATA에서 평균 교통 정보 추출
    const roadTrafficRoot = citydata?.ROAD_TRAFFIC_STTS?.[0] || {};
    const avgRoadData = roadTrafficRoot?.AVG_ROAD_DATA?.[0] || {};
    const transport = {
      ROAD_MSG: avgRoadData.ROAD_MSG?.[0] || "정보 없음",
      ROAD_TRAFFIC_IDX: avgRoadData.ROAD_TRAFFIC_IDX?.[0] || "정보 없음",
      ROAD_TRAFFIC_SPD: avgRoadData.ROAD_TRAFFIC_SPD?.[0] || "정보 없음",
    };

    // 추출한 데이터들을 JSON 형태로 응답
    res.status(200).json({
      demographics,
      weather,
      transport,
    });
  } catch (error) {
    // 요청 과정에서 발생한 오류를 콘솔에 출력하고 500 에러로 응답
    console.error("Open API 요청 오류:", error);
    res
      .status(500)
      .json({ error: "데이터를 가져오는 중 오류가 발생했습니다." });
  }
}
