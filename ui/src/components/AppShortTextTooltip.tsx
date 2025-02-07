import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";

interface Props {
    text: string;
    maxLen?: number;
}

export default function AppShortTextTooltip({ text, maxLen = 30 }: Props) {
    return (
        <>
            {text.length <= maxLen ? (
                <span>{text}</span>
            ) : (
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger>{text.slice(0, maxLen)}...</TooltipTrigger>
                        <TooltipContent>{text}</TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            )}
        </>
    );
}
