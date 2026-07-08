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

export const Variants: Story = {
  render: () => (
    <div className="flex w-60 flex-col gap-3">
      <Select variant="default">
        <FruitOptions />
      </Select>
      <Select variant="primary">
        <FruitOptions />
      </Select>
      <Select variant="accent">
        <FruitOptions />
      </Select>
      <Select variant="destructive">
        <FruitOptions />
      </Select>
    </div>
  )
};

export const Sizes: Story = {
  render: () => (
    <div className="flex w-60 flex-col gap-3">
      <Select
        size="sm"
        placeholder="Small"
      >
        <FruitOptions />
      </Select>
      <Select
        size="default"
        placeholder="Default"
      >
        <FruitOptions />
      </Select>
      <Select
        size="lg"
        placeholder="Large"
      >
        <FruitOptions />
      </Select>
    </div>
  )
};

export const States: Story = {
  render: () => (
    <div className="flex w-60 flex-col gap-3">
      <Select placeholder="Default state">
        <FruitOptions />
      </Select>
      <Select
        disabled
        placeholder="Selection locked"
      >
        <FruitOptions />
      </Select>
    </div>
  )
};

export const WithPlaceholder: Story = {
  args: { placeholder: 'Choose a fruit' }
};

export const WithLeadingIcon: Story = {
  args: { leadingIcon: <Palette className="h-4 w-4" />, placeholder: 'Pick a color' }
};
