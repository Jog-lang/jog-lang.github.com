---
title: Libraries
---

# Libraries

A Jog **library** is a module with `kind library` in its `jog.mod`. Libraries have no `fn main()`. They export packages for other modules to import, and they ship as **`.jogz`** archives packed by [JogBuild](../tools/).

## What you get

| Piece | Role |
|---|---|
| `kind library` | Module shape: packages + `export` lines, no entry point |
| `.jogz` | Zip archive of the module source (and later, optionally, objects) |
| `require` | Dependency line in the consumer’s `jog.mod` (path to a folder or `.jogz`, or a cached version) |
| `--module name=dir` | How the compiler sees a required module — JogBuild supplies these flags |

The compiler never opens a `.jogz` or follows a `require` path by itself. JogBuild unpacks archives into a cache and invokes `jog` with one `--module` mapping per module in the graph. See [Modules](../modules/) and [Tools](../tools/).

## Minimal consumer

```
module my_app
version 0.1.0
kind executable
require jog_sdl ../deps/jog_sdl-0.1.3.jogz
```

Then import exported packages by their module path, for example `import jog_sdl.sdl`.

## Current libraries

- [SDL](sdl/) — JogSDL: SDL3 bindings for Jog (`module jog_sdl`)
- [Engine](engine/) — JogEngine: systems-based 2D/3D engine (`module jog_engine`), consumes JogSDL via `.jogz`
