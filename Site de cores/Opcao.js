document.addEventListener("DOMContentLoaded", function() {
  //Elementos HTML necessários
  const colorDisplay = document.getElementById("colorDisplay");
  const container = document.getElementById("container");
  const levelSelect = document.getElementById("levelSelect");

  let maxErrors = 0; //Variável para controlar a quantidade máxima de erros permitidos
  let currentErrors = 0; //Variável para controlar a quantidade de erros atuais


  function startGame() {
    const selectedLevel = parseInt(levelSelect.value);
    const colors = generateRandomColors(selectedLevel);
    const targetColorIndex = Math.floor(Math.random() * selectedLevel);
    const targetColor = colors[targetColorIndex];

  //Definir a quantidade máxima de erros permitidos com base no nível de dificuldade
  if (selectedLevel === 8) {
    maxErrors = 2;
  } else if (selectedLevel === 16) {
    maxErrors = 4;
  } else if (selectedLevel === 32) {
    maxErrors = 6;
  } else if (selectedLevel === 64) {
    maxErrors = 8;
  } else if (selectedLevel === 128) {
    maxErrors = 10;
  }

  //Elemento HTML que exibe a cor a ser adivinhada
  colorDisplay.textContent = `Choose the color: ${targetColor}`;
  currentErrors = 0; // Zerar a contagem de erros
  container.innerHTML = ''; // Limpa os botões existentes

  for (let color of colors) {
    const button = document.createElement("button");
    button.style.backgroundColor = color;
    button.addEventListener("click", function() {
      if (color === targetColor) {
        alert(`Congratulations! You got it in "${currentErrors + 1}" tries.`);
        updateColors();
      } else {
        currentErrors++; // Incrementar a contagem de erros
        if (currentErrors >= maxErrors) {
          alert(`This color is: "${color}". Game over!`);
          updateColors();
        } else {
          alert(`This color is: "${color}". ${maxErrors - currentErrors} attempts left.`);
          this.style.display = 'none'; // Esconde o botão da cor errada após o clique
        }
      }
    });
    container.appendChild(button);
  }
}

  //Função para gerar cores aleatórias com base na quantidade selecionada
  function generateRandomColors(quantity) {
    const colorNames = ['Black', 'Navy', 'DarkBlue', 'MediumBlue', 'Blue', 'DarkGreen', 'Green', 'Teal', 'DarkCyan', 'DeepSkyBlue',
    'DarkTurquoise', 'MediumSpringGreen', 'Lime', 'SpringGreen', 'Aqua', 'Cyan', 'MidnightBlue', 'DodgerBlue', 'LightSeaGreen', 'ForestGreen',
    'SeaGreen', 'DarkSlateGray', 'DarkSlateGrey', 'LimeGreen', 'MediumSeaGreen', 'Turquoise', 'RoyalBlue', 'SteelBlue', 'DarkSlateBlue', 'MediumTurquoise',
    'Indigo', 'DarkOliveGreen', 'CadetBlue', 'CornflowerBlue', 'RebeccaPurple', 'MediumAquaMarine', 'DimGray', 'DimGrey', 'SlateBlue', 'OliveDrab',
    'SlateGray', 'SlateGrey', 'LightSlateGray', 'LightSlateGrey', 'MediumSlateBlue', 'LawnGreen', 'Chartreuse', 'Aquamarine', 'Maroon', 'Purple',
    'Olive', 'Gray', 'Grey', 'SkyBlue', 'LightSkyBlue', 'BlueViolet', 'DarkRed', 'DarkMagenta', 'SaddleBrown', 'DarkSeaGreen',
    'LightGreen', 'MediumPurple', 'DarkViolet', 'PaleGreen', 'DarkOrchid', 'YellowGreen', 'Sienna', 'Brown', 'DarkGray', 'DarkGrey',
    'LightBlue', 'GreenYellow', 'PaleTurquoise', 'LightSteelBlue', 'PowderBlue', 'FireBrick', 'DarkGoldenRod', 'MediumOrchid', 'RosyBrown', 'DarkKhaki',
    'Silver', 'MediumVioletRed', 'IndianRed', 'Peru', 'Chocolate', 'Tan', 'LightGray', 'LightGrey', 'Thistle', 'Orchid',
    'GoldenRod', 'PaleVioletRed', 'Crimson', 'Gainsboro', 'Plum', 'BurlyWood', 'LightCyan', 'Lavender', 'DarkSalmon', 'Violet',
    'PaleGoldenRod', 'LightCoral', 'Khaki', 'AliceBlue', 'HoneyDew', 'Azure', 'SandyBrown', 'Wheat', 'Beige', 'WhiteSmoke',
    'MintCream', 'GhostWhite', 'Salmon', 'AntiqueWhite', 'Linen', 'LightGoldenRodYellow', 'OldLace', 'Red', 'Fuchsia', 'Magenta',
    'DeepPink', 'OrangeRed', 'Tomato', 'HotPink', 'Coral', 'DarkOrange', 'LightSalmon', 'Orange', 'LightPink', 'Pink',
    'Gold', 'PeachPuff', 'NavajoWhite', 'Moccasin', 'Bisque', 'MistyRose', 'BlanchedAlmond', 'PapayaWhip', 'LavenderBlush', 'SeaShell',
    'Cornsilk', 'LemonChiffon', 'FloralWhite', 'Snow', 'Yellow', 'LightYellow', 'Ivory', 'White'];
    const colors = [];

    for (let i = 0; i < quantity; i++) {
      const randomIndex = Math.floor(Math.random() * colorNames.length);
      const randomColor = colorNames.splice(randomIndex, 1)[0]; // Remove a cor escolhida da lista
      colors.push(randomColor);
    }

    return colors;
  }

  //Função para atualizar as cores após o acerto
  function updateColors() {
    const buttons = document.querySelectorAll("button");
    const targetColor = colorDisplay.textContent.split(": ")[1];

    buttons.forEach(button => {
      button.style.backgroundColor = targetColor;
      button.disabled = true;
    });
  }

  //Evento de mudança no seletor de nível de dificuldade
  levelSelect.addEventListener("change", startGame);

  //Iniciar o jogo ao carregar a página
  startGame();
});