---
title: Platforms
---

# Platforms

`expect fn` in a core file; `actual fn` in `*.windows.jog` / `*.linux.jog` / `*.macos.jog` / `*.posix.jog`.

```jog
expect fn platform_name(): str
```

```jog
actual fn platform_name(): str = "posix"
```

`jog.mod` may list `targets windows linux macos` for coverage. Prefer comparing `.len` (or bytes) until `str ==` is solid.
