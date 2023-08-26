// Add imports above this line
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import { galleryItems } from './gallery-items.js';
// Change code below this line

console.log(galleryItems);

const listEl = document.querySelector('.gallery');

const renderList = (arr, container) => {
  const markup = arr
    .map(
      item =>
        `<li class="gallery__item">
  <a class="gallery__link" href="${item.original}">
    <img
      class="gallery__image"
      src="${item.preview}"
      data-source="${item.original}"
      alt="${item.description}"
    />
  </a>
</li>`
    )
    .join('');

  container.insertAdjacentHTML('beforeend', markup);
};

renderList(galleryItems, listEl);

listEl.addEventListener('click', handleListClick);

function handleListClick(event) {
  event.preventDefault();
  if (event.target.className !== 'gallery__image') {
    return;
  }

  const currentPicture = event.target.dataset.source;
  const currentAltPicture = event.target.alt;

  const modalInstance = new SimpleLightbox('.gallery a', {
    captions: true,
    captionsData: 'alt',
    captionDelay: 250,
    captionPosition: 'bottom',
    captionSelector: 'img',
  });

  modalInstance.show();

  document.addEventListener('keydown', onClickEsc);

  function onClickEsc(event) {
    if (event.code === `Escape`) {
      modalInstance.close();
      document.removeEventListener('keydown', onClickEsc);
    }
  }
}
