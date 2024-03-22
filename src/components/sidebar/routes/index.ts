/* @unocss-include */
import type { AxiosResponse } from 'axios'
import type { NavItem } from '../types'
import { axios } from '~/common/plugins/axios'
import type { PageResponse } from '~/common/types'

export const navItems = ref<NavItem[]>([
  {
    title: 'common.routes.dashboard',
    path: '/dashboard',
    icon: {
      base: 'i-ph-chart-line-duotone',
      active: 'i-ph-chart-line-fill',
    },
    roles: ['ADMIN', 'CUSTOMER'],

  },
  {
    title: 'common.routes.cars.title',
    path: '/cars',
    icon: {
      base: 'i-ph-car-profile-duotone',
      active: 'i-ph-car-profile-fill',
    },
    roles: ['ADMIN'],
  },
  {
    title: 'common.routes.cars.children.dispatch.title',
    path: '/dispatch',
    icon: {
      base: 'i-custom:truck-flatbed-duotone',
      active: 'i-custom:truck-flatbed-fill',
    },
    roles: ['ADMIN'],
    isCollapsed: true,
    children: [],
  },
  {
    title: 'common.routes.cars.children.terminal.title',
    path: '/terminal',
    icon: {
      base: 'i-ph-house-duotone',
      active: 'i-ph-house-fill',
    },
    roles: ['ADMIN'],
    isCollapsed: true,
    children: [],
  },
  {
    title: 'common.routes.cars.children.basraTransport.title',
    path: '/basra-transport',
    icon: {
      base: 'i-ph-tree-palm-duotone',
      active: 'i-ph-tree-palm-fill',
    },
    roles: ['ADMIN'],
  },
  {
    title: 'common.routes.cars.children.containerOpen.title',
    path: '/container-open',
    icon: {
      base: 'i-ph-dropbox-logo-duotone',
      active: 'i-ph-dropbox-logo-fill',
    },
    roles: ['ADMIN'],
  },
  {
    title: 'common.routes.prices.children.shippingPrices.title',
    path: '/prices/shipping-prices',
    icon: {
      base: 'i-ph-boat-duotone',
      active: 'i-ph-boat-fill',
    },
    roles: ['ADMIN'],
  },
  {
    title: 'common.routes.prices.children.shippingDestinations.title',
    path: '/prices/shipping-destinations',
    icon: {
      base: 'i-ph-truck-duotone',
      active: 'i-ph-truck-fill',
    },
    roles: ['ADMIN'],
  },
  {
    title: 'common.routes.users.title',
    path: '/users',
    icon: {
      base: 'i-ph-users-duotone',
      active: 'i-ph-users-fill',
    },
    roles: ['ADMIN'],
  },
  {
    title: 'common.routes.accounting.title',
    path: '/accounting',
    icon: {
      base: 'i-ph-car-duotone',
      active: 'i-ph-car-fill',
    },
    roles: ['CUSTOMER'],

    children: [
      {
        title: 'common.routes.accounting.children.americaTransport.title',
        path: '/accounting/america-transport',
        icon: {
          base: 'i-ph-star-duotone',
          active: 'i-ph-star-fill',
        },
        roles: ['CUSTOMER'],
      },
      {
        title: 'common.routes.accounting.children.basraTransport.title',
        path: '/accounting/basra-transport',
        icon: {
          base: 'i-ph-tree-palm-duotone',
          active: 'i-ph-tree-palm-fill',
        },
        roles: ['CUSTOMER'],
      },
      {
        title: 'common.routes.accounting.children.totalExpenses.title',
        path: '/accounting/total-expenses',
        icon: {
          base: 'i-ph-currency-dollar-duotone',
          active: 'i-ph-currency-dollar-fill',
        },
        roles: ['CUSTOMER'],
      },
    ],
  },

  {
    title: 'common.routes.settings.title',
    path: '/settings/yards',
    icon: {
      base: 'i-ph-gear-duotone',
      active: 'i-ph-gear-fill',
    },
    isCollapsed: true,
    children: [
      {
        title: 'common.routes.settings.children.yards.title',
        path: '/settings/yards',
        roles: ['ADMIN'],
        icon: {
          base: 'i-ph-house-duotone',
          active: 'i-ph-house-fill',
        },
      },
      {
        title: 'common.routes.settings.children.shippingCompanies.title',
        path: '/settings/shipping-companies',
        roles: ['ADMIN'],
        icon: {
          base: 'i-ph-boat-duotone',
          active: 'i-ph-boat-fill',
        },
      },
      {
        title: 'common.routes.settings.children.dispatchCompanies.title',
        path: '/settings/dispatch-companies',
        roles: ['ADMIN'],
        icon: {
          base: 'i-custom:truck-flatbed-duotone',
          active: 'i-custom:truck-flatbed-fill',
        },
      },

      {
        title: 'common.routes.settings.children.statesSettings.title',
        path: '/settings/states-settings',
        roles: ['ADMIN'],
        icon: {
          base: 'i-ph-map-pin-duotone',
          active: 'i-ph-map-pin-fill',
        },
      },

    ],
    roles: ['ADMIN'],
  },

])

function getDispatches() {
  axios
    .get('sidebar/dispatch')
    .then((res) => {
      navItems.value[3].children = res.data.data
        .map((dispatch: { name: string, count: number, key: string }) => ({
          title: `${dispatch.name} (${dispatch.count})`,
          path: `/dispatch/${dispatch.key}`,
          roles: ['ADMIN'],
        }))
    })
}

interface Yard {
  name: string
  count: number
  key: string
  children: Yard[]
}

function getYards() {
  axios.get('sidebar/terminal')
    .then((res: AxiosResponse<PageResponse<Yard>>) => {
      navItems.value[3].children = res.data.data
        .map(yard => ({
          title: `${yard.name} (${yard.count})`,
          path: `/terminal/${yard.key}`,
          roles: ['ADMIN'],
          isCollapsed: true,
          children: yard.children.map(child => ({
            title: `${child.name} (${child.count})`,
            path: `/terminal/${yard.key}/${child.key}`,
            roles: ['ADMIN'],
            isCollapsed: true,
          })),
        }))
    })
}

emitter.on('refresh:sideBarYards', () => {
  getYards()
})
emitter.on('refresh:sideBarDispatches', () => {
  getDispatches()
})

emitter.on('toggle', (navItem: NavItem) => {
  navItem.isCollapsed = !navItem.isCollapsed
})
