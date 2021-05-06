import { expect } from "chai";
import "mocha";
import * as oadaChange from "../src/index";

describe("Tests for generateChange()", function () {
  it("Test 1", () => {
    // Created from https://github.com/OADA/oada-srvc-docker/issues/80#issue-807580136
    const document1: object = { a: 1, b: 2, c: { hello: "world" } };
    const document2: object = { a: 7, c: { foo: "bar" } };
    const change = oadaChange.generateChange(document1, document2);
    expect(change).to.deep.equal({
      a: 7,
      b: { _delete: true },
      c: {
        foo: "bar",
        hello: { _delete: true },
      },
    });
  });
});
