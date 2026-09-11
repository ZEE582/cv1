/**
 * @file server.js
 * @description سيرفر منصة تطور الموحد — يشغّل جميع صفحات الموقع والخدمات التجريبية من نقطة واحدة
 *
 * الصفحات والخدمات المشمولة:
 *  - المصادقة وتغيير الحسابات  /api/auth & /login
 *  - إدارة أعضاء الفريق         /team
 *  - قائمة جهات الاتصال       /contacts
 *  - إدارة الفعاليات للتقويم     /events
 *  - إدارة بيانات الشركات       /companies & /api/companies
 *  - الوظائف، والطلبات، والرسائل  /api/jobs, /api/applications, /api/messages
 *  - السيرة الذاتية والمساعد الذكي/api/cv, /api/ai
 *  - توثيق API الموحد (Swagger) /api/docs
 */

require('dotenv').config({ path: require('path').join(__dirname, '.env') });

const express    = require('express');
const cors       = require('cors');
const morgan     = require('morgan');
const rateLimit  = require('express-rate-limit');
const swaggerUi  = require('swagger-ui-express');

const { connectDB }              = require('./config/db');
const swaggerSpec                = require('./swagger/config');
const { errorHandler, notFound } = require('./middleware/errorHandler');

const app = express();

// ─────────────────────────────────────────────────────────────
// CORS Configuration
// ─────────────────────────────────────────────────────────────
const allowedOrigins = [
  process.env.FRONTEND_URL || 'http://localhost:5173',
  'http://localhost:5173',
  'http://localhost:3000',
  'http://localhost:4173',
];

app.use(cors({
  origin: (origin, cb) => {
    if (!origin || allowedOrigins.includes(origin)) return cb(null, true);
    return cb(new Error('Not allowed by CORS'));
  },
  credentials:    true,
  methods:        ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// ─────────────────────────────────────────────────────────────
// Rate Limiting
// ─────────────────────────────────────────────────────────────
app.use(rateLimit({
  windowMs:        15 * 60 * 1000,
  max:              300,
  standardHeaders: true,
  legacyHeaders:   false,
  message: {
    success: false,
    message: 'طلبات كثيرة جداً، يرجى المحاولة لاحقاً',
    code:    'RATE_LIMIT_EXCEEDED',
  },
}));

// ─────────────────────────────────────────────────────────────
// Parsing & Logging
// ─────────────────────────────────────────────────────────────
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));

// ─────────────────────────────────────────────────────────────
// Mock Data Storage & Endpoints (من فرع main لتسهيل التطوير المستقل)
// ─────────────────────────────────────────────────────────────
const usersMock = [
  { id: 1, email: "admin@gmail.com", password: "123456", role: "admin" },
  { id: 2, email: "company@gmail.com", password: "123456", role: "company" },
];

const teamMock = [
  {
    id: 1,
    name: "Yousef",
    age: 20,
    phone: "0594444444",
    email: "yousef@gmail.com",
    access: "Leader",
    role: "Back-End Developer",
    image: "https://api.dicebear.com/7.x/personas/svg?seed=Jack&backgroundColor=3b82f6",
  },
  {
    id: 2,
    name: "Nada Nour",
    age: 20,
    phone: "0591111111",
    email: "nada@gmail.com",
    access: "Team Member",
    role: "Front-End Developer",
    image: "https://api.dicebear.com/7.x/personas/svg?seed=Amelia1&backgroundColor=a855f7",
  },
  {
    id: 3,
    name: "Sura",
    age: 20,
    phone: "0592222222",
    email: "sura@gmail.com",
    access: "Team Member",
    role: "UI/UX Designer",
    image: "https://api.dicebear.com/7.x/personas/svg?seed=OliviaGirl&backgroundColor=ec4899",
  },
  {
    id: 4,
    name: "Waseem",
    age: 20,
    phone: "0593333333",
    email: "waseem@gmail.com",
    access: "Team Member",
    role: "Front-End Developer",
    image: "https://api.dicebear.com/7.x/personas/svg?seed=Michael&backgroundColor=06b6d4",
  },
  {
    id: 5,
    name: "Abeer",
    age: 20,
    phone: "0595555555",
    email: "abeer@gmail.com",
    access: "Team Member",
    role: "Database Manager",
    image: "https://api.dicebear.com/7.x/personas/svg?seed=Amelia&backgroundColor=f43f5e",
  },
];

const contactsMock = [
  { id: 1, name: "Yousef", role: "Leader", age: 20, phone: "0594444444", email: "yousef@gmail.com", address: "Nablus" },
  { id: 2, name: "Nada Nour", role: "Team Member", age: 20, phone: "0591111111", email: "nada@gmail.com", address: "Nablus" },
  { id: 3, name: "Sura", role: "Team Member", age: 20, phone: "0592222222", email: "sura@gmail.com", address: "Nablus" },
  { id: 4, name: "Waseem", role: "Team Member", age: 20, phone: "0593333333", email: "waseem@gmail.com", address: "Nablus" },
  { id: 5, name: "Abeer", role: "Team Member", age: 20, phone: "0595555555", email: "abeer@gmail.com", address: "Nablus" },
];

let eventsMock = [
  { id: "1", title: "Team Meeting", date: "2026-05-10", color: "#4caf50" },
  { id: "2", title: "CV Review", date: "2026-05-12", color: "#2196f3" },
  { id: "3", title: "Project Deadline", date: "2026-05-15", color: "#f44336" },
];

let companiesMock = [
  { id: 1, company_name: "iVAS Communications Ltd", city: "Ramallah", company_logo: "ivas.png", industry: "Technology", status: "Active" },
  { id: 2, company_name: "Xngage", city: "Nablus", company_logo: "xngage.png", industry: "Software", status: "Active" },
  { id: 3, company_name: "Hebronsoft", city: "Hebron", company_logo: "hebronsoft.png", industry: "IT Services", status: "Active" },
];

// مسارات البيانات التجريبية والمجانية
app.get('/', (req, res) => res.json({ message: "Backend is running", version: "2.0.0" }));

app.post('/login', (req, res) => {
  const { email, password } = req.body;
  const user = usersMock.find((u) => u.email === email && u.password === password);
  if (!user) return res.status(401).json({ message: "Invalid email or password" });
  res.json({ message: "Login successful", user });
});

app.get('/team', (req, res) => res.json(teamMock));
app.get('/contacts', (req, res) => res.json(contactsMock));

app.get('/events', (req, res) => res.json(eventsMock));
app.post('/events', (req, res) => {
  const newEvent = req.body;
  eventsMock.push(newEvent);
  res.json(newEvent);
});
app.delete('/events/:id', (req, res) => {
  eventsMock = eventsMock.filter((e) => e.id !== req.params.id);
  res.json({ message: "Event deleted" });
});

app.get('/companies', (req, res) => res.json(companiesMock));
app.post('/companies', (req, res) => {
  const newCompany = { id: Date.now(), ...req.body };
  companiesMock.push(newCompany);
  res.json(newCompany);
});
app.delete('/companies/:id', (req, res) => {
  companiesMock = companiesMock.filter((c) => c.id !== Number(req.params.id));
  res.json({ message: "Company deleted" });
});
app.put('/companies/:id', (req, res) => {
  const companyId = Number(req.params.id);
  companiesMock = companiesMock.map((c) => (c.id === companyId ? { ...c, ...req.body } : c));
  res.json(companiesMock.find((c) => c.id === companyId));
});

// ─────────────────────────────────────────────────────────────
// Swagger Docs Configuration
// ─────────────────────────────────────────────────────────────
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
  customSiteTitle: 'Ttwar — توثيق API الموحد',
  customCss: `
    .swagger-ui .topbar { background: linear-gradient(135deg, #1a7a4a 0%, #5b4ff6 100%); }
    .swagger-ui .topbar-wrapper img { display: none; }
    .swagger-ui .topbar-wrapper::after {
      content: "🤖 منصة تطور — API الموحد";
      color: white; font-size: 18px; font-weight: bold;
    }
  `,
  swaggerOptions: { persistAuthorization: true },
}));

