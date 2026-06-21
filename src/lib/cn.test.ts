import { cn } from "./cn";

function optionalClass(enabled: boolean) {
  return enabled && "hidden";
}

describe("cn", () => {
  it("combines conditional classes", () => {
    expect(cn("base", optionalClass(false), ["rounded-md", "text-sm"])).toBe(
      "base rounded-md text-sm",
    );
  });

  it("merges conflicting Tailwind utility classes", () => {
    expect(cn("px-2 py-1", "px-4", "text-sm", "text-lg")).toBe("py-1 px-4 text-lg");
  });
});
