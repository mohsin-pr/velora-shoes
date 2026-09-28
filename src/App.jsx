import React, { useState, useEffect, useContext, createContext, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShoppingBag, Search, Heart, Menu, X, ChevronRight, ChevronLeft, 
  Star, Filter, ArrowRight, Check, Minus, Plus, ShoppingCart, 
  ArrowUpRight, Truck, RefreshCcw, ShieldCheck, Play
} from 'lucide-react';

const PRODUCTS = [
  {
    id: 'p1',
    name: 'Velora Aero Glide',
    slug: 'velora-aero-glide',
    category: 'Running',
    price: 185,
    oldPrice: null,
    rating: 4.8,
    reviewCount: 124,
    colors: ['#000000', '#ffffff', '#ff4500'],
    sizes: [7, 8, 9, 10, 11, 12],
    description: 'Engineered for speed and endurance, the Aero Glide features our lightest foam technology and a carbon-infused plate for maximum energy return.',
    features: ['Carbon-infused propulsion plate', 'Ultra-lightweight mesh upper', 'High-abrasion rubber outsole', 'Breathable aerodynamic design'],
    images: [
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&q=80&w=800'
    ],
    badge: 'New',
    isNew: true,
    isFeatured: true
  },
  {
    id: 'p2',
    name: 'Velora Court Classic',
    slug: 'velora-court-classic',
    category: 'Lifestyle',
    price: 130,
    oldPrice: null,
    rating: 4.6,
    reviewCount: 89,
    colors: ['#ffffff', '#f3f4f6'],
    sizes: [6, 7, 8, 9, 10, 11],
    description: 'A timeless silhouette reimagined for modern comfort. Premium Italian leather meets our signature cushioned footbed.',
    features: ['Full-grain Italian leather', 'Orthopedic cushioned footbed', 'Durable rubber cupsole', 'Minimalist branding'],
    images: [
      'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1514989940723-e8e51635b782?auto=format&fit=crop&q=80&w=800'
    ],
    badge: null,
    isNew: false,
    isFeatured: true
  },
  {
    id: 'p3',
    name: 'Velora Apex Pro',
    slug: 'velora-apex-pro',
    category: 'Basketball',
    price: 210,
    oldPrice: 240,
    discount: 12,
    rating: 4.9,
    reviewCount: 210,
    colors: ['#111827', '#dc2626'],
    sizes: [8, 9, 10, 11, 12, 13],
    description: 'Dominate the court with unmatched ankle support and responsive cushioning designed for explosive movements.',
    features: ['Dynamic fit collar', 'Zoom-responsive cushioning', 'Multi-directional traction pattern', 'Reinforced heel counter'],
    images: [
      'https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1605348532760-6753d2c43329?auto=format&fit=crop&q=80&w=800'
    ],
    badge: 'Sale',
    isNew: false,
    isFeatured: true
  },
  {
    id: 'p4',
    name: 'Velora Shift Knit',
    slug: 'velora-shift-knit',
    category: 'Training',
    price: 150,
    oldPrice: null,
    rating: 4.7,
    reviewCount: 156,
    colors: ['#374151', '#9ca3af'],
    sizes: [6, 7, 8, 9, 10],
    description: 'Adaptable and breathable. The Shift Knit features a seamless upper that moves effortlessly with your foot during intense workouts.',
    features: ['Seamless adaptive knit upper', 'Flexible forefoot grooves', 'Lateral stability straps', 'Moisture-wicking lining'],
    images: [
      'https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1460353581641-37baddab0fa2?auto=format&fit=crop&q=80&w=800'
    ],
    badge: 'Bestseller',
    isNew: false,
    isFeatured: true
  },
  {
    id: 'p5',
    name: 'Velora Traverse Boot',
    slug: 'velora-traverse-boot',
    category: 'Casual',
    price: 220,
    oldPrice: null,
    rating: 4.5,
    reviewCount: 67,
    colors: ['#8b4513', '#000000'],
    sizes: [8, 9, 10, 11, 12],
    description: 'Built for the urban explorer. Weather-resistant suede and rugged outsoles make this the ultimate everyday boot.',
    features: ['Weather-resistant treated suede', 'Lugged rubber outsole', 'Speed lacing system', 'Warm insulating lining'],
    images: [
      'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1520639888713-7851133b1ed0?auto=format&fit=crop&q=80&w=800'
    ],
    badge: null,
    isNew: true,
    isFeatured: false
  },
  {
    id: 'p6',
    name: 'Velora Sprint X',
    slug: 'velora-sprint-x',
    category: 'Running',
    price: 160,
    oldPrice: 190,
    discount: 15,
    rating: 4.4,
    reviewCount: 92,
    colors: ['#1e3a8a', '#ffffff'],
    sizes: [7, 8, 9, 10, 11],
    description: 'Lightweight daily trainer offering a perfect balance of cushioning and responsiveness for your everyday miles.',
    features: ['Responsive foam midsole', 'Engineered mesh', 'Padded tongue and collar', 'Reflective details'],
    images: [
      'https://images.unsplash.com/photo-1491553895911-0055eca6402d?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?auto=format&fit=crop&q=80&w=800'
    ],
    badge: 'Sale',
    isNew: false,
    isFeatured: false
  },
  {
    id: 'p7',
    name: 'Velora Horizon Low',
    slug: 'velora-horizon-low',
    category: 'Lifestyle',
    price: 110,
    oldPrice: null,
    rating: 4.3,
    reviewCount: 45,
    colors: ['#d1d5db', '#111827'],
    sizes: [6, 7, 8, 9, 10, 11],
    description: 'Minimalist design meets everyday comfort. The Horizon Low is your versatile go-to sneaker for any casual occasion.',
    features: ['Canvas and suede upper', 'Vulcanized rubber sole', 'Low-profile design', 'Eco-friendly materials'],
    images: [
      'https://images.unsplash.com/photo-1506898667547-42e22a46e125?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&q=80&w=800'
    ],
    badge: null,
    isNew: false,
    isFeatured: false
  },
  {
    id: 'p8',
    name: 'Velora Elevate High',
    slug: 'velora-elevate-high',
    category: 'Basketball',
    price: 195,
    oldPrice: null,
    rating: 4.8,
    reviewCount: 112,
    colors: ['#ffffff', '#000000', '#f59e0b'],
    sizes: [8, 9, 10, 11, 12, 13],
    description: 'Premium support with an iconic high-top silhouette. Designed for indoor and outdoor courts alike.',
    features: ['High-top ankle support', 'Premium leather upper', 'Impact-absorbing heel', 'Herringbone traction'],
    images: [
      'https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?auto=format&fit=crop&q=80&w=800'
    ],
    badge: 'Trending',
    isNew: true,
    isFeatured: true
  },
  {
    id: 'p9',
    name: 'Velora Cloud Walk',
    slug: 'velora-cloud-walk',
    category: 'Casual',
    price: 145,
    oldPrice: null,
    rating: 4.9,
    reviewCount: 340,
    colors: ['#f3f4f6', '#9ca3af'],
    sizes: [5, 6, 7, 8, 9, 10],
    description: 'Slip into absolute comfort. The Cloud Walk uses our proprietary plush foam to make every step feel weightless.',
    features: ['Slip-on convenience', 'Plush proprietary foam', 'Breathable knit construction', 'Machine washable'],
    images: [
      'https://images.unsplash.com/photo-1514989940723-e8e51635b782?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1460353581641-37baddab0fa2?auto=format&fit=crop&q=80&w=800'
    ],
    badge: 'Bestseller',
    isNew: false,
    isFeatured: true
  },
  {
    id: 'p10',
    name: 'Velora Momentum 2.0',
    slug: 'velora-momentum-2',
    category: 'Training',
    price: 165,
    oldPrice: 185,
    discount: 10,
    rating: 4.6,
    reviewCount: 78,
    colors: ['#000000', '#22c55e'],
    sizes: [7, 8, 9, 10, 11, 12],
    description: 'Cross-training perfected. Stable enough for heavy lifts, flexible enough for agility work.',
    features: ['Flat stable heel', 'Rope-grip midfoot wrap', 'Flexible toe box', 'Abrasion-resistant mesh'],
    images: [
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1605348532760-6753d2c43329?auto=format&fit=crop&q=80&w=800'
    ],
    badge: 'Sale',
    isNew: false,
    isFeatured: false
  },
  {
    id: 'p11',
    name: 'Velora Pace Maker',
    slug: 'velora-pace-maker',
    category: 'Running',
    price: 175,
    oldPrice: null,
    rating: 4.7,
    reviewCount: 198,
    colors: ['#ec4899', '#ffffff'],
    sizes: [6, 7, 8, 9, 10],
    description: 'Designed specifically for tempo runs and race day. Ultra-light and responsive.',
    features: ['Ultra-thin breathable upper', 'Responsive dual-density foam', 'Targeted rubber traction', 'Gusseted tongue'],
    images: [
      'https://images.unsplash.com/photo-1539185441755-769473a23570?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1491553895911-0055eca6402d?auto=format&fit=crop&q=80&w=800'
    ],
    badge: 'New',
    isNew: true,
    isFeatured: true
  },
  {
    id: 'p12',
    name: 'Velora Element Chukkas',
    slug: 'velora-element-chukkas',
    category: 'Lifestyle',
    price: 155,
    oldPrice: null,
    rating: 4.4,
    reviewCount: 56,
    colors: ['#78350f', '#1c1917'],
    sizes: [8, 9, 10, 11, 12],
    description: 'A modern take on the classic chukka boot. Premium suede paired with an athletic-inspired sole.',
    features: ['Premium suede upper', 'Athletic EVA midsole', 'Classic 3-eye lacing', 'Antibacterial insole'],
    images: [
      'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1520639888713-7851133b1ed0?auto=format&fit=crop&q=80&w=800'
    ],
    badge: null,
    isNew: false,
    isFeatured: false
  },
  {
    id: 'p13',
    name: 'Velora Nexus Court',
    slug: 'velora-nexus-court',
    category: 'Basketball',
    price: 180,
    oldPrice: 220,
    discount: 18,
    rating: 4.5,
    reviewCount: 88,
    colors: ['#1e40af', '#ffffff'],
    sizes: [7, 8, 9, 10, 11, 12],
    description: 'Precision performance. The Nexus Court offers lockdown fit and maximum court feel.',
    features: ['Lockdown lacing cables', 'Low-to-ground cushioning', 'Breathable mesh panels', 'Indoor court traction'],
    images: [
      'https://images.unsplash.com/photo-1605348532760-6753d2c43329?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?auto=format&fit=crop&q=80&w=800'
    ],
    badge: 'Sale',
    isNew: false,
    isFeatured: false
  },
  {
    id: 'p14',
    name: 'Velora Studio Wrap',
    slug: 'velora-studio-wrap',
    category: 'Training',
    price: 95,
    oldPrice: null,
    rating: 4.8,
    reviewCount: 215,
    colors: ['#000000', '#f9a8d4'],
    sizes: [5, 6, 7, 8, 9],
    description: 'Perfect for yoga, pilates, and barre. Barefoot feel with targeted grip and support.',
    features: ['Flexible wrap design', 'Silicone grip sole', 'Breathable elastic fabric', 'Washable'],
    images: [
      'https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1460353581641-37baddab0fa2?auto=format&fit=crop&q=80&w=800'
    ],
    badge: null,
    isNew: false,
    isFeatured: false
  },
  {
    id: 'p15',
    name: 'Velora Urban Trail',
    slug: 'velora-urban-trail',
    category: 'Casual',
    price: 160,
    oldPrice: null,
    rating: 4.6,
    reviewCount: 132,
    colors: ['#4b5563', '#065f46'],
    sizes: [7, 8, 9, 10, 11, 12],
    description: 'City streets to park trails. Rugged aesthetic combined with everyday urban comfort.',
    features: ['Water-repellent upper', 'All-terrain rubber tread', 'Reinforced toe cap', 'Reflective laces'],
    images: [
      'https://images.unsplash.com/photo-1520639888713-7851133b1ed0?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&q=80&w=800'
    ],
    badge: 'New',
    isNew: true,
    isFeatured: false
  },
  {
    id: 'p16',
    name: 'Velora Zero Gravity',
    slug: 'velora-zero-gravity',
    category: 'Running',
    price: 250,
    oldPrice: null,
    rating: 5.0,
    reviewCount: 42,
    colors: ['#ffffff', '#000000'],
    sizes: [8, 9, 10, 11, 12],
    description: 'Our pinnacle running shoe. Maximum cushioning, minimum weight. Experience the feeling of running on air.',
    features: ['Pebax foam core', 'Dual carbon plates', 'Translucent hyper-mesh', 'Podular outsole design'],
    images: [
      'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=800'
    ],
    badge: 'Premium',
    isNew: true,
    isFeatured: true
  }
];

