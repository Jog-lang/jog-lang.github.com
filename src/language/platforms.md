---
title: Platforms
status: partial
---

# Platforms

**Status:** partial

Split OS-specific code with file suffixes and `expect` / `actual` function pairs.

## File suffixes

A file named `<name>.<os>.jog` (or `*.test.jog`) loads only when `<os>` matches the build target: `windows`, `linux`, `macos`, `wasm`, or `posix` (linux or macos). The target is the host, or `wasm` for `--target wasm32`. Other dotted names (for example `a.b.jog`) always load.

## expect / actual

```jog
// platform.jog — core, no OS suffix
expect fn platform_name(): str
```

```jog
// platform.windows.jog
actual fn platform_name(): str = "windows"
```

```jog
// platform.posix.jog — linux and macos
actual fn platform_name(): str = "posix"
```

- `expect fn` has no body and lives in a core file.
- `actual fn` supplies the body in an OS-suffixed file; do not put a visibility modifier on it.
- Signatures must match as written.

## V1 notes

- Coverage checks run for the current target (and reported targets when the toolchain accepts a `targets` line on `jog.mod`).
- Prefer testing platform splits with `jog test` on each OS you care about.
