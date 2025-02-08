import { LoaderCircle } from "lucide-react";
import { PropsWithChildren } from "react";

interface Props extends PropsWithChildren {
    loading: boolean;
}

export default function AppPendingIndicator({ loading, children }: Props) {
    return <>{loading ? <LoaderCircle className="animate-spin" /> : children}</>;
}
