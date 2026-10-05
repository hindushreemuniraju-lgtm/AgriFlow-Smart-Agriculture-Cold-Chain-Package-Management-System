import React, { useState, useMemo } from 'react';
import { useAuth } from '../../context/AuthContext';
import { COMPREHENSIVE_PRODUCT_DATABASE } from '../../data/productsDatabase';
import { ProductIntelligence } from '../../types/product';
import { getVerifiedCropVisual } from '../../services/crop/cropImageService';
import { AgriFlowPDFDownloadModal } from '../documents/AgriFlowPDFDownloadModal';
import { 
  ShoppingCart, 
  Search, 
  Filter, 
  QrCode, 
  ShieldCheck, 
  Sparkles, 
  Truck, 
  MapPin, 
  CheckCircle2, 
  Layers, 
  Thermometer, 
  ArrowRight, 
  CreditCard,
  Heart,
  Star,
  ExternalLink,
  FileText,
  Download,
  Clock
} from 'lucide-react';

interface CustomerMarketplaceProps {
  onOpenPassport: (batchId: string) => void;
}

export const CustomerMarketplaceView: React.FC<CustomerMarketplaceProps> = ({ onOpenPassport }) => {
  const { user, updateUser } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedProductForModal, setSelectedProductForModal] = useState<ProductIntelligence | null>(null);
  const [cartCount, setCartCount] = useState<number>(2);
  const [selectedTrackingOrder, setSelectedTrackingOrder] = useState<any | null>(null);
  const [isCustomerRealGps, setIsCustomerRealGps] = useState<boolean>(false);
  const [pdfModalState, setPdfModalState] = useState<{ isOpen: boolean; product: ProductIntelligence | null; batchId: string }>({
    isOpen: false,
    product: null,
    batchId: 'AGF-8921'
  });
  
  const [customerOrders, setCustomerOrders] = useState<Array<{
    orderId: string;
    product: ProductIntelligence;
    quantityKg: number;
    totalAmount: number;
    status: string;
    orderDate: string;
  }>>([
    {
      orderId: 'AGF-ORD-8821',
      product: COMPREHENSIVE_PRODUCT_DATABASE.find(p => p.id === 'brinjal') || COMPREHENSIVE_PRODUCT_DATABASE[0],
      quantityKg: 20,
      totalAmount: 520,
      status: 'In Transit',
      orderDate: 'Today, 10:30 AM'
    },
    {
      orderId: 'AGF-ORD-7714',
      product: COMPREHENSIVE_PRODUCT_DATABASE.find(p => p.id === 'ghee') || COMPREHENSIVE_PRODUCT_DATABASE[1],
      quantityKg: 2,
      totalAmount: 1700,
      status: 'Delivered',
      orderDate: '02 Oct 2026'
    }
  ]);

  const [activeTab, setActiveTab] = useState<'catalog' | 'my_orders'>('catalog');

  const [orderSuccessModal, setOrderSuccessModal] = useState<{ isOpen: boolean; product: ProductIntelligence | null; orderId: string; total: number }>({
    isOpen: false,
    product: null,
    orderId: '',
    total: 0
  });

  const categories = [
    { label: 'All Items', value: 'All', icon: '🛒' },
    { label: '🥬 Vegetables', value: 'Vegetable', icon: '🥬' },
    { label: '🍎 Fruits', value: 'Fruit', icon: '🍎' },
    { label: '🌾 Grains & Cereals', value: 'Grain', icon: '🌾' },
    { label: '🫘 Pulses', value: 'Pulse', icon: '🫘' },
    { label: '🥜 Dry Fruits & Nuts', value: 'Dry Fruit', icon: '🥜' },
    { label: '🛢️ Oils', value: 'Oil & Oilseed', icon: '🛢️' },
    { label: '🥛 Dairy', value: 'Dairy', icon: '🥛' },
    { label: '🌾 Flour', value: 'Flour', icon: '🌾' },
    { label: '🌶️ Spices', value: 'Spice', icon: '🌶️' },
    { label: '☕ Tea & Coffee', value: 'Tea & Coffee', icon: '☕' }
  ];

  // Filter products by category and search query
  const filteredProducts = useMemo(() => {
    return COMPREHENSIVE_PRODUCT_DATABASE.filter(product => {
      const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
      const matchesSearch = searchQuery === '' || 
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.scientificName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.aliases.some(a => a.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const handleBuyNow = (product: ProductIntelligence) => {
    const qty = 5; // 5 kg/units default
    const total = Math.round((product.market?.basePricePerKg || 30) * qty);
    
    // Deduct from wallet if available
    if (user.walletBalance >= total) {
      updateUser({ walletBalance: user.walletBalance - total });
    }

    const orderId = `AGF-ORD-${Math.floor(100000 + Math.random() * 900000)}`;
    
    // Add to customer orders
    setCustomerOrders(prev => [
      {
        orderId,
        product,
        quantityKg: qty,
        totalAmount: total,
        status: 'In Transit',
        orderDate: 'Just now'
      },
      ...prev
    ]);

    setOrderSuccessModal({
      isOpen: true,
      product,
      orderId,
      total
    });
    setCartCount(prev => prev + 1);
  };

  const openDocumentsForOrder = (product: ProductIntelligence, batchId: string) => {
    setPdfModalState({
      isOpen: true,
      product,
      batchId
    });
  };

  return (
    <div className="space-y-8 pb-16">
      
      {/* Customer Header & Wallet Bar */}
      <div className="rounded-3xl bg-gradient-to-r from-purple-950/80 via-slate-900 to-pink-950/80 border border-purple-500/30 p-6 sm:p-8 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-3 py-1 rounded-full bg-pink-500/20 border border-pink-500/40 text-pink-300 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
              <ShoppingCart className="w-3.5 h-3.5" /> Farm-to-Table Verified Marketplace
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-bold flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" /> 100% Traceable
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white">
            Direct Farm Produce & Artisan Processed Foods
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl">
            Purchase directly from certified organic farmers and food producers with complete cold-chain transparency, scientific packaging, and downloadable PDF documents.
          </p>
        </div>

        {/* User Account & Cart Status */}
        <div className="flex items-center gap-4 bg-slate-950/80 p-3 rounded-2xl border border-slate-800">
          <div className="text-right">
            <span className="text-[10px] text-slate-400 block uppercase font-bold">Wallet Balance</span>
            <span className="text-base font-black text-emerald-400 font-mono">₹{user.walletBalance.toLocaleString()}</span>
          </div>
          <div className="h-8 w-[1px] bg-slate-800" />
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-pink-500/20 border border-pink-500/30 flex items-center justify-center text-pink-300 relative">
              <ShoppingCart className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-pink-500 text-white text-[10px] font-black flex items-center justify-center shadow">
                  {cartCount}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Sub-navigation: Catalog vs My Orders */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setActiveTab('catalog')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 ${
              activeTab === 'catalog'
                ? 'bg-purple-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white bg-slate-900/60'
            }`}
          >
            <ShoppingCart className="w-4 h-4" />
            <span>Browse Catalog ({filteredProducts.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('my_orders')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 ${
              activeTab === 'my_orders'
                ? 'bg-pink-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white bg-slate-900/60'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>My Orders & PDF Downloads ({customerOrders.length})</span>
          </button>
        </div>
      </div>

      {activeTab === 'catalog' && (
        <>
          {/* Search & Category Filter Navigation */}
          <div className="space-y-4">
            
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search produce, commodities, regional names (e.g., Brinjal, Baingan, A2 Ghee, Groundnut Oil, Atta, Assam Tea)..."
                className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-slate-900 border border-purple-500/30 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-purple-400 shadow-inner"
              />
            </div>

            {/* Category Pills Slider */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
              {categories.map((cat) => (
                <button
                  key={cat.value}
                  onClick={() => setSelectedCategory(cat.value)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                    selectedCategory === cat.value
                      ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-[0_0_20px_rgba(217,70,239,0.4)] border border-pink-400/40'
                      : 'bg-slate-900/90 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800'
                  }`}
                >
                  <span>{cat.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => {
              const visual = getVerifiedCropVisual(product.id, product.name);

              return (
                <div
                  key={product.id}
                  className="rounded-3xl bg-slate-900/90 border border-slate-800 hover:border-purple-500/40 p-5 shadow-xl transition-all hover:shadow-[0_0_30px_rgba(168,85,247,0.15)] flex flex-col justify-between group"
                >
                  <div>
                    
                    {/* Visual Header & Category Badge */}
                    <div className="flex items-start justify-between gap-3 mb-4">
                      <div className="flex items-center gap-3">
                        <div 
                          className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl shrink-0 shadow-md group-hover:scale-105 transition-transform"
                          style={{ background: `linear-gradient(135deg, ${visual.gradient[0]}, ${visual.gradient[1]})` }}
                        >
                          {visual.emoji}
                        </div>
                        <div>
                          <span className="text-[10px] font-bold text-purple-300 bg-purple-500/20 px-2 py-0.5 rounded uppercase tracking-wider">
                            {product.category}
                          </span>
                          <h3 className="text-base font-bold text-white mt-1 group-hover:text-purple-300 transition-colors">
                            {product.name}
                          </h3>
                          <p className="text-xs text-slate-400 italic font-mono">{product.scientificName}</p>
                        </div>
                      </div>

                      <button className="text-slate-500 hover:text-pink-400 transition-colors">
                        <Heart className="w-5 h-5" />
                      </button>
                    </div>

                    {/* Description & Processing Info */}
                    <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed mb-3">
                      {product.description}
                    </p>

                    {/* Packaging & Origin Badges */}
                    <div className="space-y-1.5 mb-4 text-[11px]">
                      <div className="flex items-center gap-1.5 text-slate-300">
                        <Layers className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                        <span className="truncate"><b>Pack:</b> {product.packaging.primaryPackaging}</span>
                      </div>

                      <div className="flex items-center gap-1.5 text-slate-300">
                        <Truck className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                        <span><b>Transit:</b> {product.transportation.temperatureControlled ? '❄️ Cold Reefer' : '🚛 Dry Express'} • 2-4 Days ETA</span>
                      </div>

                      <div className="flex items-center gap-1.5 text-slate-300">
                        <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span><b>Origin:</b> Certified Farmer Cluster (APMC Verified)</span>
                      </div>
                    </div>

                  </div>

                  {/* Price & Action Row */}
                  <div className="pt-4 border-t border-slate-800 flex items-center justify-between gap-2">
                    <div>
                      <span className="text-[10px] text-slate-400 block uppercase font-bold">Direct Price</span>
                      <div className="text-base font-black text-emerald-400 font-mono">
                        ₹{(product.market?.basePricePerKg ?? 0).toFixed(2)} <span className="text-xs text-slate-400 font-sans font-normal">/ {(product.market?.priceUnit || 'kg').replace('₹/', '')}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setSelectedProductForModal(product)}
                        className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-purple-300 hover:text-white transition-colors flex items-center gap-1 text-xs font-bold"
                        title="View Farm-to-Table Traceability Passport"
                      >
                        <QrCode className="w-4 h-4" />
                        <span className="hidden sm:inline">Trace</span>
                      </button>

                      <button
                        onClick={() => handleBuyNow(product)}
                        className="px-3.5 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white text-xs font-bold shadow-md transition-all flex items-center gap-1.5"
                      >
                        <ShoppingCart className="w-3.5 h-3.5" />
                        <span>Buy</span>
                      </button>
                    </div>
                  </div>

                </div>
              );
            })}
          </div>
        </>
      )}

      {/* MY ORDERS & PDF DOWNLOAD CENTER VIEW */}
      {activeTab === 'my_orders' && (
        <div className="space-y-6">
          <div className="rounded-3xl bg-slate-900 border border-purple-500/30 p-6 sm:p-8 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <FileText className="w-5 h-5 text-pink-400" />
                  <span>My Orders & Official PDF Document Center</span>
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Download certified Product Passports, Tax Invoices, SIH26236 Packaging Dossiers, and Delivery Reports.
                </p>
              </div>
            </div>

            <div className="space-y-4">
              {customerOrders.map((order) => {
                const visual = getVerifiedCropVisual(order.product.id, order.product.name);

                return (
                  <div
                    key={order.orderId}
                    className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-purple-500/40 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
                  >
                    <div className="flex items-start gap-4">
                      <div 
                        className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl shrink-0 shadow-md"
                        style={{ background: `linear-gradient(135deg, ${visual.gradient[0]}, ${visual.gradient[1]})` }}
                      >
                        {visual.emoji}
                      </div>

                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-mono font-bold text-purple-300 bg-purple-500/20 px-2 py-0.5 rounded">
                            {order.orderId}
                          </span>
                          <span className={`text-xs px-2.5 py-0.5 rounded-full font-bold flex items-center gap-1 ${
                            order.status === 'Delivered'
                              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                              : 'bg-sky-500/20 text-sky-300 border border-sky-500/30'
                          }`}>
                            <CheckCircle2 className="w-3 h-3" />
                            {order.status}
                          </span>
                        </div>

                        <h4 className="text-base font-bold text-white">
                          {order.product.name} ({order.quantityKg} kg)
                        </h4>

                        <p className="text-xs text-slate-400">
                          Ordered on: <strong className="text-slate-300">{order.orderDate}</strong> • Total Paid: <strong className="text-emerald-400 font-mono">₹{order.totalAmount}</strong>
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-2 pt-2 md:pt-0 border-t md:border-t-0 border-slate-800">
                      <button
                        onClick={() => setSelectedTrackingOrder(order)}
                        className="px-3.5 py-2 rounded-xl bg-sky-600/20 hover:bg-sky-600/30 text-sky-300 hover:text-white text-xs font-bold border border-sky-500/40 flex items-center gap-1.5 transition-all shadow-sm"
                      >
                        <Truck className="w-3.5 h-3.5 text-sky-400" />
                        <span>Track Delivery</span>
                      </button>

                      <button
                        onClick={() => onOpenPassport(order.orderId)}
                        className="px-3 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-purple-300 hover:text-white text-xs font-bold border border-purple-500/30 flex items-center gap-1.5 transition-colors"
                      >
                        <QrCode className="w-3.5 h-3.5" />
                        <span>Passport</span>
                      </button>

                      <button
                        onClick={() => openDocumentsForOrder(order.product, order.orderId)}
                        className="px-4 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white text-xs font-bold shadow-md flex items-center gap-2 transition-all"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>Documents & PDFs</span>
                      </button>
                    </div>

                  </div>
                );
              })}
            </div>

          </div>
        </div>
      )}

      {/* Live 9-Stage Customer Delivery Tracking Modal */}
      {selectedTrackingOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fade-in">
          <div className="relative w-full max-w-3xl rounded-3xl bg-slate-900 border border-sky-500/40 p-6 sm:p-8 shadow-2xl text-slate-100 max-h-[90vh] overflow-y-auto">
            
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-sky-500/20 border border-sky-500/40 text-sky-400 flex items-center justify-center text-2xl">
                  🚚
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-bold text-white">Live Delivery Tracking</h3>
                    <span className="text-xs font-mono px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 border border-purple-500/30">
                      {selectedTrackingOrder.orderId}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mt-0.5">
                    {selectedTrackingOrder.product.name} • {selectedTrackingOrder.quantityKg} kg • Direct Cold-Chain Route
                  </p>
                </div>
              </div>
              <button
                onClick={() => setSelectedTrackingOrder(null)}
                className="w-8 h-8 rounded-full bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center text-sm"
              >
                ✕
              </button>
            </div>

            {/* GPS Telemetry Mode Disclaimer Badge */}
            <div className="mb-6 p-4 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className={`w-2.5 h-2.5 rounded-full ${isCustomerRealGps ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'}`} />
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-200">
                    Telemetry Source: {isCustomerRealGps ? '🌐 Live Real GPS (Hardware)' : '🧪 Model Simulation (SIH Demo)'}
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  {isCustomerRealGps 
                    ? 'Using live browser/device location telemetry stream.' 
                    : 'Displaying synthetic calibrated cold-chain telemetry curve for route demonstration.'}
                </p>
              </div>

              <button
                onClick={() => setIsCustomerRealGps(!isCustomerRealGps)}
                className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 shrink-0 transition-colors"
              >
                Switch to {isCustomerRealGps ? 'Simulated Demo' : 'Real Hardware GPS'}
              </button>
            </div>

            {/* 9-Stage Delivery Progression Bar */}
            <div className="mb-6 space-y-3">
              <div className="flex items-center justify-between text-xs font-bold text-slate-300 uppercase">
                <span>9-Stage Cold-Chain Delivery Pipeline</span>
                <span className="text-sky-400">{selectedTrackingOrder.status === 'Delivered' ? 'Stage 9/9 Complete' : 'Stage 6/9 Active (In Transit)'}</span>
              </div>

              <div className="grid grid-cols-3 sm:grid-cols-9 gap-1.5 text-center">
                {[
                  { name: '1. Placed', active: true, done: true },
                  { name: '2. Packing', active: true, done: true },
                  { name: '3. Pickup Ready', active: true, done: true },
                  { name: '4. Driver Assigned', active: true, done: true },
                  { name: '5. Picked Up', active: true, done: true },
                  { name: '6. In Transit', active: true, done: selectedTrackingOrder.status === 'Delivered' },
                  { name: '7. Near Dest.', active: selectedTrackingOrder.status === 'Delivered', done: selectedTrackingOrder.status === 'Delivered' },
                  { name: '8. Out Delivery', active: selectedTrackingOrder.status === 'Delivered', done: selectedTrackingOrder.status === 'Delivered' },
                  { name: '9. Delivered', active: selectedTrackingOrder.status === 'Delivered', done: selectedTrackingOrder.status === 'Delivered' }
                ].map((st, i) => (
                  <div 
                    key={i} 
                    className={`p-2 rounded-xl text-[10px] font-bold border transition-all ${
                      st.done 
                        ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300' 
                        : st.active 
                        ? 'bg-sky-500/20 border-sky-500/50 text-sky-300 ring-2 ring-sky-500/30 animate-pulse'
                        : 'bg-slate-950 border-slate-800 text-slate-500'
                    }`}
                  >
                    <div>{st.done ? '✓' : st.active ? '●' : '○'}</div>
                    <div className="truncate mt-0.5">{st.name}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Live Telemetry Sensor Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
              <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800">
                <span className="text-[10px] text-slate-400 uppercase font-bold block">Vehicle Temp</span>
                <div className="text-lg font-black text-emerald-400 font-mono mt-1">
                  {selectedTrackingOrder.product.transportation.temperatureControlled ? '4.2 °C' : '24.1 °C'}
                </div>
                <span className="text-[10px] text-emerald-500 font-semibold">● Optimal Range</span>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800">
                <span className="text-[10px] text-slate-400 uppercase font-bold block">Relative Humidity</span>
                <div className="text-lg font-black text-sky-400 font-mono mt-1">
                  88 %
                </div>
                <span className="text-[10px] text-sky-500 font-semibold">● Condensation Protected</span>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800">
                <span className="text-[10px] text-slate-400 uppercase font-bold block">Shock / Vibration</span>
                <div className="text-lg font-black text-purple-400 font-mono mt-1">
                  0.18 G
                </div>
                <span className="text-[10px] text-purple-400 font-semibold">● Smooth Air-Ride</span>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800">
                <span className="text-[10px] text-slate-400 uppercase font-bold block">Estimated Arrival</span>
                <div className="text-lg font-black text-amber-400 font-mono mt-1">
                  {selectedTrackingOrder.status === 'Delivered' ? 'Completed' : 'Today, 4:15 PM'}
                </div>
                <span className="text-[10px] text-amber-400 font-semibold">● On Schedule</span>
              </div>
            </div>

            {/* Courier & Vehicle Information */}
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 mb-6 text-xs">
              <h4 className="font-bold text-slate-300 uppercase tracking-wider text-[11px]">
                Assigned Logistics Carrier Details
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono text-slate-300">
                <div>
                  <span className="text-slate-500 block text-[10px]">DRIVER & OPERATOR:</span>
                  <strong>Rajesh Kumar (Verified)</strong>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px]">VEHICLE & REEFER UNIT:</span>
                  <strong>KA-04-AG-9912 (Reefer 3.5T)</strong>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px]">INTEGRITY HASH:</span>
                  <span className="text-purple-400 text-[11px]">#a8f9c1...e04b</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-end gap-3 pt-2 border-t border-slate-800">
              <button
                onClick={() => {
                  const prod = selectedTrackingOrder.product;
                  const bid = selectedTrackingOrder.orderId;
                  openDocumentsForOrder(prod, bid);
                }}
                className="px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold flex items-center gap-1.5 transition-all shadow-md"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download Transit PDF Dossier</span>
              </button>
            </div>

          </div>
        </div>
      )}

      {/* Product Traceability Modal */}
      {selectedProductForModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fade-in">
          <div className="relative w-full max-w-2xl rounded-3xl bg-slate-900 border border-purple-500/30 p-6 sm:p-8 shadow-2xl text-slate-100 max-h-[90vh] overflow-y-auto">
            
            <div className="flex items-center justify-between pb-4 border-b border-purple-500/20 mb-5">
              <div className="flex items-center gap-3">
                <span className="text-3xl">{getVerifiedCropVisual(selectedProductForModal.id, selectedProductForModal.name).emoji}</span>
                <div>
                  <h3 className="text-lg font-bold text-white">{selectedProductForModal.name}</h3>
                  <p className="text-xs text-purple-300 font-mono">Digital Product Passport & Supply-Chain Traceability</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedProductForModal(null)}
                className="w-8 h-8 rounded-full bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center text-sm"
              >
                ✕
              </button>
            </div>

            {/* 6-Stage Farm-to-Customer Pipeline */}
            <div className="space-y-4 text-xs">
              <h4 className="font-bold text-slate-300 uppercase tracking-wider text-[11px]">
                6-Stage Farm-to-Fork Verified Journey
              </h4>

              <div className="space-y-3 relative before:absolute before:left-4 before:top-3 before:bottom-3 before:w-0.5 before:bg-purple-500/30">
                
                <div className="relative pl-9">
                  <div className="absolute left-2.5 top-1 w-3.5 h-3.5 rounded-full bg-emerald-500 shadow" />
                  <h5 className="font-bold text-white">1. Farm Origin & Cultivation</h5>
                  <p className="text-slate-400 mt-0.5">Harvested under certified Good Agricultural Practices (GAP). Soil: {selectedProductForModal.growing.soil}.</p>
                </div>

                <div className="relative pl-9">
                  <div className="absolute left-2.5 top-1 w-3.5 h-3.5 rounded-full bg-sky-500 shadow" />
                  <h5 className="font-bold text-white">2. Harvesting & Pre-Cooling</h5>
                  <p className="text-slate-400 mt-0.5">{selectedProductForModal.harvesting.harvestingMethod} at {selectedProductForModal.harvesting.bestHarvestTime}.</p>
                </div>

                {selectedProductForModal.isProcessed && (
                  <div className="relative pl-9">
                    <div className="absolute left-2.5 top-1 w-3.5 h-3.5 rounded-full bg-amber-500 shadow" />
                    <h5 className="font-bold text-white">3. Processing & Value Addition</h5>
                    <p className="text-slate-400 mt-0.5">{selectedProductForModal.processingMethod}</p>
                  </div>
                )}

                <div className="relative pl-9">
                  <div className="absolute left-2.5 top-1 w-3.5 h-3.5 rounded-full bg-purple-500 shadow" />
                  <h5 className="font-bold text-white">4. Engineered Food Packaging (SIH26236)</h5>
                  <p className="text-slate-400 mt-0.5">{selectedProductForModal.packaging.primaryPackaging} ({selectedProductForModal.packaging.ecoCertification}).</p>
                </div>

                <div className="relative pl-9">
                  <div className="absolute left-2.5 top-1 w-3.5 h-3.5 rounded-full bg-indigo-500 shadow" />
                  <h5 className="font-bold text-white">5. Cold-Chain Logistics & Telemetry</h5>
                  <p className="text-slate-400 mt-0.5">{selectedProductForModal.transportation.recommendedVehicle} ({selectedProductForModal.transportation.targetTemp}).</p>
                </div>

                <div className="relative pl-9">
                  <div className="absolute left-2.5 top-1 w-3.5 h-3.5 rounded-full bg-pink-500 shadow" />
                  <h5 className="font-bold text-white">6. Consumer Delivery & Freshness</h5>
                  <p className="text-slate-400 mt-0.5">Delivered directly to consumer with verifiable batch cryptographic hash.</p>
                </div>

              </div>

              {/* Nutritional Highlights */}
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 mt-4">
                <h5 className="font-bold text-white mb-2">Nutritional & Health Highlights</h5>
                <div className="flex flex-wrap gap-1.5">
                  {selectedProductForModal.consumption.nutritionalProfile.highlights.map((h, i) => (
                    <span key={i} className="px-2.5 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-[11px]">
                      ✨ {h}
                    </span>
                  ))}
                </div>
              </div>

            </div>

            <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between gap-3">
              <button
                onClick={() => openDocumentsForOrder(selectedProductForModal, 'AGF-8921')}
                className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold flex items-center gap-1.5 border border-slate-700"
              >
                <Download className="w-3.5 h-3.5 text-purple-400" />
                <span>Download PDFs</span>
              </button>

              <button
                onClick={() => {
                  onOpenPassport('AGF-8921');
                  setSelectedProductForModal(null);
                }}
                className="px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold flex items-center gap-1.5"
              >
                <span>Open Full Passport</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>
        </div>
      )}

      {/* Order Success Modal */}
      {orderSuccessModal.isOpen && orderSuccessModal.product && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fade-in">
          <div className="relative w-full max-w-md rounded-3xl bg-slate-900 border border-emerald-500/40 p-6 sm:p-8 shadow-2xl text-slate-100 text-center">
            
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto mb-4 text-2xl shadow-[0_0_30px_rgba(16,185,129,0.3)]">
              ✓
            </div>

            <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-widest bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
              Order Confirmed & Farm Dispatched
            </span>

            <h3 className="text-xl font-black text-white mt-2">
              Purchase Successful!
            </h3>
            <p className="text-xs text-slate-300 mt-1">
              Your order for <b>{orderSuccessModal.product.name}</b> has been placed with direct cold-chain transport lock.
            </p>

            <div className="my-5 p-4 rounded-2xl bg-slate-950 border border-slate-800 text-xs text-left space-y-2 font-mono">
              <div className="flex justify-between">
                <span className="text-slate-400">Order Batch ID:</span>
                <span className="text-purple-300 font-bold">{orderSuccessModal.orderId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Amount Paid:</span>
                <span className="text-emerald-400 font-bold">₹{orderSuccessModal.total}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Packaging:</span>
                <span className="text-slate-200 truncate">{orderSuccessModal.product.packaging.primaryPackaging}</span>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => {
                  const prod = orderSuccessModal.product;
                  const bid = orderSuccessModal.orderId;
                  setOrderSuccessModal({ isOpen: false, product: null, orderId: '', total: 0 });
                  if (prod) openDocumentsForOrder(prod, bid);
                }}
                className="flex-1 py-3 rounded-2xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold shadow-lg transition-all flex items-center justify-center gap-1.5"
              >
                <Download className="w-4 h-4" />
                <span>Download PDFs</span>
              </button>
              
              <button
                onClick={() => setOrderSuccessModal({ isOpen: false, product: null, orderId: '', total: 0 })}
                className="flex-1 py-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold transition-all"
              >
                Continue
              </button>
            </div>

          </div>
        </div>
      )}

      {/* Real PDF Documents Download Modal */}
      <AgriFlowPDFDownloadModal
        isOpen={pdfModalState.isOpen}
        onClose={() => setPdfModalState({ isOpen: false, product: null, batchId: 'AGF-8921' })}
        product={pdfModalState.product}
        batchId={pdfModalState.batchId}
      />

    </div>
  );
};