const NavigationContext = createContext();
const CartContext = createContext();
const WishlistContext = createContext();

const Button = ({ children, variant = 'primary', className = '', ...props }) => {
  const baseStyle = "inline-flex items-center justify-center transition-all duration-300 font-medium tracking-wide text-sm";
  const variants = {
    primary: "bg-zinc-900 text-white hover:bg-zinc-800 px-6 py-3 rounded-none",
    secondary: "bg-white text-zinc-900 border border-zinc-200 hover:border-zinc-900 px-6 py-3 rounded-none",
    ghost: "text-zinc-900 hover:text-zinc-600 px-4 py-2",
    icon: "p-2 text-zinc-900 hover:bg-zinc-100 rounded-full"
  };
  return (
    <button className={`${baseStyle} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
};

const FallbackImage = ({ src, alt, className = '' }) => {
  const [error, setError] = useState(false);
  return (
    <img 
      src={error ? 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&q=80&w=800' : src} 
      alt={alt} 
      className={`object-cover ${className}`}
      onError={() => setError(true)}
      loading="lazy"
    />
  );
};

const ProductCard = ({ product, onQuickView }) => {
  const { navigate } = useContext(NavigationContext);
  const { addToCart } = useContext(CartContext);
  const { toggleWishlist, isInWishlist } = useContext(WishlistContext);
  const [isHovered, setIsHovered] = useState(false);
  
  const handleProductClick = () => {
    navigate('product', { id: product.id });
    window.scrollTo(0, 0);
  };

  return (
    <div 
      className="group flex flex-col cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative aspect-[4/5] bg-zinc-100 overflow-hidden mb-4">
        {product.badge && (
          <div className="absolute top-3 left-3 z-10 bg-white px-3 py-1 text-xs font-bold tracking-widest uppercase">
            {product.badge}
          </div>
        )}
        <button 
          onClick={(e) => { e.stopPropagation(); toggleWishlist(product.id); }}
          className="absolute top-3 right-3 z-10 p-2 bg-white rounded-full shadow-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:scale-110"
        >
          <Heart size={16} className={isInWishlist(product.id) ? "fill-zinc-900 text-zinc-900" : "text-zinc-900"} />
        </button>
        
        <div onClick={handleProductClick} className="w-full h-full relative">
          <FallbackImage 
            src={product.images[0]} 
            alt={product.name}
            className={`w-full h-full transition-all duration-700 ${isHovered ? 'opacity-0 scale-105' : 'opacity-100 scale-100'}`}
          />
          <FallbackImage 
            src={product.images[1]} 
            alt={`${product.name} alternate`}
            className={`w-full h-full absolute inset-0 transition-all duration-700 ${isHovered ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
          />
        </div>

        <div className="absolute bottom-0 left-0 w-full p-4 flex gap-2 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <Button 
            variant="secondary" 
            className="flex-1 bg-white/90 backdrop-blur text-xs py-2.5 shadow-sm"
            onClick={(e) => { e.stopPropagation(); onQuickView(product); }}
          >
            Quick View
          </Button>
          <Button 
            variant="primary" 
            className="flex-1 text-xs py-2.5 shadow-sm"
            onClick={(e) => { e.stopPropagation(); addToCart(product, product.sizes[0], product.colors[0], 1); }}
          >
            Add to Bag
          </Button>
        </div>
      </div>
      
      <div onClick={handleProductClick}>
        <p className="text-xs text-zinc-500 mb-1 font-medium tracking-wider uppercase">{product.category}</p>
        <h3 className="text-sm font-semibold text-zinc-900 mb-1">{product.name}</h3>
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-zinc-900">${product.price}</span>
          {product.oldPrice && (
            <span className="text-sm text-zinc-400 line-through">${product.oldPrice}</span>
          )}
        </div>
      </div>
    </div>
  );
};

const QuickViewModal = ({ product, onClose }) => {
  const { navigate } = useContext(NavigationContext);
  const { addToCart } = useContext(CartContext);
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);

  if (!product) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
        <motion.div 
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        />
        <motion.div 
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          className="relative w-full max-w-4xl bg-white shadow-2xl flex flex-col md:flex-row max-h-[90vh] overflow-hidden"
        >
          <button onClick={onClose} className="absolute top-4 right-4 z-10 p-2 bg-white/80 rounded-full hover:bg-zinc-100 transition-colors">
            <X size={20} />
          </button>
          
          <div className="w-full md:w-1/2 bg-zinc-50 h-64 md:h-auto">
            <FallbackImage src={product.images[0]} alt={product.name} className="w-full h-full object-cover" />
          </div>
          
          <div className="w-full md:w-1/2 p-8 md:p-12 overflow-y-auto">
            <p className="text-xs tracking-widest text-zinc-500 uppercase mb-2">{product.category}</p>
            <h2 className="text-2xl font-bold tracking-tight text-zinc-900 mb-2">{product.name}</h2>
            <div className="flex items-center gap-4 mb-6">
              <span className="text-xl font-medium">${product.price}</span>
              <div className="flex items-center gap-1 text-sm text-zinc-500">
                <Star size={14} className="fill-zinc-900 text-zinc-900" />
                <span>{product.rating} ({product.reviewCount} Reviews)</span>
              </div>
            </div>
            
            <p className="text-zinc-600 text-sm mb-8 leading-relaxed">{product.description}</p>
            
            <div className="mb-6">
              <div className="flex justify-between items-center mb-3">
                <span className="text-xs font-semibold tracking-wider uppercase text-zinc-900">Color</span>
              </div>
              <div className="flex gap-3">
                {product.colors.map(c => (
                  <button 
                    key={c}
                    onClick={() => setSelectedColor(c)}
                    className={`w-8 h-8 rounded-full border-2 transition-all ${selectedColor === c ? 'border-zinc-900 scale-110' : 'border-transparent'}`}
                    style={{ backgroundColor: c }}
                    aria-label={`Select color ${c}`}
                  />
                ))}
              </div>
            </div>

            <div className="mb-8">
              <div className="flex justify-between items-center mb-3">
                <span className="text-xs font-semibold tracking-wider uppercase text-zinc-900">Size</span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {product.sizes.map(s => (
                  <button 
                    key={s}
                    onClick={() => setSelectedSize(s)}
                    className={`py-2 text-sm transition-all border ${selectedSize === s ? 'border-zinc-900 bg-zinc-900 text-white' : 'border-zinc-200 text-zinc-900 hover:border-zinc-900'}`}
                  >
                    US {s}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex gap-4">
              <Button 
                className="flex-1"
                onClick={() => {
                  addToCart(product, selectedSize, selectedColor, 1);
                  onClose();
                }}
              >
                Add to Bag
              </Button>
              <Button 
                variant="secondary"
                onClick={() => {
                  onClose();
                  navigate('product', { id: product.id });
                }}
              >
                Full Details
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

const CartDrawer = ({ isOpen, onClose }) => {
  const { cartItems, removeFromCart, updateQuantity, cartTotal } = useContext(CartContext);
  const { navigate } = useContext(NavigationContext);
  const shippingThreshold = 100;
  const progress = Math.min((cartTotal / shippingThreshold) * 100, 100);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[60] flex justify-end">
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
          />
          <motion.div 
            initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="relative w-full max-w-md bg-white h-full flex flex-col shadow-2xl"
          >
            <div className="p-6 border-b border-zinc-100 flex items-center justify-between">
              <h2 className="text-lg font-bold tracking-tight">Your Bag ({cartItems.length})</h2>
              <button onClick={onClose} className="p-2 hover:bg-zinc-100 transition-colors"><X size={20} /></button>
            </div>

            <div className="p-6 border-b border-zinc-100 bg-zinc-50">
              <p className="text-sm font-medium mb-2 text-center">
                {cartTotal >= shippingThreshold 
                  ? "You've unlocked free shipping!" 
                  : `Add $${(shippingThreshold - cartTotal).toFixed(2)} more for free shipping`}
              </p>
              <div className="w-full bg-zinc-200 h-1.5 overflow-hidden">
                <div 
                  className="bg-zinc-900 h-full transition-all duration-500 ease-out" 
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {cartItems.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-zinc-500 space-y-4">
                  <ShoppingBag size={48} strokeWidth={1} />
                  <p>Your bag is empty.</p>
                  <Button onClick={() => { onClose(); navigate('shop'); }} variant="primary" className="mt-4">
                    Shop New Arrivals
                  </Button>
                </div>
              ) : (
                cartItems.map(item => (
                  <div key={item.cartId} className="flex gap-4">
                    <div className="w-24 h-24 bg-zinc-100 shrink-0">
                      <FallbackImage src={item.product.images[0]} alt={item.product.name} className="w-full h-full" />
                    </div>
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start mb-1">
                          <h3 className="font-semibold text-sm">{item.product.name}</h3>
                          <span className="font-medium text-sm">${(item.product.price * item.quantity).toFixed(2)}</span>
                        </div>
                        <p className="text-xs text-zinc-500 mb-2">Color: <span className="inline-block w-3 h-3 rounded-full align-middle ml-1 border border-zinc-200" style={{ backgroundColor: item.color }}/> | Size: {item.size}</p>
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center border border-zinc-200">
                          <button onClick={() => updateQuantity(item.cartId, item.quantity - 1)} className="p-1.5 hover:bg-zinc-100 text-zinc-500"><Minus size={14} /></button>
                          <span className="text-xs font-medium w-6 text-center">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.cartId, item.quantity + 1)} className="p-1.5 hover:bg-zinc-100 text-zinc-500"><Plus size={14} /></button>
                        </div>
                        <button onClick={() => removeFromCart(item.cartId)} className="text-xs text-zinc-400 hover:text-zinc-900 underline underline-offset-2">Remove</button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {cartItems.length > 0 && (
              <div className="p-6 border-t border-zinc-100 bg-white">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-zinc-500">Subtotal</span>
                  <span className="font-medium">${cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm mb-6">
                  <span className="text-zinc-500">Shipping</span>
                  <span className="font-medium">{cartTotal >= shippingThreshold ? 'Free' : '$15.00'}</span>
                </div>
                <div className="flex justify-between text-base font-bold mb-6">
                  <span>Total</span>
                  <span>${(cartTotal + (cartTotal >= shippingThreshold ? 0 : 15)).toFixed(2)}</span>
                </div>
                <Button className="w-full py-4 text-base" onClick={() => alert('Checkout flow initiated (Demo)')}>
                  Checkout securely
                </Button>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

const SearchOverlay = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const { navigate } = useContext(NavigationContext);
  
  const results = useMemo(() => {
    if (!query.trim()) return [];
    const lowerQ = query.toLowerCase();
    return PRODUCTS.filter(p => 
      p.name.toLowerCase().includes(lowerQ) || 
      p.category.toLowerCase().includes(lowerQ)
    ).slice(0, 5);
  }, [query]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[70] bg-white flex flex-col">
          <motion.div 
            initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
            className="w-full border-b border-zinc-100 px-6 py-6"
          >
            <div className="max-w-4xl mx-auto flex items-center gap-4">
              <Search className="text-zinc-400 shrink-0" size={24} />
              <input 
                autoFocus
                type="text" 
                placeholder="Search for shoes, collections..." 
                className="flex-1 text-xl md:text-3xl font-light outline-none bg-transparent placeholder:text-zinc-300"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <button onClick={onClose} className="p-2 hover:bg-zinc-100 rounded-full shrink-0">
                <X size={24} />
              </button>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="flex-1 overflow-y-auto p-6 bg-zinc-50"
          >
            <div className="max-w-4xl mx-auto">
              {query.trim() === '' ? (
                <div>
                  <h3 className="text-sm font-medium text-zinc-500 mb-4 uppercase tracking-wider">Popular Searches</h3>
                  <div className="flex flex-wrap gap-2">
                    {['Running Shoes', 'New Arrivals', 'Basketball', 'Sale'].map(term => (
                      <button key={term} onClick={() => setQuery(term)} className="px-4 py-2 bg-white border border-zinc-200 text-sm hover:border-zinc-900 transition-colors">
                        {term}
                      </button>
                    ))}
                  </div>
                </div>
              ) : results.length > 0 ? (
                <div className="space-y-4">
                  <h3 className="text-sm font-medium text-zinc-500 mb-4 uppercase tracking-wider">Products</h3>
                  {results.map(product => (
                    <div 
                      key={product.id} 
                      onClick={() => { onClose(); navigate('product', { id: product.id }); }}
                      className="flex items-center gap-4 bg-white p-4 hover:shadow-md transition-shadow cursor-pointer border border-zinc-100 group"
                    >
                      <div className="w-16 h-16 bg-zinc-100">
                        <FallbackImage src={product.images[0]} alt={product.name} className="w-full h-full" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-zinc-900 group-hover:text-zinc-600 transition-colors">{product.name}</h4>
                        <p className="text-sm text-zinc-500">{product.category}</p>
                      </div>
                      <span className="font-medium">${product.price}</span>
                    </div>
                  ))}
                  <Button 
                    variant="ghost" 
                    className="w-full text-center mt-6 text-sm underline underline-offset-4"
                    onClick={() => { onClose(); navigate('shop'); }}
                  >
                    View all results
                  </Button>
                </div>
              ) : (
                <div className="text-center py-20 text-zinc-500">
                  <p className="text-xl font-light mb-2">No results found for "{query}"</p>
                  <p className="text-sm">Check the spelling or try a different search term.</p>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

const HeroSection = () => {
  const { navigate } = useContext(NavigationContext);
  return (
    <section className="relative h-screen min-h-[600px] flex items-center bg-zinc-50 overflow-hidden pt-16">
      <div className="absolute inset-0 w-full h-full hidden md:block">
        <FallbackImage 
          src="https://images.unsplash.com/photo-1556906781-9a412961c28c?auto=format&fit=crop&q=80&w=2000" 
          alt="Hero background" 
          className="w-full h-full object-cover object-center opacity-40 grayscale"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-zinc-50 via-zinc-50/90 to-transparent" />
      </div>
      
      <div className="container mx-auto px-6 relative z-10 grid md:grid-cols-2 gap-12 items-center h-full">
        <motion.div 
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col items-start pt-20 md:pt-0"
        >
          <span className="inline-block py-1 px-3 bg-zinc-900 text-white text-xs font-bold tracking-widest uppercase mb-6">
            New Collection
          </span>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter text-zinc-900 leading-[0.9] mb-6">
            STEP INTO <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-900 to-zinc-500">YOUR NEXT ERA.</span>
          </h1>
          <p className="text-lg md:text-xl text-zinc-600 mb-10 max-w-md font-light leading-relaxed">
            Premium footwear engineered for everyday movement. Elevate your stride with revolutionary comfort and minimalist design.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <Button onClick={() => navigate('shop')} className="px-8 py-4 text-sm md:text-base">Shop Men</Button>
            <Button variant="secondary" onClick={() => navigate('shop')} className="px-8 py-4 text-sm md:text-base">Shop Women</Button>
          </div>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.9, x: 20 }} animate={{ opacity: 1, scale: 1, x: 0 }} transition={{ duration: 1, delay: 0.2 }}
          className="relative h-full flex items-center justify-center -mt-10 md:mt-0"
        >
          <div className="relative w-full aspect-square max-w-lg md:max-w-none">
            <FallbackImage 
              src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=1200" 
              alt="Velora Aero Glide" 
              className="w-full h-full object-contain drop-shadow-2xl z-20 relative scale-110 md:scale-125 translate-x-4"
            />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-zinc-200 rounded-full blur-3xl opacity-50 z-10 animate-pulse" />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const HomePage = ({ onQuickView }) => {
  const { navigate } = useContext(NavigationContext);
  const featuredProducts = PRODUCTS.filter(p => p.isFeatured).slice(0, 8);
  const newArrivals = PRODUCTS.filter(p => p.isNew).slice(0, 4);

  return (
    <div className="w-full">
      <HeroSection />

      {/* Featured Categories */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="flex justify-between items-end mb-12">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Shop by Category</h2>
            <Button variant="ghost" onClick={() => navigate('shop')} className="hidden md:flex items-center gap-2 font-semibold">
              View All <ArrowRight size={16} />
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: 'Running', img: 'https://images.unsplash.com/photo-1539185441755-769473a23570?auto=format&fit=crop&q=80&w=800' },
              { title: 'Lifestyle', img: 'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&q=80&w=800' },
              { title: 'Basketball', img: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&q=80&w=800' }
            ].map((cat, idx) => (
              <motion.div 
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.1 }}
                key={cat.title} 
                className="group relative h-96 overflow-hidden cursor-pointer"
                onClick={() => navigate('shop')}
              >
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors z-10" />
                <FallbackImage src={cat.img} alt={cat.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute bottom-8 left-8 z-20">
                  <h3 className="text-2xl font-bold text-white mb-3">{cat.title}</h3>
                  <span className="inline-flex items-center text-sm font-semibold text-white group-hover:underline underline-offset-4">
                    Shop Now <ChevronRight size={16} className="ml-1" />
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-24 bg-zinc-50 border-t border-zinc-100">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">Trending Now</h2>
            <p className="text-zinc-500 max-w-xl mx-auto">Discover the silhouettes defining this season. High-performance engineering meets elevated design.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-12 md:gap-x-8">
            {featuredProducts.map((product, idx) => (
              <motion.div key={product.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ delay: (idx % 4) * 0.1 }}>
                <ProductCard product={product} onQuickView={onQuickView} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Editorial Banner */}
      <section className="relative h-[70vh] min-h-[500px] flex items-center justify-center text-center">
        <div className="absolute inset-0">
          <FallbackImage 
            src="https://images.unsplash.com/photo-1552346154-21d32810baa3?auto=format&fit=crop&q=80&w=2000" 
            alt="Editorial Campaign" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>
        <div className="relative z-10 px-6 max-w-3xl flex flex-col items-center">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-4xl md:text-6xl font-black text-white tracking-tight mb-6"
          >
            BUILT FOR MOTION.
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
            className="text-lg md:text-xl text-zinc-200 mb-8 font-light"
          >
            Performance technology seamlessly integrated into everyday style. Push boundaries without sacrificing aesthetic.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
            <Button onClick={() => navigate('shop')} className="bg-white text-zinc-900 hover:bg-zinc-100">Explore Collection</Button>
          </motion.div>
        </div>
      </section>

      {/* New Arrivals */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="flex justify-between items-end mb-12">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">New Arrivals</h2>
            <Button variant="ghost" onClick={() => navigate('shop')} className="hidden md:flex items-center gap-2 font-semibold">
              View All <ArrowRight size={16} />
            </Button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-12 md:gap-x-8">
            {newArrivals.map((product, idx) => (
              <motion.div key={product.id} initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: idx * 0.1 }}>
                <ProductCard product={product} onQuickView={onQuickView} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Brand Story */}
      <section className="py-24 bg-zinc-900 text-white">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1">
              <FallbackImage 
                src="https://images.unsplash.com/photo-1605348532760-6753d2c43329?auto=format&fit=crop&q=80&w=800" 
                alt="Brand Story" 
                className="w-full h-auto"
              />
            </div>
            <div className="order-1 md:order-2 flex flex-col items-start max-w-lg">
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6 leading-tight">DESIGNED TO MOVE WITH YOU.</h2>
              <p className="text-zinc-400 text-lg font-light leading-relaxed mb-6">
                At VELORA, we believe that footwear shouldn't just look good—it should propel you forward. We meticulously source premium materials and engineer proprietary technologies to create silhouettes that bridge the gap between high fashion and high performance.
              </p>
              <p className="text-zinc-400 text-lg font-light leading-relaxed mb-8">
                Every stitch, every layer of foam, and every contour is purposeful. We don't just design shoes; we engineer movement.
              </p>
              <Button onClick={() => navigate('about')} className="bg-white text-zinc-900 hover:bg-zinc-200">Our Story</Button>
            </div>
          </div>
        </div>
      </section>

      {/* Customer Reviews */}
      <section className="py-24 bg-zinc-50 border-t border-zinc-100">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold tracking-tight mb-16">What They're Saying</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: 'Alex M.', text: "The most comfortable running shoes I've ever owned. The Aero Glide literally feels like cheating.", product: "Velora Aero Glide" },
              { name: 'Sarah T.', text: "Perfect balance of style and support. I wear my Court Classics to the office and on weekends.", product: "Velora Court Classic" },
              { name: 'Jordan K.', text: "Incredible lockdown and traction. The Apex Pro elevated my game instantly.", product: "Velora Apex Pro" }
            ].map((review, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="bg-white p-8 border border-zinc-100 text-left relative shadow-sm">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => <Star key={i} size={16} className="fill-zinc-900 text-zinc-900" />)}
                </div>
                <p className="text-zinc-700 font-medium mb-6 leading-relaxed">"{review.text}"</p>
                <div>
                  <p className="font-bold text-sm text-zinc-900">{review.name}</p>
                  <p className="text-xs text-zinc-500 mt-1 uppercase tracking-wider">{review.product}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight mb-4">JOIN THE VELORA LIST</h2>
          <p className="text-zinc-500 mb-8 font-light">Get early access to new drops, exclusive releases, and member-only offers.</p>
          <form className="flex flex-col sm:flex-row gap-2 w-full" onSubmit={(e) => { e.preventDefault(); alert('Subscribed (Demo)!'); }}>
            <input type="email" placeholder="Enter your email address" required className="flex-1 px-4 py-3 border border-zinc-300 focus:outline-none focus:border-zinc-900 transition-colors" />
            <Button type="submit" className="whitespace-nowrap px-8">Subscribe</Button>
          </form>
        </div>
      </section>
    </div>
  );
};

const ShopPage = ({ onQuickView }) => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortOption, setSortOption] = useState('Featured');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const categories = ['All', 'Running', 'Lifestyle', 'Basketball', 'Training', 'Casual'];
  
  const sortedAndFilteredProducts = useMemo(() => {
    let result = [...PRODUCTS];
    if (selectedCategory !== 'All') {
      result = result.filter(p => p.category === selectedCategory);
    }
    
    switch (sortOption) {
      case 'Price Low to High': return result.sort((a, b) => a.price - b.price);
      case 'Price High to Low': return result.sort((a, b) => b.price - a.price);
      case 'Newest': return result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
      case 'Best Selling': return result.sort((a, b) => b.reviewCount - a.reviewCount);
      default: return result.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0));
    }
  }, [selectedCategory, sortOption]);

  const FilterSidebar = ({ isMobile = false }) => (
    <div className={`${isMobile ? 'p-6' : 'sticky top-24'}`}>
      <div className="mb-8">
        <h3 className="font-bold text-lg mb-4 tracking-tight border-b border-zinc-100 pb-2">Category</h3>
        <ul className="space-y-3">
          {categories.map(cat => (
            <li key={cat}>
              <button 
                onClick={() => { setSelectedCategory(cat); if (isMobile) setMobileFilterOpen(false); }}
                className={`text-sm tracking-wide transition-colors ${selectedCategory === cat ? 'font-bold text-zinc-900 underline underline-offset-4' : 'text-zinc-500 hover:text-zinc-900'}`}
              >
                {cat}
              </button>
            </li>
          ))}
        </ul>
      </div>
      
      {!isMobile && (
        <div className="p-4 bg-zinc-50 border border-zinc-100 mt-8">
          <p className="text-xs font-bold uppercase tracking-widest text-zinc-900 mb-2">Member Benefit</p>
          <p className="text-sm text-zinc-600 mb-4">Free shipping and returns on all orders above $100.</p>
          <div className="flex gap-2 text-zinc-400">
            <Truck size={18}/> <RefreshCcw size={18}/>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className="w-full pt-20 pb-24 min-h-screen bg-white">
      {/* Mobile Filter Drawer */}
      <AnimatePresence>
        {mobileFilterOpen && (
          <div className="fixed inset-0 z-50 md:hidden flex justify-start">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setMobileFilterOpen(false)} className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
            <motion.div initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }} transition={{ type: 'tween', duration: 0.3 }} className="relative w-4/5 max-w-sm bg-white h-full overflow-y-auto shadow-2xl z-10">
              <div className="p-6 border-b border-zinc-100 flex justify-between items-center sticky top-0 bg-white">
                <span className="font-bold tracking-tight text-lg">Filters</span>
                <button onClick={() => setMobileFilterOpen(false)}><X size={20}/></button>
              </div>
              <FilterSidebar isMobile />
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end md:items-center py-8 border-b border-zinc-100 mb-8 gap-4">
          <div>
            <h1 className="text-3xl md:text-5xl font-black tracking-tight text-zinc-900 mb-2">SHOP ALL</h1>
            <p className="text-sm text-zinc-500">{sortedAndFilteredProducts.length} Results</p>
          </div>
          
          <div className="flex items-center gap-4 w-full md:w-auto">
            <Button variant="secondary" className="md:hidden flex-1 py-2" onClick={() => setMobileFilterOpen(true)}>
              <Filter size={16} className="mr-2" /> Filters
            </Button>
            <div className="relative flex-1 md:w-64">
              <select 
                value={sortOption} 
                onChange={(e) => setSortOption(e.target.value)}
                className="w-full appearance-none bg-white border border-zinc-200 px-4 py-2 text-sm font-medium focus:outline-none focus:border-zinc-900 cursor-pointer rounded-none"
              >
                <option value="Featured">Sort By: Featured</option>
                <option value="Newest">Sort By: Newest</option>
                <option value="Price Low to High">Price: Low to High</option>
                <option value="Price High to Low">Price: High to Low</option>
                <option value="Best Selling">Best Selling</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-zinc-500">
                <ChevronRight size={14} className="rotate-90" />
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-12">
          <div className="hidden md:block w-48 shrink-0">
            <FilterSidebar />
          </div>
          
          <div className="flex-1">
            {sortedAndFilteredProducts.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-10 md:gap-y-12">
                {sortedAndFilteredProducts.map((product) => (
                  <motion.div key={product.id} layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
                    <ProductCard product={product} onQuickView={onQuickView} />
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="py-20 text-center flex flex-col items-center">
                <div className="w-16 h-16 bg-zinc-100 rounded-full flex items-center justify-center mb-4">
                  <Search className="text-zinc-400" size={24} />
                </div>
                <h3 className="text-lg font-bold mb-2">No products found</h3>
                <p className="text-zinc-500 mb-6">Try adjusting your filters or search criteria.</p>
                <Button onClick={() => setSelectedCategory('All')}>Clear Filters</Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const ProductPage = ({ productId }) => {
  const product = useMemo(() => PRODUCTS.find(p => p.id === productId), [productId]);
  const { addToCart } = useContext(CartContext);
  const { toggleWishlist, isInWishlist } = useContext(WishlistContext);
  const { navigate } = useContext(NavigationContext);
  
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('details');

  useEffect(() => {
    if (product) {
      setSelectedImage(0);
      setSelectedSize(product.sizes[0]);
      setSelectedColor(product.colors[0]);
      setQuantity(1);
    }
  }, [product]);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20 flex-col">
        <h2 className="text-2xl font-bold mb-4">Product Not Found</h2>
        <Button onClick={() => navigate('shop')}>Return to Shop</Button>
      </div>
    );
  }

  const relatedProducts = PRODUCTS.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);

  return (
    <div className="w-full pt-20 pb-24 bg-white">
      <div className="container mx-auto px-6">
        {/* Breadcrumb */}
        <div className="py-4 text-xs font-medium tracking-wider text-zinc-500 uppercase flex gap-2 mb-4">
          <span className="cursor-pointer hover:text-zinc-900" onClick={() => navigate('home')}>Home</span> /
          <span className="cursor-pointer hover:text-zinc-900" onClick={() => navigate('shop')}>Shop</span> /
          <span className="cursor-pointer hover:text-zinc-900">{product.category}</span> /
          <span className="text-zinc-900">{product.name}</span>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 mb-20">
          {/* Gallery Area */}
          <div className="w-full lg:w-3/5 flex flex-col-reverse md:flex-row gap-4">
            <div className="flex md:flex-col gap-4 overflow-x-auto md:w-24 shrink-0 pb-2 md:pb-0 scrollbar-hide">
              {product.images.map((img, idx) => (
                <button 
                  key={idx} 
                  onClick={() => setSelectedImage(idx)}
                  className={`w-20 md:w-full aspect-square shrink-0 border-2 transition-all ${selectedImage === idx ? 'border-zinc-900' : 'border-transparent opacity-70 hover:opacity-100'}`}
                >
                  <FallbackImage src={img} alt={`${product.name} view ${idx+1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
            <div className="flex-1 bg-zinc-50 relative aspect-[4/5] md:aspect-auto md:h-[700px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedImage}
                  initial={{ opacity: 0, filter: 'blur(10px)' }}
                  animate={{ opacity: 1, filter: 'blur(0px)' }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="w-full h-full absolute inset-0"
                >
                  <FallbackImage src={product.images[selectedImage]} alt={product.name} className="w-full h-full object-cover" />
                </motion.div>
              </AnimatePresence>
              {product.badge && (
                <span className="absolute top-6 left-6 bg-white px-4 py-2 text-xs font-bold tracking-widest uppercase z-10 shadow-sm">
                  {product.badge}
                </span>
              )}
            </div>
          </div>

          {/* Info Area */}
          <div className="w-full lg:w-2/5 md:py-8 flex flex-col">
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-sm tracking-widest font-medium text-zinc-500 uppercase mb-2">{product.category}</p>
                <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-zinc-900 leading-tight mb-2">{product.name}</h1>
                <div className="flex items-center gap-2 mb-6">
                  <span className="text-2xl font-medium text-zinc-900">${product.price}</span>
                  {product.oldPrice && <span className="text-lg text-zinc-400 line-through">${product.oldPrice}</span>}
                  {product.discount && <span className="text-xs font-bold bg-red-100 text-red-700 px-2 py-1 ml-2">-{product.discount}%</span>}
                </div>
              </div>
              <button onClick={() => toggleWishlist(product.id)} className="p-3 border border-zinc-200 rounded-full hover:bg-zinc-50 transition-colors">
                <Heart size={20} className={isInWishlist(product.id) ? "fill-zinc-900 text-zinc-900" : "text-zinc-400"} />
              </button>
            </div>

            <div className="flex items-center gap-2 text-sm mb-8 border-b border-zinc-100 pb-8">
              <div className="flex gap-0.5"><Star size={16} className="fill-zinc-900 text-zinc-900" /><Star size={16} className="fill-zinc-900 text-zinc-900" /><Star size={16} className="fill-zinc-900 text-zinc-900" /><Star size={16} className="fill-zinc-900 text-zinc-900" /><Star size={16} className="fill-zinc-900 text-zinc-900 opacity-50" /></div>
              <span className="font-medium">{product.rating}</span>
              <span className="text-zinc-500 underline underline-offset-4 cursor-pointer ml-1">Read {product.reviewCount} Reviews</span>
            </div>

            <p className="text-zinc-600 text-base leading-relaxed mb-8">{product.description}</p>

            {/* Selectors */}
            <div className="space-y-8 mb-10">
              <div>
                <div className="flex justify-between items-center mb-3">
                  <span className="text-sm font-bold tracking-wider uppercase text-zinc-900">Color</span>
                  <span className="text-xs text-zinc-500 font-medium">Selected</span>
                </div>
                <div className="flex gap-4">
                  {product.colors.map(c => (
                    <button 
                      key={c} onClick={() => setSelectedColor(c)}
                      className={`w-10 h-10 rounded-full border-2 transition-all outline-none ${selectedColor === c ? 'border-zinc-900 scale-110 shadow-md' : 'border-zinc-200 hover:border-zinc-400'}`}
                      style={{ backgroundColor: c }}
                      aria-label={`Color ${c}`}
                    />
                  ))}
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-3">
                  <span className="text-sm font-bold tracking-wider uppercase text-zinc-900">Size (US)</span>
                  <button className="text-xs text-zinc-500 underline underline-offset-4 hover:text-zinc-900 transition-colors font-medium">Size Guide</button>
                </div>
                <div className="grid grid-cols-4 gap-3">
                  {product.sizes.map(s => (
                    <button 
                      key={s} onClick={() => setSelectedSize(s)}
                      className={`py-3 text-sm font-medium transition-all border ${selectedSize === s ? 'border-zinc-900 bg-zinc-900 text-white shadow-md' : 'border-zinc-200 text-zinc-900 hover:border-zinc-900 hover:bg-zinc-50'}`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <span className="text-sm font-bold tracking-wider uppercase text-zinc-900 block mb-3">Quantity</span>
                <div className="inline-flex items-center border border-zinc-200 h-12">
                  <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-4 h-full hover:bg-zinc-100 transition-colors text-zinc-500"><Minus size={16} /></button>
                  <span className="w-12 text-center text-sm font-semibold">{quantity}</span>
                  <button onClick={() => setQuantity(quantity + 1)} className="px-4 h-full hover:bg-zinc-100 transition-colors text-zinc-500"><Plus size={16} /></button>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mt-auto">
              <Button 
                onClick={() => addToCart(product, selectedSize, selectedColor, quantity)}
                className="flex-1 py-4 text-base"
              >
                Add to Bag - ${(product.price * quantity).toFixed(2)}
              </Button>
            </div>

            <div className="mt-8 grid grid-cols-2 gap-4 border-t border-zinc-100 pt-6">
              <div className="flex items-center gap-3 text-sm text-zinc-600">
                <Truck size={20} className="text-zinc-400" />
                <span>Free shipping over $100</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-zinc-600">
                <ShieldCheck size={20} className="text-zinc-400" />
                <span>2-Year Warranty</span>
              </div>
            </div>
          </div>
        </div>

        {/* Product Tabs */}
        <div className="max-w-4xl mx-auto mb-24">
          <div className="flex border-b border-zinc-200 mb-8 overflow-x-auto scrollbar-hide">
            {['details', 'features', 'shipping'].map(tab => (
              <button 
                key={tab} onClick={() => setActiveTab(tab)}
                className={`px-8 py-4 text-sm font-bold tracking-wider uppercase transition-colors whitespace-nowrap ${activeTab === tab ? 'text-zinc-900 border-b-2 border-zinc-900' : 'text-zinc-400 hover:text-zinc-700'}`}
              >
                {tab}
              </button>
            ))}
          </div>
          <div className="min-h-[200px] text-zinc-600 leading-relaxed font-light px-4">
            {activeTab === 'details' && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                <p className="mb-4">{product.description}</p>
                <p>Designed with meticulous attention to detail in our innovation lab, this silhouette perfectly encapsulates our "Move Different" philosophy. The premium construction ensures durability while the aesthetic speaks to modern minimalist sensibilities.</p>
              </motion.div>
            )}
            {activeTab === 'features' && (
              <motion.ul initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="list-disc pl-5 space-y-3">
                {product.features.map((f, i) => <li key={i}>{f}</li>)}
                <li>Weight: 285g (Men's size 9)</li>
                <li>Heel-to-toe drop: 8mm</li>
              </motion.ul>
            )}
            {activeTab === 'shipping' && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
                <p><strong className="text-zinc-900">Standard Delivery:</strong> 3-5 business days. Free for orders over $100, otherwise $15.</p>
                <p><strong className="text-zinc-900">Express Delivery:</strong> 1-2 business days. $25.</p>
                <p><strong className="text-zinc-900">Returns:</strong> We accept returns in unworn condition within 30 days of delivery. A prepaid return label is included in every package.</p>
              </motion.div>
            )}
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="border-t border-zinc-100 pt-24">
            <h2 className="text-2xl font-bold tracking-tight mb-12 text-center">You May Also Like</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-12 md:gap-x-8">
              {relatedProducts.map(p => (
                <ProductCard key={p.id} product={p} onQuickView={() => {}} /> 
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const Navbar = ({ toggleCart, toggleSearch }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { cartItems } = useContext(CartContext);
  const { wishlist } = useContext(WishlistContext);
  const { navigate, currentRoute } = useContext(NavigationContext);
  
  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Men', path: 'shop' },
    { name: 'Women', path: 'shop' },
    { name: 'New Arrivals', path: 'shop' },
    { name: 'Sale', path: 'shop', special: true },
  ];

  return (
    <>
      <div className="bg-zinc-900 text-white text-center py-2 px-4 text-xs font-medium tracking-widest uppercase relative z-[60]">
        Free Shipping on Orders Over $100
      </div>
      
      <header className={`sticky top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/80 backdrop-blur-md shadow-sm py-4' : 'bg-transparent py-6'} border-b border-zinc-100/50`}>
        <div className="container mx-auto px-6 flex items-center justify-between">
          
          <div className="flex md:hidden items-center gap-4">
            <button onClick={() => setMobileMenuOpen(true)} className="text-zinc-900 hover:text-zinc-600 transition-colors">
              <Menu size={24} strokeWidth={1.5} />
            </button>
            <button onClick={toggleSearch} className="text-zinc-900 hover:text-zinc-600 transition-colors">
              <Search size={20} strokeWidth={1.5} />
            </button>
          </div>

          <div className="hidden md:flex items-center gap-8 flex-1">
            {navLinks.map(link => (
              <button 
                key={link.name} onClick={() => navigate(link.path)}
                className={`text-sm font-semibold tracking-wide uppercase transition-colors ${link.special ? 'text-red-600 hover:text-red-700' : 'text-zinc-600 hover:text-zinc-900'}`}
              >
                {link.name}
              </button>
            ))}
          </div>

          <div 
            className="flex-1 text-center cursor-pointer text-2xl md:text-3xl font-black tracking-tighter" 
            onClick={() => navigate('home')}
          >
            VELORA<span className="text-zinc-400">.</span>
          </div>

          <div className="flex items-center justify-end gap-5 flex-1">
            <button onClick={toggleSearch} className="hidden md:block text-zinc-900 hover:scale-110 transition-transform">
              <Search size={20} strokeWidth={1.5} />
            </button>
            <button onClick={() => navigate('shop')} className="hidden md:block text-zinc-900 hover:scale-110 transition-transform relative">
              <Heart size={20} strokeWidth={1.5} />
              {wishlist.length > 0 && <span className="absolute -top-1.5 -right-2 bg-zinc-900 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">{wishlist.length}</span>}
            </button>
            <button onClick={toggleCart} className="text-zinc-900 hover:scale-110 transition-transform relative">
              <ShoppingBag size={20} strokeWidth={1.5} />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-2 bg-zinc-900 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-[80] flex">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setMobileMenuOpen(false)} className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
            <motion.div initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }} transition={{ type: 'tween', duration: 0.3 }} className="relative w-4/5 max-w-sm bg-white h-full shadow-2xl flex flex-col">
              <div className="p-6 border-b border-zinc-100 flex justify-between items-center">
                <span className="text-xl font-black tracking-tighter">VELORA.</span>
                <button onClick={() => setMobileMenuOpen(false)}><X size={24} strokeWidth={1.5}/></button>
              </div>
              <div className="flex-1 flex flex-col py-8 px-6 gap-6 overflow-y-auto">
                {navLinks.map(link => (
                  <button 
                    key={link.name} 
                    onClick={() => { setMobileMenuOpen(false); navigate(link.path); }}
                    className={`text-2xl font-bold tracking-tight text-left ${link.special ? 'text-red-600' : 'text-zinc-900'}`}
                  >
                    {link.name}
                  </button>
                ))}
                <div className="mt-8 pt-8 border-t border-zinc-100 flex flex-col gap-4">
                  <button onClick={() => { setMobileMenuOpen(false); navigate('shop'); }} className="text-lg font-medium text-left flex items-center gap-3">
                    <Heart size={20} /> Wishlist ({wishlist.length})
                  </button>
                  <button className="text-lg font-medium text-left flex items-center gap-3">
                    Account
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

const Footer = () => (
  <footer className="bg-zinc-900 text-zinc-400 pt-20 pb-10 font-light">
    <div className="container mx-auto px-6">
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-10 mb-16">
        <div className="col-span-2 lg:col-span-2">
          <h3 className="text-white text-3xl font-black tracking-tighter mb-4">VELORA.</h3>
          <p className="mb-6 max-w-xs text-sm leading-relaxed">Premium footwear engineered for everyday movement. We blend high-performance technology with minimalist aesthetic to help you move different.</p>
          <div className="flex gap-4">
            {['Instagram', 'Twitter', 'Facebook'].map(s => (
              <div key={s} className="w-10 h-10 rounded-full border border-zinc-700 flex items-center justify-center hover:bg-white hover:text-zinc-900 hover:border-white transition-all cursor-pointer">
                <span className="text-xs uppercase font-bold">{s[0]}</span>
              </div>
            ))}
          </div>
        </div>
        
        <div>
          <h4 className="text-white font-bold mb-6 tracking-wide text-sm uppercase">Shop</h4>
          <ul className="space-y-4 text-sm">
            <li><a href="#" className="hover:text-white transition-colors">New Arrivals</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Men's Shoes</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Women's Shoes</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Sale</a></li>
          </ul>
        </div>
        
        <div>
          <h4 className="text-white font-bold mb-6 tracking-wide text-sm uppercase">Support</h4>
          <ul className="space-y-4 text-sm">
            <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Shipping & Returns</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Track Order</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Size Guide</a></li>
          </ul>
        </div>
        
        <div>
          <h4 className="text-white font-bold mb-6 tracking-wide text-sm uppercase">Company</h4>
          <ul className="space-y-4 text-sm">
            <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Sustainability</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
          </ul>
        </div>
      </div>
      
      <div className="pt-8 border-t border-zinc-800 flex flex-col md:flex-row justify-between items-center gap-4 text-xs">
        <p>&copy; {new Date().getFullYear()} Velora Footwear Inc. All rights reserved.</p>
        <div className="flex gap-6">
          <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
        </div>
      </div>
    </div>
  </footer>
);

export default function App() {
  const [currentRoute, setCurrentRoute] = useState({ path: 'home', params: {} });
  const [cartItems, setCartItems] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  useEffect(() => {
    const savedWishlist = localStorage.getItem('velora_wishlist');
    if (savedWishlist) setWishlist(JSON.parse(savedWishlist));
    const savedCart = localStorage.getItem('velora_cart');
    if (savedCart) setCartItems(JSON.parse(savedCart));
  }, []);

  useEffect(() => {
    localStorage.setItem('velora_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem('velora_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const navigate = (path, params = {}) => {
    setCurrentRoute({ path, params });
    window.scrollTo(0, 0);
  };

  const addToCart = (product, size, color, quantity = 1) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.product.id === product.id && item.size === size && item.color === color);
      if (existing) {
        return prev.map(item => item.cartId === existing.cartId ? { ...item, quantity: item.quantity + quantity } : item);
      }
      return [...prev, { cartId: `${product.id}-${size}-${color.replace('#', '')}`, product, size, color, quantity }];
    });
    setIsCartOpen(true);
  };

  const updateQuantity = (cartId, quantity) => {
    if (quantity <= 0) return removeFromCart(cartId);
    setCartItems(prev => prev.map(item => item.cartId === cartId ? { ...item, quantity } : item));
  };

  const removeFromCart = (cartId) => {
    setCartItems(prev => prev.filter(item => item.cartId !== cartId));
  };

  const cartTotal = cartItems.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);

  const toggleWishlist = (productId) => {
    setWishlist(prev => prev.includes(productId) ? prev.filter(id => id !== productId) : [...prev, productId]);
  };

  const isInWishlist = (productId) => wishlist.includes(productId);

  const renderPage = () => {
    switch (currentRoute.path) {
      case 'home': return <HomePage onQuickView={setQuickViewProduct} />;
      case 'shop': return <ShopPage onQuickView={setQuickViewProduct} />;
      case 'product': return <ProductPage productId={currentRoute.params.id} />;
      default: return <HomePage onQuickView={setQuickViewProduct} />;
    }
  };

  return (
    <NavigationContext.Provider value={{ currentRoute, navigate }}>
      <CartContext.Provider value={{ cartItems, addToCart, updateQuantity, removeFromCart, cartTotal }}>
        <WishlistContext.Provider value={{ wishlist, toggleWishlist, isInWishlist }}>
          <div className="min-h-screen bg-white text-zinc-900 font-sans selection:bg-zinc-900 selection:text-white flex flex-col">
            <Navbar toggleCart={() => setIsCartOpen(true)} toggleSearch={() => setIsSearchOpen(true)} />
            
            <main className="flex-1 flex flex-col">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentRoute.path + (currentRoute.params.id || '')}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="flex-1 flex flex-col"
                >
                  {renderPage()}
                </motion.div>
              </AnimatePresence>
            </main>

            <Footer />

            <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
            <SearchOverlay isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
            {quickViewProduct && <QuickViewModal product={quickViewProduct} onClose={() => setQuickViewProduct(null)} />}
          </div>
        </WishlistContext.Provider>
      </CartContext.Provider>
    </NavigationContext.Provider>
  );
}