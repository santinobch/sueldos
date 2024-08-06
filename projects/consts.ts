export const SQL_CONFIG: Partial<EmscriptenModule> = {
  locateFile: filename => {
    return `node_modules/sql.js/dist/${filename}`;
  },
};
