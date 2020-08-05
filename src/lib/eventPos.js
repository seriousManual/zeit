export default function eventPos(eventStart, eventEnd, first, last) {
    return [
        ((eventEnd - eventStart) / (last - first)) * 100,
        ((eventStart - first) / (last - first)) * 100		
    ]
}