import type { CounterSettings, GuildClasses } from '@types';

import { Injector, Logger, i18n, settings, webpack } from 'replugged';
import { DefaultSettings, PLUGIN_ID } from '@lib/constants';
import { forceUpdate } from '@lib/util';

export const prefs = await settings.init<CounterSettings, keyof typeof DefaultSettings>('xyz.griefmodz.StatisticCounter', DefaultSettings);
export const logger = Logger.plugin(PLUGIN_ID.replace(/-/g, ' '), '#3ba55c');
export const inject = new Injector();

let classes: Record<string, GuildClasses | Record<string, string>> = {};

import './main.css';

import { Counter, Settings } from '@components';
export { Settings };

export async function start(): Promise<void> {
  classes.guildClasses = await webpack.waitForProps<string, string>(['guilds', 'sidebar']);

  void i18n.addRepluggedStrings();
}

export function stop(): void {
  inject.uninjectAll();

  forceUpdate(document.querySelector(`.${classes.guildClasses?.guilds}`));
}

export function _getCounter(): JSX.Element {
  return <Counter />;
}
