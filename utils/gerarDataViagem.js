function gerarDiaAleatorio(min = 1, max = 28) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function calcularDiaVolta(diaIda, dias = 7, ano = 2026, mes = 0) {
  const data = new Date(ano, mes, diaIda);
  data.setDate(data.getDate() + dias);

  return {
    dia: data.getDate(),
    mes: data.getMonth(),
    ano: data.getFullYear(),
  };
}

function precisaIrParaProximoMes(dia) {
  const hoje = new Date().getDate();
  return dia <= hoje;
}

module.exports = {
  gerarDiaAleatorio,
  calcularDiaVolta,
  precisaIrParaProximoMes,
};
