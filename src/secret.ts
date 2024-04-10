import { Md5 } from "ts-md5"

export function generateSecret() {
    let randomAlphanumeric: string = Math.random().toString(36).slice(2)
    let addedUnix = randomAlphanumeric.concat(Date.now().toString())
    return Md5.hashStr(addedUnix)
}