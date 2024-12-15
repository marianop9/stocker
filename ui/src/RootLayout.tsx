import { Outlet } from "react-router-dom";
import AppNavBar from "./components/AppNavbar";
import { AppContextProvider } from "./lib/app/AppContext";

function RootLayout() {
    return (
        <div className="h-screen flex flex-col">
            <header className="bg-background">
                <AppNavBar />
            </header>
            <div className="grow bg-muted/50 p-4">
                <AppContextProvider>
                    <div className="bg-background h-full w-full lg:w-3/4 mx-auto rounded p-6">
                        <Outlet />
                    </div>
                </AppContextProvider>
            </div>
        </div>
    );
}

export default RootLayout;
