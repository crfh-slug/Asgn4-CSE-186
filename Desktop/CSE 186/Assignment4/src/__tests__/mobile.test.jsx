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
  screen.getByText('Bob Dylan');
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
  const emailButton = screen.getByText('Bob Dylan');
  await userEvent.click(emailButton);
  screen.getByText('From: Bob Dylan (@bob@bob.com)');
  screen.getByText('To: App User (user@app.com)');
  screen.getByText('Received: February 3, 2025 at 17:15');
  screen.getByText('Like a Rolling Stone');
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
  const emailButton = screen.getByText('Bob Dylan');
  await userEvent.click(emailButton);
  screen.getByText('From: Bob Dylan (@bob@bob.com)');
  screen.getByText('To: App User (user@app.com)');
  screen.getByText('Received: February 3, 2025 at 17:15');
  screen.getByText('Like a Rolling Stone');

  const backButton = screen.getByLabelText('close mail reader');
  await userEvent.click(backButton);

  screen.findByText('Jonie Putland Magic of Ordinary Days, The 2022');
});

it('Check if date is yesterday', async () => {
  render(<App />);
  screen.findByText('Yesterday');
});

it('Check if date is over one full year ago', async () => {
  render(<App />);
  screen.findByText('2024');
});

it('go back is there when render', async () => {
  render(<App />);
  expect(screen.queryByLabelText('close mail reader')).not.toBeInTheDocument();
});

it('go back is there when render', async () => {
  render(<App />);
  const emailButton = screen.getByText('Bob Dylan');
  await userEvent.click(emailButton);
  const menuButton = screen.getByLabelText('show mailboxes');
  await userEvent.click(menuButton);

  expect(screen.queryByLabelText('close mail reader')).not.toBeInTheDocument();
});
