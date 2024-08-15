import React from "react";
import { Rect, Text, Group } from "react-konva";

const Card = ({
  x,
  y,
  width,
  height,
  text,
  onDragEnd,
  onResize,
  onShowMore,
}) => {
  const handleDragEnd = (e) => {
    onDragEnd({ x: e.target.x(), y: e.target.y() });
  };

  const handleTransformEnd = (e) => {
    const node = e.target;
    const newWidth = node.width() * node.scaleX();
    const newHeight = node.height() * node.scaleY();
    node.scaleX(1);
    node.scaleY(1);
    onResize({ width: newWidth, height: newHeight });
  };

  return (
    <Group
      x={x}
      y={y}
      draggable
      onDragEnd={handleDragEnd}
      onTransformEnd={handleTransformEnd}
    >
      <Rect
        className="card-rect"
        width={width}
        height={height}
        fill="lightblue"
        stroke="black"
        strokeWidth={2}
      />
      <Text
        x={10}
        y={10}
        text={`${text.slice(0, 30)}...`}
        fontSize={14}
        fill="black"
        width={width - 20}
      />
      <Text
        x={10}
        y={height - 20}
        text="Show More"
        fontSize={14}
        fill="blue"
        width={width - 20}
        className="card-text"
        onClick={onShowMore}
      />
    </Group>
  );
};

export default Card;
