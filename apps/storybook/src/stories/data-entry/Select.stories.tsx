import { Select } from '@repo/ui/data-entry';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Palette } from 'lucide-react';
import { fn } from 'storybook/test';

const fruits = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' },
  { value: 'cherry', label: 'Cherry' },
  { value: 'dragonfruit', label: 'Dragonfruit' }
];

function FruitOptions() {
  return (
    <>
      {fruits.map((f) => (
        <option
          key={f.value}
          value={f.value}
        >
          {f.label}
        </option>
      ))}
    </>
  );
}

const meta: Meta<typeof Select> = {
  title: 'Data Entry/Select',
  component: Select,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      options: ['default', 'primary', 'secondary', 'accent', 'warning', 'destructive', 'ghost'],
      control: { type: 'select' }
    },
    size: {
      options: ['sm', 'default', 'lg'],
      control: { type: 'select' }
    },
    placeholder: { control: 'text' },
    disabled: { control: 'boolean' }
  },
  args: {
    onChange: fn(),
    children: <FruitOptions />
  }
};

export default meta;

type Story = StoryObj<typeof Select>;

export const Default: Story = {
  args: {}
};

export const VariantDefault: Story = {
  args: { variant: 'default' }
};

export const VariantAccent: Story = {
  args: { variant: 'accent' }
};

export const VariantDestructive: Story = {
  args: { variant: 'destructive' }
};

export const WithPlaceholder: Story = {
  args: { placeholder: 'Choose a fruit' }
};

export const WithLeadingIcon: Story = {
  args: { leadingIcon: <Palette className="h-4 w-4" />, placeholder: 'Pick a color' }
};

export const SizeSm: Story = {
  args: { size: 'sm' }
};

export const SizeLg: Story = {
  args: { size: 'lg', placeholder: 'Choose a fruit' }
};

export const Disabled: Story = {
  args: { disabled: true, placeholder: 'Selection locked' }
};
