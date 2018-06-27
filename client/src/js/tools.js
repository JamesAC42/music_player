export const shuffle = (list) => {
    let newArray = [...list];
    let j = 0;
    let temp = null;
    for(let i = newArray.length - 1; i > 0; i-=1) {
        j = Math.floor(Math.random() * (i + 1));
        temp = newArray[i];
        newArray[i] = newArray[j];
        newArray[j] = temp;
    }
    return newArray;
}

export const decode = (name) => {
    let text = document.createElement("textarea");
    text.innerHTML = name;
    return text.value;
}