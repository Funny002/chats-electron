interface Config {
  port: number
  model: boolean;
  tray: {
    toolTip: string
    title: string
  }
}

export default {
  port: 9850,
  model: false,
  tray: {
    title: 'this is title',
    toolTip: 'this is toolTip',
  },
} as Config;