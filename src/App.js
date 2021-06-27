import "./App.css";
import WithPacker from "./withPacker";
import WithoutPacker from "./withoutPacker";

function App() {
  return (
    <div style={{ textAlign: "center" }}>
      <div>
        <h1>With Packer</h1>
        <WithPacker />
      </div>
      <div>
        <h1>Without Packer</h1>
        <WithoutPacker />
      </div>
    </div>
  );
}

export default App;
