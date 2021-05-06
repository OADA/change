# @oada/change

An implementation of OADA Change

## What is OADA Change?

OADA Change is a format that represents an idempotent change to an OADA document.

## Usage

### Applying a change

```typescript
import * as oadaChange from '@oada/change';
const document = { a: 1, b: 2, c: 3 };
const change = { b: 4, c: { _delete: true } };
const result = oadaChange.applyChange(document, change);
console.log(result) // { a: 1, b: 4 }
```

### Generating a change

```typescript
import * as oadaChange from '@oada/change';
const document1 = { a: 1, b: 2, c: 3 };
const document2 = { a: 1, b: 4 };
const change = oadaChange.generateChange(document1, document2);
console.log(change) // { b: 4, c: { _delete: true } }
```
