# 🚀 DotDeep Design - Complete Deployment Guide

## 📦 ขั้นตอนที่ 1: เตรียม Code สำหรับ GitHub

### 1.1 ตรวจสอบไฟล์ที่ไม่ควร commit

ตรวจสอบว่า `.gitignore` มีไฟล์เหล่านี้:

```bash
cd sanity-template-nextjs-clean
cat .gitignore
```

ควรมี:
```
.env
.env.local
.env*.local
node_modules/
.next/
dist/
```

### 1.2 ลบไฟล์ sensitive ออกจาก git (ถ้ามี)

```bash
# ลบ .env.local ออกจาก git history (ถ้าเคย commit ไปแล้ว)
git rm --cached frontend/.env.local
git rm --cached studio/.env.local
git commit -m "Remove sensitive env files"
```

### 1.3 Initialize Git และ Push ไป GitHub

```bash
cd sanity-template-nextjs-clean

# Initialize git (ถ้ายังไม่ได้ทำ)
git init

# Add remote
git remote add origin https://github.com/tay1862/dotdeep-minimal.git

# Add all files
git add .

# Commit
git commit -m "Initial commit: DotDeep Design with upgraded UI"

# Push to GitHub
git branch -M main
git push -u origin main
```

---

## 🎨 ขั้นตอนที่ 2: Deploy Sanity Studio

### 2.1 Login to Sanity

```bash
cd studio
npx sanity login
```

เลือก login ด้วย:
- GitHub
- Google
- หรือ Email

### 2.2 Deploy Studio

```bash
npx sanity deploy
```

ระบบจะถาม:
- **Studio hostname**: ใส่ชื่อที่ต้องการ เช่น `dotdeep` (จะได้ URL: `dotdeep.sanity.studio`)
- กด Enter เพื่อยืนยัน

✅ Studio จะถูก deploy ที่: `https://dotdeep.sanity.studio`

### 2.3 Seed ข้อมูลเริ่มต้น

```bash
# ยังอยู่ใน folder studio
npx sanity exec scripts/seed-complete.ts --with-user-token
```

คุณจะเห็น:
```
🌱 Starting complete seed for DotDeep Design...
📝 Creating site settings...
✅ Site settings created
📝 Creating home page...
✅ Home page created
📝 Creating about page...
✅ About page created
✨ Seeding complete!
```

### 2.4 เปิด Studio และตรวจสอบ

```bash
# เปิด Studio ใน browser
open https://dotdeep.sanity.studio
# หรือ
npx sanity manage
```

ตรวจสอบว่ามีข้อมูลใน:
- ✅ Settings (contact info, social links)
- ✅ Home Page (hero, stats, CTA)
- ✅ About Page

---

## ☁️ ขั้นตอนที่ 3: Deploy Frontend บน Vercel

### 3.1 เข้า Vercel Dashboard

1. ไปที่ https://vercel.com
2. Login ด้วย GitHub account
3. คลิก **"Add New..."** → **"Project"**

### 3.2 Import Repository

1. เลือก `dotdeep-minimal` repository
2. คลิก **"Import"**

### 3.3 Configure Project

**Framework Preset**: Next.js (auto-detected)

**Root Directory**: 
- คลิก **"Edit"**
- เลือก `frontend`
- คลิก **"Continue"**

**Build and Output Settings**:
- Build Command: `npm run build` (default)
- Output Directory: `.next` (default)
- Install Command: `npm install` (default)

### 3.4 Environment Variables

คลิก **"Environment Variables"** แล้วเพิ่ม:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=u0fnsyxd
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SITE_URL=https://dotdeep-minimal.vercel.app
SANITY_STUDIO_PREVIEW_URL=https://dotdeep-minimal.vercel.app
SANITY_API_READ_TOKEN=skGNmnbZgONKVtcO4FhibSEC7z9nus1236VHljPuPzIaNlDW7ku5zHH3YD5mau86ctYcZHW1WggTazJusudKvERBEZLHXdY5FNjZBiaLwkIeyKiOwzlHywuFkVklAsH5CZ71PgXmPQGihhvedfUZmuZyUPdyBbA1cK919vt4vHTqOefypsNL
SANITY_API_WRITE_TOKEN=skVtpIQ58rWK7ieil7yxZJwZhSP1G8Sit4QJwxpPPJSb2NJsDI9grxmLIRNWrv81pw52eHyHahYF1WJOIqXq2RwkuUO2Gmw18HHZWUA56jyzuNxf0JXzeXmZ60UY9ZtVGPG8qmi8nrOP3NJqxigomPm3FM23VP49mI6wjaAnLjQmWiUsD3Dc
RESEND_API_KEY=re_8Fdq1Td9_JJvc7HbMbxUeL1uu4PibW7bP
CONTACT_EMAIL=dotdeepdesign@gmail.com
```

**สำคัญ**: เปลี่ยน `NEXT_PUBLIC_SITE_URL` เป็น URL จริงของคุณหลัง deploy เสร็จ

### 3.5 Deploy

1. คลิก **"Deploy"**
2. รอ 2-3 นาที
3. ✅ เว็บจะ live ที่ `https://dotdeep-minimal.vercel.app`

