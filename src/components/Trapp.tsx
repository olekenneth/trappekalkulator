import { useState, useEffect, useRef } from "react";
import type { ChangeEventHandler } from "react";

interface InputComponentProps {
  name: string;
  label: string;
  value: number;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  defaultValue?: number;
  disabled?: boolean;
  step: number;
}

const InputComponent = ({
  name,
  label,
  value,
  disabled,
  onChange,
  step = 1,
}: InputComponentProps) => {
  if (!value) return <></>;
  if (!onChange)
    onChange = (event) => {
      value = Number(event.target.value);
    };
  return (
    <div>
      <label
        htmlFor={name}
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        {label}
      </label>
      <div className="relative mt-2 rounded-md shadow-sm">
        {disabled ? (
          <input
            onChange={onChange}
            type="number"
            name={name}
            id={name}
            value={value}
            disabled="disabled"
            className="block w-full disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none rounded-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        ) : (
          <input
            onChange={onChange}
            type="number"
            name={name}
            id={name}
            value={value}
            step={step}
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        )}
      </div>
    </div>
  );
};

interface CanvasComponentProps {
  labels: {
    sideA: number;
    sideB: number;
    sideC: number;
    angleA: number;
    angleB: number;
    angleC: number;
  };
}

const CanvasComponent = ({ labels }: CanvasComponentProps) => {
  const canvasRef = useRef(null);
  useEffect(() => {
    if (labels) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      // const { width, height } = canvas;

      const height = labels.sideB;
      const width = labels.sideA;
      const ratio = window.devicePixelRatio + 1;

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

interface PythagorasProps {
  a?: number;
  b?: number;
  c?: number;
  angleA?: number;
}
const pythagoras = ({ a, b, c, angleA }: PythagorasProps) => {
  const theta = angleA;
  const thetaRadians = (Math.PI * theta) / 180;

  if (!c && a && b) {
    c = Math.sqrt(a * a + b * b);
  }

  if (!a && c) {
    a = c * Math.cos(thetaRadians);
  }

  if (!b && c) {
    b = c * Math.sin(thetaRadians);
  }
  const angleB = 90;

  return {
    a,
    b,
    c,
    angleA,
    angleB,
    angleC: 180 - angleA - angleB,
  };
};

export default function Trapp() {
  const [labels, setLabels] = useState(null);
  const [c, setC] = useState(330);
  const [angleA, setAngleA] = useState(30);
  const [steps, setSteps] = useState(10);
  const [run, setRun] = useState(null);
  const [rise, setRise] = useState(null);

  const updateRun = (value: number) => {
    setRun(value);
    const step = pythagoras({ c: c / steps, a: value, angleA });
    setRise(step.b);
  };

  const updateRise = (value: number) => {
    setRise(value);
    const step = pythagoras({ c: c / steps, b: value, angleA });
    setRun(step.a);
  };

  useEffect(() => {
    // Calc big triangle
    const { a, b, angleB, angleC } = pythagoras({ c, angleA });
    setLabels({
      sideA: Number(a).toFixed(0),
      sideB: Number(b).toFixed(0),
      sideC: Number(c).toFixed(0),
      angleA,
      angleB,
      angleC,
    });

    // Calc step triangle
    const step = pythagoras({ c: c / steps, angleA: angleC });
    setRun(step.b);
    setRise(step.a);
  }, [angleA, c, steps]);

  return (
    <>
      <h1 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
        Stair Calculator
      </h1>

      <div className="mt-1 flex flex-col sm:mt-0 sm:flex-row sm:flex-wrap sm:space-x-6">
        <div>
          <InputComponent
            name="c"
            label="C"
            value={labels?.sideC}
            onChange={(event) => setC(Number(event.target.value))}
          />
          <InputComponent
            name="aA"
            label="∠ A"
            value={labels?.angleA}
            onChange={(event) => setAngleA(Number(event.target.value))}
          />
        </div>
        <div>
          <InputComponent name="b" label="B" value={labels?.sideB} disabled />
          <InputComponent
            name="aB"
            label="∠ B"
            disabled
            value={labels?.angleB}
          />
        </div>
        <div>
          <InputComponent name="a" label="A" value={labels?.sideA} disabled />
          <InputComponent
            name="aC"
            label="∠ C"
            disabled
            value={labels?.angleC}
          />
        </div>
      </div>
      <div className="pt-6 mt-1 flex flex-col sm:mt-0 sm:flex-row sm:flex-wrap sm:space-x-6">
        <div>
          <InputComponent
            name="nof_steps"
            label="Number of steps"
            value={steps}
            onChange={(event) => setSteps(Number(event.target.value))}
          />
        </div>
        <div>
          <InputComponent
            name="run"
            label="Length of run"
            value={run?.toFixed(1)}
            disabled
            onChange={(event) => updateRun(Number(event.target.value))}
          />
        </div>
        <div>
          <InputComponent
            name="rise"
            label="Height of rise"
            value={rise?.toFixed(1)}
            disabled
            onChange={(event) => updateRise(Number(event.target.value))}
          />
        </div>
      </div>
      <div className="block pt-6 w-full">
        Alen 63 = {2 * rise?.toFixed(0)} + {run?.toFixed(0)} ={" "}
        {(2 * rise + run).toFixed(1)}
      </div>
      <CanvasComponent labels={labels} />
    </>
  );
}
