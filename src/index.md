---
title: Jog
---

# Jog

**Jog** is a low-level language in the same place as C and Go. You work with functions, explicit layouts, and pointers. Memory is managed by hand — no GC. Code is built from structs, methods, and structural interfaces. On top of that sit coroutines, contexts (implicit parameters matched by type), and a few conveniences from Go, Kotlin, and TypeScript.

Jog compiles to C (then clang or gcc), and can also target WebAssembly. Source files use `.jog`. The module manifest is `jog.mod`. Distributed libraries use `.jogz` archives.

This site is the public user wiki for an **early preview**: the seed compiler is `jog 0.0.1`. Expect rough edges; guides and examples describe what V1 actually compiles today.

## Start here

- [Getting started](getting-started/) — build `jog`, write a hello module, run and test
- [Tour](tour/) — short language walkthrough
- [Language](language/) — feature pages with V1 status badges
- [Examples](examples/) — curated programs
- [Tools](tools/) — JogBuild and JogLSP
- [Links](links/) — public repositories

## Taste

```jog
struct Player {
    Entity
    name: str
    hp: i32
}

fn *Player.hit(dmg: i32) {
    self.hp -= dmg
}

enum Event {
    Hit(dmg: i32)
    Heal(hp: i32)
    Quit
}

fn *Player.apply(e: Event) {
    when e {
        Hit(dmg) -> self.hit(dmg)
        Heal(hp) -> self.hp += hp
        Quit -> {}
    }
}
```
