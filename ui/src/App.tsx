import { Outlet } from "react-router-dom";
import AppNavBar from "./components/AppNavbar";

function App() {
  return (
    <>
      <header>
        <AppNavBar />
      </header>
      <div className="p-4">
        <Outlet />
      </div>
    </>
  );
}

export default App;
