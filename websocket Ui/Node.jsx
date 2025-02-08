import { useSpring, animated } from "react-spring";

const getPhaseColor = (phase) => ({
  A: "#ff0000",
  B: "#00ff00",
  C: "#0000ff",
}[phase] || "#999999");

export default function Node({ node }) {
  if (!node) return null;

  const props = useSpring({ to: { x: node.x, y: node.y }, config: { tension: 280, friction: 20 } });

  return <animated.circle cx={props.x} cy={props.y} r="6" fill={getPhaseColor(node.phase)} />;
}