import { Outlet } from "react-router-dom";
import AppNavBar from "./components/AppNavbar";

function RootLayout() {
    return (
        <div className="h-screen flex flex-col">
            <header className="bg-background">
                <AppNavBar />
            </header>
            <div className="grow bg-muted/50 p-4">
                <div className="bg-background h-full w-full lg:w-3/4 mx-auto rounded p-4">
                    <Outlet />
                </div>
            </div>
        </div>
    );
}

export default RootLayout;
