# 📚 Study Accountability App

> **Keep yourself accountable!** Break your study plan? Mom will remind you with a belan (rolling pin)! 🥄

A fun and motivating study management app that helps you stay disciplined with your study schedules. If you abandon your study session early, watch an animated consequence that encourages you to stay committed next time.

---

## ✨ Features

- 📋 **Create Study Plans** - Set your study goals with subject, duration, and scheduled time
- ⏱️ **Smart Study Timer** - Track your study sessions with a beautiful circular progress indicator
- 🎯 **Plan Tracking** - Keep track of completed and broken study plans
- 💾 **Data Persistence** - All plans saved securely in Supabase database
- 🎬 **Consequence Animation** - Animated reminder when you break your study commitment
- 📱 **Responsive Design** - Works seamlessly on desktop and mobile devices

---

## 🚀 Quick Start

### Prerequisites
- Node.js (v16+)
- npm or yarn
- Supabase account

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd study-accountability-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**

   Create a `.env` file in the root directory:
   ```env
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

   Get these values from your Supabase dashboard: **Settings → API**

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open in browser**
   ```
   http://localhost:5173
   ```

---

## 🛠️ Build & Deploy

### Build for production
```bash
npm run build
```

### Preview production build
```bash
npm run preview
```

### Run linter
```bash
npm run lint
```

### Type checking
```bash
npm run typecheck
```

---

## 📖 How It Works

### 1. Create a Study Plan
- Click **"Create Study Plan"**
- Enter the subject/topic you want to study
- Set duration in minutes
- Choose when you want to study
- Click **"Create Study Plan"**

### 2. Start Your Session
- Select a plan from your list
- Click **"Start"** to begin the timer
- Study for the full planned duration

### 3. Complete or Break
- **Complete**: Timer reaches zero = Success! ✓
- **Break**: Click **"Stop"** early = Consequences! 😅

### 4. The Consequence
If you break your study plan, watch an entertaining animation showing mom with a belan reminding you to stay focused!

---

## 🏗️ Tech Stack

| Technology | Purpose |
|-----------|---------|
| **React 18** | UI Framework |
| **TypeScript** | Type Safety |
| **Tailwind CSS** | Styling |
| **Supabase** | Backend & Database |
| **Vite** | Build Tool |
| **Lucide React** | Icons |

---

## 📁 Project Structure

```
src/
├── components/
│   ├── BelanAnimation.tsx      # Consequence animation
│   ├── CreatePlanForm.tsx      # Plan creation form
│   ├── StudyPlansList.tsx      # Display all plans
│   └── StudyTimer.tsx          # Timer component
├── lib/
│   └── supabase.ts             # Supabase client & types
├── App.tsx                     # Main app component
├── main.tsx                    # Entry point
└── index.css                   # Global styles
```

---

## 🗄️ Database Schema

### study_plans
```sql
- id (UUID, Primary Key)
- user_id (UUID)
- title (Text)
- duration_minutes (Integer)
- scheduled_time (Timestamp)
- completed (Boolean)
- broken (Boolean)
- created_at (Timestamp)
```

### study_sessions
```sql
- id (UUID, Primary Key)
- plan_id (UUID, Foreign Key)
- started_at (Timestamp)
- ended_at (Timestamp)
- actual_duration_minutes (Integer)
- completed (Boolean)
```

---

## 🔐 Security

- ✅ Row Level Security (RLS) enabled on all tables
- ✅ Secure Supabase authentication
- ✅ No sensitive data exposed in frontend
- ✅ Environment variables for API keys

---

## 🎨 Customization

### Colors
Edit Tailwind classes in component files:
- Primary: `blue-*` classes
- Accent: `red-*` for consequences
- Background: `blue-50 to-sky-100` gradient

### Timer Duration
Change default in `CreatePlanForm.tsx`:
```typescript
const [duration, setDuration] = useState(30); // Change 30 to your preference
```

### Animation Timing
Adjust in `BelanAnimation.tsx`:
```typescript
setTimeout(() => {
  setHits(hits + 1);
}, 600); // Adjust timing in milliseconds
```

---

## 🐛 Troubleshooting

### Plans not saving?
- Verify Supabase URL and keys in `.env`
- Check RLS policies are enabled on tables
- Ensure Supabase project is active

### Timer not working?
- Clear browser cache
- Restart development server
- Check browser console for errors

### Styling issues?
- Run `npm run build` to rebuild
- Clear CSS cache
- Verify Tailwind is properly configured

---

## 🤝 Contributing

We'd love your contributions! Here's how:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📝 License

This project is open source and available under the MIT License - see the LICENSE file for details.

---

## 🎯 Roadmap

- [ ] User authentication system
- [ ] Study statistics and analytics
- [ ] Leaderboard for friendly competition
- [ ] Custom consequence animations
- [ ] Push notifications for upcoming sessions
- [ ] Dark mode
- [ ] Multi-language support
- [ ] Study streak counter

---

## 💡 Tips for Best Results

1. **Start small** - Begin with 30-minute study sessions
2. **Be consistent** - Schedule daily study plans
3. **Stay disciplined** - Don't abandon sessions halfway
4. **Track progress** - Review completed plans regularly
5. **Increase gradually** - Extend duration as you build habits

---

## 📞 Support

Found a bug? Have a suggestion?

- Open an issue on GitHub
- Check existing issues first
- Provide detailed description with steps to reproduce

---

## 🌟 Acknowledgments

- Built with ❤️ using React and Supabase
- Inspired by the need for study accountability
- Special thanks to all contributors

---

<div align="center">

**Happy Studying! 📚✨**

*Remember: Every break in your study plan is an opportunity to learn discipline.*

</div>
