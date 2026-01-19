Feature: Compra de passagem ida e volta deslogado com compensação de carbono

  Como um usuário visitante do e-commerce
  Quero realizar a compra de uma passagem ida e volta com compensação de carbono
  Para viajar de forma sustentável

  Scenario: Realizar compra de passagem ida e volta deslogado com compensação de carbono
    Given que acesso a página principal do e-commerce
    When seleciono a opção ida e volta
    And busco uma passagem ida e volta
    And seleciono uma viagem e poltrona na ida
    And seleciono uma viagem e poltrona na volta
    And seleciono compensação de carbono
    And informo os dados do comprador
    And informo os dados do passageiro
    And realizo o pagamento com cartão de crédito
    Then a compra deve ser finalizada com sucesso
