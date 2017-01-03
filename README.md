### xkcd explainer

Now available on the Chrome Web Store!
https://chrome.google.com/webstore/detail/xkcd-explainer/foejkfobkipagoaicljcokpdbdldfmdn

xkcd explainer is a Chrome extension that provides in-depth explanation of xkcd comics. The explanations are retrieved from the explain xkcd wiki (http://www.explainxkcd.com/).

The explanation are taken as wikitext from a comic's respective explain wiki page (available at [explainxkcd.com/[comic id]]()). The wikitext is then parsed into HTML, which is inserted into the xkcd page below the comic. An explanation button toggles the explanation, allowing for it to be nicely concealed until it is needed.

### Wikitext Parser

The wikitext parser can parse the following markup:
- Headings & Subheadings
  - `# Heading` --> `<h1>Heading</h1>`
  - `## Heading` --> `<h2>Heading</h2>`
  - `### Heading` --> `<h3>Heading</h3>`
  - `#### Heading` --> `<h4>Heading</h4>`
  - `##### Heading` --> `<h5>Heading</h5>`
  - `###### Heading` --> `<h6>Heading</h6>`
- Bold & Italics
  - `'''Bold'''` --> `<b>Bold</b>`
  - `''Italics''` --> `<i>Italics</i>`
- Bullet and sub-bullet points
  - Start of each bullet point: `*`
  - Number of `*` determines sub-level
- Internal links (within the explain xkcd wiki)
  - xkcd comic: `[[id: title]]` --> `<a href="https://xkcd.com/id">id: title</a>`
  - explain wiki page: `[[#Heading|Display]]` --> ``
- Wikipedia links (defaulted to English)
  - ``
- Other external links
- Quotes
- Citation needed links (links to comic #285)
  - `{{Citation needed}}`: `<sup>[<a href="/285" title="285" class="mw-redirect"><i>citation needed</i></a>]</sup>`
- Tables

Planned Features/Fixes:
- Some links don't link correctly
- Paragraph tag is being put on headings (by themselves on a line), etc.
- Citations (`<ref>text</ref>` -> [1], [2], ... `<a href=link>[1]</a>`)
