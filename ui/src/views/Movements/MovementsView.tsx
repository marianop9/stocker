import MovementForm from "./MovementForm";

function MovementsView() {
    return (
        <>
            <h1>Movimientos</h1>
            <div className="w-1/2 mx-auto">
                <MovementForm />
            </div>
        </>
    );
}

export default MovementsView;
