---
title: JogSDL
---

# JogSDL

[JogSDL](https://github.com/Jog-lang/JogSDL) is hand-written **SDL3 3.4.18** bindings for Jog (`module jog_sdl`, `kind library`). Apps import the idiomatic layer only; raw C symbols stay private.

## Import path

Use **`jog_sdl.sdl`** (and its subpackages). Example: `import jog_sdl.sdl` or `import jog_sdl.sdl.window`.

| Layer | What it is |
|---|---|
| `sdl.*` | Public Jog API: handles, enums, flags, `SDLError?` results |
| `sdl3.*` | Unexported raw `@link("SDL3")` / `SDL_*` externs |

API docs live **in-module** (comments on public `sdl.*` declarations). The official C reference is the [SDL3 wiki](https://wiki.libsdl.org/SDL3).

## Layout

- `kind library` with directory `source` trees (`sdl`, `sdl3`) and `export sdl` / `export sdl.<sub>`
- KEEP packages for the main surface: window, render, events, input, timer (plus audio/gpu helpers)
- `jog-build pack` produces `jog_sdl-<version>.jogz`
- Native demos keep `link.* SDL3` and `libdir.*` pointing at an SDL3 install (the `.jogz` carries Jog source, not the C library)

## Platforms

**Linux x86-64 first.** Emscripten demos live under `examples/*-emscripten` (for example `examples/window-emscripten`) and build with `--target wasm32-emscripten`.

## Short window example

Copied from JogSDL `examples/window/main.jog` (not re-checked here — this environment has no v2 `jog`).

```jog
import jog_sdl.sdl

val LIMIT_MS: u64 = 1500

fn main() {
    if Init(InitFlag.Video) != null {
        panic("SDL Init failed\n")
    }

    val (win, win_err) = CreateWindow(c"JogSDL v2", 640, 480, WindowFlag.Resizable)
    if (win_err != null || !win.ok()) {
        panic("SDL CreateWindow failed\n")
    }

    val (ren, ren_err) = win.create_renderer()
    if (ren_err != null || !ren.ok()) {
        panic("SDL CreateRenderer failed\n")
    }

    var ev = make_event_buf()
    var running = 1
    var rect = frect(220.0 as f32, 160.0 as f32, 200.0 as f32, 160.0 as f32)
    val start = GetTicks()

    while (running != 0) {
        while (ev.poll()) {
            val kind = ev.kind()
            if (kind == EventTypeId.Quit || kind == EventTypeId.WindowCloseRequested) {
                running = 0
            }
            if (kind == EventTypeId.KeyDown) {
                if (ev.scancode() == Scancode.Escape) {
                    running = 0
                }
            }
        }

        if (running == 0) {
            break
        }
        if (GetTicks() - start >= LIMIT_MS) {
            break
        }

        ren.set_draw_color(color(12, 48, 64, 255))
        ren.clear()
        ren.set_draw_color(color(80, 200, 180, 255))
        ren.fill_rect(&rect)
        ren.present()
        Delay(16)
    }

    ren.destroy()
    win.destroy()
    Quit()
    print("window demo exit\n")
}
```

A matching `jog.mod` path-requires the library (folder or `.jogz`) and links SDL3:

```
module window_demo
version 0.1.0
require jog_sdl ../path/to/jog_sdl   # or a jog_sdl-*.jogz
link.linux SDL3
libdir.linux ../path/to/sdl3/lib
```

Build with JogBuild from the example folder (`jog-build build` / `jog-build run`), with `JOG` pointing at the v2 compiler.

## Repo

[https://github.com/Jog-lang/JogSDL](https://github.com/Jog-lang/JogSDL)
