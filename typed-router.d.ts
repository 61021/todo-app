/* eslint-disable */
/* prettier-ignore */
// @ts-nocheck
// Generated by unplugin-vue-router. ‼️ DO NOT MODIFY THIS FILE ‼️
// It's recommended to commit this file.
// Make sure to add this file to your tsconfig.json file as an "includes" or "files" entry.

declare module 'vue-router/auto-routes' {
  import type {
    RouteRecordInfo,
    ParamValue,
    ParamValueOneOrMore,
    ParamValueZeroOrMore,
    ParamValueZeroOrOne,
  } from 'unplugin-vue-router/types'

  /**
   * Route name map generated by unplugin-vue-router
   */
  export interface RouteNamedMap {
    '/': RouteRecordInfo<'/', '/', Record<never, never>, Record<never, never>>,
    '/[...all]': RouteRecordInfo<'/[...all]', '/:all(.*)', { all: ParamValue<true> }, { all: ParamValue<false> }>,
    '/tasks/all/': RouteRecordInfo<'/tasks/all/', '/tasks/all', Record<never, never>, Record<never, never>>,
    '/tasks/completed/': RouteRecordInfo<'/tasks/completed/', '/tasks/completed', Record<never, never>, Record<never, never>>,
    '/tasks/this-week/': RouteRecordInfo<'/tasks/this-week/', '/tasks/this-week', Record<never, never>, Record<never, never>>,
    '/tasks/today/': RouteRecordInfo<'/tasks/today/', '/tasks/today', Record<never, never>, Record<never, never>>,
    '/tasks/trashed/': RouteRecordInfo<'/tasks/trashed/', '/tasks/trashed', Record<never, never>, Record<never, never>>,
    '/tasks/wont-do/': RouteRecordInfo<'/tasks/wont-do/', '/tasks/wont-do', Record<never, never>, Record<never, never>>,
  }
}
