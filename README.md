
# 💼 منصة التوظيف والتقييم البرمجي (Job & Evaluation Platform)

مشروع متكامل يجمع بين **لوحة تحكم إدارية تفاعلية (Admin Dashboard)**، و**نظام تقييم وحل مسائل برمجية (NeetCode/LeetCode Evaluation Engine)**، و**خادم واجهات برمجية (Backend API)** لإدارة الوظائف والمستخدمين والشركات والتقديمات.

---

## 📁 هيكلية المشروع الموحدة (Project Structure)

تم تنظيم المشروع وفصل الواجهة الأمامية عن الواجهة الخلفية وقاعدة البيانات لتسهيل التطوير والدمج المباشر مع فروع الفريق:

```text
CV/
├── backend/                       # خادم Node.js / Express وخدمات تقييم الأكواد
│   ├── config/                    # إعدادات قاعدة البيانات والتكوين
│   ├── controllers/               # معالجة منطق الطلبات (Submissions, etc.)
│   ├── models/                    # نماذج MongoDB (Problem, etc.)
│   ├── routes/                    # مسارات API (/api/problems, /api/submissions)
│   ├── scripts/                   # سكربتات مساعدة لترحيل واستيراد البيانات
│   ├── seeder/                    # استيراد بنك الأسئلة والمسائل
│   │   └── importData.js          # سكربت تعبئة وتحديث البيانات (Bulk Upsert)
│   ├── services/                  # خدمات المعالجة والـ Sandbox (compilerService)
│   ├── .env                       # متغيرات البيئة الخاصة بالسيرفر
│   ├── Dockerfile                 # إعداد تشغيل الخادم كحاوية Docker
│   ├── docker-compose.yml         # تشغيل Mongo + Server + Seeder بضغطة زر
│   ├── package.json               # حزم ومكتبات الخادم
│   └── server.js                  # نقطة انطلاق الخادم (Port 5000)
│
├── frontend/                      # لوحة التحكم الإدارية (React + TypeScript)
│   ├── public/                    # الملفات الثابتة والأيقونات (index.html, manifest)
│   ├── src/                       # الكود المصدري للواجهة
│   │   ├── components/            # مكونات الرسوم البيانية والمؤشرات (Nivo Charts)
│   │   │   ├── BarChart.tsx       # رسم بياني بالأعمدة
│   │   │   ├── LineChart.tsx      # رسم بياني خطي
│   │   │   ├── PieChart.tsx       # رسم بياني دائري
│   │   │   ├── GeographyChart.tsx # خريطة جغرافية للبيانات
│   │   │   ├── StatBox.tsx        # بطاقة إحصائية
│   │   │   ├── ProgressCircle.tsx # دائرة تقدم الإنجاز
│   │   │   └── header.tsx         # ترويسة الصفحات والعناوين
│   │   ├── scenes/                # شاشات لوحة التحكم
│   │   │   ├── dashboard/         # الشاشة الرئيسية والإحصائيات
│   │   │   │   └── global/        # القائمة الجانبية (Sidebar) وشريط التنقل (Topbar)
│   │   │   ├── team/              # إدارة فريق العمل والصلاحيات (DataGrid)
│   │   │   ├── contacts/          # قائمة جهات الاتصال وبياناتهم
│   │   │   ├── invoices/          # الفواتير والمعاملات المالية
│   │   │   ├── Form/              # نموذج إضافة مستخدم جديد (Formik + Yup)
│   │   │   ├── calendar/          # تقويم الأحداث والمواعيد (FullCalendar)
│   │   │   └── FAQ/               # صفحة الأسئلة الشائعة
│   │   ├── data/                  # البيانات الوهمية والمحاكاة (Mock Data)
│   │   ├── App.tsx                # المكون الرئيسي ومسارات التنقل (Routing)
│   │   ├── index.tsx              # نقطة مدخل تطبيق React
│   │   └── theme.ts               # إدارة السمات (Dark / Light Mode) ومصفوفة الألوان
│   ├── package.json               # حزم ومكتبات الواجهة (MUI, Nivo, Router, etc.)
│   └── tsconfig.json              # إعدادات مترجم TypeScript
│
├── data/                          # بنك البيانات المرجعي (JSON Datasets)
│   ├── problems_youseef.json      # بنك المسائل البرمجية (LeetCode/NeetCode style)
│   └── tech_questions.json        # بنك الأسئلة التقنية والاختبارات (Quizzes)
│
├── .gitignore                     # قواعد استبعاد الملفات وتجاهل node_modules
└── README.md                      # التوثيق الشامل لهيكلية وتشغيل المشروع
```

---

