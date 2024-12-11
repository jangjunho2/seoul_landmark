import { LocationCard } from "@/app/ui/Location-card";

export default function Page() {
  const locations = [
    {
      title: "경복궁",
      district: "종로구",
      description: "조선 왕조의 법궁",
      weather: {
        pm10: 45,
        pm25: 28,
        o3: 0.035,
      },
      transport: {
        subway: "3호선 경복궁역 5분",
        bus: "1020, 7025 10분",
        car: "15분",
      },
      demographics: {
        male: 48,
        female: 52,
        crowdedness: 20,
      },
      image: "GyeongbokgungPalace.png",
    },
    {
      title: "남산서울타워",
      district: "용산구",
      description: "서울의 상징적인 타워",
      weather: {
        pm10: 39,
        pm25: 25,
        o3: 0.028,
      },
      transport: {
        cable: "케이블카 10분",
        bus: "순환버스 15분",
        car: "20분",
      },
      demographics: {
        male: 45,
        female: 55,
        crowdedness: 85,
      },
      image: "NamsanSeoulTower.png",
    },
    {
      title: "북촌한옥마을",
      district: "종로구",
      description: "전통 한옥 마을",
      weather: {
        pm10: 42,
        pm25: 26,
        o3: 0.032,
      },
      transport: {
        subway: "3호선 안국역 5분",
        bus: "종로02 10분",
        car: "10분",
      },
      demographics: {
        male: 47,
        female: 53,
        crowdedness: 60,
      },
      image: "BukchonHanokVillage.png",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50/50 p-4">
      <div className="container mx-auto space-y-6">
        <h1 className="text-3xl font-bold text-center">서울 명소 탐험기</h1>
        <p className="text-center text-muted-foreground">
          마지막 업데이트: 2024. 11. 5. 오전 3:20:16
        </p>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {locations.map((location) => (
            <LocationCard key={location.title} {...location} />
          ))}
        </div>
      </div>
    </div>
  );
}
