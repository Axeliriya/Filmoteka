import refs from "./refs"
import getMarkupModal from './modal-markup'
import apiService from './apiService'
const {closeModal,overlay, galleryRef} = refs


closeModal.addEventListener('click', toggleModal)
galleryRef.addEventListener('click', getCardMove)

function toggleModal() {
    overlay.classList.toggle('is-hidden')
}

function getCardMove(event) {
    event.preventDefault();
    console.dir(event.target);

    toggleModal()
    apiService.queryMove("527774").then(array=>getMarkupModal(array))
}