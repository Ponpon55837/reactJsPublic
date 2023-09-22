import AdminLayout from '@layout/BackLayout/MainLayout'
import AdminMobileLayout from '@layout/BackLayout/MobileMainLayout'
import WebLayout from '@layout/FrontLayout/MainLayout'
import WebMobileLayout from '@layout/FrontLayout/MobileMainLayout'
import PublicLayout from '@layout/PublicLayout'

export const Layouts = {
  Web: WebLayout,
  WebMobile: WebMobileLayout,
  Admin: AdminLayout,
  AdminMobile: AdminMobileLayout,
  Public: PublicLayout,
}

export type LayoutKeys = keyof typeof Layouts
