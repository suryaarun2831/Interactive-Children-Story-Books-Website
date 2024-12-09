import React, { useRef, useState } from 'react';
import { FaEraser, FaMountain, FaPen, FaRegCircle, FaSquare, FaStar, FaTrashAlt } from 'react-icons/fa';
import styled from 'styled-components';
const PaintBoxWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CanvasWrapper = styled.div`
  position: relative;
  border: 2px solid #000;
  width: 600px;
  height: 400px;
  margin-bottom: 20px;
  background-color: #fff;
`;

const Canvas = styled.canvas`
  width: 100%;
  height: 100%;
  cursor: crosshair;
`;

const ToolBar = styled.div`
  display: flex;
  gap: 15px;
  margin-bottom: 10px;
  flex-wrap: wrap;
`;

const ColorPicker = styled.input`
  type: color;
`;

const Button = styled.button`
  padding: 10px;
  background-color: transparent;
  border: none;
  cursor: pointer;
  font-size: 20px; /* Increase icon size */
`;

const Slider = styled.input`
  type: range;
  min: 1;
  max: 50;
  value: ${(props) => props.value};
`;

const PaintBox = () => {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [isEraser, setIsEraser] = useState(false);
  const [color, setColor] = useState('#000000');
  const [fillColor, setFillColor] = useState('#000000'); // Color for filling shapes
  const [lineWidth, setLineWidth] = useState(5);
  const [tool, setTool] = useState('pen'); // 'pen', 'eraser', 'shape'
  const [shape, setShape] = useState('circle'); // 'circle', 'square', 'rectangle', 'triangle', 'star'
  const [eraserSize, setEraserSize] = useState(10);

  const [lastX, setLastX] = useState(0);
  const [lastY, setLastY] = useState(0);
  const [shapePosition, setShapePosition] = useState(null); // Position where the shape will be drawn
  const [isShapeDrawing, setIsShapeDrawing] = useState(false); // Flag to know if we are drawing a shape

  const startDrawing = (e) => {
    const ctx = canvasRef.current.getContext('2d');
    ctx.beginPath();
    setLastX(e.nativeEvent.offsetX);
    setLastY(e.nativeEvent.offsetY);
    setIsDrawing(true);
  };

  const draw = (e) => {
    if (!isDrawing && !isShapeDrawing) return;

    const ctx = canvasRef.current.getContext('2d');
    ctx.lineWidth = lineWidth;
    ctx.strokeStyle = isEraser ? '#fff' : color;
    ctx.lineCap = 'round';

    if (tool === 'pen') {
      ctx.moveTo(lastX, lastY);
      ctx.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
      ctx.stroke();
    } else if (tool === 'shape' && isShapeDrawing) {
      drawShape(e.nativeEvent.offsetX, e.nativeEvent.offsetY, ctx);
    } else if (tool === 'eraser') {
      ctx.clearRect(e.nativeEvent.offsetX - eraserSize / 2, e.nativeEvent.offsetY - eraserSize / 2, eraserSize, eraserSize);
    }

    setLastX(e.nativeEvent.offsetX);
    setLastY(e.nativeEvent.offsetY);
  };

  const endDrawing = () => {
    setIsDrawing(false);
    if (isShapeDrawing) {
      setIsShapeDrawing(false); // End shape drawing
    }
  };

  const drawShape = (x, y, ctx) => {
    const size = 50;
    ctx.beginPath();
    if (shape === 'circle') {
      ctx.arc(shapePosition.x, shapePosition.y, size, 0, Math.PI * 2);
    } else if (shape === 'square') {
      ctx.rect(shapePosition.x - size / 2, shapePosition.y - size / 2, size, size);
    } else if (shape === 'rectangle') {
      ctx.rect(shapePosition.x - size, shapePosition.y - size / 2, size * 2, size);
    } else if (shape === 'triangle') {
      ctx.moveTo(shapePosition.x, shapePosition.y - size);
      ctx.lineTo(shapePosition.x - size, shapePosition.y + size);
      ctx.lineTo(shapePosition.x + size, shapePosition.y + size);
      ctx.closePath();
    } else if (shape === 'star') {
      const outerRadius = size;
      const innerRadius = size / 2;
      const step = Math.PI / 5;

      ctx.moveTo(shapePosition.x, shapePosition.y - outerRadius);
      for (let i = 0; i < 5; i++) {
        ctx.lineTo(
          shapePosition.x + Math.cos(i * 2 * step) * outerRadius,
          shapePosition.y + Math.sin(i * 2 * step) * outerRadius
        );
        ctx.lineTo(
          shapePosition.x + Math.cos(i * 2 * step + step) * innerRadius,
          shapePosition.y + Math.sin(i * 2 * step + step) * innerRadius
        );
      }
      ctx.closePath();
    }
    ctx.fillStyle = fillColor; // Fill color for shapes
    ctx.fill();
    ctx.strokeStyle = color; // Border color for shapes
    ctx.stroke();
  };

  const clearCanvas = () => {
    const ctx = canvasRef.current.getContext('2d');
    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
  };

  const toggleTool = (selectedTool) => {
    setTool(selectedTool);
    setIsEraser(selectedTool === 'eraser');
    if (selectedTool === 'shape') {
      setShapePosition(null); // Clear any previous shape position
    }
  };

  const startShapeDrawing = (e) => {
    const ctx = canvasRef.current.getContext('2d');
    setShapePosition({ x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY });
    setIsShapeDrawing(true);
  };

  return (
    <PaintBoxWrapper>
      <CanvasWrapper>
        <Canvas
          ref={canvasRef}
          onMouseDown={(e) => {
            startDrawing(e);
            if (tool === 'shape') {
              startShapeDrawing(e);
            }
          }}
          onMouseMove={draw}
          onMouseUp={endDrawing}
          onMouseLeave={endDrawing}
          width={600}
          height={400}
        />
      </CanvasWrapper>
      <ToolBar>
        <ColorPicker type="color" value={color} onChange={(e) => setColor(e.target.value)} title="Inline Color (Icon Color)"/>
        <ColorPicker type="color" value={fillColor} onChange={(e) => setFillColor(e.target.value)} title="Outline Color"/>

        <Button onClick={() => toggleTool('pen')}>
          <FaPen />
        </Button>
        <Button onClick={() => toggleTool('eraser')}>
          <FaEraser />
        </Button>
        <Button onClick={() => toggleTool('shape')}>
          <FaRegCircle />
        </Button>
        <Button onClick={clearCanvas}>
          <FaTrashAlt />
        </Button>

        <div>
          <label>Brush Size: </label>
          <Slider value={lineWidth} onChange={(e) => setLineWidth(e.target.value)} />
        </div>

        {tool === 'shape' && (
          <div>
            <Button onClick={() => setShape('circle')}>
              <FaRegCircle />
            </Button>
            <Button onClick={() => setShape('square')}>
              <FaSquare />
            </Button>
            {/* <Button onClick={() => setShape('rectangle')}>
            <AiOutlineRectangle size={30} />

            </Button> */}
            <Button onClick={() => setShape('triangle')}>
              <FaMountain />
            </Button>
            <Button onClick={() => setShape('star')}>
              <FaStar />
            </Button>
          </div>
        )}
      </ToolBar>
    </PaintBoxWrapper>
  );
};

export default PaintBox;