// ─────────────────────────────────────────────────────────────
// Unified API Routes (المسارات الموحدة)
// ─────────────────────────────────────────────────────────────
app.use('/api/auth',         require('./routes/auth'));
app.use('/api/jobs',         require('./routes/jobs'));
app.use('/api/companies',    require('./routes/companies'));
app.use('/api/messages',     require('./routes/messages'));
app.use('/api/ai',           require('./routes/ai'));
app.use('/api/cv',           require('./routes/cv'));
app.use('/api/applications', require('./routes/applications'));
app.use('/api/saved-jobs',   require('./routes/savedJobs'));
app.use('/api/admin',        require('./routes/admin'));

// ─────────────────────────────────────────────────────────────
// 404 & Global Error Handling
// ─────────────────────────────────────────────────────────────
app.use(notFound);
app.use(errorHandler);

// ─────────────────────────────────────────────────────────────
// Server Startup & DB Connection
// ─────────────────────────────────────────────────────────────
const PORT = parseInt(process.env.PORT || '5000', 10);

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log('');
      console.log('╔══════════════════════════════════════════════════════╗');
      console.log('║        🤖  منصة تطور — السيرفر الموحد v2.0            ║');
      console.log(`║  🌐  http://localhost:${PORT}                            ║`);
      console.log('║  📚  Swagger Docs:   /api/docs                        ║');
      console.log('╠══════════════════════════════════════════════════════╣');
      console.log('║  🔐  Auth:            /api/auth & /login              ║');
      console.log('║  💼  Jobs:            /api/jobs                       ║');
      console.log('║  🏢  Companies:       /api/companies & /companies     ║');
      console.log('║  📩  Messages:        /api/messages                   ║');
      console.log('║  🤖  AI Chat:         /api/ai                         ║');
      console.log('║  📄  CV Builder:      /api/cv                         ║');
      console.log('║  📋  Applications:    /api/applications               ║');
      console.log('║  🔖  Saved Jobs:      /api/saved-jobs                 ║');
      console.log('║  👥  Team & Contacts: /team & /contacts               ║');
      console.log('║  ⚙️   Admin:           /api/admin                      ║');
      console.log('╚══════════════════════════════════════════════════════╝');
      console.log('');
    });
  })
  .catch((err) => {
    console.error('❌ فشل الاتصال بقاعدة البيانات:', err.message);
    process.exit(1);
  });

module.exports = app;