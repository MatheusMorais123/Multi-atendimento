export const theme = {
  grid: {
    container: '85.375rem',
    containerInner: '81.375rem'
  },
  colors: {
    background: {
      light: '#F8F9FA'
    },
    text: {
      title: '#343A40',
      subTitle: '#6C757D'
    }
  },
  layers: {
    base: 10,
    menu: 20,
    overlay: 30,
    modal: 40,
    alwaysOnTop: 50
  },
  border: {
    radius: '4px'
  },
  shadow: {
    card: '0px 1px 2px rgba(0, 0, 0, 0.16)',
    button: '0px 2px 4px rgba(0, 0, 0, 0.16)',
    menu: '0px 4px 8px rgba(0, 0, 0, 0.16)',
    elevatedCard: '0px 8px 16px rgba(0, 0, 0, 0.16)',
    picker: '0px 12px 24px rgba(0, 0, 0, 0.16)',
    modal: '0px 16px 32px rgba(0, 0, 0, 0.16)'
  },
  font: {
    sizes: {
      title: {},
      body: {
        primary: '0.875rem'
      }
    },
    weight: {
      light: 300,
      normal: 400,
      medium: 500,
      semiBold: 600,
      bold: 700
    }
  },
  spacings: {
    spacing_sm: '1rem',
    spacing_m: '1.5rem'
  },
  transitions: {
    fast: 'ease-in-out 125ms',
    normal: 'ease-in-out 250ms',
    slow: 'ease-in-out 500ms'
  },
  custom: {
    iconSize: '1.5rem'
  }
} as const
