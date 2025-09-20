import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Moon, Sun, Laptop, Palette, MapPin, User, Radio, ChevronLeft, ChevronRight } from 'lucide-react';
import { useTheme, themes, type Theme } from '@/hooks/useTheme';
import { useSourceSettings } from '@/hooks/useSourceSettings';
import { radioSources } from '@/config/sources';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

// Common countries list
const countries = [
  'United States', 'United Kingdom', 'Canada', 'Australia', 'Germany', 'France', 'Italy', 'Spain', 'Netherlands', 'Sweden',
  'Norway', 'Denmark', 'Finland', 'Japan', 'South Korea', 'Brazil', 'Mexico', 'Argentina', 'India', 'China',
  'Russia', 'Poland', 'Czech Republic', 'Austria', 'Switzerland', 'Belgium', 'Portugal', 'Ireland', 'New Zealand', 'South Africa'
];

interface OnboardingModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function OnboardingModal({ open, onOpenChange }: OnboardingModalProps) {
  const { setTheme } = useTheme();
  const { enabledSources, toggleSource, setSelectedCountry: setSourceCountry } = useSourceSettings();
  const [username, setUsername] = useState<string>('');
  const [selectedCountry, setSelectedCountry] = useState<string>('');
  const [selectedTheme, setSelectedTheme] = useState<Theme>('theme-dark-blue');
  const [selectedSources, setSelectedSources] = useState<string[]>(enabledSources);
  const [currentStep, setCurrentStep] = useState<number>(1);

  const totalSteps = 4;

  useEffect(() => {
    if (open) {
      // Reset to first step and load saved preferences if any
      setCurrentStep(1);
      const savedUsername = localStorage.getItem('username');
      const savedCountry = localStorage.getItem('preferredCountry');
      const savedTheme = localStorage.getItem('theme') as Theme;
      if (savedUsername) setUsername(savedUsername);
      if (savedCountry) setSelectedCountry(savedCountry);
      if (savedTheme) setSelectedTheme(savedTheme);
      setSelectedSources(enabledSources);
    }
  }, [open, enabledSources]);

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleContinue = () => {
    // Save preferences
    if (username) localStorage.setItem('username', username);
    localStorage.setItem('preferredCountry', selectedCountry);
    setTheme(selectedTheme);
    setSourceCountry(selectedCountry);

    // Update enabled sources
    selectedSources.forEach(sourceId => {
      if (!enabledSources.includes(sourceId)) {
        toggleSource(sourceId);
      }
    });
    enabledSources.forEach(sourceId => {
      if (!selectedSources.includes(sourceId)) {
        toggleSource(sourceId);
      }
    });

    localStorage.setItem('onboardingCompleted', 'true');
    onOpenChange(false);
  };

  const handleSkip = () => {
    localStorage.setItem('onboardingCompleted', 'true');
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] p-0 overflow-hidden">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="relative"
        >
          {/* Header with gradient background */}
          <div className="bg-gradient-to-r from-primary/20 to-primary/10 p-6 pb-4">
            <DialogHeader className="text-center">
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="flex justify-center mb-4"
              >
                <div className="p-3 rounded-full bg-primary/20">
                  <Palette className="w-8 h-8 text-primary" />
                </div>
              </motion.div>
              <DialogTitle className="text-2xl font-bold">Welcome to Yo Radio!</DialogTitle>
              <DialogDescription className="text-muted-foreground">
                Let's personalize your radio experience. Choose your preferences below.
              </DialogDescription>
            </DialogHeader>

