import type { Meta, StoryObj } from '@storybook/react-vite';
import BasicSubmitButton from '../next/components/Form/BasicSubmitButton';
import { fn } from 'storybook/internal/test';

const meta = {
  title: "Example/BasicSubmitButton",
  component: BasicSubmitButton,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  args: { onSubmit: fn() },
} satisfies Meta<typeof BasicSubmitButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const DefaultSubmitButton: Story = {
  args: {
    label: "Enviar...",
  }
};