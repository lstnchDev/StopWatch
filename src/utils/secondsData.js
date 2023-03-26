export const setSeconds = () => {
  const secondsArr = JSON.parse(localStorage.getItem("seconds")) || []
  secondsArr.push(0)
  localStorage.setItem("seconds", JSON.stringify(secondsArr))
};

export const getSeconds = () =>
  JSON.parse(localStorage.getItem("seconds")) || []

export const changeItem = (second, indx) => {
    const secondsArr = JSON.parse(localStorage.getItem("seconds"))
    secondsArr[indx] = second
    localStorage.setItem("seconds", JSON.stringify(secondsArr))
}