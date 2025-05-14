const amountInput = document.getElementById("amount");
const fromSelect = document.getElementById("from");
const toSelect = document.getElementById("to");
const resultDiv = document.getElementById("result");

const apiKey = "8b0fcba7fac9f794fb2726f8";
const moedas = ["USD", "BRL", "EUR", "GBP", "JPY", "ARS", "CAD", "AUD"];

function preencherSelects() {
  moedas.forEach(moeda => {
    const optionFrom = document.createElement("option");
    const optionTo = document.createElement("option");
    optionFrom.value = optionTo.value = moeda;
    optionFrom.textContent = optionTo.textContent = moeda;
    fromSelect.appendChild(optionFrom);
    toSelect.appendChild(optionTo);
  });

  fromSelect.value = "USD";
  toSelect.value = "BRL";
}

async function converter() {
  const valor = parseFloat(amountInput.value);
  const from = fromSelect.value;
  const to = toSelect.value;

  if (!valor || isNaN(valor)) {
    resultDiv.textContent = "Resultado: -";
    return;
  }

  const url = `https://v6.exchangerate-api.com/v6/${apiKey}/pair/${from}/${to}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.result === "success") {
      const taxa = data.conversion_rate;
      const convertido = (valor * taxa).toFixed(2);
      resultDiv.textContent = `Resultado: ${valor} ${from} = ${convertido} ${to}`;
    } else {
      resultDiv.textContent = "Erro na conversão.";
    }
  } catch (error) {
    resultDiv.textContent = "Erro ao acessar a API.";
  }
}

// Atualiza em tempo real
amountInput.addEventListener("input", converter);
fromSelect.addEventListener("change", converter);
toSelect.addEventListener("change", converter);

preencherSelects();
