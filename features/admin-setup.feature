Feature: Setup de Autenticação do Admin

  Scenario: Autenticar no admin com 2FA
    Given que estou autenticado no admin

  Scenario: Ativar seguro padrão
    Given que estou autenticado no admin
    When eu defino seguro padrão como "ativo"
    Then o seguro padrão deve estar "ativo"

  Scenario: Desativar seguro padrão
    Given que estou autenticado no admin
    When eu defino seguro padrão como "inativo"
    Then o seguro padrão deve estar "inativo"
