import React from 'react';
import { ProductIntelligence } from '../../types/product';
import { HeartPulse, Utensils, Zap, Flame, ShieldAlert, Sparkles, ChefHat } from 'lucide-react';

interface ProductConsumptionSectionProps {
  product: ProductIntelligence;
}

export const ProductConsumptionSection: React.FC<ProductConsumptionSectionProps> = ({ product }) => {
  const { consumption } = product;
  const { nutritionalProfile } = consumption;

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-purple-500/20">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-rose-500/20 border border-rose-500/30 flex items-center justify-center text-rose-400">
            <HeartPulse className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
              <span>Nutritional Profile & Culinary Intelligence</span>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-rose-500/20 text-rose-300 font-mono">
                {product.name}
              </span>
            </h3>
            <p className="text-xs text-slate-400">
              Biochemical health profile, optimal bio-availability preparation, and recipes
            </p>
          </div>
        </div>

        {/* Antioxidant Index */}
        <div className="bg-slate-900/90 border border-purple-500/30 rounded-xl px-4 py-2 flex items-center gap-3">
          <div>
            <div className="text-[10px] text-slate-400 uppercase font-mono">Antioxidant Score</div>
            <div className="text-sm font-bold text-rose-400 font-mono">
              {nutritionalProfile.antioxidantIndex} / 100 Index
            </div>
          </div>
          <div className="w-10 bg-slate-800 h-2 rounded-full overflow-hidden">
            <div 
              className="h-full bg-rose-500 rounded-full"
              style={{ width: `${nutritionalProfile.antioxidantIndex}%` }}
            />
          </div>
        </div>
      </div>

      {/* 8-Metric Nutrition Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
        
        <div className="glass-panel p-3 rounded-2xl border border-purple-500/20 bg-slate-900/80 text-center space-y-1">
          <div className="text-[10px] text-slate-400 uppercase font-mono">Energy</div>
          <div className="text-lg font-bold text-amber-300 font-mono">{nutritionalProfile.calories}</div>
          <div className="text-[10px] text-slate-500">kcal/100g</div>
        </div>

        <div className="glass-panel p-3 rounded-2xl border border-purple-500/20 bg-slate-900/80 text-center space-y-1">
          <div className="text-[10px] text-slate-400 uppercase font-mono">Protein</div>
          <div className="text-lg font-bold text-emerald-400 font-mono">{nutritionalProfile.protein_g}g</div>
          <div className="text-[10px] text-slate-500">per 100g</div>
        </div>

        <div className="glass-panel p-3 rounded-2xl border border-purple-500/20 bg-slate-900/80 text-center space-y-1">
          <div className="text-[10px] text-slate-400 uppercase font-mono">Carbs</div>
          <div className="text-lg font-bold text-sky-400 font-mono">{nutritionalProfile.carbs_g}g</div>
          <div className="text-[10px] text-slate-500">per 100g</div>
        </div>

        <div className="glass-panel p-3 rounded-2xl border border-purple-500/20 bg-slate-900/80 text-center space-y-1">
          <div className="text-[10px] text-slate-400 uppercase font-mono">Dietary Fiber</div>
          <div className="text-lg font-bold text-purple-300 font-mono">{nutritionalProfile.dietaryFiber_g}g</div>
          <div className="text-[10px] text-slate-500">per 100g</div>
        </div>

        <div className="glass-panel p-3 rounded-2xl border border-purple-500/20 bg-slate-900/80 text-center space-y-1">
          <div className="text-[10px] text-slate-400 uppercase font-mono">Vitamin C</div>
          <div className="text-lg font-bold text-rose-400 font-mono">{nutritionalProfile.vitaminC_mg}mg</div>
          <div className="text-[10px] text-slate-500">per 100g</div>
        </div>

        <div className="glass-panel p-3 rounded-2xl border border-purple-500/20 bg-slate-900/80 text-center space-y-1">
          <div className="text-[10px] text-slate-400 uppercase font-mono">Potassium</div>
          <div className="text-lg font-bold text-indigo-300 font-mono">{nutritionalProfile.potassium_mg}mg</div>
          <div className="text-[10px] text-slate-500">per 100g</div>
        </div>

        <div className="glass-panel p-3 rounded-2xl border border-purple-500/20 bg-slate-900/80 text-center space-y-1">
          <div className="text-[10px] text-slate-400 uppercase font-mono">Iron</div>
          <div className="text-lg font-bold text-orange-400 font-mono">{nutritionalProfile.iron_mg}mg</div>
          <div className="text-[10px] text-slate-500">per 100g</div>
        </div>

        <div className="glass-panel p-3 rounded-2xl border border-purple-500/20 bg-slate-900/80 text-center space-y-1">
          <div className="text-[10px] text-slate-400 uppercase font-mono">Glycemic Index</div>
          <div className="text-lg font-bold text-teal-400 font-mono">{nutritionalProfile.glycemicIndex}</div>
          <div className="text-[10px] text-slate-500">Low / Medium</div>
        </div>

      </div>

      {/* Highlights & Bioavailability Tip */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        
        {/* Health Highlights */}
        <div className="glass-panel p-5 rounded-2xl border border-purple-500/30 bg-slate-900/90 space-y-3">
          <h4 className="text-xs font-bold text-purple-300 uppercase tracking-wider flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-yellow-400" />
            <span>Key Biochemical & Health Highlights</span>
          </h4>

          <ul className="space-y-2">
            {nutritionalProfile.highlights.map((h, i) => (
              <li key={i} className="text-xs text-slate-200 flex items-start gap-2">
                <span className="text-purple-400 font-bold">★</span>
                <span>{h}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Bioavailability Secret */}
        <div className="glass-panel p-5 rounded-2xl border border-emerald-500/30 bg-emerald-950/30 space-y-2.5">
          <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-2">
            <Zap className="w-4 h-4" />
            <span>Bioavailability Maximizer Tip</span>
          </h4>
          <p className="text-xs text-slate-200 leading-relaxed">
            {consumption.bioavailabilityTip}
          </p>
          <div className="text-[11px] text-emerald-300 font-medium pt-1">
            <strong>Recommended Serving: </strong>{consumption.servingGuidance}
          </div>
        </div>

      </div>

      {/* Culinary Consumption Methods & Nutrient Preservation */}
      <div className="glass-panel p-6 rounded-3xl border border-purple-500/30 bg-slate-900/90 space-y-4">
        <h4 className="text-sm font-bold text-amber-300 uppercase tracking-wider flex items-center gap-2">
          <Utensils className="w-4 h-4" />
          <span>Culinary Preparation & Nutrient Preservation</span>
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-2">
            <div className="text-xs font-bold text-white">Popular Culinary Methods:</div>
            <div className="flex flex-wrap gap-2">
              {consumption.consumptionMethods.map((m, i) => (
                <span key={i} className="px-2.5 py-1 rounded-lg bg-purple-500/10 text-purple-300 text-xs border border-purple-500/20">
                  {m}
                </span>
              ))}
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-2">
            <div className="text-xs font-bold text-white">Nutrient Preservation Directives:</div>
            <ul className="space-y-1.5">
              {consumption.nutrientPreservationTips.map((tip, i) => (
                <li key={i} className="text-xs text-slate-300 flex items-start gap-1.5">
                  <span className="text-amber-400">•</span>
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Chef Recipes */}
      {consumption.recipes && consumption.recipes.length > 0 && (
        <div className="glass-panel p-6 rounded-3xl border border-purple-500/30 bg-slate-900/90 space-y-4">
          <h4 className="text-sm font-bold text-rose-300 uppercase tracking-wider flex items-center gap-2">
            <ChefHat className="w-4 h-4" />
            <span>Nutrient-Dense Recipe for {product.name}</span>
          </h4>

          {consumption.recipes.map((recipe, idx) => (
            <div key={idx} className="p-5 rounded-2xl bg-slate-950/80 border border-purple-500/20 space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <h5 className="text-sm font-bold text-white flex items-center gap-2">
                  <span>🍽️ {recipe.title}</span>
                </h5>
                <div className="flex items-center gap-2 text-xs font-mono">
                  <span className="px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 font-bold">
                    ⏱️ {recipe.prepTime}
                  </span>
                  <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300">
                    {recipe.healthBenefit}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                <div className="space-y-1.5">
                  <div className="text-xs font-bold text-slate-300">Ingredients:</div>
                  <div className="flex flex-wrap gap-1.5">
                    {recipe.ingredients.map((ing, i) => (
                      <span key={i} className="px-2 py-0.5 rounded bg-slate-900 text-slate-300 text-xs border border-slate-800">
                        {ing}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="space-y-1.5">
                  <div className="text-xs font-bold text-slate-300">Preparation Steps:</div>
                  <ol className="space-y-1">
                    {recipe.steps.map((st, i) => (
                      <li key={i} className="text-xs text-slate-300 flex items-start gap-2">
                        <span className="text-purple-400 font-bold font-mono">{i + 1}.</span>
                        <span>{st}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
};
