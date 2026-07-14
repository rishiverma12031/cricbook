

const spinner = document.querySelector(".spinner");

export const showSpinner = () => spinner.classList.remove("hidden");

export const hideSpinner = () => spinner.classList.add("hidden");
