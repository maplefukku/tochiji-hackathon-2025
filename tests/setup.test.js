import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

describe('Project Setup Tests', () => {
  const rootDir = path.join(__dirname, '..');

  describe('Git Configuration', () => {
    test('.gitignore file should exist', () => {
      const gitignorePath = path.join(rootDir, '.gitignore');
      expect(fs.existsSync(gitignorePath)).toBe(true);
    });

    test('.gitignore should contain essential patterns', () => {
      const gitignorePath = path.join(rootDir, '.gitignore');
      const content = fs.readFileSync(gitignorePath, 'utf-8');
      
      // Node.js patterns
      expect(content).toContain('node_modules/');
      expect(content).toContain('*.log');
      expect(content).toContain('.env');
      
      // IDE patterns
      expect(content).toContain('.vscode/');
      expect(content).toContain('.idea/');
      
      // Build outputs
      expect(content).toContain('dist/');
      expect(content).toContain('build/');
      
      // OS files
      expect(content).toContain('.DS_Store');
    });
  });

  describe('Documentation', () => {
    test('README.md should exist', () => {
      const readmePath = path.join(rootDir, 'README.md');
      expect(fs.existsSync(readmePath)).toBe(true);
    });

    test('README.md should contain project title', () => {
      const readmePath = path.join(rootDir, 'README.md');
      const content = fs.readFileSync(readmePath, 'utf-8');
      expect(content).toContain('# Shibuya Live Canvas');
    });

    test('CONTRIBUTING.md should exist', () => {
      const contributingPath = path.join(rootDir, 'CONTRIBUTING.md');
      expect(fs.existsSync(contributingPath)).toBe(true);
    });

    test('CONTRIBUTING.md should contain Git Flow strategy', () => {
      const contributingPath = path.join(rootDir, 'CONTRIBUTING.md');
      const content = fs.readFileSync(contributingPath, 'utf-8');
      expect(content).toContain('Git Flow');
      expect(content).toContain('main');
      expect(content).toContain('develop');
      expect(content).toContain('feature/');
      expect(content).toContain('hotfix/');
    });

    test('CONTRIBUTING.md should contain commit rules', () => {
      const contributingPath = path.join(rootDir, 'CONTRIBUTING.md');
      const content = fs.readFileSync(contributingPath, 'utf-8');
      expect(content).toContain('Commit Message Format');
      expect(content).toContain('feat:');
      expect(content).toContain('fix:');
      expect(content).toContain('docs:');
    });
  });

  describe('Monorepo Structure', () => {
    const expectedDirs = [
      'apps',
      'apps/web',
      'apps/mobile',
      'apps/admin',
      'packages',
      'packages/shared',
      'packages/ui',
      'services',
      'services/api',
      'services/auth',
      'services/notification',
      'docs',
      'tests',
      'scripts',
      '.github',
      '.github/workflows'
    ];

    expectedDirs.forEach(dir => {
      test(`${dir} directory should exist`, () => {
        const dirPath = path.join(rootDir, dir);
        expect(fs.existsSync(dirPath)).toBe(true);
        expect(fs.statSync(dirPath).isDirectory()).toBe(true);
      });
    });
  });
});