import { LocationCard } from "@/app/ui/Location-card"; // 명소 정보를 보여주는 LocationCard 컴포넌트 import

export default function Page() {
  // 다양한 서울 명소 정보를 배열로 정의
  const locations = [
    {
      title: "경복궁",
      district: "종로구",
      description: "조선 왕조의 법궁",
      image: "GyeongbokgungPalace.png",
    },
    {
      title: "남산공원",
      district: "용산구",
      description: "서울의 상징적인 타워",
      image: "NamsanSeoulTower.png",
    },
    {
      title: "북촌한옥마을",
      district: "종로구",
      description: "전통 한옥 마을",
      image: "BukchonHanokVillage.png",
    },
    {
      title: "가로수길",
      district: "강남구",
      description: "서울의 트렌디한 거리",
      image: "GarosuGil.png",
    },
    {
      title: "청계산",
      district: "서초구",
      description: "서울의 대표적인 산행 코스",
      image: "CheonggyeMountain.png",
    },
    {
      title: "이태원 관광특구",
      district: "용산구",
      description: "다양한 문화가 공존하는 관광 명소",
      image: "ItaewonTourismSpecialZone.png",
    },
    {
      title: "광화문광장",
      district: "종로구",
      description: "서울의 역사적 중심지",
      image: "GwanghwamunSquare.png",
    },
    {
      title: "청와대",
      district: "종로구",
      description: "대한민국 대통령 관저",
      image: "CheongWaDae.png",
    },
  ];

  // 현재 날짜/시간을 한국어 형식으로 포맷팅
  const currentDate = new Date().toLocaleString("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  return (
    <div className="min-h-screen bg-gray-50/50 p-4">
      <div className="container mx-auto space-y-6">
        {/* 페이지 제목 */}
        <h1 className="text-3xl font-bold text-center">서울 명소 정보</h1>
        {/* 마지막 업데이트 시간 표시 */}
        <p className="text-center text-muted-foreground">
          마지막 업데이트: {currentDate}
        </p>
        {/* 명소들을 grid 레이아웃으로 표시 */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {locations.map((location) => (
            // LocationCard 컴포넌트를 이용해 각 명소 정보 표시
            // location 오브젝트를 풀어서 props로 전달하고 key는 명소 title 사용
            <LocationCard
              key={location.title}
              location={location.title}
              {...location}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
