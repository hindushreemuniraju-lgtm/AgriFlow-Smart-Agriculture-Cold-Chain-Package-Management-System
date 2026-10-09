import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { 
  Brain, 
  Sparkles, 
  X, 
  Trash2, 
  Edit3, 
  Search, 
  RefreshCw, 
  CheckCircle2, 
  AlertCircle, 
  Database, 
  Hash, 
  Clock, 
  ArrowRight,
  ShieldCheck,
  Layers,
  ChevronRight,
  Check
} from 'lucide-react';
import { 
  AiCorrectionClientRecord, 
  fetchAllCorrections, 
  deleteCorrection, 
  updateCorrection 
} from '../../services/crop/aiCorrectionClientService';
import { CENTRAL_PRODUCT_CATALOG } from '../../services/catalog/productNormalizationService';
import { formatDate } from '../../utils/formatters';

interface AiCorrectionsHistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectCorrection?: (cropName: string) => void;
}

export const AiCorrectionsHistoryModal: React.FC<AiCorrectionsHistoryModalProps> = ({
  isOpen,
  onClose,
  onSelectCorrection
}) => {
  const [corrections, setCorrections] = useState<AiCorrectionClientRecord[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [editingRecord, setEditingRecord] = useState<AiCorrectionClientRecord | null>(null);
  const [editProduct, setEditProduct] = useState<string>('');
  const [editCategory, setEditCategory] = useState<string>('');
  const [editNotes, setEditNotes] = useState<string>('');
  const [isSavingEdit, setIsSavingEdit] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const loadData = async () => {
    setIsLoading(true);
    try {
      const data = await fetchAllCorrections();
      setCorrections(data);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      loadData();
    }
  }, [isOpen]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleDelete = async (id: string, name: string) => {
    if (!window.confirm(`Are you sure you want to delete the learned correction for "${name}"?`)) {
      return;
    }
    const success = await deleteCorrection(id);
    if (success) {
      setCorrections(prev => prev.filter(c => c.id !== id));
      showToast(`Deleted correction for "${name}".`);
    }
  };

  const startEdit = (rec: AiCorrectionClientRecord) => {
    setEditingRecord(rec);
    setEditProduct(rec.corrected_product);
    setEditCategory(rec.corrected_category);
    setEditNotes(rec.notes || '');
  };

  const handleSaveEdit = async () => {
    if (!editingRecord || !editProduct.trim()) return;
    setIsSavingEdit(true);
    try {
      const updated = await updateCorrection(editingRecord.id, {
        corrected_product: editProduct.trim(),
        corrected_normalized_name: editProduct.toLowerCase().trim().replace(/[^a-z0-9]/g, '-'),
        corrected_category: editCategory,
        notes: editNotes.trim()
      });
      if (updated) {
        setCorrections(prev => prev.map(c => c.id === updated.id ? updated : c));
        setEditingRecord(null);
        showToast(`Updated correction for "${updated.corrected_product}".`);
      }
    } finally {
      setIsSavingEdit(false);
    }
  };

  const filteredCorrections = corrections.filter(rec => {
    const matchesSearch = 
      rec.corrected_product.toLowerCase().includes(searchQuery.toLowerCase()) ||
      rec.original_ai_result.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (rec.notes && rec.notes.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCat = selectedCategory === 'all' || rec.corrected_category.toLowerCase() === selectedCategory.toLowerCase();
    return matchesSearch && matchesCat;
  });

  const totalMatches = corrections.reduce((acc, c) => acc + (c.times_matched || 0), 0);

  if (!isOpen || typeof document === 'undefined') return null;

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-6 bg-slate-950/85 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-slate-900 border border-purple-500/40 rounded-3xl shadow-2xl flex flex-col overflow-hidden text-left">
        
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-purple-500/20 bg-slate-950/60 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-600/30 to-indigo-600/30 border border-purple-400/40 flex items-center justify-center text-2xl shadow-inner">
              🧠
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg sm:text-xl font-extrabold text-white">
                  AI Learned Memory & Human Corrections
                </h2>
                <span className="px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 text-[10px] font-mono font-bold border border-cyan-500/30">
                  Persistent DB
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Saved human overrides are remembered instantly. Identical and visually similar uploads reuse these corrections without guessing.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={loadData}
              disabled={isLoading}
              title="Refresh Corrections Database"
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin text-purple-400' : ''}`} />
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Toast Banner */}
        {toastMessage && (
          <div className="bg-emerald-950/80 border-b border-emerald-500/40 px-6 py-2.5 text-xs text-emerald-300 flex items-center gap-2 animate-fade-in font-medium">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{toastMessage}</span>
          </div>
        )}

        {/* Stats Summary Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 sm:p-6 bg-slate-950/40 border-b border-slate-800">
          <div className="p-3 rounded-2xl bg-slate-900/90 border border-purple-500/20">
            <div className="text-[10px] text-slate-400 font-mono uppercase">Learned Rules</div>
            <div className="text-xl font-extrabold text-purple-200 mt-0.5">{corrections.length}</div>
          </div>
          <div className="p-3 rounded-2xl bg-slate-900/90 border border-emerald-500/20">
            <div className="text-[10px] text-slate-400 font-mono uppercase">Times Reused</div>
            <div className="text-xl font-extrabold text-emerald-300 mt-0.5">{totalMatches}</div>
          </div>
          <div className="p-3 rounded-2xl bg-slate-900/90 border border-sky-500/20">
            <div className="text-[10px] text-slate-400 font-mono uppercase">Exact Memory (SHA-256)</div>
            <div className="text-xl font-extrabold text-sky-300 mt-0.5">Active</div>
          </div>
          <div className="p-3 rounded-2xl bg-slate-900/90 border border-amber-500/20">
            <div className="text-[10px] text-slate-400 font-mono uppercase">Visual Near-Duplicate (pHash)</div>
            <div className="text-xl font-extrabold text-amber-300 mt-0.5">Dist &le; 6</div>
          </div>
        </div>

        {/* Search & Filter Bar */}
        <div className="p-4 sm:px-6 bg-slate-900/80 border-b border-slate-800 flex flex-col sm:flex-row gap-3 items-center justify-between">
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter corrections..."
              className="w-full bg-slate-950 border border-purple-500/30 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 outline-none focus:border-purple-400"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
            {['all', 'fruit', 'vegetable', 'dairy', 'dry fruit', 'grain', 'pulse'].map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold capitalize whitespace-nowrap transition-colors cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-purple-600 text-white shadow'
                    : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-3">
          {isLoading ? (
            <div className="py-16 text-center space-y-3">
              <RefreshCw className="w-8 h-8 mx-auto animate-spin text-purple-400" />
              <p className="text-xs text-slate-400">Loading AI learned memory records...</p>
            </div>
          ) : filteredCorrections.length === 0 ? (
            <div className="py-16 text-center space-y-3 bg-slate-950/40 rounded-2xl border border-dashed border-slate-800 p-8">
              <div className="w-12 h-12 mx-auto rounded-2xl bg-purple-500/10 text-purple-400 flex items-center justify-center text-xl">
                🌱
              </div>
              <h3 className="text-sm font-bold text-white">No Learned Corrections Found</h3>
              <p className="text-xs text-slate-400 max-w-md mx-auto">
                {searchQuery 
                  ? 'No corrections match your search query.' 
                  : 'When AI returns a misidentification, click [✎ Correct Result] to teach AgriFlow. Learned corrections will automatically appear here!'}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {filteredCorrections.map((rec) => (
                <div
                  key={rec.id}
                  className="p-4 rounded-2xl bg-slate-950/70 border border-purple-500/25 hover:border-purple-500/40 transition-all space-y-3 shadow-md"
                >
                  <div className="flex items-start gap-3">
                    {/* Thumbnail */}
                    {rec.image_thumbnail ? (
                      <img
                        src={rec.image_thumbnail}
                        alt={rec.corrected_product}
                        className="w-16 h-16 rounded-xl object-cover border border-purple-500/30 bg-slate-900 shrink-0"
                      />
                    ) : (
                      <div className="w-16 h-16 rounded-xl bg-purple-900/30 border border-purple-500/20 flex items-center justify-center text-2xl shrink-0">
                        📦
                      </div>
                    )}

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1">
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 font-bold border border-purple-500/30">
                          {rec.corrected_category}
                        </span>
                        <span className="text-[10px] font-mono text-emerald-400 flex items-center gap-1 font-bold">
                          <CheckCircle2 className="w-3 h-3" />
                          Reused {rec.times_matched || 0}x
                        </span>
                      </div>

                      <div className="text-base font-bold text-white truncate mt-1">
                        {rec.corrected_product}
                      </div>

                      <div className="text-[11px] text-rose-300/80 line-through truncate">
                        AI Detected: {rec.original_ai_result}
                      </div>
                    </div>
                  </div>

                  {/* Hash Signatures & Notes */}
                  <div className="p-2.5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-1 text-[10px] font-mono text-slate-400">
                    <div className="flex items-center justify-between">
                      <span>SHA-256:</span>
                      <span className="text-slate-300 font-semibold" title={rec.image_hash}>
                        {rec.image_hash.substring(0, 12)}...{rec.image_hash.substring(rec.image_hash.length - 6)}
                      </span>
                    </div>
                    {rec.image_phash && (
                      <div className="flex items-center justify-between">
                        <span>pHash (dHash):</span>
                        <span className="text-slate-300 font-semibold">{rec.image_phash}</span>
                      </div>
                    )}
                    {rec.notes && (
                      <div className="pt-1 text-slate-300 italic font-sans text-[11px] border-t border-slate-800">
                        "{rec.notes}"
                      </div>
                    )}
                  </div>

                  {/* Footer Action Buttons */}
                  <div className="flex items-center justify-between pt-1">
                    <span className="text-[10px] text-slate-500 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {formatDate(rec.updated_at || rec.created_at)}
                    </span>

                    <div className="flex items-center gap-1.5">
                      {onSelectCorrection && (
                        <button
                          onClick={() => {
                            onSelectCorrection(rec.corrected_product);
                            onClose();
                          }}
                          className="px-2.5 py-1 rounded-lg bg-emerald-600/30 hover:bg-emerald-600/50 border border-emerald-500/40 text-emerald-200 text-xs font-bold transition-colors cursor-pointer flex items-center gap-1"
                        >
                          <span>Select</span>
                          <ChevronRight className="w-3 h-3" />
                        </button>
                      )}

                      <button
                        onClick={() => startEdit(rec)}
                        title="Edit Correction"
                        className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>

                      <button
                        onClick={() => handleDelete(rec.id, rec.corrected_product)}
                        title="Delete Correction"
                        className="p-1.5 rounded-lg bg-rose-950/40 hover:bg-rose-900/60 text-rose-300 hover:text-rose-100 border border-rose-500/20 transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Edit Record Modal Drawer */}
        {editingRecord && (
          <div className="p-5 border-t border-purple-500/30 bg-slate-950/95 space-y-3 animate-fade-in">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
                <Edit3 className="w-3.5 h-3.5 text-purple-400" />
                Edit Correction: <span className="text-purple-300">{editingRecord.corrected_product}</span>
              </h4>
              <button
                onClick={() => setEditingRecord(null)}
                className="text-xs text-slate-400 hover:text-white"
              >
                Cancel
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="text-[10px] text-slate-400 block mb-1">Corrected Product Name</label>
                <input
                  type="text"
                  value={editProduct}
                  onChange={(e) => setEditProduct(e.target.value)}
                  className="w-full bg-slate-900 border border-purple-500/30 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-purple-400"
                />
              </div>
              <div>
                <label className="text-[10px] text-slate-400 block mb-1">Category</label>
                <select
                  value={editCategory}
                  onChange={(e) => setEditCategory(e.target.value)}
                  className="w-full bg-slate-900 border border-purple-500/30 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-purple-400"
                >
                  <option value="Fruit">Fruit</option>
                  <option value="Vegetable">Vegetable</option>
                  <option value="Dairy">Dairy</option>
                  <option value="Dry Fruit">Dry Fruit</option>
                  <option value="Grain">Grain</option>
                  <option value="Pulse">Pulse</option>
                  <option value="Spice">Spice</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div>
                <label className="text-[10px] text-slate-400 block mb-1">Notes</label>
                <input
                  type="text"
                  value={editNotes}
                  onChange={(e) => setEditNotes(e.target.value)}
                  placeholder="e.g. Kashmiri Red Apple"
                  className="w-full bg-slate-900 border border-purple-500/30 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-purple-400"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-1">
              <button
                onClick={() => setEditingRecord(null)}
                className="px-3 py-1.5 rounded-xl bg-slate-800 text-slate-300 text-xs font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveEdit}
                disabled={isSavingEdit || !editProduct.trim()}
                className="px-4 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold transition-all shadow-md flex items-center gap-1.5"
              >
                {isSavingEdit ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Check className="w-3.5 h-3.5" />}
                <span>Save Changes</span>
              </button>
            </div>
          </div>
        )}

      </div>
    </div>,
    document.body
  );
};
