import React, { useState, useEffect } from 'react';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import { UserRole, CropInfo, FarmerOrder, DriverPartner } from './types';
import { Header } from './components/Header';
import { FarmerDashboard } from './components/farmer/FarmerDashboard';
import { LogisticsDashboard } from './components/logistics/LogisticsDashboard';
import { CustomerMarketplaceView } from './components/customer/CustomerMarketplaceView';
import { CustomerPassportView } from './components/customer/CustomerPassportView';
import { PackagingIntelligenceDashboard } from './components/packaging/PackagingIntelligenceDashboard';
import { FoodPackAIDashboard } from './components/packaging/FoodPackAIDashboard';
import { AuthModal } from './components/auth/AuthModal';
import { RoleOnboardingModal } from './components/auth/RoleOnboardingModal';
import { CROPS_DATA } from './data/cropsFallback';
import { INITIAL_ORDERS, INITIAL_DRIVERS } from './data/mockFallback';
import { ShieldCheck, Sparkles, Activity, CheckCircle2, Heart, QrCode, ShoppingCart, Mic } from 'lucide-react';
import { SarvamVoiceAssistantModal } from './components/voice/SarvamVoiceAssistantModal';
import { DiagnosticsPanel } from './components/common/DiagnosticsPanel';
import { resolveProduct } from './services/catalog/productNormalizationService';
import { generateDynamicCrop } from './data/cropsFallback';

import { AgriFlowPipelineVisualizer } from './components/common/AgriFlowPipelineVisualizer';
import { formatCurrency } from './utils/formatters';

