### مرحله 1: ساخت پروژه
FROM node:18-alpine AS builder

WORKDIR /app

# نصب ابزار لازم برای ساخت (در Alpine)
RUN apk add --no-cache python3 make g++

# فقط فایل‌های ضروری برای نصب پکیج‌ها و اجرای codegen
COPY package*.json ./
COPY package-lock.json ./
COPY codegen.yml ./

# نصب پکیج‌ها کامل
RUN npm install --force

# کپی کل سورس‌کد
COPY . .

# اجرای codegen، prebuild و build نهایی
RUN npm run generate && node prebuild && npm run build

---

### مرحله 2: تصویر نهایی برای اجرا
FROM node:18-alpine

WORKDIR /app

# فقط فایل‌های مورد نیاز را از مرحله‌ی build کپی می‌کنیم
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/server.js ./server.js

# نصب پکیج‌های فقط برای تولید (بدون devDependencies)
RUN npm ci --only=production

# پورت مورد استفاده
EXPOSE 4500

# اجرای برنامه
CMD ["npx", "next", "start", "-p", "4500"]
