---
title: Modules
---

# Modules

## Packages and modules

- A **package** is one folder of `.jog` files. It is the unit of namespacing and imports. Files in the same folder share declarations without imports.
- A **module** is a project: a tree of packages with one `jog.mod` at the root. It is the unit of versioning, dependencies, and distribution.
- Import paths are dot-separated from the module root: `import net.http`, `import std.list as lists`. The first segment is `std`, a required module name, or a local folder. Circular imports are errors.

The entry point is `fn main()` in the **root package** (the folder that contains `jog.mod`). `*.test.jog` files belong to their folder’s package and load only under `jog test`.

## `jog.mod`

Line-based; `#` comments. Minimal:

```
module hello
```

v2 (every V1 file is valid v2):

```
module quickref
version 0.1.0
kind executable
jog 0.0.1
```

| Directive | Meaning |
|---|---|
| `module <name>` | Required, first; identifier, not `std` |
| `version <semver>` | Default `0.0.0` |
| `kind executable` / `kind library` | Default executable; libraries have no `main` |
| `jog <semver>` | Minimum compiler version |
| `require <module> <path-or-version>` | Dependency |
| `export <package path>` | Library only; omit to export every package |
| `link <lib>`, `link.windows <lib>` | C libraries |

The compiler never follows `require` paths by itself. Pass `--module name=dir` (or use [JogBuild](tools/)) for each dependency.

## `.jogz`

A distributed library is a `.jogz`: a zip archive with a fixed layout carrying the module source (and later, optionally, objects). JogBuild unpacks archives into a cache and points `jog` at source folders. The compiler only reads folders.

## Layout sketch

```
myapp/
  jog.mod
  main.jog
  util.jog
  main.test.jog
  net/
    http.jog
  out/          # git-ignore
```
