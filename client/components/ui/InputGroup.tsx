import React, { FC, ReactNode } from "react";
import { TextInput, TextInputProps, View } from "react-native";

export interface InputGroupProps extends TextInputProps {
  icon?: ReactNode;
  placeholder?: string;
}

const InputGroup: FC<InputGroupProps> = ({ icon, placeholder, ...rest }) => {
  return (
    <View className="flex-row items-center bg-white rounded-md px-3 py-3">
      {icon}
      <TextInput
        className="flex-1 ml-2 text-base placeholder:text-gray-400"
        placeholder={placeholder}
        {...rest}
      />
    </View>
  );
};

export default InputGroup;
