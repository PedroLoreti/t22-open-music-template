import { applyInputRangeStyle } from ".inputRange.js";
// import { albumList } from ".albumsDatabase.js";
import { darkMode } from ".theme.js";
import { fetchMusics } from ".api.js";



function genresLogic() {
    const buttons = document.querySelectorAll('.button__gender');
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            buttons.forEach(btn => btn.classList.remove('black'));

            button.classList.add('black');
        });
    });
}

genresLogic();

function routine() {
    applyInputRangeStyle();
    darkMode();
    leitorInput();
    mostrarMusics();
}

routine()

async function mostrarMusics() {
    try {
      const musics = await fetchMusics();
      renderAlbumCards(musics)
      return musics
    } catch (error) {
      console.error('Falha ao obter dados dos álbuns:', error);
    }
}
  
function createAlbumCard(album) {
    // Criação do elemento de lista
    const card = document.createElement('li');
    card.className = 'list__itens';

    // Criação e configuração da imagem
    const img = document.createElement('img');
    img.src = album.img;
    img.alt = album.title
    card.appendChild(img)

    // Criação e configuração do título

    const title = document.createElement('h3');
    title.innerText = album.title
    title.className = 'title--h3';
    card.appendChild(title)

    // Criação do contêiner de descrição

    const descriptionContainer = document.createElement('div');
    descriptionContainer.className = 'album__container--descricao'

    // Criação e adição do parágrafo com o nome da banda
    const band = document.createElement('p');
    band.innerText = album.band
    descriptionContainer.appendChild(band);

    // Criação e adição do parágrafo com o gênero
    const genre = document.createElement('p')
    genre.innerText = album.genre
    descriptionContainer.appendChild(genre);

    // Adiciona o contêiner de descrição ao card
    card.appendChild(descriptionContainer);

    // Criação do contêiner de preço e botão

    const priceButtonContainer = document.createElement('div');
    priceButtonContainer.className = 'price__button--container';

    // Criação e adição do parágrafo com o preço

    const price = document.createElement('p');
    price.className = 'price';
    price.innerText = `R$ ${album.price}`;
    priceButtonContainer.appendChild(price);

    // Criação e adição do botão

    const button = document.createElement('button');
    button.innerText = 'Comprar';
    button.className = 'button__buy'
    priceButtonContainer.appendChild(button);
    // Adiciona o contêiner de preço e botão ao card

    card.appendChild(priceButtonContainer);

    return card
}

function renderAlbumCards(albums) {
    const container = document.querySelector('ul');
    const input = document.querySelector('#input__range');

    function updateInput() {
        const inputValue = parseFloat(input.value);

        const filteredAlbums = albums.filter(album => album.price <= inputValue);

        container.innerHTML = '';
        filteredAlbums.forEach(album => {
            const albumCard = createAlbumCard(album);
            container.appendChild(albumCard);
        });
    }

    input.addEventListener('input', updateInput);
    updateInput();
 
}



function leitorInput() {
    const input = document.querySelector('#input__range');
    const rangePrice = document.querySelector('.range__price');
    
    function updateRangeValue () {
        const inputValue = input.value;
        rangePrice.textContent = `R$ ${parseFloat(inputValue).toFixed(2)}`;
    }

    input.addEventListener('input', updateRangeValue);

    updateRangeValue();
}
