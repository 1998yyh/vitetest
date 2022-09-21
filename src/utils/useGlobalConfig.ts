import { computed, getCurrentInstance, inject, provide, ref, unref } from 'vue'
import type { InjectionKey, Ref, App, Ref } from 'vue'

import { debugWarn, keysOf } from '@element-plus/utils'

import type { MaybeRef } from '@vueuse/core'
import type { ConfigProviderContext } from '@element-plus/tokens'

export const configProviderContextKey: InjectionKey<
  Ref<Record<string, any>>
> = Symbol('configProviderContextKey')

const globalConfig = ref<ConfigProviderContext>()

export function useGlobalConfig<
  K extends keyof ConfigProviderContext,
  D extends ConfigProviderContext[K]
>(
  key: K,
  defaultValue?: D
): Ref<Exclude<ConfigProviderContext[K], undefined> | D>
export function useGlobalConfig(): Ref<ConfigProviderContext>
export function useGlobalConfig(
  key?: keyof ConfigProviderContext,
  defaultValue = undefined
) {
  const config = getCurrentInstance()
    ? inject(configProviderContextKey, globalConfig)
    : globalConfig
  if (key) {
    return computed(() => config.value?.[key] ?? defaultValue)
  } else {
    return config
  }
}
