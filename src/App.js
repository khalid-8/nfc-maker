import "./App.css";
import { ContextManager } from "./context";
import { Header } from "./components";
import AppRoutes from "./routes/router";

function App() {
    return (
        <ContextManager>
            <div className="App">
                <Header />
                <AppRoutes />
            </div>
        </ContextManager>
    );
}

export default App;
