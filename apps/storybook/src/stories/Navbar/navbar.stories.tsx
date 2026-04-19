import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  Navbar,
  NavbarContent,
  NavbarBrand,
  NavbarLinks,
  NavbarLink,
  NavbarActions,
  NavbarToggle,
  Button,
} from "@repo/ui";
import { useState } from "react";

/**
 * A responsive Navbar component for the Creative Playground.
 * Designed with a terminal/retro aesthetic using the Gruvbox palette.
 * Supports sticky positioning, active states, and mobile toggles.
 */
const meta: Meta<typeof Navbar> = {
  title: "Components/Navbar",
  component: Navbar,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
  argTypes: {
    sticky: {
      description:
        "Whether the navbar should stick to the top of the viewport.",
      control: "boolean",
    },
  },
};

export default meta;

type Story = StoryObj<typeof Navbar>;

const Logo = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="size-8" viewBox="0 0 2 2">
    <rect fill="#331436" x="0" y="0" width="1" height="1"></rect>
    <rect fill="#eb9961" x="1" y="0" width="1" height="1"></rect>
    <rect fill="#cb4f57" x="0" y="1" width="1" height="1"></rect>
    <rect fill="#7a1745" x="1" y="1" width="1" height="1"></rect>
  </svg>
);

/**
 * The standard navbar configuration used across the site.
 */
export const Default: Story = {
  render: (args) => (
    <Navbar {...args}>
      <NavbarContent>
        <NavbarBrand>
          <Logo />
          <span>Playground</span>
        </NavbarBrand>
        <NavbarLinks>
          <NavbarLink href="#" active>
            Home
          </NavbarLink>
          <NavbarLink href="#">Particles</NavbarLink>
          <NavbarLink href="#">Sequences</NavbarLink>
          <NavbarLink href="#">Mosaic</NavbarLink>
        </NavbarLinks>
        <NavbarActions>
          <Button variant="ghost" size="sm">
            Docs
          </Button>
          <Button size="sm">Sign up</Button>
        </NavbarActions>
      </NavbarContent>
    </Navbar>
  ),
};

/**
 * Demonstrates the mobile toggle and responsive behavior.
 * Shrink the viewport to see the toggle button.
 */
export const Responsive: Story = {
  render: (args) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div className="relative min-h-[300px]">
        <Navbar {...args}>
          <NavbarContent>
            <NavbarBrand>
              <Logo />
              <span className="hidden sm:inline">Playground</span>
            </NavbarBrand>

            <NavbarLinks>
              <NavbarLink href="#" active>
                Home
              </NavbarLink>
              <NavbarLink href="#">About</NavbarLink>
            </NavbarLinks>

            <NavbarActions>
              <Button variant="outline" size="sm" className="hidden sm:flex">
                Log in
              </Button>
              <NavbarToggle
                isOpen={isOpen}
                onClick={() => setIsOpen(!isOpen)}
              />
            </NavbarActions>
          </NavbarContent>
        </Navbar>

        {/* Mobile Menu Panel Example */}
        {isOpen && (
          <div className="absolute top-16 inset-x-0 z-50 p-4 md:hidden animate-in slide-in-from-top-2 duration-200">
            <div className="rounded-lg border border-border bg-card p-4 shadow-xl flex flex-col gap-2">
              <NavbarLink href="#" active onClick={() => setIsOpen(false)}>
                Home
              </NavbarLink>
              <NavbarLink href="#" onClick={() => setIsOpen(false)}>
                Particles
              </NavbarLink>
              <NavbarLink href="#" onClick={() => setIsOpen(false)}>
                Sequences
              </NavbarLink>
              <NavbarLink href="#" onClick={() => setIsOpen(false)}>
                Mosaic
              </NavbarLink>
              <div className="pt-2 border-t border-border mt-2">
                <Button className="w-full">Sign up</Button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  },
};

/**
 * Full page example showing the sticky behavior and glassmorphism effect.
 */
export const StickyWithScroll: Story = {
  args: {
    sticky: true,
  },
  render: (args) => (
    <div className="bg-background">
      <Navbar {...args}>
        <NavbarContent>
          <NavbarBrand>
            <Logo />
            <span>Playground</span>
          </NavbarBrand>
          <NavbarLinks>
            <NavbarLink href="#" active>
              Explore
            </NavbarLink>
            <NavbarLink href="#">Blog</NavbarLink>
          </NavbarLinks>
          <NavbarActions>
            <Button variant="secondary" size="sm">
              Feedback
            </Button>
          </NavbarActions>
        </NavbarContent>
      </Navbar>
      <main className="max-w-4xl mx-auto p-8 space-y-8 font-mono">
        <h1 className="text-4xl font-bold text-primary mt-12">
          Scroll down...
        </h1>
        {Array.from({ length: 15 }).map((_, i) => (
          <div
            key={i}
            className="p-6 rounded-xl border border-border bg-card shadow-sm"
          >
            <h2 className="text-xl font-bold mb-2 text-secondary">
              Section {i + 1}
            </h2>
            <p className="text-muted-foreground">
              The navbar stays fixed at the top with a subtle backdrop-blur
              (glass) effect, maintaining readability while content scrolls
              underneath.
            </p>
          </div>
        ))}
      </main>
    </div>
  ),
};
