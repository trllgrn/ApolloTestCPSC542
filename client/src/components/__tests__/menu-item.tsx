import React from "react";
import { mount, ReactWrapper } from "enzyme";
import { cleanup } from "../../test-utils";
import MenuItem from "../menu-item";

// To give our component a custom name
MenuItem.displayName = "MenuItem";

describe("MenuItem", () => {
  let wrapper: ReactWrapper;

  beforeEach(() => {
    wrapper = mount(<MenuItem to="/wow" />);
  });

  // automatically unmount and cleanup DOM after the test is finished.
  afterEach(cleanup);

  it("Renders MenuItem and Link component", () => {
    const MenuItem = wrapper.find("MenuItem");
    const Link = wrapper.find("a");

    expect(MenuItem.exists()).toBe(true);
    expect(Link.exists()).toBe(true);
  });

  it("Render correct css", async () => {
    const element = wrapper.find("MenuItem");
    const style = getComputedStyle(element.getDOMNode());

    expect(style.flexGrow).toBe("1");
    expect(style.textAlign).toBe("center");
    expect(style.fontSize).toBe("20px");

    console.log(style, "styleeeeeeeeeeeeeeeeee");
    console.log(wrapper.debug());
  });

  it("has href attribute", () => {
    const element = wrapper.find("a[href='/wow']");

    expect(element.exists()).toBe(true);
  });
});
