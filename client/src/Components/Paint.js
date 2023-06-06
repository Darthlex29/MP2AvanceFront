import React, { useRef, useEffect, useMemo, useState } from "react";
import io from "socket.io-client";
import { ChromePicker } from "react-color";
import "../Styles/App.css";

const socket = io("http://localhost:4000");

function Paint({ width, height, name, codigo }) {
  const [color, setColor] = useState("#000");
  const [lineWidth, setLineWidth] = useState(2);
  const [reiniciar, setReiniciar] = useState(false);

  const canvasRef = useRef(null);

  const mouse = useMemo(() => {
    setReiniciar(false);
    return {
      click: false,
      move: false,
      pos: { x: 0, y: 0 },
      pos_prev: false,
      color: color,
      lineWidth: lineWidth,
      reiniciar: false,
      codigo: codigo,
    };
  }, [reiniciar]);

  useEffect(() => {
    mouse.color = color;
    mouse.lineWidth = lineWidth;
  }, [color, lineWidth]);

  const handleDrawing = () => {
    if (mouse.click && mouse.move && mouse.pos_prev) {
      socket.emit("drawLine", {
        line: [mouse.pos, mouse.pos_prev],
        originColor: mouse.color,
        originWidth: mouse.lineWidth,
        originReiniciar: mouse.reiniciar,
        codigo: mouse.codigo,
      });
      mouse.move = false;
    }
    mouse.pos_prev = {
      x: mouse.pos.x,
      y: mouse.pos.y,
    };
    setTimeout(handleDrawing, 5);
  };
  handleDrawing();

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    function computePointInCanvas(clientX, clientY) {
      if (canvasRef.current) {
        const boundingRect = canvasRef.current.getBoundingClientRect();
        return {
          x: clientX - boundingRect.left,
          y: clientY - boundingRect.top,
        };
      } else {
        return null;
      }
    }

    const handleMouseDown = (e) => {
      mouse.click = true;
    };

    const handleMouseUp = (e) => {
      mouse.click = false;
    };

    const handleMouseMove = (e) => {
      mouse.move = true;
      const point = computePointInCanvas(e.clientX, e.clientY);

      mouse.pos.x = point.x;
      mouse.pos.y = point.y;
    };

    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mousedown", handleMouseDown);
    canvas.addEventListener("mouseup", handleMouseUp);

    socket.on("drawLine", (data) => {
      if (data && data.codigo === mouse.codigo) {
        console.log("YO RECIBO");
        let line = data.line;
        ctx.beginPath();
        ctx.lineWidth = data.originWidth;
        ctx.strokeStyle = data.originColor;
        ctx.moveTo(line[0].x, line[0].y);
        ctx.lineTo(line[1].x, line[1].y);
        ctx.stroke();
      }
    });

    // Limpia los eventos al desmontar el componente
    return () => {
      canvas.removeEventListener("mousedown", handleMouseDown);
      canvas.removeEventListener("mouseup", handleMouseUp);
      canvas.removeEventListener("mousemove", handleMouseMove);
      socket.off("drawLine");
    };
  }, [height, mouse, width]);

  return (
    <div className="canvas">
      <div>
        <h2>{name}</h2>
        {/*         <button>
          X
        </button> */}
      </div>

      <canvas
        className="drawing"
        width={width}
        height={height}
        style={canvasStyle}
        ref={canvasRef}
      />
      <div>
        <p> Seleccionar tamaño </p>
        <select
          value={lineWidth}
          onChange={(e) => setLineWidth(e.target.value)}
        >
          <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={3}>3</option>
          <option value={4}>4</option>
          <option value={5}>5</option>
        </select>

        <ChromePicker
          className="ChromePicker"
          color={color}
          onChange={(updatedColor) => setColor(updatedColor.hex)}
          disableAlpha={true}
        />

        <button
          onClick={(e) => {
            setReiniciar(true);
          }}
          className="btnReinicio"
        >
          Reiniciar Canvas
        </button>
      </div>
    </div>
  );
}

export default Paint;

const canvasStyle = {
  border: "1px solid black",
};
