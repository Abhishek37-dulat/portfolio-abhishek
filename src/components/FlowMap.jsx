import { useMemo } from "react";
import ReactFlow, { Background, Controls, MarkerType } from "reactflow";
import "reactflow/dist/style.css";

export default function FlowMap({ theme = "dark" }) {
  const isDark = theme === "dark";
  const palette = {
    cardBg: isDark ? "#101714" : "#f4f8ef",
    cardText: isDark ? "#eef4dc" : "#17221c",
    cardAlt: isDark ? "#b3ff4a" : "#0f7a41",
    border: isDark ? "#2a3a2d" : "#c8d7bc",
    canvas: isDark ? "#0a110d" : "#edf3e5",
    canvasLine: isDark ? "#18231b" : "#d7e3cb",
    edge: isDark ? "#ffb258" : "#c47a21",
  };

  const nodeStyle = {
    background: palette.cardBg,
    color: palette.cardText,
    border: `1px solid ${palette.border}`,
    borderRadius: 22,
    padding: "14px 16px",
    minWidth: 180,
    fontFamily: '"Space Grotesk", sans-serif',
    fontWeight: 700,
    fontSize: 13,
    lineHeight: 1.45,
    whiteSpace: "pre-line",
    boxShadow: "0 14px 30px rgba(0, 0, 0, 0.22)",
  };

  const accentNodeStyle = {
    ...nodeStyle,
    color: palette.cardAlt,
    boxShadow: "0 14px 30px rgba(0, 0, 0, 0.26)",
  };

  const nodes = useMemo(
    () => [
      {
        id: "1",
        data: { label: "Product Brief\nand User Need" },
        position: { x: 10, y: 155 },
        style: nodeStyle,
      },
      {
        id: "2",
        data: { label: "React / Next.js /\nReact Native" },
        position: { x: 255, y: 40 },
        style: accentNodeStyle,
      },
      {
        id: "3",
        data: { label: "Node.js / Go\nService Layer" },
        position: { x: 255, y: 255 },
        style: nodeStyle,
      },
      {
        id: "4",
        data: { label: "gRPC / NATS /\nREST Communication" },
        position: { x: 520, y: 40 },
        style: nodeStyle,
      },
      {
        id: "5",
        data: { label: "PostgreSQL /\nMongoDB / Redis" },
        position: { x: 520, y: 255 },
        style: accentNodeStyle,
      },
      {
        id: "6",
        data: { label: "Docker / AWS /\nLinux Deployment" },
        position: { x: 790, y: 155 },
        style: nodeStyle,
      },
      {
        id: "7",
        data: { label: "Reliable Product\nDelivery" },
        position: { x: 1055, y: 155 },
        style: accentNodeStyle,
      },
    ],
    [accentNodeStyle, nodeStyle],
  );

  const edges = useMemo(
    () => [
      {
        id: "e1-2",
        source: "1",
        target: "2",
        animated: true,
        style: { stroke: palette.edge, strokeWidth: 1.8 },
        markerEnd: { type: MarkerType.ArrowClosed, color: palette.edge },
      },
      {
        id: "e1-3",
        source: "1",
        target: "3",
        animated: true,
        style: { stroke: palette.edge, strokeWidth: 1.8 },
        markerEnd: { type: MarkerType.ArrowClosed, color: palette.edge },
      },
      {
        id: "e2-4",
        source: "2",
        target: "4",
        style: { stroke: palette.edge, strokeWidth: 1.8 },
        markerEnd: { type: MarkerType.ArrowClosed, color: palette.edge },
      },
      {
        id: "e3-4",
        source: "3",
        target: "4",
        style: { stroke: palette.edge, strokeWidth: 1.8 },
        markerEnd: { type: MarkerType.ArrowClosed, color: palette.edge },
      },
      {
        id: "e3-5",
        source: "3",
        target: "5",
        animated: true,
        style: { stroke: palette.edge, strokeWidth: 1.8 },
        markerEnd: { type: MarkerType.ArrowClosed, color: palette.edge },
      },
      {
        id: "e4-6",
        source: "4",
        target: "6",
        style: { stroke: palette.edge, strokeWidth: 1.8 },
        markerEnd: { type: MarkerType.ArrowClosed, color: palette.edge },
      },
      {
        id: "e5-6",
        source: "5",
        target: "6",
        style: { stroke: palette.edge, strokeWidth: 1.8 },
        markerEnd: { type: MarkerType.ArrowClosed, color: palette.edge },
      },
      {
        id: "e6-7",
        source: "6",
        target: "7",
        animated: true,
        style: { stroke: palette.edge, strokeWidth: 1.8 },
        markerEnd: { type: MarkerType.ArrowClosed, color: palette.edge },
      },
    ],
    [palette.edge],
  );

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      fitView
      fitViewOptions={{ padding: 0.14 }}
      nodesDraggable={false}
      nodesConnectable={false}
      elementsSelectable={false}
      zoomOnPinch={false}
    >
      <Background color={palette.canvasLine} gap={22} />
      <Controls showInteractive={false} />
    </ReactFlow>
  );
}
