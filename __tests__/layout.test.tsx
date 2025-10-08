// __tests__/layout.test.tsx
import { render, screen } from "@testing-library/react";
import RootLayout, { metadata } from "../app/layout";

// Mock ClerkProvider
jest.mock("@clerk/nextjs", () => ({
  ClerkProvider: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="clerk-provider">{children}</div>
  ),
}));

// Mock Toaster
jest.mock("sonner", () => ({
  Toaster: () => <div role="status">toaster-mock</div>,
}));

describe("RootLayout", () => {
  it("renders children inside ClerkProvider", () => {
    render(
      <RootLayout>
        <div data-testid="child">Hello World</div>
      </RootLayout>
    );

    expect(screen.getByTestId("clerk-provider")).toBeInTheDocument();
    expect(screen.getByTestId("child")).toHaveTextContent("Hello World");
  });

  it("renders the Toaster component", () => {
    const { container } = render(
      <RootLayout>
        <div>child</div>
      </RootLayout>
    );
    expect(container.querySelector("div[role='status']")).toBeInTheDocument();
  });

  it("exports correct metadata", () => {
    expect(metadata.title).toBe("Uptime Monitor");
    expect(metadata.description).toBe(
      "Monitor your websites and get notified when they go down"
    );
  });
});
