import { defineMessages } from '@discord/intl';

export const meta = {
  translationsPath: './translations',
  secret: false,
  translate: true
};

export default defineMessages({
  STATISTIC_COUNTER_VIEW_ORDER: 'View Order',
  STATISTIC_COUNTER_VISIBILITY: 'Visibility',
  STATISTIC_COUNTER_AUTO_ROTATION: 'Auto Rotation',
  STATISTIC_COUNTER_SHOW_COUNTER: 'Show {counter}',
  STATISTIC_COUNTER_ROTATION_INTERVAL: 'Rotation Interval',
  STATISTIC_COUNTER_PRESERVE_LAST_COUNTER: 'Preserve Last Counter',
  STATISTIC_COUNTER_PAUSE_ON_HOVER: 'Pause on Hover'
});
