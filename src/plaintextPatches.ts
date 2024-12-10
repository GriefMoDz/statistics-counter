import { types } from 'replugged';
export default [
  {
    find: 'guildsnav',
    replacements: [
      {
        match: /null,(\(0,\w+\.\w+\)\(\w+\.\w+,{isOnHubVerificationRoute)/,
        replace: (_, suffix: string) => `null,replugged.plugins.getExports("xyz.griefmodz.StatisticCounter")._getCounter(),${suffix}`
      }
    ]
  }
] as types.PlaintextPatch[];
