import { useState } from 'react';
import { Copy, Trash2, ArrowRightLeft } from 'lucide-react';

export default function App() {
  const [amount, setAmount] = useState<string>('');
  const [direction, setDirection] = useState<'oldToNew' | 'newToOld'>('oldToNew');
  const [copied, setCopied] = useState(false);

  const handleSwap = () => {
    setDirection(prev => prev === 'oldToNew' ? 'newToOld' : 'oldToNew');
    setCopied(false);
  };

  const handleClear = () => {
    setAmount('');
    setCopied(false);
  };

  const getResult = () => {
    if (!amount) return '—';
    const num = parseFloat(amount.replace(/,/g, ''));
    if (isNaN(num)) return '—';

    let res = 0;
    if (direction === 'oldToNew') {
      res = num / 100;
    } else {
      res = num * 100;
    }

    // Format with thousands separator
    return res.toLocaleString('en-US');
  };

  const handleCopy = () => {
    const res = getResult();
    if (res !== '—') {
      navigator.clipboard.writeText(res.replace(/,/g, ''));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    // Allow only numbers and one decimal point
    if (/^\d*\.?\d*$/.test(val)) {
      setAmount(val);
      setCopied(false);
    }
  };

  const isOldToNew = direction === 'oldToNew';

  return (
    <div className="w-full max-w-md mx-auto p-6">
      {/* Main Card */}
      <div className="bg-black/40 backdrop-blur-xl border border-gold-400/30 rounded-3xl shadow-2xl overflow-hidden p-6 md:p-8 space-y-8">

        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-2xl md:text-3xl font-bold text-gold-100 drop-shadow-md">
            محول العملة السورية
          </h1>
          <p className="text-gold-200 text-sm md:text-base opacity-80">
            أداة سريعة للتحويل بين العملة القديمة والجديدة
          </p>
        </div>

        {/* Direction Toggle (Tabs) */}
        <div className="bg-black/60 p-1 rounded-xl flex relative border border-gold-500/20">
          <div
            className={`absolute top-1 bottom-1 w-[calc(50%-4px)] bg-gradient-to-br from-gold-400 to-gold-600 rounded-lg shadow-lg transition-all duration-300 ease-out ${isOldToNew ? 'right-1' : 'right-[calc(50%+4px)]'}`}
          />
          <button
            onClick={() => setDirection('oldToNew')}
            className={`flex-1 relative z-10 py-2.5 text-sm md:text-base font-medium transition-colors duration-200 ${isOldToNew ? 'text-black font-bold' : 'text-gold-100/70 hover:text-gold-100'}`}
          >
            من قديمة لجديدة
          </button>
          <button
            onClick={() => setDirection('newToOld')}
            className={`flex-1 relative z-10 py-2.5 text-sm md:text-base font-medium transition-colors duration-200 ${!isOldToNew ? 'text-black font-bold' : 'text-gold-100/70 hover:text-gold-100'}`}
          >
            من جديدة لقديمة
          </button>
        </div>

        {/* Conversion Area */}
        <div className="space-y-6 relative">

          {/* Swap Button (Absolute centered) */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
            <button
              onClick={handleSwap}
              className="bg-gold-500 hover:bg-gold-400 text-black p-2 rounded-full shadow-lg border-4 border-black/50 transition-all active:scale-95"
              title="تبديل"
            >
              <ArrowRightLeft className={`w-5 h-5 transition-transform duration-300 ${isOldToNew ? 'rotate-0' : 'rotate-180'}`} />
            </button>
          </div>

          {/* From Section */}
          <div className="space-y-2">
            <label className="text-gold-200 text-sm font-medium block pr-1">
              {isOldToNew ? 'المبلغ (عملة قديمة)' : 'المبلغ (عملة جديدة)'}
            </label>
            <div className="relative group">
              <input
                type="text"
                inputMode="decimal"
                value={amount}
                onChange={handleAmountChange}
                placeholder="0"
                className="w-full bg-white text-gray-900 border-2 border-transparent focus:border-gold-500 rounded-2xl px-4 py-4 text-3xl font-bold placeholder-gray-300 outline-none font-sans transition-all shadow-inner"
              />
              {amount && (
                <button
                  onClick={handleClear}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-red-500 p-1 opacity-0 group-focus-within:opacity-100 transition-opacity"
                  title="مسح"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              )}
            </div>
          </div>

          {/* To Section */}
          <div className="space-y-2">
            <label className="text-gold-200 text-sm font-medium block pr-1">
              {isOldToNew ? 'النتيجة (عملة جديدة)' : 'النتيجة (عملة قديمة)'}
            </label>
            <div className="flex items-center justify-between bg-white rounded-2xl px-4 py-4 shadow-inner">
              <div className="text-3xl font-bold text-gray-900 font-sans break-all">
                {getResult()}
              </div>
              <button
                onClick={handleCopy}
                disabled={!amount}
                className={`ml-2 p-2 rounded-lg transition-colors ${copied ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-500 hover:bg-gray-200 hover:text-gray-800 disabled:opacity-50 disabled:cursor-not-allowed'}`}
                title="نسخ"
              >
                <Copy className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Rule Display */}
        <div className="text-center">
          <div className="inline-block bg-black/40 px-4 py-1.5 rounded-full text-xs md:text-sm text-gold-300 border border-gold-500/20">
            ١ عملة جديدة = ١٠٠ عملة قديمة
          </div>
        </div>

      </div>

      {/* Footer / Copyright */}
      <footer className="mt-8 text-center text-gold-100/40 text-xs">
        &copy; {new Date().getFullYear()} جميع الحقوق محفوظة
      </footer>
    </div>
  );
}
