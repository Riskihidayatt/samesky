import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { SkyProvider } from "@/features/sky/SkyProvider";
import { mascotPoses } from "@/shared/config/mascot";
import { Hero } from "./Hero";

function setup() {
  render(
    <SkyProvider>
      <Hero />
    </SkyProvider>,
  );
}

describe("Hero mascot follows the sky phase", () => {
  it.each([
    ["Pagi", mascotPoses.wave.alt],
    ["Senja", mascotPoses.gaze.alt],
    ["Malam", mascotPoses.sleep.alt],
  ])("%s shows the matching pose", async (button, alt) => {
    setup();
    await userEvent.click(screen.getByRole("button", { name: button }));
    expect(await screen.findByAltText(alt)).toBeInTheDocument();
  });
});
