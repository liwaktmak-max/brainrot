/* ==========================================================================
   BRAINROT — configurador de URL
   --------------------------------------------------------------------------
   Escribe tu URL pública en todos los sitios donde hace falta (meta tags de
   Open Graph, canonical, config.js y sitemap.xml).

   Uso:
     configure.cmd tu-usuario                 → https://tu-usuario.github.io/brainrot/
     configure.cmd tu-usuario mi-repo         → https://tu-usuario.github.io/mi-repo/
     configure.cmd https://midominio.com/     → dominio propio

   Es idempotente: puedes ejecutarlo las veces que quieras.
   ========================================================================== */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const dir = path.dirname(fileURLToPath(import.meta.url));
const [a, b] = process.argv.slice(2);

if (!a) {
  console.error('\n  Falta el usuario de GitHub.\n');
  console.error('  Ejemplos:');
  console.error('    configure.cmd mi-usuario');
  console.error('    configure.cmd mi-usuario mi-repo');
  console.error('    configure.cmd https://midominio.com/\n');
  process.exit(1);
}

const url = (/^https?:\/\//i.test(a) ? a : `https://${a}.github.io/${b || 'brainrot'}/`)
  .replace(/\/?$/, '/');           // siempre con barra final
const base = url.slice(0, -1);     // sin barra final, para componer rutas

const edits = [
  {
    file: 'index.html',
    rules: [
      [/(<link rel="canonical" href=")[^"]*(">)/,                    `$1${url}$2`],
      [/(<meta property="og:url" content=")[^"]*(">)/,               `$1${url}$2`],
      [/(<meta property="og:image" content=")[^"]*(">)/,             `$1${base}/assets/images/og-image.jpg$2`],
      [/(<meta name="twitter:image" content=")[^"]*(">)/,            `$1${base}/assets/images/og-image.jpg$2`]
    ]
  },
  {
    file: 'js/config.js',
    rules: [[/(url:\s*')[^']*(')/, `$1${url}$2`]]
  },
  {
    file: 'sitemap.xml',
    rules: [[/(<loc>)[^<]*(<\/loc>)/, `$1${url}$2`]]
  },
  {
    file: 'robots.txt',
    rules: [[/(Sitemap: ).*/, `$1${base}/sitemap.xml`]]
  }
];

let changed = 0;
for (const { file, rules } of edits) {
  const p = path.join(dir, file);
  if (!fs.existsSync(p)) { console.warn(`  ! no encontrado: ${file}`); continue; }
  const before = fs.readFileSync(p, 'utf8');
  let after = before;
  for (const [re, to] of rules) {
    if (!re.test(after)) console.warn(`  ! patrón no encontrado en ${file}: ${re}`);
    after = after.replace(re, to);
  }
  if (after !== before) { fs.writeFileSync(p, after); changed++; console.log(`  ✓ ${file}`); }
  else console.log(`  = ${file} (ya estaba)`);
}

console.log(`\n  URL publica: ${url}`);
console.log(`  Archivos actualizados: ${changed}\n`);
