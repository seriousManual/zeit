export default function createOnlyOnce(fn) {
    const list = [];

    return function() {
        let i = 0
        let result

        do {
            result = fn()
            i++;
    
            if (i > 100) {
                return result;
            }
        } while(list.indexOf(result) >= 0);

        list.push(result)
        return result;
    }
}