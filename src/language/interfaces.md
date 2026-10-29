---
title: Interfaces
status: works in V1
---

# Interfaces

**Status:** works in V1

Structural: a type satisfies an interface when it has the required methods (in its own package, not via extensions) and matching property fields.

```jog
interface Named {
    val name: str
    fn greet(): str
}

struct Dog {
    name: str
}

fn Dog.greet(): str = "woof"

fn nameOf(n: Named): str = n.name
```

An interface value is a fat pointer built from a pointer: `val n: Named = &dog`.

Type tests:

```jog
fn kind(s: HasArea): str {
    return when s {
        is Square -> "square"
        is Circle -> "circle"
        else -> "other"
    }
}

fn squareSide(s: HasArea): i64 {
    val sq = s as? *Square
    if sq == null {
        return -1
    }
    return sq!!.side
}
```

Interface methods may declare contexts; implementations must match.
