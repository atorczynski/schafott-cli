import fs from 'fs';

export const createPkg = (name: string) => {
  fs.writeFileSync('package.json', JSON.stringify({ name }, null, 2));
};

export const changeName = (name: string) => {
  const pkg = JSON.parse(fs.readFileSync('package.json', 'utf-8'));
  pkg.name = name;
  fs.writeFileSync('package.json', JSON.stringify(pkg, null, 2));
};
