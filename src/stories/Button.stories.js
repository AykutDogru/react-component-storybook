import React from 'react';

import { Button } from '../components/button/Button';

export default {
  title: 'components/Button',
  component: Button,
  parameters: {
    actions: {
      handles: ['click', 'click .btn'],
    },
  },
};

const Template = (args) => <Button {...args} />;

export const ButtonComponent = Template.bind({});
ButtonComponent.args = {
  disabled: false
}

