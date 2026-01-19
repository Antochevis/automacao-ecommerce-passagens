Feature: Compra de passagem deslogado com seguro e compensação de carbono

  Como um usuário visitante do e-commerce
  Quero realizar a compra de uma passagem sem estar logado, com seguro e compensação de carbono
  Para viajar com tranquilidade e de forma sustentável

  Scenario: Realizar compra de passagem sem estar logado com seguro e compensação de carbono
    Given que acesso a página principal do e-commerce
    When realizo a busca por uma passagem
    And seleciono uma viagem disponível
    And seleciono uma poltrona comum
    And seleciono o seguro
    And seleciono compensação de carbono
    And informo os dados do comprador
    And informo os dados do passageiro
    And realizo o pagamento com cartão de crédito
    Then a compra deve ser finalizada com sucesso
