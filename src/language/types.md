---
title: Types
status: partial
---

# Types

**Status:** partial

Scalars, views, arrays, pointers, options, tuples, distinct types, enums — with a few V1 limits around options and distinct-type operators.

## Scalars and conversions

`i8 i16 i32 i64 isize`, `u8 u16 u32 u64 usize`, `f32 f64`, `bool`, `rune`. Untyped integer literals default to `i64`, floats to `f64`. No implicit numeric conversions — use `as`. Checked casts and integer overflow panic at run time.

```jog
fn widen(a: i32): i64 = a as i64
fn narrow(n: i64): u8 = n as u8
```

## `str` and `bytes`

`bytes` is a pointer-plus-length view; `bytes[N]` is inline. `str` is `const bytes` (UTF-8 by convention, not NUL-terminated). Both have `.ptr` and `.len`. Prefer `s.ptr[i]` (unchecked) over `s[i] as u8` in V1.

## Arrays, slices, pointers

`[N]T` fixed arrays, `[]T` slices (bounds-checked), `*T` non-null pointers, `*const T`, `*void`. Field access and method calls auto-dereference.

## Options

`T?` is optional. The practical V1 case is `*T?`. Use `?.`, `?:`, and `!!`. Null narrowing in `if p != null { p.v }` is not checked yet — bind with `p!!` first. Prefer `when` with `Some` / `None` for `*T?`.

## Tuples and distinct types

```jog
fn minmax(a: i64, b: i64): (i64, i64) {
    if a < b { return a, b }
    return b, a
}

type Celsius: f64
fn toF(c: Celsius): f64 = c as f64 * 1.8 + 32.0
```

Convert with `as`. V1 does not inherit operators on distinct types; compare the base type.

## Enums

```jog
enum Shape {
    Circle(r: f64)
    Rect(w: f64, h: f64)
    Empty
}

fn area(s: Shape): f64 = when s {
    Circle(r) -> 3.0 * r * r
    Rect(w, h) -> w * h
    Empty -> 0.0
}
```

Test variants with `is` or `when`, not `==`.

## Intrinsics

Named scalars such as `i32` and `bool` are distinct types in the core prelude, marked `@intrinsic(...)` so the backend treats them as machine integers, floats, or flags. A user file may declare `@intrinsic(int)`, `@intrinsic(float)`, or `@intrinsic(bool)` only for an intrinsic the compiler already implements, with the same width and signedness rules as core.

## Builtins

`size(T)` and `align(T)` are compile-time layout queries (type arguments, not values).
