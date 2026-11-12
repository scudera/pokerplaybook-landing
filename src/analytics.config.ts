// Google Analytics 4: ponto único de configuração deste site (#347).
// O ID pode ser trocado pela env var PUBLIC_GA_ID sem editar código; o default
// é a property ativa compartilhada com app e landing/blog.
const GA_ID_DEFAULT = 'G-7ZRQS4R3GQ';
const GA_ID_PATTERN = /^G-[A-Z0-9]+$/;

function resolveGaId(envValue: string | undefined): string {
  const id = envValue?.trim();
  if (!id) return GA_ID_DEFAULT;
  if (!GA_ID_PATTERN.test(id)) throw new Error(`PUBLIC_GA_ID inválido: "${id}" (esperado G-XXXXXXX)`);
  return id;
}

export const GA_ID = resolveGaId(import.meta.env.PUBLIC_GA_ID);

// Domínios do cross-domain linker (iguais em app, landing e blog).
export const GA_LINKER_DOMAINS = ['pokerplaybook.pro', 'blog.pokerplaybook.pro', 'app.pokerplaybook.pro'];
