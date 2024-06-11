import { View, Text } from "react-native";
import React from "react";

type Props<T> = {
  items: T[] | undefined;
  render: (item: T, idx: number) => React.ReactNode;
};

export default function ForEach<T>(props: Props<T>) {
  return (
    <View>
      {props.items?.map((item, index) => (
        <View key={index}>{props.render(item, index)}</View>
      ))}
    </View>
  );
}
