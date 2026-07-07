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
      description: 'Focus-ring color token.',
      options: ['default', 'primary', 'secondary', 'accent', 'warning', 'destructive', 'ghost'],
      control: { type: 'select' }
    },
    size: {
      description: 'Controls the dimensions.',
      options: ['sm', 'default', 'lg'],
      control: { type: 'select' }
    },
    placeholder: {
      description: 'Renders a disabled hidden first option as placeholder.',
      control: 'text'
    },
    disabled: {
      description: 'Disables interaction and dims the appearance.',
      control: 'boolean'
    }
  },
  args: {
    onChange: fn(),
    children: <FruitOptions />
  }
};

export default meta;

type Story = StoryObj<typeof Select>;

export const Default: Story = {
  args: { variant: 'default' }
};

export const Primary: Story = {
  args: { variant: 'primary' }
};

export const WithPlaceholder: Story = {
  args: { placeholder: 'Choose a fruit' }
};

export const WithLeadingIcon: Story = {
  args: { leadingIcon: <Palette className="h-4 w-4" />, placeholder: 'Pick a color' }
};

export const Disabled: Story = {
  args: { disabled: true, placeholder: 'Selection locked' }
};

export const Small: Story = {
  args: { size: 'sm' }
};

export const Large: Story = {
  args: { size: 'lg', placeholder: 'Choose a fruit' }
};
