# Instagram — pendência técnica

A API retorna HTTP 500 porque a Meta rejeita o token com OAuthException, código 190. O diagnóstico seguro existente está em `frontend/api/instagram.js`.

A geração de um novo token depende da autorização de Bruno. Esta rodada não altera a integração, credenciais ou o diagnóstico e não implementa renovação automática.

Trabalho futuro, após autorização:

- Implementar a renovação automática segura do token de longa duração, conforme as regras da Meta vigentes no momento da implementação.
- Armazenar o token e sua validade em armazenamento persistente protegido, com acesso restrito ao servidor.
- Executar a renovação de forma agendada, antes do vencimento, com tratamento de falhas e de revogação de acesso.
- Monitorar validade, execução e erros, com alertas sem registrar tokens ou outros segredos.

Esta documentação não contém credenciais.
