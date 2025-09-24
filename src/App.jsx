import React from "react";
import Routes from "./Routes";
import { ImageProvider } from "./context/ImageContext";

function App() {
  return (
    <ImageProvider>
      <Routes />
    </ImageProvider>
  );
}

export default App;
