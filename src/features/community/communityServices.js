export function addStorage(value) {
    localStorage.setItem("community", JSON.stringify(value))
}

export function getStorage() {
    return  JSON.parse(localStorage.getItem("community")) || []
}

export function isCommunityFull() {
    const list = getStorage()
    return list.length >= 10
}

export function isExistInCommunity (name){
    const list = getStorage()
    return !!list.filter(username => username === name).length
}