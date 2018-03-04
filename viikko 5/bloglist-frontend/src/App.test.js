import React from 'react';
import { mount } from 'enzyme';
import App from './App';

describe('<App />', () => {
  let app;

  beforeAll(() => {
    app = mount(<App/>);
  });

  it('does not render any blogs if user is not logged in', () => {
    app.update();
    const noteComponents = app.find(Blog);
    expect(noteComponents.length).toEqual(noteService.notes.length);
  });
});
