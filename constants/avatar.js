const AVATAR_SIZE = 250;

export const GRAVATAR = {
  baseUrl: "https://www.gravatar.com",
  theme: {
    noImage: 404,
    anonymous: "mp",
    geometric: "identicon",
    monster: "monsterid",
    faces: "wavatar",
    arcadeStyle: "retro",
    robot: "robohash",
    blankPNG: "blank",
  },
};

export const AVATAR_OPTIONS = {
  path: "avatars",
  size: AVATAR_SIZE,
  gravaTheme: GRAVATAR.theme.robot,
};
