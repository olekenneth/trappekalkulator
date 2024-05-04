import { useState, useEffect, useRef } from "react";

const CanvasComponent = ({ labels }) => {
  const canvasRef = useRef(null);
  useEffect(() => {
    if (labels) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      // const { width, height } = canvas;

      const height = labels.sideB;
      const width = labels.sideA;
      const ratio = window.devicePixelRatio;

      canvas.width = width * ratio;
      canvas.height = height * ratio;
      ctx.scale(ratio, ratio);

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Now draw the triangle
      ctx.beginPath();
      ctx.moveTo(15, 15);
      ctx.lineTo(15, height - 15);
      ctx.lineTo(width - 30, height - 15);
      ctx.closePath();
      ctx.stroke();

      ctx.font = "10px Arial";
      ctx.fillStyle = "black";
      ctx.textAlign = "center";
      ctx.fillText(`A: ${labels.sideA}`, width / 2, height - 3);
      ctx.fillText(`B: ${labels.sideB}`, 40, height / 2);
      ctx.fillText(`C: ${labels.sideC}`, width / 2, height / 2 - 20);

      ctx.fillText(`∠A: ${labels.angleA}`, 30, 13);
      ctx.fillText(`∠B: ${labels.angleB}`, 30, height - 3);
      ctx.fillText(`∠C: ${labels.angleC}`, width - 30, height - 3);
    }
  }, [labels]);

  return (
    <>
      <canvas
        ref={canvasRef}
        width={labels?.sideA || 300}
        height={labels?.sideB || 300}
        className="block pt-20 p-5 w-full"
        id="canvas"
      />
    </>
  );
};

export default function Trapp() {
  const [c, setC] = useState(200);
  const [angleA, setAngleA] = useState(30);
  const [labels, setLabels] = useState(null);

  useEffect(() => {
    var theta = angleA;
    var thetaRadians = (Math.PI * theta) / 180;

    const a = c * Math.cos(thetaRadians);
    const b = c * Math.sin(thetaRadians);
    const angleB = 90;

    setLabels({
      sideA: Number(a).toFixed(2),
      sideB: Number(b).toFixed(2),
      sideC: Number(c).toFixed(2),
      angleA: angleA,
      angleB: angleB,
      angleC: 180 - angleA - angleB,
    });
  }, [angleA, c]);

  return (
    <>
      <h1 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
        Trappekalkulator
      </h1>

      <div className="mt-1 flex flex-col sm:mt-0 sm:flex-row sm:flex-wrap sm:space-x-6">
        <form style={{ width: "200px" }}>
          <div>
            <label
              htmlFor="c"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Lengde C
            </label>
            <div className="relative mt-2 rounded-md shadow-sm">
              <input
                onChange={(event) => setC(event.target.value)}
                type="number"
                name="c"
                id="c"
                defaultValue="315"
                className="block w-full rounded-md border-0 py-1.5 pl-2 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="c"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              ∠ A
            </label>
            <div className="relative mt-2 rounded-md shadow-sm">
              <input
                onChange={(event) => setAngleA(event.target.value)}
                type="number"
                name="a"
                id="a"
                defaultValue="30"
                className="block w-full rounded-md border-0 py-1.5 pl-2 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <button className="py-2 px-4 bg-purple-500 text-white font-semibold rounded-lg shadow-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-opacity-75">
            Lagre
          </button>
        </form>
      </div>
      <CanvasComponent labels={labels} />
    </>
  );
}
