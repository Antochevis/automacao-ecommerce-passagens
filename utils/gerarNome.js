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

module.exports = { gerarNomeCompleto };
