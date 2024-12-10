/* eslint-disable @typescript-eslint/naming-convention */
import type { Store } from 'replugged/dist/renderer/modules/webpack/common/flux';
import type { SettingsManager } from 'replugged/dist/renderer/apis/settings';
import type { RawModule, ReactComponent } from 'replugged/dist/types';
import type { Counters } from '@lib/constants';
import { DragProvider } from '@types';

type Comparator<T> = (a: T, b: T) => boolean;
type Predicate<Arg> = (arg: Arg) => boolean;

interface RelationshipCounts {
  [key: string]: number;
}

type UseStateFromStores = <T>(stores: Store[], callback: () => T, deps?: React.DependencyList, compare?: Comparator<T>) => T;

interface IntervalWrapperProps {
  interval: number;
  children: React.ReactNode;
}

type IntervalWrapper = ReactComponent<IntervalWrapperProps> & {
  getDerivedStateFromProps: (props: { disable: boolean }) => { hovered: false } | null;
  defaultProps: {
    disable: boolean;
    pauseOnHover: boolean;
  };
};

interface ErrorBoundaryState {
  hasError: boolean;
}

interface GuildsNavProps {
  className: string;
  themeOverride: string;
}

interface GuildClasses extends RawModule {
  activityPanel: string;
  base: string;
  container: string;
  content: string;
  downloadProgressCircle: string;
  fullWidth: string;
  guilds: string;
  hasNotice: string;
  hidden: string;
  panels: string;
  sidebar: string;
}

interface GuildsNavClasses {
  fixedBottomList: string;
  hidden: string;
  scroller: string;
  scrolling: string;
  tree: string;
  unreadMentionsBar: string;
  unreadMentionsIndicatorBottom: string;
  unreadMentionsIndicatorTop: string;
  wrapper: string;
}

interface GuildsNavComponent extends RawModule {
  $$typeof: symbol;
  compare: Comparator<unknown>;
  type: (props: GuildsNavProps) => React.ReactElement;
}

type CounterType = 'online' | 'friends' | 'pending' | 'blocked' | 'guilds';
interface CounterProps {
  storeKey: string;
  translationKey: string;
}

interface CounterStoreState {
  activeCounter: CounterType | string;
  nextCounter: CounterType | string;
}

interface CounterStore extends Store {
  state: CounterState;
  settings: SettingsManager<CounterSettings>;
  nextCounter: CounterType;
  filteredCounters: CounterType[];
}

interface CounterSettings {
  autoRotation?: boolean;
  autoRotationDelay?: number;
  autoRotationHoverPause?: boolean;
  preserveLastCounter?: boolean;
  lastCounter?: CounterType;
  viewOrder?: CounterType[];
  online?: boolean;
  friends?: boolean;
  pending?: boolean;
  blocked?: boolean;
  guilds?: boolean;
}

interface CounterState {
  activeCounter: CounterType;
  nextCounter: CounterType;
  settings: SettingsManager<CounterSettings>;
  counters: Counters;
}

type DragHook = (args: {
  type: string;
  index: number;
  optionId: string | number;
  onDragStart: (optionId: string | number) => void;
  onDragComplete: (optionId: string | number) => void;
  onDragReset: () => void;
}) => {
  dragSourcePosition: number;
  drag: (element: HTMLDivElement | null) => HTMLDivElement;
  drop: (element: HTMLDivElement | null) => HTMLDivElement;
  setIsDraggable: (state: boolean) => void;
};

interface DragSourceItem {
  id: string;
  name?: string;
}

interface DragProvider {
  useDrag: (
    cb: () => {
      type: string;
      item: { id: props.counter };
    }
  ) => [unknown, (...args: unknown[]) => unknown];
  useDrop: (
    cb: () => {
      accept: string;
      drop: (item: { id: props.counter }) => void;
    }
  ) => [unknown, (...args: unknown[]) => unknown];
}
interface CounterItemsProps {
  availableCounters: CounterType[];
  onChange: (newValue: CounterType[] | (Record<string, unknown> & { value: CounterType[] | undefined }) | undefined) => void;
}

interface MenuControlItemProps {
  disabled?: boolean;
  isFocused: boolean;
  onClose: () => void;
}

interface MenuControlItemRef {
  activate: () => boolean;
  blur: () => void;
  focus: () => void;
}

type Snowflake = string;
const enum RelationshipTypes {
  NONE,
  FRIEND,
  BLOCKED,
  PENDING_INCOMING,
  PENDING_OUTGOING,
  IMPLICIT,
  SUGGESTION
}

interface RelationshipStore extends RawModule, Store {
  getFriendIDs(): Snowflake[];
  getNickname(userId: string): string;
  getPendingCount(): number;
  getRelationshipCount(): number;
  getRelationshipType(userId: Snowflake): RelationshipTypes;
  getRelationships(): Record<Snowflake, RelationshipTypes>;
  isBlocked(userId: Snowflake): boolean;
  isFriend(userId: Snowflake): boolean;
  __getLocalVars(): {
    relationships: Record<Snowflake, RelationshipTypes>;
    nicknames: Record<Snowflake, string>;
    pendingCount: number;
    relationshipCount: number;
  };
}

const enum StatusTypes {
  DND = 'dnd',
  IDLE = 'idle',
  INVISIBLE = 'invisible',
  OFFLINE = 'offline',
  ONLINE = 'online',
  STREAMING = 'streaming',
  UNKNOWN = 'unknown'
}

interface Activity {
  assets?: {
    large_image: string;
    large_text: string;
  };
  emoji: {
    id: string;
    name: string;
  };
  created_at: string;
  details: string;
  flags?: number;
  id: string;
  name: string;
  party?: {
    id: string;
  };
  session_id?: string;
  state: string;
  sync_id?: string;
  timestamps?: {
    end: string;
    start: string;
  };
  type: string;
}

interface ClientStatus {
  embedded?: StatusTypes;
  desktop?: StatusTypes;
  mobile?: StatusTypes;
  web?: StatusTypes;
}

interface UserPresence {
  activities: Activity[];
  clientStatus: ClientStatus;
  status: StatusTypes;
  timestamp: number;
}

interface PresenceStoreState {
  statuses: Record<Snowflake, StatusTypes>;
  clientStatuses: Record<Snowflake, ClientStatus>;
  activities: Record<Snowflake, Activity[]>;
  activityMetadata: Record<unknown, unknown>;
  presencesForGuilds: Record<Snowflake, Record<Snowflake, UserPresence>>;
}

interface PresenceStore extends RawModule, Store {
  findActivity(userId: Snowflake, predicate: (arg: unknown) => boolean): Activity;
  getActivities(userId: Snowflake): Activity[];
  getActivityMetadata(userId: Snowflake): unknown;
  getAllApplicationActivities(applicationId: Snowflake): Activity[];
  getApplicationActivity(userId: Snowflake, applicationId: Snowflake): Activity;
  getPrimaryActivity(userId: Snowflake): Activity;
  getState(): PresenceStoreState;
  getStatus(userId: Snowflake): StatusTypes;
  getUserIds(): Snowflake[];
  isMobileOnline(userId: Snowflake): boolean;
  setCurrentUserOnConnectionOpen(status: StatusTypes, activities: Record<Snowflake, Activity[]>): void;
}

interface GuildAvailabilityStore extends RawModule, Store {
  isUnavailable(guildId: Snowflake): boolean;
  get totalGuilds(): number;
  get totalUnavailableGuilds(): number;
  get unavailableGuilds(): Record<Snowflake, unknown>;
  __getLocalVars(): {
    logger: object;
    unavailableGuilds: Set<Snowflake>;
  };
}
