import { Header, Main, Footer } from "./components";
import { useEffect, useRef } from "react";
import renderCanvas from "./canvas.js";

const App = () => {
	const canvasRef = useRef();
	const appRef = useRef();
	
	useEffect(() => {
	  const cleanup = renderCanvas(canvasRef.current, appRef.current);
	  return cleanup;
	}, []);
	
	return (
		<div ref={appRef} className="app">
			<canvas ref={canvasRef}></canvas>
			<Header />
			<Main />
			<Footer />
		</div>
	);
};

export default App;
