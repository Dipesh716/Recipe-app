import "./App.css";
import Header from "./components/Header";
import Content from "./components/Content";

function App() {
  return (
    <>
      <div className="center">
        <div className="main_wrap">
          <Header />
          <Content />
        </div>
      </div>
    </>
  );
}

export default App;
