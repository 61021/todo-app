import type { Role } from '~/common/types'

export interface NavItem {
  title: string
  path: string
  icon?: {
    base: string
    active: string
  }
  roles: Role[]
  isCollapsed?: boolean
  children?: NavItem[]
}
