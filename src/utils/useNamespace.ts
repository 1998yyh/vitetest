/**
 * Element-plus bem方案
 */
export const defaultNamespace = 'el'

const statePrefix = 'is-'

// 创建bem结构
const _bem = (
  namespace: string,
  block: string,
  blockSuffix: string,
  element: string,
  modifier: string
) => {
  let cls = `${namespace}-${block}`
  if (blockSuffix) {
    cls += `-${blockSuffix}`
  }
  if (element) {
    cls += `__${element}`
  }
  if (modifier) {
    cls += `--${modifier}`
  }
  return cls
}

export const useNamespace = (block: string) => {
  const b = (blockSuffix = '') => _bem(defaultNamespace, block, blockSuffix, '', '')
  const e = (element?: string) => element ? _bem(defaultNamespace, block, '', element, '') : ''
  const m = (modifier?: string) => modifier ? _bem(defaultNamespace, block, '', '', modifier) : ''
  const be = (blockSuffix?: string, element?: string) => blockSuffix && element ? _bem(defaultNamespace, block, blockSuffix, element, '') : ''
  const em = (element?: string, modifier?: string) => element && modifier ? _bem(defaultNamespace, block, '', element, modifier) : ''
  const bm = (blockSuffix?: string, modifier?: string) => blockSuffix && modifier ? _bem(defaultNamespace, block, blockSuffix, '', modifier) : ''
  const bem = (blockSuffix?: string, element?: string, modifier?: string) => blockSuffix && element && modifier ? _bem(defaultNamespace, block, blockSuffix, element, modifier) : ''

  const is: {
    (name: string, state: boolean | undefined): string
    (name: string): string
  } = (name: string, ...args: [boolean | undefined] | []) => {
    const state = args[0] ?? true
    return name && state ? `${statePrefix}${name}` : ''
  }

  const cssVar = (object: Record<string, string>) => {
    const styles: Record<string, string> = {}
    for (const key in object) {
      if (object[key]) {
        styles[`--${defaultNamespace}-${key}`] = object[key]
      }
    }
    return styles
  }

  const cssVarBlock = (object: Record<string, string>) => {
    const styles: Record<string, string> = {}
    for (const key in object) {
      if (object[key]) {
        styles[`--${defaultNamespace}-${block}-${key}`] = object[key]
      }
    }
    return styles
  }

  const cssVarName = (name: string) => `--${defaultNamespace}-${name}`
  const cssVarBlockName = (name: string) => `--${defaultNamespace}-${block}-${name}`

  return {
    b,
    e,
    m,
    be,
    em,
    bm,
    bem,
    is,
    cssVar,
    cssVarBlock,
    cssVarName,
    cssVarBlockName
  }
}

export type UseNamespaceReturn = ReturnType<typeof useNamespace>
