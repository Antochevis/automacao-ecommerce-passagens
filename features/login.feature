@skip
Feature: Login no e-commerce

Como um cliente do e-commerce
Quero realizar login com minhas credenciais
Para acessar minha conta e realizar compras

Scenario: Login com sucesso
    Given que acesso a tela de login do e-commerce
    When informo um CPF e senha válidos
    And realizo o login
    Then devo ser redirecionado e autenticado com sucesso

Scenario: Login com senha inválida
    Given que acesso a tela de login do e-commerce
    When informo um CPF válido e uma senha inválida
    And realizo o login
    Then devo ver uma mensagem de erro de autenticação
