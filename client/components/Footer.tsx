import { Clock, User } from "lucide-react-native";
import { Text, View } from "react-native";
const Footer = () => {
  return (
    <View className="bg-white py-4">
      <View className="container flex-row justify-between items-center">
        <View className="flex-row gap-2 items-center">
          <User size={20} color="#10B981" className="mr-2" />
          <Text className="text-gray-600">John Doe</Text>
        </View>
        <View className="flex-row gap-2 items-center">
          <Clock size={20} color="#10B981" className="mr-2" />
          <Text className="text-gray-600">
            {new Date().toLocaleTimeString()}
          </Text>
        </View>
      </View>
    </View>
  );
};
export default Footer;
