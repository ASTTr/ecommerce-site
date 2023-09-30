import "./App.css";
import "./assets/styles/common.css";
import { BrowserRouter } from "react-router-dom";
import { AllRoutes } from "./routes/AllRoutes";
import store from "../src/store";

import { Provider } from "react-redux";
import { Navbar } from "./common-Components/Navbar";
import { Footer } from "./common-Components/Footer";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Provider store={store}>
          <AllRoutes />
        </Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
