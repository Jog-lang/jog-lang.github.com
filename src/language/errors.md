---
title: Errors
status: partial
---

# Errors

**Status:** partial

Errors are values. Fallible functions return `error?` last. There is no `try`; propagate explicitly. `defer` / `errdefer` for cleanup. Panics abort.

```jog
struct NotFound {
    tag: u8
}

fn NotFound.message(): str = "not found"

var notFound: NotFound
val ErrNotFound = &notFound

fn lookup(key: str): (i64, error?) {
    if key == "answer" {
        return 42, null
    }
    return 0, ErrNotFound
}

fn twice(key: str): (i64, error?) {
    val (v, err) = lookup(key)
    if err != null {
        return 0, err
    }
    return v * 2, null
}
```

`error` is a universe interface with `message(): str`. Sentinels are usually global pointers compared by identity.

```jog
fn build(fail: bool): (bytes, error?) with (a: mem.Allocator) {
    val (buf, err) = a.alloc(16, 1)
    if err != null {
        return bytes(), err
    }
    errdefer {
        a.free(buf)
    }
    if fail {
        return bytes(), ErrNotFound
    }
    return buf, null
}
```

- `defer` runs when the **enclosing block** exits (LIFO).
- `errdefer` runs only when the function returns a non-null last `error?`.
- `panic("msg")` aborts immediately; pending `defer`s do not run.

## V1 notes

- `err!!.message()` is not usable yet (`error` methods are not checked).
- Compare against sentinel pointers (`err == ErrNotFound`).
- `errorScope`, `errorf`, and `unreachable()` are not available; `ErrCancelled` and `ErrClosed` are predeclared.
