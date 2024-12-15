import React, { useMemo } from "react";
import { Badge } from "./ui/badge";
import { MovementType } from "@/models/movements";
import { getMovementType } from "@/lib/formatters";

interface ColorfulBadgeProps {
    index: number;
    label: string;
}

const stateColors = [
    "#009688", // Teal
    "#9C27B0", // Purple
    "#FFC107", // Amber
    "#673AB7", // Deep Purple
    "#2196F3", // Blue
    "#E91E63", // Pink
];
const AppColorfulBadge: React.FC<ColorfulBadgeProps> = ({ index, label }) => {
    const color = useMemo(() => {
        if (index > 5) {
            console.log(`app color badge currently has 6 variants (received variant ${index})`);
            return stateColors[0];
        }

        return stateColors[index];
    }, [index]);

    return <Badge style={{ backgroundColor: color }}>{label}</Badge>;
};

export function AppMovementTypeBadge({ type }: { type: MovementType }) {
    const i = type === "IN" ? 0 : 1;

    return <AppColorfulBadge index={i} label={getMovementType(type)} />;
}
