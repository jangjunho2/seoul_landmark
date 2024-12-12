import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ActiveTabs } from "@/app/ui/ActiveTabs";

interface LocationCardProps {
  title: string;
  district: string;
  description: string;
  image: string;
  location: string;
}

export function LocationCard({
  title,
  district,
  description,
  image,
  location,
}: LocationCardProps) {
  return (
    <Card className="w-full">
      <CardHeader className="bg-gray-200">
        <CardTitle className="text-xl font-bold">{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="h-48 bg-muted rounded-md flex items-center justify-center">
          <img
            src={image}
            alt={`${title} 이미지`}
            className="h-full w-full object-cover"
          />
        </div>
        <div className="flex items-center gap-2 text-muted-foreground">
          <span>{district}</span>
        </div>
        <p className="text-sm text-muted-foreground">{description}</p>
        {/* CSR Tabs */}
        <ActiveTabs location={location} /> {/* location prop 전달 */}
      </CardContent>
    </Card>
  );
}
