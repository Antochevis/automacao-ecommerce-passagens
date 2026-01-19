function gerarTelefone() {
  const ddd = Math.floor(Math.random() * 90) + 10;
  const numero = Math.floor(100000000 + Math.random() * 900000000);

  return `${ddd}${numero}`;
}

module.exports = { gerarTelefone };
