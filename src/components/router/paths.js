function path(root, subLink) {
  return `${root}${subLink}`;
}

const ROOTS_HOMEPAGE = "/";

const HOMEPAGE = {
  // root: ROOTS_HOMEPAGE,
  path: {
    name: path(ROOTS_HOMEPAGE, "sensec/homepage"),
  },
};

// DEFAULT ROOT PATH
export const DEFAULT_PATH = HOMEPAGE.path.name;
