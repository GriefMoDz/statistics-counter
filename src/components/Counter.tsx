import CounterStore from '@lib/store';
import ErrorBoundary from './ErrorBoundary';
import '../main.css';

import { common, webpack } from 'replugged';
import { ActionTypes, Counters } from '@lib/constants';
import type { CounterState, GuildAvailabilityStore, RelationshipStore, PresenceStore } from '@types';

const FluxDispatcher = common.fluxDispatcher;

const { getExportsForProps } = webpack;

const Messages = webpack.getByProps('Messages', 'getLanguages')?.Messages as Record<string, unknown>;

const RelationshipStore = await webpack.waitForModule<RelationshipStore>(webpack.filters.byProps('getRelationships'));
const PresenceStore = await webpack.waitForModule<PresenceStore>(webpack.filters.byProps('isMobileOnline'));
const GuildAvailabilityStore = await webpack.waitForModule<GuildAvailabilityStore>(webpack.filters.byProps('totalGuilds'));

const RelationshipTypes = (await webpack
  .waitForModule<{ [key: number]: string }>(webpack.filters.byProps('IMPLICIT'))
  .then((mod) => getExportsForProps(mod, ['IMPLICIT']))) as any;

type RelationshipCounts = {
  [key: string]: number;
};

function getRelationshipCounts() {
  const relationshipTypes = Object.keys(RelationshipTypes).filter((type) => isNaN(+type));
  const relationshipCounts: RelationshipCounts = relationshipTypes.reduce((types, type) => ({ ...types, [type]: 0 }), {});
  const relationships = RelationshipStore.getRelationships();

  for (const type in relationships) {
    relationshipCounts[relationshipTypes[relationships[type]]]++;
  }

  return relationshipCounts;
}

const IntervalWrapper: any = webpack.getBySource(/defaultProps={disable:!1,pauseOnHover:!1}/);
const useStateFromStoresMod = await webpack.waitForModule<any>(webpack.filters.bySource('useStateFromStores'));
const useStateFromStores: any = webpack.getFunctionBySource('useStateFromStores', useStateFromStoresMod);

function Counter(props: { preview?: boolean }): JSX.Element {
  const { activeCounter, nextCounter, counters, settings }: CounterState = useStateFromStores(
    [CounterStore, RelationshipStore, PresenceStore, GuildAvailabilityStore],
    () => ({
      ...CounterStore.state,
      settings: CounterStore.settings,
      counters: {
        ONLINE: RelationshipStore?.getFriendIDs?.().filter((id) => PresenceStore.getStatus(id) !== 'offline').length ?? 0,
        GUILDS: GuildAvailabilityStore?.totalGuilds ?? 0,
        ...getRelationshipCounts()
      }
    })
  );

  const goToNextCounter = () => {
    if (!props.preview && settings.get('preserveLastCounter', false)) {
      settings.set('lastCounter', CounterStore.nextCounter);
    }

    FluxDispatcher.dispatch({
      type: ActionTypes.STATISTICS_COUNTER_SET_ACTIVE,
      counter: CounterStore.nextCounter
    });
  };

  const handleOnClick = goToNextCounter;
  const handleOnInterval = goToNextCounter;

  return (
    <div className='statistic-counter-list-item'>
      <ErrorBoundary>
        <IntervalWrapper
          className='statistic-counter'
          onInterval={handleOnInterval}
          interval={settings.get('autoRotationDelay', 5e3)}
          disable={activeCounter === nextCounter || !settings.get('autoRotation', false)}
          pauseOnHover={!!settings.get('autoRotationHoverPause', true)}>
          <span className={activeCounter !== nextCounter ? 'clickable' : ''} onClick={handleOnClick}>
            {Messages[Counters[activeCounter].translationKey]} — {counters[Counters[activeCounter].storeKey]}
          </span>
        </IntervalWrapper>
      </ErrorBoundary>
    </div>
  );
}

export default Counter;
