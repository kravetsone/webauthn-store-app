import App from "./App.svelte";
import "./backend/rpc";
import "./style.css";

const app = new App({
	target: document.getElementById("app"),
});

export default app;
