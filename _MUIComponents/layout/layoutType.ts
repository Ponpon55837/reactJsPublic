import { NextComponentType, NextPage, NextPageContext } from 'next'
import { AppProps } from 'next/app'
import { LayoutKeys } from '@layout/GetLayouts'

export type MyPage<P = {}, IP = P> = NextPage<P, IP> & {
  Layout?: LayoutKeys
}

export type MyAppProps = AppProps & {
  Component: NextComponentType<NextPageContext, any, any> & {
    Layout: LayoutKeys
  }
}
