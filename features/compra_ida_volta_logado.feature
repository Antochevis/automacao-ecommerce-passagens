@logado
Feature: Compra de passagem ida e volta logado

  Como um usuário autenticado do e-commerce
  Quero realizar a compra de uma passagem ida e volta estando logado
  Para viajar com facilidade

  Scenario: Realizar compra de passagem ida e volta logado
    Given que acesso a página principal do e-commerce
    When seleciono a opção ida e volta
    And busco uma passagem ida e volta
    And seleciono uma viagem e poltrona na ida
    And seleciono uma viagem e poltrona na volta
    And informo os dados do passageiro
    And realizo o pagamento com cartão de crédito
    Then a compra deve ser finalizada com sucesso
