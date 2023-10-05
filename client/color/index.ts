const palette = {
  global: {
    black: '#000',
    white: '#fff',
    light: '#F6F6F6',
  }
};

const theme = {
  light: {
    primary: palette.global.black,
    secondary: 'rgba(0,0,0,0.4)',
    background: palette.global.light,
    card: palette.global.white,
    border: '#E2E2E2',
  },
  dark: {},
}

const color = {
  tertiary: '#EDF1F5',
  white: '#fff',
  black: '#000',
  light: '#F6F6F6',
  gray: '#8E8E8E',
  ...theme.light,
};

export default color;