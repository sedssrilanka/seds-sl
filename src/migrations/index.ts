import * as migration_20260816_042105 from './20260816_042105';

export const migrations = [
  {
    up: migration_20260816_042105.up,
    down: migration_20260816_042105.down,
    name: '20260816_042105'
  },
];