            {/* Step Indicators */}
            <div className="flex justify-center mt-4">
              <div className="flex space-x-2">
                {Array.from({ length: totalSteps }, (_, i) => (
                  <div
                    key={i + 1}
                    className={cn(
                      'w-2 h-2 rounded-full transition-colors',
                      currentStep === i + 1 ? 'bg-primary' : 'bg-muted-foreground/30'
                    )}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 space-y-6">
            {/* Step 1: Username */}
            {currentStep === 1 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="space-y-3"
              >
                <div className="flex items-center gap-2">
                  <User className="w-5 h-5 text-primary" />
                  <Label className="text-lg font-semibold">Username</Label>
                </div>
                <p className="text-sm text-muted-foreground">
                  Enter your preferred username (optional)
                </p>
                <Input
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter your username"
                  className="w-full"
                />
              </motion.div>
            )}

            {/* Step 2: Country Selection */}
            {currentStep === 2 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="space-y-3"
              >
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-primary" />
                  <Label className="text-lg font-semibold">Preferred Country</Label>
                </div>
                <p className="text-sm text-muted-foreground">
                  Select your country to see local radio stations first
                </p>
                <Select value={selectedCountry} onValueChange={setSelectedCountry}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose your country" />
                  </SelectTrigger>
                  <SelectContent>
                    {countries.map((country) => (
                      <SelectItem key={country} value={country}>
                        {country}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </motion.div>
            )}

            {/* Step 3: Advanced Source Options */}
            {currentStep === 3 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="space-y-3"
              >
                <div className="flex items-center gap-2">
                  <Radio className="w-5 h-5 text-primary" />
                  <Label className="text-lg font-semibold">Radio Sources</Label>
                </div>
                <p className="text-sm text-muted-foreground">
                  Choose which radio sources to enable
                </p>
                <div className="space-y-3">
                  {radioSources.map((source, index) => (
                    <motion.div
                      key={source.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + index * 0.1 }}
                      className="flex items-center space-x-3"
                    >
                      <Checkbox
                        id={source.id}
                        checked={selectedSources.includes(source.id)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setSelectedSources([...selectedSources, source.id]);
                          } else {
                            setSelectedSources(selectedSources.filter(id => id !== source.id));
                          }
                        }}
                      />
                      <div className="grid gap-1.5 leading-none">
                        <Label
                          htmlFor={source.id}
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          {source.name}
                        </Label>
                        <p className="text-xs text-muted-foreground">
                          {source.description}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Step 4: Theme Selection */}
            {currentStep === 4 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="space-y-3"
              >
                <div className="flex items-center gap-2">
                  <Palette className="w-5 h-5 text-primary" />
                  <Label className="text-lg font-semibold">Theme Preference</Label>
                </div>
                <p className="text-sm text-muted-foreground">
                  Choose your preferred color scheme
                </p>
                <div className="grid grid-cols-2 gap-3">
                  {themes.slice(0, 4).map(({ value, label, isDark }, index) => {
                    const Icon = isDark ? Moon : value === 'system' ? Laptop : Sun;

                    return (
                      <motion.button
                        key={value}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3 + index * 0.1 }}
                        className={cn(
                          'flex flex-col items-center gap-2 p-3 rounded-lg border transition-all duration-200',
                          'hover:shadow-md',
                          selectedTheme === value
                            ? 'border-primary bg-primary/10 shadow-md'
                            : 'border-border/50 hover:border-primary/50 hover:bg-accent/50'
                        )}
                        onClick={() => {
                          setSelectedTheme(value);
                          setTheme(value); // Apply theme immediately
                        }}
                      >
                        <div className={cn(
                          'w-8 h-8 rounded-full flex items-center justify-center transition-colors',
                          selectedTheme === value ? 'bg-primary text-primary-foreground' : 'bg-muted'
                        )}>
                          <Icon className="w-4 h-4" />
                        </div>
                        <span className="text-xs font-medium">{label}</span>
                      </motion.button>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </div>

          {/* Footer */}
          <div className="flex gap-3 p-6 pt-0">
            <Button variant="outline" onClick={handleSkip} className="flex-1">
              Skip All
            </Button>
            <div className="flex gap-2 flex-1">
              {currentStep > 1 && (
                <Button variant="outline" onClick={handlePrevious} className="flex-1">
                  <ChevronLeft className="w-4 h-4 mr-1" />
                  Previous
                </Button>
              )}
              {currentStep < totalSteps ? (
                <Button onClick={handleNext} className={currentStep > 1 ? "flex-1" : "flex-1"}>
                  Next
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              ) : (
                <Button onClick={handleContinue} className={currentStep > 1 ? "flex-1" : "flex-1"}>
                  Finish
                </Button>
              )}
            </div>
          </div>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
}