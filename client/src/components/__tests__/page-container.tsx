import { mount, ReactWrapper } from "enzyme";
import React from "react";
import { cleanup } from "../../test-utils";
import PageContainer from "../page-container";

describe("Page Container", () => {
  let wrapper: ReactWrapper;
  beforeEach(() => {
    wrapper = mount(<PageContainer />);
  });
  // automatically unmount and cleanup DOM after the test is finished.
  afterEach(cleanup);

  it("has 2 divs", () => {
    const el = wrapper.find("div");

    expect(el.length).toBe(2);
  });

  it("renders Container styled component", () => {
    const Container = wrapper.find("Container");
    const ContainerStyle = getComputedStyle(Container.getDOMNode());

    expect(Container.length).toBe(1);
    expect(ContainerStyle.display).toBe("flex");
  });

  it("renders Bar styled component", () => {
    const Bar = wrapper.find("Bar");
    const BarStyle = getComputedStyle(Bar.getDOMNode());

    expect(Bar.length).toBe(1);
    expect(BarStyle.height).toBe("12px");
    console.log(wrapper.debug());
  });
});
