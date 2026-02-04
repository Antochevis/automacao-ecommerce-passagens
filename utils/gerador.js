// CPF Generator
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

// Name Generator
function gerarNomeCompleto() {
  const nomes = [
    'Joao', 'Maria', 'Carlos', 'Ana', 'Pedro', 'Juliana',
    'Lucas', 'Fernanda', 'Roberto', 'Beatriz', 'Felipe', 'Gabriela',
    'Antonio', 'Camila', 'Ricardo', 'Amanda', 'Paulo', 'Vanessa',
    'Diego', 'Mariana', 'Thiago', 'Isabela', 'Rafael', 'Larissa'
  ];
  
  const sobrenomes = [
    'Silva', 'Santos', 'Oliveira', 'Pereira', 'Costa',
    'Martins', 'Gomes', 'Rocha', 'Carvalho', 'Ferreira',
    'Alves', 'Barbosa', 'Cardoso', 'Dias', 'Monteiro'
  ];

  const nome = nomes[Math.floor(Math.random() * nomes.length)];
  const sobrenome = sobrenomes[Math.floor(Math.random() * sobrenomes.length)];

  return `${nome} ${sobrenome}`;
}

// RG Generator
function gerarRg() {
  const rg = Array.from({ length: 9 }, () => Math.floor(Math.random() * 10)).join('');
  return rg;
}

// Telefone Generator
function gerarTelefone() {
  const ddd = Math.floor(Math.random() * 90) + 10;
  const numero = Math.floor(100000000 + Math.random() * 900000000);

  return `${ddd}${numero}`;
}

// Day Generators
function gerarDiaAleatorio(min = 1, max = 28) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function calcularDiaVolta(diaIda, dias = 7) {
  const hoje = new Date();
  const mesAtual = hoje.getMonth();
  const anoAtual = hoje.getFullYear();
  
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
  gerarCpf,
  gerarNomeCompleto,
  gerarRg,
  gerarTelefone,
  gerarDiaAleatorio,
  calcularDiaVolta,
  precisaIrParaProximoMes,
};
