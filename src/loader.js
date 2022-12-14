

const mask = document.querySelector('.mask')


window.addEventListener('load', () => {
    mask.classList.add('hide')
} )

// document.addEventListener('DOMContentLoaded', () => {
//     const content = document.querySelectorAll('.photo-card');
//     Array.from(content).forEach((card) => {
//         card.onload = () => {
//             if (content.length) {
//                 mask.classList.add('hide');
//             }
//         }
//     })
// } )