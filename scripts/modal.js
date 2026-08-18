
const modalElement = document.querySelector(".modal");

const name = document.querySelector(".modal__name");
const nationality = document.querySelector(".modal__nationality"); 
const dob = document.querySelector(".modal__dob");
const pob = document.querySelector(".modal__pob");
const gender = document.querySelector(".modal__gender");
const ethnicity = document.querySelector(".modal__ethnicity");
const height = document.querySelector(".modal__height");
const sport = document.querySelector(".modal__sport");
const team = document.querySelector(".modal__team");
const IPLTeam = document.querySelector(".modal__IPLTeam");
const position = document.querySelector(".modal__position");
const side = document.querySelector(".modal__side");
const status = document.querySelector(".modal__status");
const image = document.querySelector(".modal__image");
const description = document.querySelector(".modal__description");

export const showModal = () => modalElement.classList.remove("hidden");

export const hideModal = () => modalElement.classList.add("hidden");

export const showSkeletonModal = () => {

    name.classList.add("skeleton-name");
    nationality.classList.add("skeleton-text");
    dob.classList.add("skeleton-text");
    pob.classList.add("skeleton-text");
    gender.classList.add("skeleton-text");
    ethnicity.classList.add("skeleton-text");
    height.classList.add("skeleton-text");
    sport.classList.add("skeleton-text");
    team.classList.add("skeleton-text");
    image.classList.add("skeleton-image");
    description.classList.add("skeleton-description");

}

export const hideSkeletonModal = () => {

    name.classList.remove("skeleton-name");
    nationality.classList.remove("skeleton-text");
    dob.classList.remove("skeleton-text");
    pob.classList.remove("skeleton-text");
    gender.classList.remove("skeleton-text");
    ethnicity.classList.remove("skeleton-text");
    height.classList.remove("skeleton-text");
    sport.classList.remove("skeleton-text");
    team.classList.remove("skeleton-text");
    image.classList.remove("skeleton-image");
    description.classList.remove("skeleton-description");

}

export const populateModal = (modal) => {

    if( typeof modal === "string" ) {

        description.textContent = modal;

        return;
        
    }

    name.textContent = modal.name;
    nationality.textContent = modal.nationality;
    dob.textContent = modal.dateOfBirth;
    pob.textContent = modal.placeOfBirth;
    gender.textContent = modal.gender;
    ethnicity.textContent = modal.ethnicity;
    height.textContent = modal.height;
    sport.textContent = modal.sport;
    team.textContent = modal.team;
    IPLTeam.textContent = modal.IPLTeam;
    position.textContent = modal.position;
    side.textContent = modal.side;
    status.textContent = modal.status;
    image.src = modal.image;
    image.alt = modal.name;
    description.textContent = modal.description;

}