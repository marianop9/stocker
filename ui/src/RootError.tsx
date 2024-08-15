import { useNavigate, useRouteError } from "react-router-dom";
import AppNavBar from "./components/AppNavbar";
import { Button } from "./components/ui/button";

interface IMessage {
    message: string;
}

function RootError() {
    const error = useRouteError();
    console.log(error);

    const msg = ((error as IMessage) && (error as IMessage).message) || "";

    const navigate = useNavigate()
    
    return (
        <>
            <header>
                <AppNavBar />
            </header>
            <div className="p-4">
                <div className="bg-red-200 text-red-600 my-4">
                    <p>Ocurrió un error:</p>
                    <p>{msg}</p>
                </div>
                <Button onClick={() => {navigate(-1)}}>Volver</Button>
            </div>
        </>
    );
}

export default RootError;
