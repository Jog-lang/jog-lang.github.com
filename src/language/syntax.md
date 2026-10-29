---
title: Syntax
status: works in V1
---

# Syntax

**Status:** works in V1

Keyword-led declarations, types after names, newline-terminated statements, public-by-default visibility.

## Shape

```jog
fn add(a: i32, b: i32): i32 {
    return a + b
}

val Max = 64
var counter: i64

struct Point {
    x: i64
    y: i64
}
```

- Files: UTF-8 `.jog`. Comments: `//` and nested `/* */`. Documentation comments are `/** */` with `@param`, `@self`, `@context`, `@return` tags (convention; skipped like other comments).
- A newline ends a statement when the last token can end an expression. Trailing operators and `,` continue the line. `.` / `?.` / `?:` at the start of a line continue the previous expression.
- A trailing lambda’s `{` must be on the same line as the call.
- Visibility: bare `private` (or `private(file)`) is file-local; `private(package)` is the package; `private(scope)` on a field is methods of that struct only.

## Keywords

`fn var val type struct interface enum if else when for in break continue return defer errdefer go with context private import as is null true false bytes escaping const extern`. `quote` is reserved. `it` and `self` are implicit names, not keywords.

## V1 notes

- `expect` / `actual` are contextual before a top-level `fn` for [platforms](platforms/).
- Unused imports are not reported yet.
