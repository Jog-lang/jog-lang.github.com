---
title: Functions
---

# Functions

```jog
fn add(a: i32, b: i32): i32 {
    return a + b
}

fn square(x: i64): i64 = x * x

fn divmod(a: i64, b: i64): (i64, i64) {
    return a / b, a % b
}
```

Packs: `fn sum(...i64: xs): i64`.

## Not yet on v2

- Lambdas / function values / trailing lambdas
- Default and some named-argument forms
- `if` / `when` as arbitrary expressions in all positions
