import { useRef, useState } from "react";
import "./App.css";
import WheelComponent from "react-wheel-of-prizes";

function App() {
  const [options, setOptions] = useState<string[]>([]);
  const [winner, setWinner] = useState<(typeof options)[number]>("");

  const onFinished = (winner: any) => {
    setWinner(winner);
  };

  const generateRandomColors = () => {
    const amountToGenerate = options.length;
    return Array.from(
      { length: amountToGenerate },
      () => "#" + Math.floor(Math.random() * 16777215).toString(16)
    );
  };

  const optionsInputRef = useRef<HTMLInputElement>(null);

  const grouppedOptions = options.reduce((acc, curr) => {
    if (!acc.includes(curr)) {
      acc.push(curr);
    }
    return acc;
  }, [] as string[]);

  const getOptionCount = (option: string) =>
    options.filter((x) => x === option).length;

  return (
    <div>
      <h1 style={{ marginBottom: "50px" }}>Spin to win!</h1>

      <div
        style={{
          display: "flex",
          flexDirection: "row",
          gap: "100px",
          alignItems: "center",
        }}
      >
        <div>
          <h2>Options</h2>
          <div>
            {grouppedOptions.map((option) => (
              <p
                style={
                  winner === option
                    ? { color: "green", fontSize: "150%" }
                    : undefined
                }
              >{`${option} (${Math.floor(
                (getOptionCount(option) / options.length) * 100
              )} %)`}</p>
            ))}
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const value = optionsInputRef?.current?.value;
              if (!value) return;
              setOptions((options) => [...options, value.trim()]);
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "20px",
              }}
            >
              <input
                type="text"
                name="options"
                id="options"
                ref={optionsInputRef}
                style={{ height: "30px" }}
              />
              <button type="submit" style={{ backgroundColor: "green" }}>
                Add
              </button>
              <button
                onClick={() => {
                  setOptions([]);
                  setWinner("");
                }}
                style={{ color: "red" }}
              >
                Reset
              </button>
            </div>
          </form>
        </div>
        {/* {grouppedOptions.length >= 2 ? ( */}
        <WheelComponent
          key={options.length}
          segments={options}
          segColors={generateRandomColors()}
          winningSegment="won 10"
          onFinished={onFinished}
          primaryColor="black"
          contrastColor="white"
          buttonText="Spin"
          isOnlyOnce={false}
          size={290}
          upDuration={100}
          downDuration={1000}
          fontFamily="Arial"
        />
        {/* ) : (
          <p>Add at least 2 options to spin the wheel</p>
        )} */}
      </div>
    </div>
  );
}

export default App;
