import { Position, Toaster} from "@blueprintjs/core";

export const toaster = Toaster.create({
    position: Position.TOP,
});

export function toast(props : any) {
    toaster.show(props);
}