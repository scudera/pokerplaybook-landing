# Poker Playbook — Landing Page

Landing page SEO-otimizada em Astro para [pokerplaybook.pro](https://pokerplaybook.pro).

## Stack

- **Astro 5** — Static site generation
- **@astrojs/sitemap** — Sitemap automático
- **GA4** — Google Analytics (G-780RN11CRM)
- **SEO** — Meta tags, Open Graph, Twitter Cards, JSON-LD (SoftwareApplication + FAQPage + Organization)

## Desenvolvimento local

```bash
npm install
npm run dev       # localhost:4321
npm run build     # gera dist/
npm run preview   # preview local do build
```

## Deploy na Vercel

### Opção A: Via Vercel Dashboard

1. Criar novo projeto na Vercel
2. Importar este repo do GitHub
3. Framework Preset: **Astro**
4. Deploy

### Opção B: Via Vercel CLI

```bash
npm i -g vercel
vercel --prod
```

Depois do deploy, adicionar o domínio `pokerplaybook.pro` no projeto Vercel:
- Settings → Domains → Add `pokerplaybook.pro` e `www.pokerplaybook.pro`

---

## Migração DNS — Guia Completo

### Arquitetura final

| Domínio | Destino | Tipo |
|---|---|---|
| `pokerplaybook.pro` | Landing page (este projeto) na Vercel | A (ou CNAME) |
| `www.pokerplaybook.pro` | Redirect para `pokerplaybook.pro` | CNAME |
| `app.pokerplaybook.pro` | React SPA (Bolt.new) na Vercel | CNAME |
| `blog.pokerplaybook.pro` | Blog Astro na Vercel | CNAME |

### Passo a passo

#### 1. Criar projeto da landing page na Vercel

- Push este repo para GitHub (ex: `pokerplaybook-landing`)
- Na Vercel, "Add New Project" → importar o repo
- Framework: Astro → Deploy

#### 2. Configurar o app React no subdomínio

No projeto do Bolt.new (app React) na Vercel:
- Settings → Domains
- **Remover** `pokerplaybook.pro` (o domínio raiz)
- **Adicionar** `app.pokerplaybook.pro`

#### 3. Configurar a landing page no domínio raiz

No projeto da landing page na Vercel:
- Settings → Domains
- Adicionar `pokerplaybook.pro`
- Adicionar `www.pokerplaybook.pro` (redirect para o root)

#### 4. Ajustar DNS no painel do Bolt.new

O DNS é gerenciado pelo Bolt.new (name.com). Você precisa ter estes registros:

```
Tipo    Host    Destino                         TTL
A       @       76.76.21.21                     300
CNAME   www     cname.vercel-dns.com            300
CNAME   app     cname.vercel-dns.com            300
CNAME   blog    cname.vercel-dns.com            300
```

**Nota:** O IP `76.76.21.21` é o IP da Vercel para domínios raiz (A record). Se já tiver um A record apontando para outro IP, mude para este. A Vercel cuida do roteamento depois que o domínio está configurado no projeto correto.

#### 5. Verificar propagação

Depois de salvar tudo, esperar 5-30 minutos e verificar:

```bash
# Landing page
curl -sI https://pokerplaybook.pro | head -5

# App
curl -sI https://app.pokerplaybook.pro | head -5

# Blog
curl -sI https://blog.pokerplaybook.pro | head -5
```

#### 6. Google Search Console

A landing page já tem o GA4 (G-780RN11CRM) configurado.
Para o Search Console:
1. Ir em [Google Search Console](https://search.google.com/search-console)
2. Adicionar propriedade `https://pokerplaybook.pro`
3. Verificar via tag HTML (já está no `<head>` — adicionar a meta tag de verificação)
4. Submeter sitemap: `https://pokerplaybook.pro/sitemap-index.xml`

### Checklist pós-migração

- [ ] `pokerplaybook.pro` abre a landing page
- [ ] `app.pokerplaybook.pro` abre o app React
- [ ] `blog.pokerplaybook.pro` continua funcionando
- [ ] Links da landing page para o app funcionam
- [ ] Links do blog para o app apontam para `app.pokerplaybook.pro`
- [ ] GA4 funcionando (verificar em tempo real)
- [ ] Search Console verificado para o domínio raiz
- [ ] Sitemap submetido
- [ ] OG image aparece ao compartilhar link

---

## OG Image

Crie uma imagem `og-image.png` (1200x630px) e coloque em `public/`. Sugestão:
- Fundo escuro (#0a0f0d)
- Logo ♠ em verde (#10b981)
- Texto: "Poker Playbook — Performance Profissional para Torneios MTT"

## Atualizar links no blog

Depois da migração, os CTAs do blog que apontam para `pokerplaybook.pro` devem apontar para `app.pokerplaybook.pro`:

```bash
# No repo do blog, buscar e substituir:
grep -rn "href=\"https://pokerplaybook.pro\"" src/
# Trocar para: href="https://app.pokerplaybook.pro"
```

Manter o link para `pokerplaybook.pro` apenas onde faz sentido (footer, "sobre o projeto", etc.).
