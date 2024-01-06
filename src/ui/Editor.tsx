import { button, folder, useControls } from 'leva'
import { booleans, dpr, useStore } from '../store'

const { debug, shadows, stats } = booleans
const initialValues = {
  debug,
  dpr,
  shadows,
  stats,
}

export function Editor() {
  const [get, set, debug, dpr, shadows, stats] = useStore((state) => [
    state.get,
    state.set,
    state.debug,
    state.dpr,
    state.shadows,
    state.stats,
  ])

  const [,] = useControls(() => ({
    Performance: folder({
      dpr: { value: dpr, min: 1, max: 2, step: 0.5, onChange: (dpr) => set({ dpr }) },
      shadows: { value: shadows, onChange: (shadows) => set({ shadows }) },
    }),

    Debug: folder(
      {
        debug: { value: debug, onChange: (debug) => set({ debug }) },
        stats: { value: stats, onChange: (stats) => set({ stats }) },
      },
      { collapsed: true }
    ),
    reset: button(() => {}),
  }))
  return null
}
