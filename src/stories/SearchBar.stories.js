import React from 'react';

import { SearchBar } from '../components/input/searchBar/SearchBar';

export default {
  title: 'components/SearchBar',
  component: SearchBar,
  parameters: {
    actions: {
      handles: ['click', 'click .btn'],
    },
  },
};

const Template = (args) => <SearchBar {...args} />;

export const SearchBarComponent = Template.bind({});
SearchBarComponent.args = {
  disabled: false
}

