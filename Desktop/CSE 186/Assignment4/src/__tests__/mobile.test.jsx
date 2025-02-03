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
  screen.findByText('Bob Dylan Like a Rolling Stone 17:15');
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

  screen.findByText('Cyrus Bellamy Margot at the Wedding 2022');
});

it('Content of email is rendered', async () => {
  render(<App />);
  const emailButton = screen.getByText('Jonie Putland');
  await userEvent.click(emailButton);
  screen.getByText('From: Jonie Putland (@jputland0@geocities.jp)');
  screen.getByText('Received: 2022-01-31T01:43:14Z');
  screen.getByText('Magic of Ordinary Days, The');
  screen.getByText('Fusce posuere felis sed lacus. Morbi sem mauris,' +
    ' laoreet ut, rhoncus aliquet, pulvinar sed, nisl. Nunc rhoncus' +
    ' dui vel sem. Sed sagittis. Nam congue, risus semper porta' +
    ' volutpat, quam pede lobortis ligula, sit amet eleifend pede' +
    ' libero quis orci. Nullam molestie nibh in lectus.');
});

it('Content of important email is rendered', async () => {
  render(<App />);
  const menuButton = screen.getByLabelText('show mailboxes');
  await userEvent.click(menuButton);
  await userEvent.click(screen.getByLabelText('Important'));

  screen.findByText('Davis Nicholas Wonder Bar 2024');
});

it('Go Back once reading an email', async () => {
  render(<App />);
  const emailButton = screen.getByText('Jonie Putland');
  await userEvent.click(emailButton);
  screen.getByText('From: Jonie Putland (@jputland0@geocities.jp)');
  screen.getByText('Received: 2022-01-31T01:43:14Z');
  screen.getByText('Magic of Ordinary Days, The');
  screen.getByText('Fusce posuere felis sed lacus. Morbi sem mauris,' +
    ' laoreet ut, rhoncus aliquet, pulvinar sed, nisl. Nunc rhoncus' +
    ' dui vel sem. Sed sagittis. Nam congue, risus semper porta' +
    ' volutpat, quam pede lobortis ligula, sit amet eleifend pede' +
    ' libero quis orci. Nullam molestie nibh in lectus.');

  const backButton = screen.getByLabelText('close mail reader');
  await userEvent.click(backButton);

  screen.findByText('Jonie Putland Magic of Ordinary Days, The 2022');
});
