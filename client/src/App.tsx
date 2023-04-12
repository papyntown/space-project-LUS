import React from "react";
import Home from "./pages/Home";
import Space from "./pages/Space";
import Canvas from "./canvas";

const App = () => {
    return (
        <main className="app background-img-container">
            <Canvas />
            <Home />
            <Space />
        </main>
    );
};

export default App;
