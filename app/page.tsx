import { LocationCard } from "@/app/ui/Location-card";

export default function Page() {
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
  ];

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
        <h1 className="text-3xl font-bold text-center">서울 명소 정보</h1>
        <p className="text-center text-muted-foreground">
          마지막 업데이트: {currentDate}
        </p>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {locations.map((location) => (
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
