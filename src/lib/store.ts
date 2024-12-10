import type { CounterSettings, CounterStoreState, CounterStore as CounterStoreType, CounterType } from '@types';
import { Store } from 'replugged/dist/renderer/modules/common/flux';

import { SettingsManager } from 'replugged/dist/renderer/apis/settings';
import { common, settings } from 'replugged';

import { ActionTypes, Counters, DefaultSettings } from '@lib/constants';

const { flux: Flux, fluxDispatcher: FluxDispatcher } = common;

const prefs = await settings.init<CounterSettings, keyof typeof DefaultSettings>('xyz.griefmodz.StatisticCounter', DefaultSettings);
let activeCounter = prefs.get('lastCounter');

class CounterStore extends Flux.Store {
  public static displayName = 'StatisticCounterStore';

  public get state(): CounterStoreState {
    return {
      activeCounter: activeCounter || this.filteredCounters[0],
      nextCounter: this.nextCounter
    };
  }

  public get settings(): SettingsManager<CounterSettings, keyof typeof DefaultSettings> {
    return prefs;
  }

  public get filteredCounters(): Array<CounterType | string> {
    return Object.keys(Counters).filter((counter) => prefs.get(counter as CounterType, true));
  }

  public get nextCounter(): CounterType | string {
    const counters = prefs.get('viewOrder', Object.keys(Counters) as CounterType[]).filter((counter) => this.filteredCounters.includes(counter));
    const currentIndex = counters.indexOf(activeCounter || counters[0]);

    return currentIndex >= counters.length - 1 ? counters[0] : counters[currentIndex + 1];
  }
}

export default (Flux.Store?.getAll?.().find((store: Store) => store.getName() === CounterStore.displayName) ||
  new CounterStore(FluxDispatcher, {
    [ActionTypes.STATISTIC_COUNTER_SET_ACTIVE]: ({ counter }) => (activeCounter = counter)
  })) as CounterStoreType & Store;
