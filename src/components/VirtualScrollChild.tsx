import React from "react";
import { useInView } from "react-intersection-observer";

interface Props {
  height?: number;
  children: any;
}

const VirtualScrollChild: React.FC<Props> = (props) => {
  const [ref, inView] = useInView();
  const style = {
    height: `${props.height ? props.height : 40}px`,
    overflow: "hidden",
  };
  return (
    <div style={style} ref={ref}>
      {inView ? props.children : null}
    </div>
  );
};

export default VirtualScrollChild;
