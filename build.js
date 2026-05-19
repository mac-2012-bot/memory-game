import * as esbuild from 'esbuild';
import { glob } from 'glob';
import fs from 'fs';
import path from 'path';

// Configuração do esbuild
const build = async () => {
  try {
    // Limpar a pasta dist
    if (fs.existsSync('dist')) {
      fs.rmSync('dist', { recursive: true });
    }
    fs.mkdirSync('dist');

    // Copiar ficheiros estáticos
    let indexHtml = fs.readFileSync('index.html', 'utf-8');
    indexHtml = indexHtml.replace(
      '<script type="module" src="./src/main.tsx"></script>',
      '<script type="module" src="./main.js"></script>'
    );
    fs.writeFileSync('dist/index.html', indexHtml);
    if (fs.existsSync('public')) {
      fs.cpSync('public', 'dist/public', { recursive: true });
    }

    // Fazer build dos ficheiros TypeScript/JSX
    const entryPoints = await glob('src/**/*.{ts,tsx}');

    await esbuild.build({
      entryPoints,
      bundle: true,
      outdir: 'dist',
      platform: 'browser',
      format: 'esm',
      target: 'es2015',
      loader: {
        '.ts': 'ts',
        '.tsx': 'tsx',
      },
      jsxFactory: 'React.createElement',
      jsxFragment: 'React.Fragment',
    });

    console.log('Build concluído com sucesso!');
  } catch (error) {
    console.error('Erro durante o build:', error);
    process.exit(1);
  }
};

build();