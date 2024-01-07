import { createRef } from 'react'
import { create } from 'zustand'
import { shallow } from 'zustand/shallow'
import type { RefObject } from 'react'
import type { Group } from 'three'
import type { StoreApi } from 'zustand'

import { keys } from './keys'

export const angularVelocity = [0, 0.5, 0] as const
export const cameras = ['DEFAULT', 'FIRST_PERSON', 'BIRD_EYE'] as const

export const dpr = 1.5 as const
export const levelLayer = 1 as const
export const maxBoost = 100 as const
export const position = [-110, 0.75, 220] as const
export const rotation = [0, Math.PI / 2 + 0.35, 0] as const

export const booleans = {
  binding: false,
  debug: false,
  editor: false,
  help: false,
  map: true,
  pickcolor: false,
  ready: false,
  shadows: true,
  stats: false,
  sound: true,
}

type Booleans = keyof typeof booleans

const exclusiveBooleans = ['help', 'pickcolor'] as const
type ExclusiveBoolean = (typeof exclusiveBooleans)[number]
const isExclusiveBoolean = (v: unknown): v is ExclusiveBoolean =>
  exclusiveBooleans.includes(v as ExclusiveBoolean)

export type Camera = (typeof cameras)[number]

const controls = {
  backward: false,
  boost: false,
  brake: false,
  forward: false,
  left: false,
  right: false,
}
export type Controls = typeof controls
type Control = keyof Controls
export const isControl = (v: PropertyKey): v is Control =>
  Object.hasOwnProperty.call(controls, v)

export type BindableActionName =
  | Control
  | ExclusiveBoolean
  | Extract<Booleans, 'editor' | 'map' | 'sound'>
  | 'camera'
  | 'reset'

export type ActionInputMap = Record<BindableActionName, string[]>

const actionInputMap: ActionInputMap = {
  backward: ['arrowdown', 's'],
  boost: ['shift'],
  brake: [' '],
  camera: ['c'],
  editor: ['.'],
  forward: ['arrowup', 'w', 'z'],
  help: ['i'],
  left: ['arrowleft', 'a', 'q'],
  map: ['m'],
  pickcolor: ['p'],
  reset: ['r'],
  right: ['arrowright', 'd', 'e'],
  sound: ['u'],
}

type Getter = StoreApi<IState>['getState']
export type Setter = StoreApi<IState>['setState']

type BaseState = Record<Booleans, boolean>

type BooleanActions = Record<Booleans, () => void>
type ControlActions = Record<Control, (v: boolean) => void>

type Actions = BooleanActions &
  ControlActions & {
    camera: () => void
    reset: () => void
  }

export interface IState extends BaseState {
  actions: Actions
  camera: Camera
  color: string
  controls: Controls
  actionInputMap: ActionInputMap
  keyBindingsWithError: number[]
  dpr: number
  finished: number
  get: Getter
  level: RefObject<Group>
  set: Setter
  start: number
  keyInput: string | null
}

const setExclusiveBoolean = (set: Setter, boolean: ExclusiveBoolean) => () =>
  set((state) => ({
    ...exclusiveBooleans.reduce(
      (o, key) => ({ ...o, [key]: key === boolean ? !state[boolean] : false }),
      state
    ),
  }))

const useStoreImpl = create<IState>((set: Setter, get: Getter) => {
  // control actions are created dynamically for each control ke
  const controlActions = keys(controls).reduce<Record<Control, (value: boolean) => void>>(
    (o, control) => {
      o[control] = (value: boolean) =>
        set((state) => ({ controls: { ...state.controls, [control]: value } }))
      return o
    },
    {} as Record<Control, (value: boolean) => void>
  )

  const booleanActions = keys(booleans).reduce<Record<Booleans, () => void>>(
    (o, boolean) => {
      o[boolean] = isExclusiveBoolean(boolean)
        ? setExclusiveBoolean(set, boolean)
        : () => set((state) => ({ ...state, [boolean]: !state[boolean] }))
      return o
    },
    {} as Record<Booleans, () => void>
  )

  const actions: Actions = {
    ...booleanActions,
    ...controlActions,
    camera: () =>
      set((state) => ({
        camera: cameras[(cameras.indexOf(state.camera) + 1) % cameras.length],
      })),

    reset: () => {
      mutation.boost = maxBoost
    },
  }

  return {
    ...booleans,
    actionInputMap,
    actions,
    camera: cameras[0],
    color: '#FFFF00',
    controls,
    keyBindingsWithError: [],
    dpr,
    finished: 0,
    get,
    keyInput: null,
    level: createRef<Group>(),
    set,
    start: 0,
  }
})

interface Mutation {
  boost: number
  rpmTarget: number
  speed: number
  velocity: [number, number, number]
}

export const mutation: Mutation = {
  // Everything in here is mutated to avoid even slight overhead
  boost: maxBoost,
  rpmTarget: 0,
  speed: 0,
  velocity: [0, 0, 0],
}

// Make the store shallow compare by default
const useStore = <T,>(sel: StateSelector<IState, T>) => useStoreImpl(sel, shallow)
Object.assign(useStore, useStoreImpl)

const { getState, setState } = useStoreImpl

export { getState, setState, useStore }
