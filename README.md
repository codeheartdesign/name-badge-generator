## Prerequisites

- Install [`cairosvg`](https://cairosvg.org)
- Install [`node`](https://node.org)
- Install [`pdftk`](https://www.pdflabs.com/tools/pdftk-server/) _(NOTE: The
  latest version for OSX is [here](https://www.pdflabs.com/tools/pdftk-the-pdf-toolkit/pdftk_server-2.02-mac_osx-10.11-setup.pkg))

## Running it

1. Rename `names-example.csv` to `names.csv`
1. Edit `names.csv` to contain the correct data:
    ```
    first-name,last-name,first-name-size-adjust,last-name-size-adjust
    first-name,last-name,first-name-size-adjust,last-name-size-adjust
    ... etc
    ```
    Where `first-name-size-adjust` is one of `normal`, `small`, `smaller`,
    `smallest`, or `tiny`, and `last-name-size-adjust` is one of `normal`, or
    `small`.
2. Run `node index.js`
3. Run `pdftk pdfs/*.pdf cat output name-badges.pdf`
4. Open `name-badges.pdf`
