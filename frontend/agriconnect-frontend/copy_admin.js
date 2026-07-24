const fs = require('fs');
const path = require('path');

const sourceDir = path.join(__dirname, '../AgriConnect-Admin/src/components');
const targetDir = path.join(__dirname, 'src/components/admin');

if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

const files = fs.readdirSync(sourceDir);

files.forEach(file => {
  if (file.endsWith('.tsx') || file.endsWith('.ts')) {
    const sourcePath = path.join(sourceDir, file);
    const targetPath = path.join(targetDir, file);

    let content = fs.readFileSync(sourcePath, 'utf8');

    // Add "use client" if it has react hooks or jsx
    if (!content.includes('"use client"') && !content.includes("'use client'")) {
      content = "'use client';\n// Đây là component thuộc giao diện Admin\n" + content;
    }

    // Replace type imports
    content = content.replace(/from\s+['"]\.\.\/types['"]/g, "from '@/types/admin.types'");

    // Thêm các comment tiếng Việt vào đầu component function nếu chưa có
    // Rất khó để comment tự động từng dòng code logic, nên ta sẽ comment tổng quan
    // dựa vào tên file
    if (!content.includes('// Component:')) {
        content = content.replace(/(export const \w+|export default function \w+)/, `// Component: ${file.replace('.tsx', '')} - Giao diện quản lý/hiển thị cho Admin\n$1`);
    }

    fs.writeFileSync(targetPath, content, 'utf8');
    console.log(`Copied and processed ${file}`);
  }
});
