import { useMemo } from "react";
import ReactFlow, { Background, Controls, MarkerType } from "reactflow";
import "reactflow/dist/style.css";

export default function FlowMap({ theme = "dark" }) {
  const isDark = theme === "dark";
  const palette = {
    cardBg: isDark ? "#10182e" : "#f4f7ff",
    cardText: isDark ? "#9fb9ff" : "#2f4aa1",
    cardAlt: isDark ? "#66e9d4" : "#0f9a87",
    border: isDark ? "#354274" : "#c7d4f5",
    canvas: isDark ? "#1a2442" : "#dce5ff",
  };

  const nodes = useMemo(
    () => [
      {
        id: "1",
        data: { label: "Problem" },
        position: { x: 40, y: 90 },
        style: {
          background: palette.cardBg,
          color: palette.cardText,
          border: `1px solid ${palette.border}`,
        },
      },
      {
        id: "2",
        data: { label: "Architecture" },
        position: { x: 230, y: 20 },
        style: {
          background: palette.cardBg,
          color: palette.cardAlt,
          border: `1px solid ${palette.border}`,
        },
      },
      {
        id: "3",
        data: { label: "APIs + Messaging" },
        position: { x: 230, y: 165 },
        style: {
          background: palette.cardBg,
          color: palette.cardText,
          border: `1px solid ${palette.border}`,
        },
      },
      {
        id: "4",
        data: { label: "Scale & Reliability" },
        position: { x: 455, y: 90 },
        style: {
          background: palette.cardBg,
          color: palette.cardAlt,
          border: `1px solid ${palette.border}`,
        },
      },
      {
        id: "5",
        data: { label: "Business Impact" },
        position: { x: 665, y: 90 },
        style: {
          background: palette.cardBg,
          color: palette.cardText,
          border: `1px solid ${palette.border}`,
        },
      },
    ],
    [palette.cardAlt, palette.cardBg, palette.cardText, palette.border],
  );

  const edges = useMemo(
    () => [
      {
        id: "e1-2",
        source: "1",
        target: "2",
        markerEnd: { type: MarkerType.ArrowClosed },
      },
      {
        id: "e1-3",
        source: "1",
        target: "3",
        markerEnd: { type: MarkerType.ArrowClosed },
      },
      {
        id: "e2-4",
        source: "2",
        target: "4",
        markerEnd: { type: MarkerType.ArrowClosed },
      },
      {
        id: "e3-4",
        source: "3",
        target: "4",
        markerEnd: { type: MarkerType.ArrowClosed },
      },
      {
        id: "e4-5",
        source: "4",
        target: "5",
        markerEnd: { type: MarkerType.ArrowClosed },
      },
    ],
    [],
  );

  return (
    <ReactFlow nodes={nodes} edges={edges} fitView>
      <Background color={palette.canvas} gap={20} />
      <Controls />
    </ReactFlow>
  );
}
