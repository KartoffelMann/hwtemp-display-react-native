export const printDebug = () => {
    return true && __DEV__
}

export const BetterLog = (file: string, func: string, message: string, enable: boolean) => {
    if (printDebug() && enable)
    {
        console.info(`[${file}] < ${func} > ${message}`)
    }
}

// TODO: Clear cache button