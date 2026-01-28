import React from 'react';
import { Meteor } from 'meteor/meteor';
import { createRoot } from 'react-dom/client';
import { AdminRoutes } from '../admin/routes';

Meteor.startup(() => {
  const root = createRoot(document.getElementById('react-target'));
  root.render(<AdminRoutes />);
});