---

## 🔄 ขั้นตอนที่ 4: Update URLs หลัง Deploy

### 4.1 Update Vercel Environment Variables

1. ไปที่ Vercel Dashboard → Project Settings → Environment Variables
2. แก้ไข:
   ```env
   NEXT_PUBLIC_SITE_URL=https://dotdeep-minimal.vercel.app
   SANITY_STUDIO_PREVIEW_URL=https://dotdeep-minimal.vercel.app
   ```
3. คลิก **"Save"**
4. ไปที่ **Deployments** → คลิก **"Redeploy"** บน deployment ล่าสุด

### 4.2 Update Sanity Studio Environment

```bash
cd studio

# แก้ไข .env.local
nano .env.local
```

เปลี่ยนเป็น:
```env
SANITY_STUDIO_PROJECT_ID="u0fnsyxd"
SANITY_STUDIO_DATASET="production"
SANITY_STUDIO_PREVIEW_URL="https://dotdeep-minimal.vercel.app"
```

Save และ redeploy studio:
```bash
npx sanity deploy
```

---

## 🎯 ขั้นตอนที่ 5: เพิ่มเนื้อหาใน Sanity Studio

### 5.1 เข้า Studio

ไปที่ `https://dotdeep.sanity.studio`

### 5.2 Upload Images

1. ไปที่ **Home Page**
2. คลิก **Hero Image** → Upload รูปภาพสวยๆ
3. ไปที่ **Settings** → **Open Graph Image** → Upload รูป logo/cover

### 5.3 สร้าง Projects (ผลงาน)

1. คลิก **Projects** → **Create new Project**
2. กรอกข้อมูล:
   - **Title**: ชื่อโปรเจกต์ (ทั้ง 3 ภาษา)
   - **Slug**: URL-friendly name (เช่น `my-first-project`)
   - **Category**: เลือก graphic/web/uiux/video
   - **Cover Image**: Upload รูปหน้าปก
   - **Images**: Upload รูปเพิ่มเติม
   - **Client**: ชื่อลูกค้า
   - **Description**: รายละเอียดโปรเจกต์
   - **Tech Stack**: เทคโนโลยีที่ใช้ (เช่น React, Figma)
   - **Featured**: เลือก true ถ้าต้องการแสดงในหน้าแรก
3. คลิก **Publish**

สร้างอย่างน้อย 3-6 โปรเจกต์

### 5.4 สร้าง Services (บริการ)

1. คลิก **Services** → **Create new Service**
2. กรอกข้อมูล:
   - **Title**: ชื่อบริการ (ทั้ง 3 ภาษา)
   - **Slug**: เช่น `graphic-design`
   - **Short Description**: คำอธิบายสั้น
   - **Description**: คำอธิบายยาว
   - **Icon**: เลือก palette/code/layout/video
   - **Features**: รายการฟีเจอร์ (ทั้ง 3 ภาษา)
   - **Order**: ลำดับการแสดง (0, 1, 2, 3)
3. คลิก **Publish**

สร้าง 4 services:
- Graphic Design (icon: palette)
- Web Development (icon: code)
- UI/UX Design (icon: layout)
- Video Production (icon: video)

### 5.5 สร้าง Pricing (แพ็คเกจราคา)

1. คลิก **Pricing Items** → **Create new Pricing Item**
2. กรอกข้อมูล:
   - **Name**: ชื่อแพ็คเกจ (ทั้ง 3 ภาษา)
   - **Price**: ราคา (เช่น 5000000)
   - **Currency**: LAK/USD/THB
   - **Description**: คำอธิบาย
   - **Features**: รายการสิ่งที่ได้รับ
   - **Service**: เลือก service ที่เกี่ยวข้อง
   - **Order**: ลำดับ
3. คลิก **Publish**

### 5.6 เพิ่ม Team Members

1. คลิก **People** → **Create new Person**
2. กรอกข้อมูล:
   - **First Name**: ชื่อ
   - **Last Name**: นามสกุล
   - **Picture**: Upload รูปโปรไฟล์
   - **Role**: ตำแหน่ง (ทั้ง 3 ภาษา)
   - **Bio**: ประวัติย่อ (ทั้ง 3 ภาษา)
   - **Social Links**: Facebook, Instagram, LinkedIn
   - **Order**: ลำดับ
