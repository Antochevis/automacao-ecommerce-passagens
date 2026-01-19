@estudante
Feature: Compra de passagem com benefício estudante

  Como um usuário estudante autenticado do e-commerce
  Quero realizar a compra de uma passagem com benefício
  Para viajar utilizando o serviço de transporte com desconto

  Scenario: Realizar compra de passagem com benefício estudante
    Given que acesso a página principal do e-commerce
    When realizo a busca por uma passagem
    And seleciono uma viagem disponível
    And seleciono uma poltrona comum
    And uso os dados do comprador para o passageiro e seleciono sou estudante
    And realizo o pagamento com cartão de crédito
    Then a compra deve ser finalizada com sucesso
