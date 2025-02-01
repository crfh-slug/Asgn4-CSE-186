/*
#######################################################################
#
# Copyright (C) 2020-2025  David C. Harrison. All right reserved.
#
# You may not use, distribute, publish, or modify this code without
# the express written permission of the copyright holder.
#
#######################################################################
*/

import {it, beforeAll, beforeEach} from 'vitest';
import {render, screen} from '@testing-library/react';
import {userEvent} from '@testing-library/user-event';
import App from '../App';
import {expect} from 'vitest';

import loader from '../data/loader';

/**
 * Do not modify this function.
 */
beforeAll(() => {
  loader();
  window.resizeTo = function resizeTo(width, height) {
    Object.assign(this, {
      innerWidth: width,
      innerHeight: height,
      outerWidth: width,
      outerHeight: height,
    }).dispatchEvent(new this.Event('resize'));
  };
});

/**
 * Sets the window to the size of an iPhone SE.
 * You can add to this function, but don't remove or modify the
 * call to window.resize()
 */
beforeEach(() => {
  window.resizeTo(375, 667); // don't remove or modify this line
});

/**
 *
 */
it('Renders', async () => {
  render(<App />);
});

it('Show Header CSE168 Mail - Inbox', async () => {
  render(<App />);
  screen.getByText('CSE186 Mail - Inbox');
});

it('Show menu icon nex to the Title', async () => {
  render(<App />);
  screen.getByLabelText('show mailboxes');
});

it('Show First Entry From, Subject, Received', async () => {
  render(<App />);
  screen.getByText('Jonie Putland');
  screen.getByText('Magic of Ordinary Days, The');
  screen.getByText('2022-01-31T01:43:14Z');
});

it('Show Second Entry From, Subject, Received', async () => {
  render(<App />);
  screen.getByText('Doretta Vittore');
  screen.getByText('Tribute to a Bad Man');
  screen.getByText('2023-08-22T18:30:44Z');
});

it('Click Menu', async () => {
  render(<App />);
  const menuButton = screen.getByLabelText('show mailboxes');

  await userEvent.click(menuButton);

  expect(screen.getByLabelText('Inbox')).toBeInTheDocument();
  expect(screen.getByLabelText('Important')).toBeInTheDocument();
  expect(screen.getByLabelText('Trash')).toBeInTheDocument();
});

it('Change title when menu item clicked', async () => {
  render(<App />);
  const menuButton = screen.getByLabelText('show mailboxes');
  screen.getByText('CSE186 Mail - Inbox');

  // Open the menu
  await userEvent.click(menuButton);
  await userEvent.click(screen.getByText('Trash'));
  expect(screen.getByText('CSE186 Mail - Trash'));
});

it('Change aria-label change when menu item clicked', async () => {
  render(<App />);
  const menuButton = screen.getByLabelText('show mailboxes');
  screen.getByText('CSE186 Mail - Inbox');

  // Open the menu
  await userEvent.click(menuButton);
  expect(screen.getByLabelText('hide mailboxes'));
  await userEvent.click(menuButton);
  expect(screen.getByLabelText('show mailboxes'));
});

it('Change emails when menu item clicked', async () => {
  render(<App />);
  const menuButton = screen.getByLabelText('show mailboxes');

  // Open the menu
  await userEvent.click(menuButton);
  await userEvent.click(screen.getByText('Trash'));

  screen.getByText('Cyrus Bellamy');
  screen.getByText('Margot at the Wedding');
  screen.getByText('2022-03-14T00:30:15Z');
});

it('', async () => {
  render(<App />);

  screen.getByText('From: Jonie Putland (@jputland0@geocities.jp)');
});