const AgriFlowMain: React.FC = () => {
  const { t } = useLanguage();
  const { activeRole, switchRole, user } = useAuth();
  
  const [crops, setCrops] = useState<CropInfo[]>(CROPS_DATA);
  const [selectedCrop, setSelectedCrop] = useState<CropInfo>(CROPS_DATA[0]);
  const [orders, setOrders] = useState<FarmerOrder[]>(INITIAL_ORDERS);
  const [drivers, setDrivers] = useState<DriverPartner[]>(INITIAL_DRIVERS);
  const [notification, setNotification] = useState<{ title: string; desc: string; type: 'success' | 'info' } | null>(null);
  const [activeCustomerSubView, setActiveCustomerSubView] = useState<'marketplace' | 'passport'>('marketplace');
  const [currentPassportBatchId, setCurrentPassportBatchId] = useState<string>('AGF-8921');
  const [isGlobalVoiceModalOpen, setIsGlobalVoiceModalOpen] = useState<boolean>(false);

  // Sync with API on mount
  useEffect(() => {
    fetchInitialData();
  }, []);

  const fetchInitialData = async () => {
    try {
      const [cropsRes, ordersRes, logisticsRes] = await Promise.all([
        fetch('/api/crops'),
        fetch('/api/orders'),
        fetch('/api/logistics/marketplace')
      ]);

      const cropsJson = await cropsRes.json();
      if (cropsJson.success && cropsJson.crops?.length > 0) {
        setCrops(cropsJson.crops);
        setSelectedCrop(cropsJson.crops[0]);
      }

      const ordersJson = await ordersRes.json();
      if (ordersJson.success && ordersJson.orders?.length > 0) {
        setOrders(ordersJson.orders);
      }

      const logJson = await logisticsRes.json();
      if (logJson.success && logJson.drivers?.length > 0) {
        setDrivers(logJson.drivers);
      }
    } catch {
      // Offline fallback already initialized
    }
  };

  const showToast = (title: string, desc: string, type: 'success' | 'info' = 'success') => {
    setNotification({ title, desc, type });
    setTimeout(() => {
      setNotification(null);
    }, 4500);
  };

  const handleOrderCreated = (newOrder: FarmerOrder) => {
    setOrders(prev => [newOrder, ...prev]);
    showToast(
      'Transport Order Posted to Fleet!',
      `Batch ${newOrder.batchId} (${newOrder.cropName}) is now live on the Logistics Marketplace.`
    );
  };

  const handleOrderAccepted = async (orderId: string, driverId: string, price: number) => {
    try {
      await fetch('/api/logistics/bid', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderId, driverId, bidAmount: price })
      });
    } catch {
      // Local state update
    }

    setOrders(prev => prev.map(o => {
      if (o.id === orderId) {
        const driver = drivers.find(d => d.id === driverId);
        return {
          ...o,
          status: 'In Transit',
          driverId,
          driverName: driver?.name || 'Assigned Driver',
          actualPrice: price,
          telemetry: {
            currentLat: 19.55,
            currentLng: 73.41,
            reeferTemp: parseFloat(o.packagingSpec?.targetTemp) || 13.2,
            humidity: 88,
            speedKmph: 60,
            etaMinutes: Math.round(o.distanceKm * 0.9),
            currentStage: 'Dispatched & Cold Transit Active'
          }
        };
      }
      return o;
    }));

    showToast(
      'Load Dispatched with Cold-Chain Lock!',
      `Driver assigned at benchmark ${formatCurrency(price)}. Live IoT telemetry active.`
    );
  };

  const handleBatchDispatched = (orderIds: string[]) => {
    setOrders(prev => prev.map(o => {
      if (orderIds.includes(o.id)) {
        return {
          ...o,
          status: 'In Transit',
          telemetry: {
            currentLat: 19.55,
            currentLng: 73.41,
            reeferTemp: parseFloat(o.packagingSpec?.targetTemp) || 13.0,
            humidity: 88,
            speedKmph: 58,
            etaMinutes: 70,
            currentStage: 'Bundled Route Highway Transit'
          }
        };
      }
      return o;
    }));

    showToast(
      'Consolidated Route Dispatched!',
      `${orderIds.length} farmer orders bundled onto single reefer route with 35% fuel savings.`
    );
  };

  const handleOpenPassportFromMarketplace = (batchId: string) => {
    setCurrentPassportBatchId(batchId);
    setActiveCustomerSubView('passport');
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 selection:bg-purple-500 selection:text-white">
      
      {/* Global Header with Multi-Role Switcher */}
      <Header
        currentRole={activeRole}
        onSelectRole={(role) => switchRole(role)}
        activeOrdersCount={orders.filter(o => o.status === 'Requested').length}
      />

      {/* Main Role Interface Content Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6 space-y-6">
        
        {/* Signature AgriFlow Farm-to-Fork Pipeline Visualizer */}
        <AgriFlowPipelineVisualizer
          activeRole={activeRole}
          onSelectStage={(role) => switchRole(role)}
        />
        
        {/* Dynamic Toast Notification */}
        {notification && (
          <div className="fixed bottom-6 right-6 z-50 max-w-md rounded-2xl bg-slate-900/95 border border-purple-400/50 p-4 shadow-[0_0_30px_rgba(168,85,247,0.4)] backdrop-blur-xl animate-fade-in flex items-start gap-3">
            <div className="w-8 h-8 rounded-xl bg-purple-600/30 text-purple-300 flex items-center justify-center shrink-0">
              <Sparkles className="w-4 h-4 text-sky-400" />
            </div>
            <div className="flex-1">
              <h4 className="text-xs font-bold text-white">{notification.title}</h4>
              <p className="text-[11px] text-slate-300 mt-0.5">{notification.desc}</p>
            </div>
            <button
              onClick={() => setNotification(null)}
              className="text-slate-400 hover:text-white text-xs"
            >
              ✕
            </button>
          </div>
        )}

        {/* 1. Farmer Production & Agronomy Interface */}
        {activeRole === 'farmer' && (
          <FarmerDashboard
            crops={crops}
            selectedCrop={selectedCrop}
            onSelectCrop={(c) => setSelectedCrop(c)}
            onOrderCreated={handleOrderCreated}
          />
        )}

        {/* 2. SIH26236 Food Packaging Intelligence & FoodPack AI Interface */}
        {activeRole === 'packaging' && (
          <FoodPackAIDashboard />
        )}

        {/* 3. Customer Marketplace & Product Passport Interface */}
        {activeRole === 'customer' && (
          <div>
            <div className="flex items-center justify-end gap-2 mb-4">
              <button
                onClick={() => setActiveCustomerSubView('marketplace')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                  activeCustomerSubView === 'marketplace'
                    ? 'bg-pink-600 text-white shadow-md'
                    : 'bg-slate-900 text-slate-400 hover:text-white'
                }`}
              >
                <ShoppingCart className="w-3.5 h-3.5" />
                <span>Marketplace</span>
              </button>

              <button
                onClick={() => setActiveCustomerSubView('passport')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                  activeCustomerSubView === 'passport'
                    ? 'bg-purple-600 text-white shadow-md'
                    : 'bg-slate-900 text-slate-400 hover:text-white'
                }`}
              >
                <QrCode className="w-3.5 h-3.5" />
                <span>QR Scanner / Passport</span>
              </button>
            </div>

            {activeCustomerSubView === 'marketplace' ? (
              <CustomerMarketplaceView onOpenPassport={handleOpenPassportFromMarketplace} />
            ) : (
              <CustomerPassportView initialBatchId={currentPassportBatchId} />
            )}
          </div>
        )}

        {/* 4. Transporter Logistics & Fleet Interface */}
        {activeRole === 'logistics' && (
          <LogisticsDashboard
            orders={orders}
            drivers={drivers}
            onOrderAccepted={handleOrderAccepted}
            onBatchDispatched={handleBatchDispatched}
          />
        )}

      </main>

      {/* Global Modals */}
      <AuthModal />
      <RoleOnboardingModal />

      {/* Modern Dark Footer with Live Telemetry Heartbeat */}
      <footer className="border-t border-purple-500/20 bg-slate-950/80 backdrop-blur-md mt-16 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          
          <div className="flex items-center gap-2">
            <span className="text-base">🌱</span>
            <span className="font-extrabold text-white">{t.appName}</span>
            <span>• SIH26236 Intelligent Food Packaging & Farm-to-Table Ecosystem</span>
          </div>

          <div className="flex items-center gap-4 text-[11px]">
            <span className="flex items-center gap-1.5 text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
              <span>IoT Cold-Chain Telemetry: Online</span>
            </span>
            <span className="text-slate-600">|</span>
            <span className="flex items-center gap-1 text-purple-300">
              <ShieldCheck className="w-3.5 h-3.5 text-purple-400" />
              <span>APEDA & FSSAI IS 9845 Provenance</span>
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => switchRole('farmer')}
              className={`hover:text-emerald-300 transition-colors ${activeRole === 'farmer' ? 'text-emerald-400 font-bold' : ''}`}
            >
              Farmer
            </button>
            <span>•</span>
            <button
              onClick={() => switchRole('packaging')}
              className={`hover:text-purple-300 transition-colors ${activeRole === 'packaging' ? 'text-purple-400 font-bold' : ''}`}
            >
              Packaging AI
            </button>
            <span>•</span>
            <button
              onClick={() => switchRole('customer')}
              className={`hover:text-pink-300 transition-colors ${activeRole === 'customer' ? 'text-pink-400 font-bold' : ''}`}
            >
              Marketplace
            </button>
            <span>•</span>
            <button
              onClick={() => switchRole('logistics')}
              className={`hover:text-sky-300 transition-colors ${activeRole === 'logistics' ? 'text-sky-400 font-bold' : ''}`}
            >
              Fleet
            </button>
          </div>

        </div>
      </footer>

      {/* Floating Sarvam AI Voice Assistant Mitra Widget */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          onClick={() => setIsGlobalVoiceModalOpen(true)}
          className="group flex items-center gap-2 px-4 py-3 rounded-full bg-gradient-to-r from-purple-600 via-indigo-600 to-emerald-600 hover:from-purple-500 hover:to-emerald-500 text-white font-bold text-xs sm:text-sm shadow-[0_0_25px_rgba(168,85,247,0.5)] hover:shadow-[0_0_35px_rgba(16,185,129,0.6)] transition-all hover:scale-105 cursor-pointer border border-purple-400/50"
          title="Click to talk with Kisan Sarvam AI Voice Mitra"
        >
          <div className="relative flex items-center justify-center">
            <Mic className="w-4 h-4 text-emerald-300 animate-pulse" />
          </div>
          <span className="tracking-wide">Sarvam Voice Mitra</span>
        </button>
      </div>

      {/* Global Sarvam AI Indic Voice Assistant Modal */}
      <SarvamVoiceAssistantModal
        isOpen={isGlobalVoiceModalOpen}
        onClose={() => setIsGlobalVoiceModalOpen(false)}
        onSelectCropFromVoice={(cropName) => {
          const resolved = resolveProduct(cropName);
          const targetId = resolved ? resolved.id : cropName.toLowerCase().trim();
          let found = crops.find(c => 
            c.id.toLowerCase().includes(targetId) ||
            c.name.toLowerCase().includes(targetId) ||
            (targetId === 'tomato' && c.id === 'crop-tomatoes') ||
            (targetId === 'apple' && c.id === 'crop-apples') ||
            (targetId === 'mango' && c.id === 'crop-mangoes') ||
            (targetId === 'strawberry' && c.id === 'crop-strawberries') ||
            (targetId === 'bell-pepper' && c.id === 'crop-bellpeppers') ||
            (targetId === 'grape' && c.id === 'crop-grapes') ||
            (targetId === 'onion' && c.id === 'crop-onion') ||
            (targetId === 'wheat' && c.id === 'crop-wheat') ||
            (targetId === 'spinach' && c.id === 'crop-spinach') ||
            (targetId === 'almond' && c.id === 'crop-almonds') ||
            (targetId === 'walnut' && c.id === 'crop-walnuts') ||
            (targetId === 'cashew' && c.id === 'crop-cashews')
          );
          if (!found && resolved) {
            const dynamic = generateDynamicCrop(resolved.displayName);
            setCrops(prev => [...prev, dynamic]);
            found = dynamic;
          }
          if (found) {
            setSelectedCrop(found);
            switchRole('farmer');
            showToast(
              `Voice Selection: ${found.name}`,
              `AgriFlow agronomy and logistics loaded for ${found.name}.`
            );
          }
        }}
      />

      {/* Part 26: Development & Architecture Diagnostics Panel */}
      <DiagnosticsPanel currentProductQuery={selectedCrop.name} />

    </div>
  );
};

export default function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <AgriFlowMain />
      </AuthProvider>
    </LanguageProvider>
  );
}
