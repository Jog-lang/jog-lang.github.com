# Jog wiki

Public user wiki for **Jog** — the early preview language and toolchain (`jog 0.0.1`).

## Editing

- Edit Markdown under [`src/`](src/). That tree is the canonical content.
- Do not link private design notes or local machine paths from these pages.
- Generated HTML will sit at the repository root (sibling to `src/`). A publish script builds it; do not invent a broken `index.html` by hand.

## Publishing

From a JogDocs checkout that has the site tooling:

```
pwsh site/scripts/publish.ps1
```

That script renders `src/**/*.md` to HTML, copies site assets, and leaves the public tree ready to commit. Then commit the generated HTML together with any `src/` changes in this repository.

## Links

- Organization: https://github.com/Jog-lang
- Compiler: https://github.com/Jog-lang/JogCompiler
- Build tool: https://github.com/Jog-lang/JogBuild
- Language server: https://github.com/Jog-lang/JogLSP
