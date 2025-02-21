import { Text as AppText, TextProps } from "react-native";

export function Text(props: TextProps) {
  return <AppText {...props} style={[{ fontFamily: "Patrick_Hand_Regular" }, props.style]} />;
}
