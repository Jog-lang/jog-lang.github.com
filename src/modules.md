---
title: Modules
---

# Modules

## Packages and modules

- A **package** is one folder of `.jog` files (or the module root’s listed sources). It is the unit of namespacing and imports.
- A **module** is a project: a tree of packages with one `jog.mod` at the root.
- Import paths are dot-separated: `import std.list`, `import std.mem as m` (when aliases bind). Circular imports are errors.

The entry point is `fn main()` in the **root package**. `*.test.jog` files load only under `jog test`.

## `jog.mod`

Line-based; `#` comments. Prefer an explicit root on the Zig tip:

```
module hello
root main.jog
```

Richer example:

```
module quickref
version 0.1.0
kind executable
jog 0.2.0
targets windows linux macos
root main.jog
source basics.jog
source types.jog
```

| Directive | Meaning |
|---|---|
| `module <name>` | Required, first; identifier, not `std` |
| `root <file>` | Entry / primary source file |
| `source <file-or-dir>` | Extra sources or a package directory tree |
| `version <semver>` | Default `0.0.0` |
| `kind executable` / `kind library` | Default executable |
| `jog <semver>` | Minimum compiler version |
| `require <module> <path-or-version>` | Dependency |
| `export <package path>` | Library only |
| `link` / `libdir` (+ `.linux` / `.windows` / …) | Native libraries |
| `targets <os>...` | `expect`/`actual` coverage |

A bare `module name` with no `root`/`source` defaults to `{name}.jog`.

The compiler never follows `require` paths by itself. Pass `--module name=dir` (or use [JogBuild](../tools/)) for each dependency.

## `.jogz`

A distributed library is a `.jogz` zip of module source. JogBuild unpacks archives into a cache and points `jog` at source folders. The compiler only reads folders.

## Layout sketch

```
myapp/
  jog.mod
  main.jog
  util.jog
  main.test.jog
  out/          # git-ignore
```
