import { expect } from "chai";
import "mocha";
import * as oadaChange from "../src/index";

describe("Tests for applyChange()", function () {
  it("Change should replace key", () => {
    const document: object = { a: 1, b: 2, c: 3 };
    const change: object = {
      b: 4,
    };
    const output = oadaChange.applyChange(document, change);
    expect(output).to.deep.equal({ a: 1, b: 4, c: 3 });
  });

  it("Top level '_delete' shoud delete all keys", () => {
    const document: object = { a: 1, b: 2, c: 3 };
    const change: object = {
      _delete: true,
    };
    const output = oadaChange.applyChange(document, change);
    expect(output).to.deep.equal({});
  });

  it("Sub level '_delete' shoud delete the entry", () => {
    const document: object = { a: 1, b: 2, c: 3 };
    const change: object = {
      b: { _delete: true },
    };
    const output = oadaChange.applyChange(document, change);
    expect(output).to.deep.equal({ a: 1, c: 3 });
  });

  it("Test 1", () => {
    // Created from https://github.com/OADA/oada-srvc-docker/issues/80#issue-807580136
    const document: object = { a: 1, b: 2, c: { hello: "world" } };
    const change: object = {
      a: 7,
      b: { _delete: true },
      c: {
        _delete: true,
        foo: "bar",
      },
    };
    const output = oadaChange.applyChange(document, change);
    expect(output).to.deep.equal({ a: 7, c: { foo: "bar" } });
  });
});
