import React from 'react';

import { TextField } from '../components/input/textField/TextField';

export default {
  title: 'components/TextField',
  component: TextField,
  parameters: {
    actions: {
      handles: ['click', 'click .btn'],
    },
  },
};

const Template = (args) => <TextField {...args} />;

export const TextFieldComponent = Template.bind({});
TextFieldComponent.args = {
  disabled: false
}

