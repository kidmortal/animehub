import React from "react";

type Props = {
  value: boolean;
  children: React.ReactNode;
};

export default function When(props: Props) {
  return props.value && props.children;
}
