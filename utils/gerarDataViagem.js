function gerarDiaAleatorio(min = 1, max = 28) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function calcularDiaVolta(diaIda, dias = 7) {
  const hoje = new Date();
  const mesAtual = hoje.getMonth();
  const anoAtual = hoje.getFullYear();
  
  // Se o dia de ida já passou no mês atual, usar próximo mês
  const mesIda = diaIda <= hoje.getDate() ? mesAtual + 1 : mesAtual;
  
  const dataIda = new Date(anoAtual, mesIda, diaIda);
  const dataVolta = new Date(dataIda);
  dataVolta.setDate(dataVolta.getDate() + dias);

  return {
    dia: dataVolta.getDate(),
    mes: dataVolta.getMonth(),
    ano: dataVolta.getFullYear(),
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
