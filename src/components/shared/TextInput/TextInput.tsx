import { TextInput as AppTextInput, StyleSheet, TextInputProps } from "react-native";

export function TextInput(props: TextInputProps) {
  return (
    <AppTextInput
      {...props}
      style={[{ fontFamily: "Patrick_Hand_Regular" }, props.style]}
      placeholderTextColor="#bbb"
    />
  );
}
