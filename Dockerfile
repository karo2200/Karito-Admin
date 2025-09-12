### مرحله 1: ساخت پروژه
FROM node:18-alpine AS builder

# تنظیم محیط کار
WORKDIR /app

# نصب ابزارهای مورد نیاز برای build (مثل node-gyp)
RUN apk add --no-cache python3 make g++

# کپی فایل‌های ضروری برای نصب پکیج‌ها و اجرای codegen
COPY package*.json ./
COPY codegen.yml ./
# اگر از schema محلی استفاده می‌کنی
COPY schema.graphql ./

# نصب پکیج‌ها (کامل، با devDependencies)
RUN npm install --force

# کپی کل سورس‌کد
COPY . .

# اجرای codegen، prebuild، و build نهایی
RUN npm run generate
RUN node prebuild
RUN npm run build

### مرحله 2: تصویر نهایی برای اجرا
FROM node:18-alpine

# تنظیم محیط کار
WORKDIR /app

# فقط فایل‌های مورد نیاز را از مرحله build کپی می‌کنیم
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/package*.json ./
#COPY --from=builder /app/server.js ./server.js

# نصب فقط پکیج‌های production (بدون devDependencies)
ENV NODE_ENV=production
RUN npm ci --omit=dev --legacy-peer-deps

# پورت مورد استفاده توسط اپلیکیشن
EXPOSE 4500

# اجرای برنامه
CMD ["npx", "next", "start", "-p", "4500"]
