# Poker Playbook — Landing

## Princípios gerais (anexo)

- **Este código é seu:** para que serve e como é construído são decisão sua, e você vai continuar construindo em cima dele. Junte código repetido, remova dead code e corrija problemas que encontrar no caminho em vez de só relatar. Limites: não mude comportamento visível ao usuário (textos PT/EN, UI, regras de coaching) fora do pedido; em runs autônomos (cron L1/L2) mantenha o escopo do item; liste no PR toda mudança fora do pedido, inclusive as pequenas.
- **Ambiguidade:** pergunte só quando a ambiguidade muda o resultado. Senão, siga a leitura mais provável e diga no relato qual foi.
- **Secrets:** nunca hardcoded; usar `.env` (gitignored). Acesso bloqueado via `.claude/settings.json` permissions.deny.
