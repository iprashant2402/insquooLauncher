import colors, {dark, light} from './colors';

export const lightBackground = {
  backgroundColor: colors.white,
};
export const darkBackground = {
  backgroundColor: colors.primary_background,
};

export const lightText = {
  color: colors.white,
};
export const darkText = {
  color: colors.primary_background,
};

export const lightTheme = {
  background: {
    backgroundColor: light.background,
  },
  cardBackground: {
    backgroundColor: light.card,
  },
  hoverBackground: {
    backgroundColor: light.hover,
  },
  primaryText: {
    color: light.primaryText,
  },
  secondaryText: {
    color: light.secondaryText,
  },
  border: {
    borderColor: colors.primary_background,
    borderWidth: 1,
  },
};

export const darkTheme = {
  background: {
    backgroundColor: '#000',
  },
  cardBackground: {
    backgroundColor: dark.card,
  },
  hoverBackground: {
    backgroundColor: dark.hover,
  },
  primaryText: {
    color: dark.primaryText,
  },
  secondaryText: {
    color: dark.secondaryText,
  },
  border: {
    borderColor: colors.white,
    borderWidth: 1,
  },
};
