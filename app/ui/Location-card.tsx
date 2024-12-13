import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// UI 컴포넌트(Card, CardContent, CardHeader, CardTitle) import

import { ActiveTabs } from "@/app/ui/ActiveTabs";
// ActiveTabs 컴포넌트 import (날씨, 교통, 인구분포 탭)

interface LocationCardProps {
  title: string; // 명소 이름
  district: string; // 명소가 위치한 구(지역)
  description: string; // 명소 설명
  image: string; // 명소 이미지를 가리키는 경로 또는 URL
  location: string; // 명소 이름을 location prop으로 전달 (ActiveTabs에서 사용)
}

export function LocationCard({
  title,
  district,
  description,
  image,
  location,
}: LocationCardProps) {
  // LocationCard 컴포넌트는 명소 정보를 카드 형태로 표시
  return (
    <Card className="w-full">
      {/* CardHeader: 카드 상단 부분 (배경색 회색) */}
      <CardHeader className="bg-gray-200">
        {/* CardTitle: 카드 제목 부분에 명소 이름 표시 */}
        <CardTitle className="text-xl font-bold">{title}</CardTitle>
      </CardHeader>
      {/* CardContent: 카드의 메인 콘텐츠 영역 */}
      <CardContent className="space-y-6">
        {/* 명소 이미지 영역: 높이 48, 회색 배경, 이미지 가운데 정렬 */}
        <div className="h-48 bg-muted rounded-md flex items-center justify-center">
          <img
            src={image} // 명소 이미지 경로
            alt={`${title} 이미지`} // 명소 이름을 포함한 alt 텍스트
            className="h-full w-full object-cover"
            // object-cover: 이미지 비율 유지하며 영역 가득 채움
          />
        </div>
        {/* 구 정보: flex로 정렬, 글자색은 muted-foreground */}
        <div className="flex items-center gap-2 text-muted-foreground">
          <span>{district}</span> {/* 명소 위치 구 표시 */}
        </div>
        {/* 명소 설명: 작은 폰트, muted-foreground 색상으로 표시 */}
        <p className="text-sm text-muted-foreground">{description}</p>
        {/* CSR Tabs: ActiveTabs 컴포넌트 삽입, location prop 전달 */}
        <ActiveTabs location={location} />
        {/* ActiveTabs는 날씨, 교통, 인구분포 정보 탭을 표시하며 CSR로 작동 */}
      </CardContent>
    </Card>
  );
}
