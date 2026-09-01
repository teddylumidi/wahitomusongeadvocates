import { writeFile } from 'node:fs/promises';
const l = String.fromCharCode(60);
const html = [
  l + '!doctype html>',
  l + 'html lang=\"en\">',
  l + 'head>',
  l + 'meta charset=\"UTF-8\">',
  l + 'meta name=\"viewport\" content=\"width=device-width,initial-scale=1\">',
  l + 'title>Wahito Musonge &amp; Company Advocates LLP' + l + '/title>',
  l + 'meta name=\"description\" content=\"Practical Legal Solutions for Businesses and Individuals in Kenya.\">',
  l + 'link rel=\"icon\" type=\"image/svg+xml\" href=\"/favicon.svg\">',
  l + 'link rel=\"preconnect\" href=\"https://fonts.googleapis.com\">',
  l + 'link rel=\"preconnect\" href=\"https://fonts.gstatic.com\" crossorigin>',
  l + 'link href=\"https://fonts.googleapis.com/css2?family=Cardo:ital,wght@0,400;0,700;1,400&amp;family=Inter:wght@300;400;500;600&amp;display=swap\" rel=\"stylesheet\">',
  l + '/head>' + l + 'body>',
  l + 'div id=\"root\">' + l + '/div>',
  l + 'script type=\"module\" src=\"/src/main.tsx\">' + l + '/script>',
  l + '/body>' + l + '/html>\n',
].join('');
await writeFile(new URL('../index.html', import.meta.url), html);
