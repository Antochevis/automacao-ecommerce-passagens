Feature: Cancelamento de passagens

  @logado
  Scenario: Cancelar poltrona individual
    Given que estou logado e tenho uma compra realizada
    When acesso meus pedidos
    And seleciono uma passagem para cancelar
    And cancelo uma poltrona individual
    Then o cancelamento deve ser realizado com sucesso
    And devo receber uma mensagem de confirmação

  @logado
  Scenario: Cancelar por trecho (múltiplas poltronas)
    Given que estou logado e tenho uma compra realizada
    When acesso meus pedidos
    And seleciono uma passagem com múltiplas poltronas
    And cancelo todo o trecho
    Then o cancelamento do trecho deve ser realizado com sucesso
    And devo receber uma mensagem de reembolso
