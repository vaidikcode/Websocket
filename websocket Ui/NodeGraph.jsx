import React, { useState, useEffect } from "react";
import useWebSocket from "react-use-websocket";
import { forceSimulation, forceManyBody, forceCenter } from "d3-force";
import Node from "./Node";

export default function NodeGraph() {
  const [nodes, setNodes] = useState([]);
  const { lastJsonMessage } = useWebSocket("ws://localhost:8080/ws", { shouldReconnect: () => true });

  useEffect(() => {
    if (lastJsonMessage) {
      setNodes((prev) => [...prev, { id: lastJsonMessage.meter_id, x: Math.random() * 800, y: Math.random() * 600, phase: lastJsonMessage.new_phase }].slice(-100));
    }
  }, [lastJsonMessage]);

  useEffect(() => {
    const simulation = forceSimulation(nodes)
      .force("charge", forceManyBody().strength(-5))
      .force("center", forceCenter(400, 300))
      .on("tick", () => setNodes([...nodes]));

    return () => simulation.stop();
  }, [nodes]);

  return (
    <div className="flex justify-center items-center bg-gray-900 h-screen">
      <svg width={800} height={600} className="bg-gray-800 rounded">
        {nodes.map((node) => <Node key={node.id} node={node} />)}
      </svg>
    </div>
  );
}