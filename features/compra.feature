@skip
@admin @seguro-inativo
Feature: Compra de Passagens

  Scenario: Compra deslogado - básica
    Given que acesso a página principal do e-commerce
    When realizo a busca por uma passagem
    And seleciono uma viagem disponível
    And seleciono uma poltrona comum
    And informo os dados do comprador
    And informo os dados do passageiro
    And realizo o pagamento com cartão de crédito
    Then a compra deve ser finalizada com sucesso

  Scenario: Compra deslogado - apenas seguro
    Given que acesso a página principal do e-commerce
    When realizo a busca por uma passagem
    And seleciono uma viagem disponível
    And seleciono uma poltrona comum
    And seleciono o seguro
    And informo os dados do comprador
    And informo os dados do passageiro
    And realizo o pagamento com cartão de crédito
    Then a compra deve ser finalizada com sucesso

  Scenario: Compra deslogado - apenas carbono
    Given que acesso a página principal do e-commerce
    When realizo a busca por uma passagem
    And seleciono uma viagem disponível
    And seleciono uma poltrona comum
    And seleciono compensação de carbono
    And informo os dados do comprador
    And informo os dados do passageiro
    And realizo o pagamento com cartão de crédito
    Then a compra deve ser finalizada com sucesso

  Scenario: Compra deslogado - seguro e carbono
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

  @logado
  Scenario: Compra logado - básica
    Given que acesso a página principal do e-commerce
    When realizo a busca por uma passagem
    And seleciono uma viagem disponível
    And seleciono uma poltrona comum
    And informo os dados do passageiro
    And realizo o pagamento com cartão de crédito
    Then a compra deve ser finalizada com sucesso

  @logado
  Scenario: Compra logado - apenas seguro
    Given que acesso a página principal do e-commerce
    When realizo a busca por uma passagem
    And seleciono uma viagem disponível
    And seleciono uma poltrona comum
    And seleciono o seguro
    And informo os dados do passageiro
    And realizo o pagamento com cartão de crédito
    Then a compra deve ser finalizada com sucesso

  @logado
  Scenario: Compra logado - apenas carbono
    Given que acesso a página principal do e-commerce
    When realizo a busca por uma passagem
    And seleciono uma viagem disponível
    And seleciono uma poltrona comum
    And seleciono compensação de carbono
    And informo os dados do passageiro
    And realizo o pagamento com cartão de crédito
    Then a compra deve ser finalizada com sucesso

  @logado
  Scenario: Compra logado - seguro e carbono
    Given que acesso a página principal do e-commerce
    When realizo a busca por uma passagem
    And seleciono uma viagem disponível
    And seleciono uma poltrona comum
    And seleciono o seguro
    And seleciono compensação de carbono
    And informo os dados do passageiro
    And realizo o pagamento com cartão de crédito
    Then a compra deve ser finalizada com sucesso

  @estudante
  Scenario: Compra estudante - básica
    Given que acesso a página principal do e-commerce
    When realizo a busca por uma passagem
    And seleciono uma viagem disponível
    And seleciono uma poltrona comum
    And uso os dados do comprador para o passageiro e seleciono sou estudante
    And realizo o pagamento com cartão de crédito
    Then a compra deve ser finalizada com sucesso

  @estudante
  Scenario: Compra estudante - apenas seguro
    Given que acesso a página principal do e-commerce
    When realizo a busca por uma passagem
    And seleciono uma viagem disponível
    And seleciono uma poltrona comum
    And seleciono o seguro
    And uso os dados do comprador para o passageiro e seleciono sou estudante
    And realizo o pagamento com cartão de crédito
    Then a compra deve ser finalizada com sucesso

  @estudante
  Scenario: Compra estudante - apenas carbono
    Given que acesso a página principal do e-commerce
    When realizo a busca por uma passagem
    And seleciono uma viagem disponível
    And seleciono uma poltrona comum
    And seleciono compensação de carbono
    And uso os dados do comprador para o passageiro e seleciono sou estudante
    And realizo o pagamento com cartão de crédito
    Then a compra deve ser finalizada com sucesso

  @estudante
  Scenario: Compra estudante - seguro e carbono
    Given que acesso a página principal do e-commerce
    When realizo a busca por uma passagem
    And seleciono uma viagem disponível
    And seleciono uma poltrona comum
    And seleciono o seguro
    And seleciono compensação de carbono
    And uso os dados do comprador para o passageiro e seleciono sou estudante
    And realizo o pagamento com cartão de crédito
    Then a compra deve ser finalizada com sucesso

  Scenario: Ida e volta deslogado - básica
    Given que acesso a página principal do e-commerce
    When seleciono a opção ida e volta
    And busco uma passagem ida e volta
    And seleciono uma viagem e poltrona na ida
    And seleciono uma viagem e poltrona na volta
    And informo os dados do comprador
    And informo os dados do passageiro
    And realizo o pagamento com cartão de crédito
    Then a compra deve ser finalizada com sucesso

  Scenario: Ida e volta deslogado - apenas seguro
    Given que acesso a página principal do e-commerce
    When seleciono a opção ida e volta
    And busco uma passagem ida e volta
    And seleciono uma viagem e poltrona na ida
    And seleciono uma viagem e poltrona na volta
    And seleciono o seguro
    And informo os dados do comprador
    And informo os dados do passageiro
    And realizo o pagamento com cartão de crédito
    Then a compra deve ser finalizada com sucesso

  Scenario: Ida e volta deslogado - apenas carbono
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

  Scenario: Ida e volta deslogado - seguro e carbono
    Given que acesso a página principal do e-commerce
    When seleciono a opção ida e volta
    And busco uma passagem ida e volta
    And seleciono uma viagem e poltrona na ida
    And seleciono uma viagem e poltrona na volta
    And seleciono o seguro
    And seleciono compensação de carbono
    And informo os dados do comprador
    And informo os dados do passageiro
    And realizo o pagamento com cartão de crédito
    Then a compra deve ser finalizada com sucesso

  @logado
  Scenario: Ida e volta logado - básica
    Given que acesso a página principal do e-commerce
    When seleciono a opção ida e volta
    And busco uma passagem ida e volta
    And seleciono uma viagem e poltrona na ida
    And seleciono uma viagem e poltrona na volta
    And informo os dados do passageiro
    And realizo o pagamento com cartão de crédito
    Then a compra deve ser finalizada com sucesso

  @logado
  Scenario: Ida e volta logado - apenas seguro
    Given que acesso a página principal do e-commerce
    When seleciono a opção ida e volta
    And busco uma passagem ida e volta
    And seleciono uma viagem e poltrona na ida
    And seleciono uma viagem e poltrona na volta
    And seleciono o seguro
    And informo os dados do passageiro
    And realizo o pagamento com cartão de crédito
    Then a compra deve ser finalizada com sucesso

  @logado
  Scenario: Ida e volta logado - apenas carbono
    Given que acesso a página principal do e-commerce
    When seleciono a opção ida e volta
    And busco uma passagem ida e volta
    And seleciono uma viagem e poltrona na ida
    And seleciono uma viagem e poltrona na volta
    And seleciono compensação de carbono
    And informo os dados do passageiro
    And realizo o pagamento com cartão de crédito
    Then a compra deve ser finalizada com sucesso

  @logado
  Scenario: Ida e volta logado - seguro e carbono
    Given que acesso a página principal do e-commerce
    When seleciono a opção ida e volta
    And busco uma passagem ida e volta
    And seleciono uma viagem e poltrona na ida
    And seleciono uma viagem e poltrona na volta
    And seleciono o seguro
    And seleciono compensação de carbono
    And informo os dados do passageiro
    And realizo o pagamento com cartão de crédito
    Then a compra deve ser finalizada com sucesso
