import { mount, ReactWrapper } from "enzyme";
import React from "react";
import { cleanup } from "../../test-utils";
import Loading from "../loading";
import { colors } from "../../styles";

Loading.displayName = "Loading";

describe("Loading", () => {
  let wrapper: ReactWrapper;

  beforeEach(() => {
    wrapper = mount(<Loading />);
  });

  // automatically unmount and cleanup DOM after the test is finished.
  afterEach(cleanup);

  it("renders without error", () => {
    const element = wrapper.find("Loading");

    expect(element.exists()).toBe(true);
  });

  it("Render the styles to Loading component", () => {
    const element = wrapper.find("Loading")
    const styles = getComputedStyle(element.getDOMNode())

    expect(styles.display).toBe("block")
    expect(styles.margin).toBe("auto")
    expect(styles.fill).toBe(colors.grey)
  })

  it("has svg", () => {
    const element = wrapper.find("svg")

    expect(element.exists()).toBe(true)
    console.log(wrapper.debug())
  })
});
