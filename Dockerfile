# مرحله 1: نصب و ساخت پروژه
FROM node:18-alpine AS builder

WORKDIR /app

# کپی فقط فایل‌های مورد نیاز برای نصب پکیج‌ها
COPY package*.json ./
COPY codegen.yml ./

# نصب پکیج‌ها
RUN npm install

# کپی باقی کدها
COPY . .

# اجرای codegen + prebuild + build
RUN npm run generate && node prebuild && npm run build

# مرحله 2: اجرای نهایی
FROM node:18-alpine

WORKDIR /app

# کپی node_modules و فایل‌های ساخته شده
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/server.js ./server.js

# 
COPY --from=builder /app/graphql ./graphql
COPY --from=builder /app/prebuild.js ./prebuild.js

# پورت مورد استفاده
EXPOSE 4500

# اجرای برنامه
CMD ["npm", "start"]