## 🎨 الواجهة الأمامية (Frontend - Admin Dashboard)

لوحة تحكم إدارية مبنية باستخدام **React 19** و **TypeScript** ومكتبة **Material-UI (MUI)** وتدعم:
- **نظام السمات المتقدم (Dark / Light Mode)** مع لوحة ألوان مخصصة مبنية على درجات الرمادي والأخضر والأزرق (`theme.ts`).
- **رسوم بيانية تفاعلية وغنية (Nivo Charts):** رسوم بيانية للأعمدة، والخطوط، والدوائر، والخرائط الجغرافية لتتبع الأداء وتوزيع المستخدمين.
- **إدارة البيانات والجداول المتقدمة (MUI X DataGrid):** عرض وتصفية بيانات الفرق وجهات الاتصال والفواتير.
- **نماذج الإدخال والتحقق (Formik & Yup):** معالجة نماذج المستخدمين مع تحقق فوري من صحة البيانات.
- **تقويم المواعيد التفاعلي (FullCalendar):** لإضافة وجدولة الأحداث والمواعيد.

### تشغيل الواجهة الأمامية:
```bash
cd frontend
npm install
npm start
```
*يفتح التطبيق افتراضياً على: `http://localhost:3000`*

---

## ⚙️ الواجهة الخلفية (Backend - API & Compiler)

مبنية باستخدام **Node.js** و **Express 5** و **MongoDB (Mongoose)**، وتوفر:
1. **بنك المسائل والأسئلة (`/api/problems`):**
   - استرجاع المسائل البرمجية حسب الصعوبة (`Easy`, `Medium`, `Hard`) والتصنيف (`category`).
   - استرجاع أسئلة الاختبارات التقنية (`quiz`).
2. **محرك فحص وتشغيل الشيفرة البرمجية (`/api/submissions`):**
   - تنفيذ الأكواد البرمجية داخل بيئة معزولة وآمنة (Sandbox) باستخدام مكتبة `vm2`.
3. **نظام استيراد البيانات الذكي (Data Seeder):**
   - قراءة أكثر من 30,000 سطر من البيانات من مجلد `data/` وإدخالها أو تحديثها (`bulkWrite` / `upsert`) لمنع تكرار البيانات.

### تشغيل السيرفر محلياً:
```bash
cd backend
npm install

# استيراد وتعبئة بنك المسائل والأسئلة في قاعدة البيانات:
npm run seed

# تشغيل الخادم في وضع الإنتاج/التطوير:
npm start
```
*يعمل السيرفر افتراضياً على: `http://localhost:5000`*

### تشغيل السيرفر عبر Docker:
```bash
cd backend
# تشغيل خادم MongoDB والخادم معاً:
docker-compose up -d mongo backend

# تشغيل عملية استيراد البيانات (Seeder):
docker-compose --profile seed up seeder
```

---

## 🔑 متغيرات البيئة (Environment Variables)

داخل مجلد `backend/.env`:
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/job-platform
JWT_SECRET=your_jwt_secret_key
```

---

## 🔀 دليل دمج الأكواد مع الفروع الأخرى (Git Merge Guide)

بعد تنظيم المشروع بفصل `frontend` و `backend` وإزالة `node_modules` والروابط المعطوبة من Git، أصبح الدمج مع أي فرع من فروع الفريق آمناً وسهلاً للغاية:

### 1. حفظ التغييرات الحالية في الفرع:
```bash
git add .
git commit -m "Refactor project structure into clean frontend and backend directories and add comprehensive README"
git push origin NadaNour
```

### 2. الدمج مع فرع موحد مثل `origin/WaseemMohammed`:
فرع `WaseemMohammed` يحتوي بالفعل على مجلد `backend/` و `frontend/` موحدين:
```bash
# جلب آخر التحديثات من المستودع
git fetch origin

# دمج التحديثات
git merge origin/WaseemMohammed
```
*لن يحدث أي تعارض هيكلي لأن المجلدين أصبحا متطابقين في التسمية والتقسيم.*

### 3. الدمج مع فرع الزميلة `origin/Sura`:
فرع `Sura` يحتوي على عمل مكمل للوحة التحكم. إذا أردت دمج شاشات إضافية تم تطويرها في ذلك الفرع:
- بعد جلب الفرع، يمكن دمج شاشات `src/scenes` الجديدة إلى داخل `frontend/src/scenes`.

---

## 👥 المساهمون
- **Nada Nour** - تطوير لوحة التحكم الإدارية (Admin Dashboard) ونظام المسائل البرمجية (NeetCode Problem Engine).
- **فريق مشروع المنصة (Foras Palestine / TTWAR).**
