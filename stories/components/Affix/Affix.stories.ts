import type { Meta, StoryObj } from "@storybook/react";

import Affix from "./Affix";

const meta = {
  title: "Example/Affix",
  component: Affix,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ["autodocs"],
} satisfies Meta<typeof Affix>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Top: Story = {
  args: {
    offsetTop: 10,
    children: "Affix",
  },
};

export const Bottom: Story = {
  args: {
    offsetBottom: 10,
    children: "Affix",
  },
};