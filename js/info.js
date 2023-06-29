const API = 'https://rickandmortyapi.com/api';

function getCharacterInfo(characterId) {
  return fetch(`${API}/character/${characterId}`)
    .then(response => response.json())
    .then(data => {
      const characterNameElement = document.getElementById('character-name');
      characterNameElement.textContent = data.name;

      const characterImageElement = document.getElementById('character-image');
      characterImageElement.src = data.image;
      characterImageElement.alt = data.name;

      const characterStatusElement = document.getElementById('character-status');
      characterStatusElement.textContent = data.status;

      const characterGenderElement = document.getElementById('character-gender');
      characterGenderElement.textContent = data.gender;

      const characterSpeciesElement = document.getElementById('character-species');
      characterSpeciesElement.textContent = data.species;

    })
    .catch(error => {
      console.error('Erro ao obter informações do personagem:', error);
    });
}

function main() {
  const urlParams = new URLSearchParams(window.location.search);
  const characterId = urlParams.get('id');

  if (characterId) {
    getCharacterInfo(characterId);
  } else {
    console.error('ID do personagem não fornecido na URL.');
  }

  const backButton = document.getElementById('back-button');
  backButton.addEventListener('click', () => {
    window.history.back();
  });
}

main();