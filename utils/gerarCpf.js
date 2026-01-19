function gerarCpf() {
  const cpf = [];

  for (let i = 0; i < 9; i++) {
    cpf.push(Math.floor(Math.random() * 10));
  }

  cpf.push(calcularDigito(cpf));
  cpf.push(calcularDigito(cpf));

  return cpf.join('');
}

function calcularDigito(cpf) {
  let soma = 0;
  let peso = cpf.length + 1;

  for (let i = 0; i < cpf.length; i++) {
    soma += cpf[i] * peso--;
  }

  const resto = soma % 11;
  return resto < 2 ? 0 : 11 - resto;
}

module.exports = { gerarCpf };
