import "./App.css";
import { useForm, SubmitHandler } from "react-hook-form";

type Inputs = {
  plateWidth: number;
  biggerMeasuredDistance: number;
  smallerMeasuredDistance: number;
  desiredAngle: number;
};

function App() {
  const { register, handleSubmit, getValues: getValues } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

  // console.log(watch("example")); // watch input value by passing the name of it

  const axleWidth =
    (Number(getValues("biggerMeasuredDistance")) +
      Number(getValues("smallerMeasuredDistance"))) /
    2;
  // calculate current angle

  const atanValueRad = Math.atan(
    (Number(getValues("biggerMeasuredDistance")) -
      Number(getValues("smallerMeasuredDistance"))) /
      2 /
      Number(getValues("plateWidth"))
  );

  const currentAngle = atanValueRad * (180 / Math.PI);

  // ------------------------------------------------------------
  // convert degrees to radians
  const degreesToRadians =
    Number(getValues("desiredAngle")) / 60 / (180 / Math.PI);

  const desiderTanValueRad = Math.tan(degreesToRadians);

  const diffPerSide = desiderTanValueRad * Number(getValues("plateWidth"));

  const desiredBiggerDistance = axleWidth + diffPerSide;
  const desiredSmallerDistance = axleWidth - diffPerSide;

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h2>Zmierzone wartości</h2>
        <div style={{ display: "flex", flexDirection: "row", gap: "10px" }}>
          <label>szerokość płyty</label>
          <input {...register("plateWidth", { required: true })} />
          <span>mm</span>
        </div>
        <div style={{ display: "flex", flexDirection: "row", gap: "10px" }}>
          <label>odl. większa zmierzona</label>
          <input {...register("biggerMeasuredDistance", { required: true })} />
          <span>mm</span>
        </div>
        <div style={{ display: "flex", flexDirection: "row", gap: "10px" }}>
          <label>odl. mniejsza zmierzona</label>
          <input {...register("smallerMeasuredDistance", { required: true })} />
          <span>mm</span>
        </div>
        <div style={{ display: "flex", flexDirection: "row", gap: "10px" }}>
          <label>szerokość osi</label>
          <label>{axleWidth}</label>
          <span>mm</span>
        </div>

        <h2>Sprawdzenie obecnej wartości kąta</h2>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            gap: "10px",
            justifyContent: "flex-end",
          }}
        >
          <label>aktualny kąt</label>
          <label>{currentAngle}</label>
          <span>stopien</span>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            gap: "10px",
            justifyContent: "flex-end",
          }}
        >
          <label>{currentAngle * 60}</label>
          <span>minuty</span>
        </div>

        <h2>Okreslenie odległości dla danego kąta</h2>
        <div style={{ display: "flex", flexDirection: "row", gap: "10px" }}>
          <label>pożądany kąt</label>
          <input {...register("desiredAngle", { required: true })} />
          <span>minuty</span>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            gap: "10px",
            justifyContent: "flex-end",
          }}
        >
          <label>odl. większa docelowa</label>
          <label>{desiredBiggerDistance}</label>
          <span>mm</span>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "row",
            gap: "10px",
            justifyContent: "flex-end",
          }}
        >
          <label>odl. mniejsza docelowa</label>
          <label>{desiredSmallerDistance}</label>
          <span>mm</span>
        </div>

        {/* {errors.exampleRequired && <span>This field is required</span>} */}

        <button type="submit">Oblicz</button>
      </form>
    </>
  );
}

export default App;
