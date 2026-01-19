@logado
Feature: Compra de passagem logado com compensação de carbono

  Como um usuário autenticado do e-commerce
  Quero realizar a compra de uma passagem estando logado e com compensação de carbono
  Para viajar de forma sustentável

  Scenario: Realizar compra de passagem logado com compensação de carbono
    Given que acesso a página principal do e-commerce
    When realizo a busca por uma passagem
    And seleciono uma viagem disponível
    And seleciono uma poltrona comum
    And seleciono compensação de carbono
    And informo os dados do passageiro
    And realizo o pagamento com cartão de crédito
    Then a compra deve ser finalizada com sucesso
