import Button from "@/components/ui/Button";
import { COLORS } from "@/lib/constants";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import {
  ArrowRight,
  BarChart,
  Clock,
  MapPin,
  Shield,
} from "lucide-react-native";
import React, { FC, ReactNode } from "react";
import { ScrollView, Text, View } from "react-native";

interface FeatureCardProps {
  icon: ReactNode;
  title: string;
  description: string;
}

const FeatureCard: FC<FeatureCardProps> = ({ icon, title, description }) => (
  <View className="bg-white rounded-xl p-4 mb-4">
    <View className="flex-row items-center mb-2">
      {icon}
      <Text className="text-lg font-bold ml-2">{title}</Text>
    </View>
    <Text className="text-gray-600">{description}</Text>
  </View>
);

export default function HomePage() {
  const handleClick = () => {
    router.push("/(auth)/login");
  };
  return (
    <ScrollView className="flex-1 bg-gray-100">
      <StatusBar style="light" />

      {/* Hero Section */}
      <View className="bg-primary pt-12 pb-8 px-6 rounded-b-3xl shadow-lg">
        <View className="items-center mb-6">
          <MapPin size={50} color="#ffffff" />
          <Text className="text-3xl font-bold text-white mt-2">
            Geo Attendance
          </Text>
        </View>
        <Text className="text-white text-center text-lg mb-6">
          Revolutionize Your Workforce Management
        </Text>
        <View className="w-fit mx-auto">
          <Button onPress={handleClick}>Get Started</Button>
        </View>
      </View>

      {/* Features Section */}
      <View className="container py-8">
        <Text className="text-2xl font-bold mb-6">
          Why Choose Geo Attendance?
        </Text>

        <FeatureCard
          icon={<MapPin size={24} color={COLORS.primary} />}
          title="Precise Location Tracking"
          description="Ensure accurate attendance with our advanced GPS technology."
        />

        <FeatureCard
          icon={<Clock size={24} color={COLORS.primary} />}
          title="Real-Time Monitoring"
          description="Track employee check-ins and check-outs as they happen."
        />

        <FeatureCard
          icon={<BarChart size={24} color={COLORS.primary} />}
          title="Insightful Analytics"
          description="Gain valuable insights with our comprehensive reporting tools."
        />

        <FeatureCard
          icon={<Shield size={24} color={COLORS.primary} />}
          title="Secure & Compliant"
          description="Your data is protected with enterprise-grade security measures."
        />
      </View>

      {/* Testimonial Section */}
      <View className="bg-white py-8">
        <View className="container ">
          <Text className="text-2xl font-bold mb-6">What Our Clients Say</Text>
          <View className="bg-gray-100 rounded-xl p-4 mb-4">
            <Text className="italic text-gray-600 mb-2">
              "Geo Attendance has transformed how we manage our remote
              workforce. It's a game-changer!"
            </Text>
            <Text className="font-semibold">- John Doe, CEO of KajNai.com</Text>
          </View>
        </View>
      </View>

      {/* CTA Section */}
      <View className="bg-primary py-8">
        <View className="container">
          <Text className="text-2xl font-bold text-white mb-4">
            Ready to Optimize Your Workforce?
          </Text>
          <View>
            <Button onPress={handleClick}>
              <View className="flex-row items-center gap-2">
                <Text className="text-primary text-lg font-bold">
                  Start Free Trial
                </Text>
                <ArrowRight size={20} color="#10B981" />
              </View>
            </Button>
          </View>
        </View>
      </View>

      {/* Footer */}
      <View className="bg-gray-800 px-6 py-8">
        <Text className="text-white text-center mb-2">
          © {new Date().getFullYear()} Geo Attendance
        </Text>
        <Text className="text-gray-400 text-center">All rights reserved</Text>
      </View>
    </ScrollView>
  );
}
