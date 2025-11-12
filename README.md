# 🗺️ SaarVerter - Saarland Area Calculator

A React web application for converting area measurements into "Saarlands" - the ultimate German unit of comparison!

## 🎯 Features

- **Metric Units**: mm², cm², m², km², hectares, football fields, Saarland
- **Imperial Units**: square inches, square feet, square yards, acres, square miles
- **Real-time Conversion**: Instant calculation to Saarland units
- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Fractions**: Precisely displays fractions of Saarlands with clipping mask
- **Dual Visualization**: Toggle between Saarland shapes and football fields
- **Smooth Animations**: Animated appearance of shapes with staggered timing
- **GeoJSON Based**: Uses real geographic data for authentic Saarland shape

## 🚀 Installation

Clone the repository and install dependencies:

```bash
# With pnpm (recommended)
pnpm install

# Or with npm
npm install
```

## 💻 Development

Start the development server:

```bash
pnpm start
```

The app will automatically open at [http://localhost:3000](http://localhost:3000).

## 🏗️ Build

Create a production-ready build:

```bash
pnpm build
```

Optimized files will be in the `build/` folder.

## 📊 Reference Value

**Area of Saarland**: 2,569.69 km²  
(Source: Statistical Office of Saarland)

**GeoJSON Data**: Saarland shape coordinates from [deutschlandGeoJSON](https://github.com/isellsoap/deutschlandGeoJSON)

## 🛠️ Tech Stack

- **React 18** with TypeScript
- **Create React App** as build tool
- **Tailwind CSS** for styling
- **pnpm** as package manager
- **GeoJSON** for authentic geographic shapes

## 📁 Project Structure

```
SaarVerter/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── AreaConverter.tsx      # Main component
│   │   ├── SaarlandIcon.tsx       # Saarland shape (from GeoJSON)
│   │   └── FussballfeldIcon.tsx   # Football field visualization
│   ├── data/
│   │   └── saarland-coords.ts     # GeoJSON coordinates
│   ├── App.tsx                     # Root component
│   ├── index.tsx                   # Entry point
│   └── index.css                   # Global styles + animations
├── package.json
└── tsconfig.json
```

## 🎨 Usage

1. Choose between **Metric** or **Imperial** units
2. Enter an area value (max 15 digits)
3. Select the appropriate unit from the dropdown
4. The result in "Saarlands" is automatically calculated and displayed
5. Click on the label to toggle between Saarlands and football fields

## 🎭 Visualization Modes

- **Saarland Mode**: Shows actual Saarland shapes based on GeoJSON data
- **Football Field Mode**: Shows football fields (1 Saarland ≈ 359,875 fields)
- Partial units are displayed with a clipping mask from bottom to top
- Maximum display: 30 shapes on desktop, 20 on mobile

## 📱 Mobile Optimized

- Fully responsive design with Tailwind breakpoints
- Touch-optimized interface
- Adaptive font sizes and spacing
- Vertical layout on mobile, horizontal split on desktop

---

Made with ❤️ and a sense of humor