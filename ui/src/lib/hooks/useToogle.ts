import { useState } from "react";

function useToogle(defaultValue = false): [boolean, () => void] {
    const [state, setState] = useState(() => defaultValue);

    function toggleState() {
        setState((prevState) => !prevState);
    }

    return [state, toggleState];
}

export default useToogle;
