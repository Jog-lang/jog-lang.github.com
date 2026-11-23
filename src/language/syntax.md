---
title: Syntax
---

# Syntax

Declarations start with a keyword; types come after names. Newlines end statements when the last token can end an expression.

```jog
fn add(a: i32, b: i32): i32 {
    return a + b
}

fn square(x: i64): i64 = x * x
```

Visibility defaults to public; `private` / `private(package)` / `private(file)` narrow it.

## Not yet on v2

- `if` as an expression (`return if …`)
- Lambdas / trailing lambdas
- Default parameter values
