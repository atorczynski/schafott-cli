// highly inspired by "wrangler" project (CLOUDFLARE) and "shadcn" project (SHADCN)

import fs from 'fs';
import { exec } from 'child_process';

// Read package.json
const pkgJsonPath = '../../package.json';

try {
  const pkgJson = JSON.parse(fs.readFileSync(pkgJsonPath, 'utf8'));
  exec('git rev-parse --short HEAD', (error, stdout) => {
    if (error) {
      console.error(error);
      process.exit(1);
    }
    const commitHash = stdout.trim();
    const betaVersion = `${pkgJson.version}-beta.${commitHash}`;
    pkgJson.version = betaVersion;
    fs.writeFileSync(pkgJsonPath, JSON.stringify(pkgJson, null, 2));
  });
} catch (error) {
  console.error(error);
  process.exit(1);
}
