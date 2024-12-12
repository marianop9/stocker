export default function AppColorDisplay({ name, hexcode }: { name: string; hexcode: string }) {
    return (
        <div className="flex items-center gap-2 ">
            <span>{name}</span>
            <div
                className="h-4 w-4 rounded-sm "
                style={{
                    backgroundColor: hexcode,
                }}
            ></div>
        </div>
    );
}
