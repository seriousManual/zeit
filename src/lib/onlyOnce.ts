type producer<T> = () => T

function createOnlyOnce<T>(fn: producer<T>) {
    const list = [];

    return function(): T {
        let i = 0
        let result: T

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

export default createOnlyOnce