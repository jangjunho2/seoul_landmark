"use client";
import { useState } from "react";
import {
  MapPin,
  Wind,
  Droplets,
  Sun,
  Users,
  Bus,
  Car,
  Camera,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
// import { TransportTabs } from "@/app/ui/TransportTabs";

interface LocationCardProps {
  title: string;
  district: string;
  description: string;
  image: string;
  weather?: {
    pm10?: number;
    pm25?: number;
    o3?: number;
  };
  transport?: {
    subway?: string;
    bus?: string;
    car?: string;
  };
  demographics?: {
    male: number;
    female: number;
    crowdedness: number;
  };
}

export function LocationCard({
  title,
  district,
  description,
  image,
  weather,
  transport,
  demographics,
}: LocationCardProps) {
  const [activeTab, setActiveTab] = useState<
    "weather" | "transport" | "demographics"
  >("weather");

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
          />{" "}
        </div>

        <div className="flex items-center gap-2 text-muted-foreground">
          <MapPin className="h-4 w-4" />
          <span>{district}</span>
        </div>

        <p className="text-sm text-muted-foreground">{description}</p>

        <div className="flex space-x-2 rounded-lg bg-gray-100 p-1">
          <Button
            variant="ghost"
            onClick={() => setActiveTab("weather")}
            className={`flex-1 ${
              activeTab === "weather"
                ? "bg-green-500 text-white hover:bg-blue-500"
                : "hover:bg-blue-500 hover:text-white"
            }`}
          >
            날씨
          </Button>
          <Button
            variant="ghost"
            onClick={() => setActiveTab("transport")}
            className={`flex-1 ${
              activeTab === "transport"
                ? "bg-green-500 text-white hover:bg-blue-500"
                : "hover:bg-blue-500 hover:text-white"
            }`}
          >
            교통
          </Button>
          <Button
            variant="ghost"
            onClick={() => setActiveTab("demographics")}
            className={`flex-1 ${
              activeTab === "demographics"
                ? "bg-green-500 text-white hover:bg-blue-500"
                : "hover:bg-blue-500 hover:text-white"
            }`}
          >
            인구비율
          </Button>
        </div>

        {activeTab === "weather" && weather && (
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <div className="flex items-center gap-2">
                  <Wind className="h-4 w-4" />
                  <span>미세먼지 (PM10)</span>
                </div>
                <span>{weather.pm10} ㎍/㎥ (보통)</span>
              </div>
              <Progress
                value={weather.pm10 ? (weather.pm10 / 100) * 100 : 0}
                className="bg-gray-200 [&>div]:bg-blue-500"
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <div className="flex items-center gap-2">
                  <Droplets className="h-4 w-4" />
                  <span>초미세먼지 (PM2.5)</span>
                </div>
                <span>{weather.pm25} ㎍/㎥ (보통)</span>
              </div>
              <Progress
                value={weather.pm25 ? (weather.pm25 / 100) * 100 : 0}
                className="bg-gray-200 [&>div]:bg-blue-500"
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <div className="flex items-center gap-2">
                  <Sun className="h-4 w-4" />
                  <span>오존 (O₃)</span>
                </div>
                <span>{weather.o3} ppm (보통)</span>
              </div>
              <Progress
                value={weather.o3 ? (weather.o3 / 0.1) * 100 : 0}
                className="bg-gray-200 [&>div]:bg-blue-500"
              />
            </div>
          </div>
        )}

        {activeTab === "transport" && transport && (
          <div className="space-y-2">
            {transport.subway && (
              <div className="flex items-center gap-2 text-sm">
                <Bus className="h-4 w-4" />
                <span>지하철 {transport.subway}</span>
              </div>
            )}
            {transport.bus && (
              <div className="flex items-center gap-2 text-sm">
                <Bus className="h-4 w-4" />
                <span>버스 {transport.bus}</span>
              </div>
            )}
            {transport.car && (
              <div className="flex items-center gap-2 text-sm">
                <Car className="h-4 w-4" />
                <span>자동차 {transport.car}</span>
              </div>
            )}
          </div>
        )}

        {activeTab === "demographics" && demographics && (
          <div className="space-y-4">
            <div className="flex gap-2 text-sm">
              <div className="bg-blue-600 text-white px-2 py-1 rounded">
                남성 {demographics.male}%
              </div>
              <div className="bg-pink-600 text-white px-2 py-1 rounded">
                여성 {demographics.female}%
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  <span>혼잡도</span>
                </div>
                <span>{demographics.crowdedness}%</span>
              </div>
              <Progress
                value={demographics.crowdedness}
                className="bg-gray-200 [&>div]:bg-red-500"
              />
            </div>
          </div>
        )}

        <div className="flex items-center gap-2 text-sm">
          <Camera className="h-4 w-4" />
          <span>실시간 CCTV</span>
        </div>
      </CardContent>
    </Card>
  );
}
