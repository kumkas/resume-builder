# 🚀 Resume Builder Pro

A modern, professional resume builder with stunning animations and multiple export formats. Built with the latest 2025 UI/UX trends and powered by Next.js, TypeScript, and Framer Motion.

![Resume Builder Pro](./public/images/hero-screenshot.png)

## ✨ Features

### 🎨 Modern Design (2025 Trends)
- **Beautiful Templates**: 5+ professionally designed templates with modern aesthetics
- **Smooth Animations**: Powered by Framer Motion with micro-interactions
- **Responsive Design**: Perfect on all devices - desktop, tablet, and mobile
- **Dark & Light Modes**: Multiple theme options

### 🛠️ Advanced Builder
- **Drag & Drop Interface**: Intuitive resume building experience
- **Real-time Preview**: See changes instantly as you type
- **ATS-Friendly**: Optimized for Applicant Tracking Systems
- **Custom Sections**: Add your own sections and content

### 📤 Export Options
- **PDF Export**: High-quality PDF generation
- **Image Export**: PNG/JPEG formats
- **Web Portfolio**: Generate a live website
- **Multiple Formats**: Choose your preferred output

### 🎯 Template Categories
- **Modern**: Clean, contemporary designs
- **Creative**: Bold, artistic layouts
- **Executive**: Sophisticated, professional styles  
- **Minimal**: Clean, typography-focused designs
- **Classic**: Traditional, timeless formats

## 🏗️ Tech Stack

### Frontend Framework
- **Next.js 16+** with App Router
- **TypeScript** for type safety
- **React 19+** with latest features

### Styling & Animation
- **Tailwind CSS** for rapid styling
- **Framer Motion** for smooth animations
- **GSAP** for complex animations
- **Lottie** for high-quality animated icons

### State Management
- **Zustand** for lightweight state management
- **React Hook Form** + **Zod** for form validation

### UI Components
- **Radix UI** primitives for accessibility
- **shadcn/ui** component library
- **Lucide React** for consistent icons

## 📊 Project Structure

```
resume-builder/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── page.tsx           # Homepage
│   │   ├── templates/         # Template gallery
│   │   ├── builder/           # Resume builder
│   │   └── layout.tsx         # Root layout
│   ├── components/            # React components
│   │   ├── ui/               # Reusable UI components
│   │   └── navigation.tsx    # Main navigation
│   ├── lib/                  # Utilities & configuration
│   │   ├── store.ts          # Zustand store
│   │   ├── templates.ts      # Template definitions
│   │   └── utils.ts          # Helper functions
│   ├── types/                # TypeScript definitions
│   │   └── resume.ts         # Resume data types
│   └── styles/               # Global styles
│       └── globals.css       # Tailwind CSS
├── public/                   # Static assets
│   ├── images/              # Image assets
│   └── templates/           # Template previews
└── package.json
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/resume-builder.git
   cd resume-builder
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn installrun 
   ```

3. **Start development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
npm run build
npm start
```

## 🎨 Design Inspiration

This project incorporates the latest 2025 UI/UX trends:

- **Micro-interactions**: Subtle animations that enhance user experience
- **Glass-morphism**: Frosted glass effects with backdrop blur
- **Gradient Overlays**: Modern gradient backgrounds and accents
- **Typography Focus**: Clean, readable fonts with proper hierarchy
- **Minimalist Approach**: Less clutter, more white space
- **Smooth Transitions**: Framer Motion powered animations

## 📱 Features Showcase

### Homepage
- Hero section with animated gradient text
- Feature cards with hover animations
- Step-by-step process visualization
- Responsive design with mobile optimization

### Template Gallery
- Interactive template preview
- Filter by category (Modern, Creative, Executive, etc.)
- Premium/Free template distinction
- Hover effects and smooth transitions

### Resume Builder (Coming Soon)
- Drag-and-drop interface
- Real-time preview
- Form validation with Zod
- Auto-save functionality

### Export System (Coming Soon)
- PDF generation with Puppeteer
- High-quality image export
- Website generation
- Custom formatting options

## 🛣️ Roadmap

- [x] Project setup and configuration
- [x] Modern UI components with animations  
- [x] Template system and gallery
- [x] Responsive navigation
- [ ] Resume builder interface
- [ ] Export functionality (PDF, PNG, Web)
- [ ] User authentication
- [ ] Template customization
- [ ] Cloud storage integration
- [ ] Premium templates
- [ ] Social sharing features

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Inspired by modern resume builders like Canva, Figma, and Webflow
- UI/UX trends from Dribbble and Behance
- Animation patterns from Framer Motion community
- Typography best practices from modern design systems

## 📞 Contact

For questions, suggestions, or collaboration opportunities:

- **GitHub**: [@yourusername](https://github.com/yourusername)
- **Twitter**: [@yourusername](https://twitter.com/yourusername)
- **Email**: your.email@example.com

---

⭐ Star this repository if you find it helpful!

Built with ❤️ using Next.js, TypeScript, and modern web technologies.