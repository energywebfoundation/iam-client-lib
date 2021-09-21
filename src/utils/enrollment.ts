export function canonizeSig(sig: string) {
    let suffix = sig.substr(130);
    if (suffix === "00") {
        suffix = "1b";
    } else if (suffix === "01") {
        suffix = "1c";
    }
    return sig.substr(0, 130) + suffix;
}
