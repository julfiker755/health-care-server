const pink = <T, K extends keyof T>(obj: T, keys: K[]) => {
    const finalObj: Partial<T> = {};
    for (const key of keys) {
        if (obj && Object.hasOwnProperty.call(obj, key)) {
            finalObj[key] = obj[key];
        }
    }
    return finalObj;
};

export default pink