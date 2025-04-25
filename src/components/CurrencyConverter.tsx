
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowUpDown } from "lucide-react";
import { DollarSign, Euro, PoundSterling, JapaneseYen, SwissFranc, IndianRupee } from "lucide-react";

const currencies = [
  { code: 'USD', name: 'US Dollar', icon: DollarSign, rate: 1 },
  { code: 'EUR', name: 'Euro', icon: Euro, rate: 0.92 },
  { code: 'GBP', name: 'British Pound', icon: PoundSterling, rate: 0.79 },
  { code: 'JPY', name: 'Japanese Yen', icon: JapaneseYen, rate: 151.67 },
  { code: 'CHF', name: 'Swiss Franc', icon: SwissFranc, rate: 0.90 },
  { code: 'INR', name: 'Indian Rupee', icon: IndianRupee, rate: 83.12 },
];

const CurrencyConverter = () => {
  const [amount, setAmount] = useState<string>('1');
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EUR');
  const [convertedAmount, setConvertedAmount] = useState<number>(0);

  useEffect(() => {
    convertCurrency();
  }, [amount, fromCurrency, toCurrency]);

  const convertCurrency = () => {
    const fromRate = currencies.find(c => c.code === fromCurrency)?.rate || 1;
    const toRate = currencies.find(c => c.code === toCurrency)?.rate || 1;
    const result = (parseFloat(amount) || 0) * (toRate / fromRate);
    setConvertedAmount(result);
  };

  const swapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  const CurrencyIcon = ({ code }: { code: string }) => {
    const currency = currencies.find(c => c.code === code);
    const Icon = currency?.icon || DollarSign;
    return <Icon className="h-4 w-4" />;
  };

  return (
    <div className="w-full max-w-md mx-auto p-6 space-y-6">
      <div className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Amount</label>
          <Input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount"
            className="text-lg"
          />
        </div>

        <div className="grid grid-cols-[1fr,auto,1fr] gap-4 items-center">
          <Select value={fromCurrency} onValueChange={setFromCurrency}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="From" />
            </SelectTrigger>
            <SelectContent>
              {currencies.map((currency) => (
                <SelectItem key={currency.code} value={currency.code}>
                  <div className="flex items-center gap-2">
                    <CurrencyIcon code={currency.code} />
                    {currency.code} - {currency.name}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Button
            variant="outline"
            size="icon"
            onClick={swapCurrencies}
            className="rounded-full hover:bg-primary hover:text-primary-foreground transition-colors"
          >
            <ArrowUpDown className="h-4 w-4" />
          </Button>

          <Select value={toCurrency} onValueChange={setToCurrency}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="To" />
            </SelectTrigger>
            <SelectContent>
              {currencies.map((currency) => (
                <SelectItem key={currency.code} value={currency.code}>
                  <div className="flex items-center gap-2">
                    <CurrencyIcon code={currency.code} />
                    {currency.code} - {currency.name}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="p-4 bg-white/10 backdrop-blur-sm rounded-lg space-y-2">
          <div className="text-sm text-muted-foreground">Converted Amount</div>
          <div className="text-2xl font-bold flex items-center gap-2">
            <CurrencyIcon code={toCurrency} />
            {convertedAmount.toFixed(2)} {toCurrency}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrencyConverter;
