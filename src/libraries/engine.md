---
title: JogEngine
---

# JogEngine

[JogEngine](https://github.com/Jog-lang/JogEngine) is a systems-based Jog game engine (`module jog_engine`, `kind library`). It focuses on **CPU 2D and 3D** first; GPU present goes behind a `PresentBackend` so the simulation does not rewrite when the present path changes.

## Relationship to JogSDL

JogEngine **consumes JogSDL via `.jogz`**, not by compiling against JogSDL source trees. Demos still link the native SDL3 library (`link.*` / `libdir.*`); the archive carries Jog packages only.

Import style matches other directory-source libraries: `jog_engine.engine.<pkg>` (for example `import jog_engine.engine.core`), plus `import jog_sdl.sdl` for window and input.

## Architecture (summary)

Not a full ECS. Systems, entities, and a frame message queue own the loop.

| Layer | Owns |
|---|---|
| JogSDL | Window, poll input, present, texture upload, audio stream, SDL_GPU/Vulkan |
| JogEngine | Frame loop, jobs, CPU 2D/3D, collision, messaging, assets, math/time |
| Demos | Content that proves milestones |

Packages include `engine.core`, `engine.world`, `engine.app`, `engine.math`, `engine.time`, `engine.assets`, `engine.render2d`, `engine.render3d`, `engine.collision`, `engine.msg`, `engine.jobs`, and `engine.audio`.

## Current phase

Phases **0–5** are landed: tooling, foundation, CPU 2D, CPU 3D soft-mesh, async IO/audio streaming, and GPU `PresentBackend` smoke (empty submit). Follow-on work includes textured GPU mesh present and core systems (`Clock` / `System` / `PhaseQueue`, `engine.world`, `engine.app`).

Example demos in the repo: `examples/core_loop`, `examples/tilemap2d`, `examples/raycaster`, `examples/streaming`, `examples/present_gpu`, `examples/dust2_fps`, plus `examples/raycaster-emscripten`.

## Repo

[https://github.com/Jog-lang/JogEngine](https://github.com/Jog-lang/JogEngine)
