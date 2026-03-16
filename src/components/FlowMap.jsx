import { useMemo } from "react";
import ReactFlow, { Background, Controls, MarkerType } from "reactflow";
import "reactflow/dist/style.css";

const flowPalettes = {
  circuit: {
    cardBg: "#101714",
    cardText: "#eef4dc",
    cardAlt: "#b3ff4a",
    border: "#2a3a2d",
    canvasLine: "#1a261d",
    edge: "#ffb258",
    controlsBg: "rgba(16, 23, 20, 0.88)",
    controlsHover: "rgba(26, 37, 31, 0.98)",
  },
  copper: {
    cardBg: "#19110d",
    cardText: "#fff0da",
    cardAlt: "#ff9152",
    border: "#463027",
    canvasLine: "#261913",
    edge: "#ffd166",
    controlsBg: "rgba(30, 20, 16, 0.9)",
    controlsHover: "rgba(49, 31, 25, 0.98)",
  },
  aqua: {
    cardBg: "#0d1719",
    cardText: "#e9fcff",
    cardAlt: "#4af1d6",
    border: "#244046",
    canvasLine: "#173037",
    edge: "#69b7ff",
    controlsBg: "rgba(12, 24, 28, 0.9)",
    controlsHover: "rgba(20, 39, 45, 0.98)",
  },
  ember: {
    cardBg: "#1a1012",
    cardText: "#fff0e6",
    cardAlt: "#ff6b6b",
    border: "#47262c",
    canvasLine: "#2a171b",
    edge: "#ffc57a",
    controlsBg: "rgba(28, 18, 21, 0.9)",
    controlsHover: "rgba(45, 28, 31, 0.98)",
  },
};

export default function FlowMap({ theme = "circuit" }) {
  const palette = flowPalettes[theme] ?? flowPalettes.circuit;

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
      colorMode="dark"
      fitView
      fitViewOptions={{ padding: 0.14 }}
      nodesDraggable={false}
      nodesConnectable={false}
      elementsSelectable={false}
      zoomOnPinch={false}
    >
      <Background color={palette.canvasLine} gap={22} />
      <Controls
        showInteractive={false}
        style={{
          background: palette.controlsBg,
          borderRadius: 14,
        }}
      />
    </ReactFlow>
  );
}
