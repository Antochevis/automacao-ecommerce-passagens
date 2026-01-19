function gerarRg() {
  const rg = Array.from({ length: 9 }, () => Math.floor(Math.random() * 10)).join('');
  return rg;
}

module.exports = { gerarRg };
