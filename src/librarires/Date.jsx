
export function formatDatetime(isoValue) {
    return isoValue.split("Z").shift()
}