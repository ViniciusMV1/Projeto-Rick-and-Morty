const charsContainer = document.querySelector('.chars-container');
const searchInput = document.querySelector('#search');
const speciesFilter = document.querySelector('#species');
const genderFilter = document.querySelector('#gender');
const statusFilter = document.querySelector('#status');
const loadMoreButton = document.querySelector('#load-more');

const API = 'https://rickandmortyapi.com/api';
const defaultFilters = {
  name: '',
  species: '',
  gender: '',
  status: '',
  page: 1,
};

async function getCharacters({name, species, gender, status, page = 1 }) {
  const response = await fetch(`${API}/character?name=${name}&species=${species}&gender=${gender}&status=${status}&page=${page}`);

  const characters = await response.json();
  return characters.results;
}

async function render({characters}) {
  characters.forEach((character) => {
    return charsContainer.innerHTML += `
      <div class="char" onclick="link(${character.id})" data-id="${character.id}">
        <img src="${character.image}" alt="">
        <div class="char-info">
          <h3>${character.name}</h3>
          <span>${character.species}</span>
        </div>
      </div>
    `;
  });
}

function link(characterId) {
  window.location.href = `info.html?id=${characterId}`;
}

function handFilterChange(type, event) {
  return async () => {
    defaultFilters[type] = event.target.value;
    charsContainer.innerHTML = '';
    const characters = await getCharacters(defaultFilters);
    render({characters});
  };
}

async function handLoadMore() {
  defaultFilters.page += 1;
  const characters = await getCharacters(defaultFilters);
  render({characters});
}

function addListeners() {
  speciesFilter.addEventListener('change', async (event) => {
    handFilterChange('species', event)();
  });
  
  genderFilter.addEventListener('change', async (event) => {
    handFilterChange('gender', event)();
  });
  
  statusFilter.addEventListener('change', async (event) => {
    handFilterChange('status', event)();
  }); 
  
  searchInput.addEventListener('keyup', async (event) => {
    handFilterChange('name', event)();
    console.log(event.target.value);
  });

  loadMoreButton.addEventListener('click', handLoadMore);
}
 

async function main() {
  const characters = await getCharacters(defaultFilters);
  addListeners();
  render({characters});
}

main();
