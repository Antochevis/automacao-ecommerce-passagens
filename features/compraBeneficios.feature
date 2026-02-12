Feature: Compra de Passagens com Benefícios

  # Visualizar botão de benefícios

  Scenario: Visualizar botão de benefícios em viagem intermunicipal deslogado
    Given que acesso a página principal de benefícios
    When realizo a busca por uma passagem intermunicipal
    And seleciono uma viagem disponível
    Then visualizo o botão de benefícios

  @logado
  Scenario: Visualizar botão de benefícios em viagem intermunicipal logado
    Given que acesso a página principal de benefícios
    When realizo a busca por uma passagem intermunicipal
    And seleciono uma viagem disponível
    Then visualizo o botão de benefícios

  @estudante
  Scenario: Visualizar botão de benefícios em viagem intermunicipal logado beneficio estudante
    Given que acesso a página principal de benefícios
    When realizo a busca por uma passagem intermunicipal
    And seleciono uma viagem disponível
    Then visualizo o botão de benefícios

  Scenario: Visualizar botão de benefícios em viagem interestadual deslogado
    Given que acesso a página principal de benefícios
    When realizo a busca por uma passagem interestadual
    And seleciono uma viagem disponível
    Then visualizo o botão de benefícios

  @logado
  Scenario: Visualizar botão de benefícios em viagem interestadual logado
    Given que acesso a página principal de benefícios
    When realizo a busca por uma passagem interestadual
    And seleciono uma viagem disponível
    Then visualizo o botão de benefícios

  @estudante
  Scenario: Visualizar botão de benefícios em viagem interestadual logado beneficio estudante
    Given que acesso a página principal de benefícios
    When realizo a busca por uma passagem interestadual
    And seleciono uma viagem disponível
    Then visualizo o botão de benefícios

  # Visualizar todos os benefícios disponíveis

  Scenario: Visualizar todos os benefícios disponíveis em viagem intermunicipal deslogado
    Given que acesso a página principal de benefícios
    When realizo a busca por uma passagem intermunicipal
    And seleciono uma viagem disponível
    Then visualizo todos os benefícios disponíveis

  @logado
  Scenario: Visualizar todos os benefícios disponíveis em viagem intermunicipal logado
    Given que acesso a página principal de benefícios
    When realizo a busca por uma passagem intermunicipal
    And seleciono uma viagem disponível
    Then visualizo todos os benefícios disponíveis

  @estudante
  Scenario: Visualizar todos os benefícios disponíveis em viagem intermunicipal logado beneficio estudante
    Given que acesso a página principal de benefícios
    When realizo a busca por uma passagem intermunicipal
    And seleciono uma viagem disponível
    Then visualizo todos os benefícios disponíveis

  Scenario: Visualizar todos os benefícios disponíveis em viagem interestadual deslogado
    Given que acesso a página principal de benefícios
    When realizo a busca por uma passagem interestadual
    And seleciono uma viagem disponível
    Then visualizo todos os benefícios disponíveis

  @logado
  Scenario: Visualizar todos os benefícios disponíveis em viagem interestadual logado
    Given que acesso a página principal de benefícios
    When realizo a busca por uma passagem interestadual
    And seleciono uma viagem disponível
    Then visualizo todos os benefícios disponíveis

  @estudante
  Scenario: Visualizar todos os benefícios disponíveis em viagem interestadual logado beneficio estudante
    Given que acesso a página principal de benefícios
    When realizo a busca por uma passagem interestadual
    And seleciono uma viagem disponível
    Then visualizo todos os benefícios disponíveis

  # Visualizar popup ao selecionar benefício inativo

  Scenario: Visualizar popup ao selecionar benefício inativo em viagem intermunicipal deslogado
    Given que acesso a página principal de benefícios
    When realizo a busca por uma passagem intermunicipal
    And seleciono uma viagem disponível
    Then visualizo o popup ao selecionar benefício inativo

  @logado
  Scenario: Visualizar popup ao selecionar benefício inativo em viagem intermunicipal logado
    Given que acesso a página principal de benefícios
    When realizo a busca por uma passagem intermunicipal
    And seleciono uma viagem disponível
    Then visualizo o popup ao selecionar benefício inativo

  @estudante
  Scenario: Visualizar popup ao selecionar benefício inativo em viagem intermunicipal logado beneficio estudante
    Given que acesso a página principal de benefícios
    When realizo a busca por uma passagem intermunicipal
    And seleciono uma viagem disponível
    Then visualizo o popup ao selecionar benefício inativo

  Scenario: Visualizar popup ao selecionar benefício inativo em viagem interestadual deslogado
    Given que acesso a página principal de benefícios
    When realizo a busca por uma passagem interestadual
    And seleciono uma viagem disponível
    Then visualizo o popup ao selecionar benefício inativo

  @logado
  Scenario: Visualizar popup ao selecionar benefício inativo em viagem interestadual logado
    Given que acesso a página principal de benefícios
    When realizo a busca por uma passagem interestadual
    And seleciono uma viagem disponível
    Then visualizo o popup ao selecionar benefício inativo

  @estudante
  Scenario: Visualizar popup ao selecionar benefício inativo em viagem interestadual logado beneficio estudante
    Given que acesso a página principal de benefícios
    When realizo a busca por uma passagem interestadual
    And seleciono uma viagem disponível
    Then visualizo o popup ao selecionar benefício inativo
