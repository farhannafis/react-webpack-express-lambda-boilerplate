import logo from "./logo.svg";
import "./App.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          React + Webpack web app with Express server run on AWS Lambda
          boilerplate
        </p>
        <a
          className="App-link"
          href="https://github.com/farhannafis/react-webpack-express-lambda-boilerplate"
          target="_blank"
          rel="noopener noreferrer"
        >
          Visit repo
        </a>
      </header>
    </div>
  );
}

export default App;
