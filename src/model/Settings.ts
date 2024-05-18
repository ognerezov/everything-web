export interface Settings {
    layers : number[];
    selected ?:number;
}

export function getSelected(settings :Settings) : number{
    return settings.selected === undefined ? settings.layers.length - 1 : settings.selected;
}

export function getSelectedNumber(settings: Settings) {
    return settings.layers[getSelected(settings)];
}