3. คลิก **Publish**

---

## 🔧 ขั้นตอนที่ 6: การอัพเดท Code ใหม่

### 6.1 แก้ไข Code ใน Local

```bash
cd sanity-template-nextjs-clean

# แก้ไขไฟล์ที่ต้องการ
# เช่น frontend/app/components/...
```

### 6.2 Test ใน Local

```bash
# Terminal 1: Run Studio
cd studio
npm run dev

# Terminal 2: Run Frontend
cd frontend
npm run dev
```

เปิด:
- Frontend: http://localhost:3000
- Studio: http://localhost:3333

### 6.3 Commit และ Push

```bash
git add .
git commit -m "Update: describe your changes"
git push origin main
```

### 6.4 Auto Deploy

✅ Vercel จะ auto-deploy ทันทีที่คุณ push ไป GitHub!

ดูสถานะได้ที่:
- Vercel Dashboard → Deployments
- หรือรอ email notification จาก Vercel

### 6.5 Manual Redeploy (ถ้าต้องการ)

1. ไปที่ Vercel Dashboard
2. เลือก Project
3. ไปที่ **Deployments**
4. คลิก **"..."** บน deployment ล่าสุด
5. เลือก **"Redeploy"**

---

## ✅ Checklist หลัง Deploy

### Frontend
- [ ] เว็บเปิดได้ที่ URL ของ Vercel
- [ ] ทุกหน้าโหลดได้ (Home, About, Services, Gallery, Pricing, Contact)
- [ ] รูปภาพแสดงผลถูกต้อง
- [ ] ทั้ง 3 ภาษา (EN, TH, LO) ทำงานได้
- [ ] Dark mode ทำงานได้
- [ ] Contact form ส่งอีเมลได้
- [ ] Floating buttons (WhatsApp) ทำงานได้
- [ ] Mobile responsive ดูดี

### Sanity Studio
- [ ] Studio เปิดได้ที่ `https://dotdeep.sanity.studio`
- [ ] Login ได้
- [ ] แก้ไข content ได้
- [ ] Presentation Tool (visual editing) ทำงานได้
- [ ] มี Projects อย่างน้อย 3 โปรเจกต์
- [ ] มี Services ครบ 4 บริการ
- [ ] มี Pricing packages
- [ ] มี Team members

### SEO & Performance
- [ ] Meta tags ถูกต้อง (ดูใน View Source)
- [ ] Open Graph image แสดงผลใน Facebook/Twitter
- [ ] Lighthouse score > 90 (ทดสอบใน Chrome DevTools)
- [ ] ไม่มี console errors

---

## 🐛 Troubleshooting

### ปัญหา: Build Failed บน Vercel

**สาเหตุ**: Missing environment variables

**แก้ไข**:
1. ไปที่ Vercel → Settings → Environment Variables
2. ตรวจสอบว่ามีครบทุกตัว
3. Redeploy

### ปัญหา: รูปภาพไม่แสดง

**สาเหตุ**: Sanity CDN ยังไม่ sync

**แก้ไข**:
1. รอ 1-2 นาที
2. Clear browser cache (Cmd+Shift+R)
3. ตรวจสอบว่า upload รูปใน Sanity Studio แล้ว

### ปัญหา: Contact Form ไม่ส่งอีเมล

**สาเหตุ**: Resend API key ไม่ถูกต้อง

**แก้ไข**:
1. ตรวจสอบ `RESEND_API_KEY` ใน Vercel
2. ตรวจสอบ `CONTACT_EMAIL` ใน Vercel
3. ดู logs ใน Vercel → Functions → contact form

### ปัญหา: Presentation Tool ไม่ทำงาน

**สาเหตุ**: `SANITY_STUDIO_PREVIEW_URL` ไม่ถูกต้อง

**แก้ไข**:
1. แก้ไข `studio/.env.local`
2. Redeploy studio: `npx sanity deploy`

---

## 📚 Resources

- **Vercel Docs**: https://vercel.com/docs
- **Sanity Docs**: https://www.sanity.io/docs
- **Next.js Docs**: https://nextjs.org/docs
- **Tailwind CSS**: https://tailwindcss.com/docs

---

## 🎉 ยินดีด้วย!

เว็บของคุณ live แล้วที่:
- **Frontend**: https://dotdeep-minimal.vercel.app
- **Studio**: https://dotdeep.sanity.studio

ขั้นตอนต่อไป:
1. เพิ่มเนื้อหาใน Sanity Studio
2. Upload รูปภาพคุณภาพสูง
3. แชร์เว็บกับลูกค้า
4. รับ feedback และปรับปรุง

**Need help?** ติดต่อ: dotdeepdesign@gmail.com

---

Built with ♠ by DotDeep Design Team
