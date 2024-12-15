import React from "react";
import { Badge } from "./ui/badge";

interface BadgeProps {
    label: string;
    type: "success" | "info" | "warning" | "danger" | "primary" | "secondary";
}

const AppStatefulBadge: React.FC<BadgeProps> = ({ label, type }) => {
    const badgeColors: Record<BadgeProps["type"], string> = {
        success: "#4CAF50", // Green
        info: "#2196F3", // Blue
        warning: "#FFC107", // Amber
        danger: "#F44336", // Red
        primary: "#3f51b5", // Purple (Material Design Primary)
        secondary: "#9E9E9E", // Gray
    };

    return <Badge style={{ backgroundColor: badgeColors[type] }}>{label}</Badge>;
};

export default AppStatefulBadge;
