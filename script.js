const random = () => Math.random() * 151 + 1;

const fetchApi = async () => {
  const id = Math.floor(random());
  return await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
    .then((response) => response.json())
    .catch((err) => {
      console.error("Erro ao realizar requisição:", err);
      return null;
    });
};

const getColor = () => {
  let background = JSON.parse(localStorage.getItem("color"));
  let title = document.getElementById("nome");

  if (!background) {
    background = "#000000";
    localStorage.setItem("color", JSON.stringify(background));
  }

  if (background === "#000000" || background === "#0000ff")
    title.style.color = "#ffffff";
  else title.style.color = "#000000";

  document.body.style.backgroundColor = background;
};

const changeColor = () => {
  const color = document.getElementById("select").value;
  if (!color) return;

  localStorage.setItem("color", JSON.stringify(color));

  getColor();
};

getColor();

fetchApi().then((data) => {
  if (!data) return;

  document.getElementById("imagem").src =
    data.sprites.other["official-artwork"].front_default;
  document.getElementById("nome").innerHTML = data.name;
});

window.changeColor = changeColor;
