
import CurrencyConverter from '../components/CurrencyConverter';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-white mb-2">Currency Converter</h1>
        <p className="text-white/80">Convert between major world currencies instantly</p>
      </div>
      <CurrencyConverter />
    </div>
  );
};

export default Index;
