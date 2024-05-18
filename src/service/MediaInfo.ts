export function isMobile(): boolean {
    return !window.matchMedia("(min-width:1023px)").matches;
//    return window.screen.height > window.screen.width; TODO - screen rotation
}