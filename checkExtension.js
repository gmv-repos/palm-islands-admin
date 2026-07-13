import  fs from  "fs"
import path from "path"

const EXTENSIONS = [".js", ".jsx", ".ts", ".tsx"];

function walk(dir, files = []) {
  fs.readdirSync(dir).forEach(f => {
    const full = path.join(dir, f);
    if (fs.statSync(full).isDirectory() && !f.startsWith(".")) {
      walk(full, files);
    } else if (EXTENSIONS.some(ext => f.endsWith(ext))) {
      files.push(full);
    }
  });
  return files;
}

function existsWithExactCase(p) {
  if (!fs.existsSync(p)) return false;
  const dir = path.dirname(p);
  const base = path.basename(p);
  return fs.readdirSync(dir).includes(base);
}

const files = walk(process.cwd());

files.forEach(file => {
  const content = fs.readFileSync(file, "utf8");
  const regex = /from\s+['"](.+?)['"]/g;
  let match;

  while ((match = regex.exec(content))) {
    const importPath = match[1];
    if (!importPath.startsWith(".")) continue;

    const basePath = path.resolve(path.dirname(file), importPath);

    const found = EXTENSIONS.some(ext =>
      existsWithExactCase(basePath + ext) ||
      existsWithExactCase(path.join(basePath, "index" + ext))
    );

    if (!found) {
      console.log(`❌ Case mismatch: ${file} → ${importPath}`);
    }
}
});