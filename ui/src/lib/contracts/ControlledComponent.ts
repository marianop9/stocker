export default interface ControlledComponent {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}
