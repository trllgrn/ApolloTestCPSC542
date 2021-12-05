import React from "react";
import { shallow } from "enzyme";
import Button from "../button";
import { matchers } from "@emotion/jest";

expect.extend(matchers);

describe("button", () => {
  test("it rendere right css", () => {
    const wrapper = shallow(<Button />);

    expect(wrapper).toHaveStyleRule("display", "block");
    expect(wrapper).toHaveStyleRule("color", "white");
    expect(wrapper).toHaveStyleRule("cursor", "pointer");

    console.log(wrapper.debug());
  });
});
