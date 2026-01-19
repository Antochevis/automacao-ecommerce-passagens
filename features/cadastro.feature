Feature: Cadastro de novo usuário

  Scenario: Realizar cadastro com sucesso
    Given que acesso a página de cadastro
    When preencho os dados do cadastro
    And submeto o formulário de cadastro
    Then o cadastro deve ser realizado com sucesso
