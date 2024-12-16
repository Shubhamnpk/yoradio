import { Settings } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ThemeSettings } from '@/components/settings/ThemeSettings';
import { SourceSettings } from '@/components/settings/SourceSettings';
import { motion } from 'framer-motion';

export function SettingsDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button 
          variant="ghost" 
          size="icon" 
          className="h-9 w-9 rounded-full hover:bg-primary/10"
        >
          <Settings className="h-5 w-5" />
          <span className="sr-only">Settings</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] h-[85vh] p-0">
        <DialogHeader className="p-6 pb-4">
          <DialogTitle className="text-2xl flex items-center gap-2">
            <div className="p-2 rounded-lg bg-primary/10">
              <Settings className="h-6 w-6 text-primary" />
            </div>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60">
              Settings
            </span>
          </DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="theme" className="flex-1 overflow-hidden">
          <div className="px-6">
            <TabsList className="grid w-full grid-cols-2 p-1 bg-muted/50">
              <TabsTrigger value="theme">Appearance</TabsTrigger>
              <TabsTrigger value="sources">Sources</TabsTrigger>
            </TabsList>
          </div>

          <ScrollArea className="flex-1 p-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <TabsContent value="theme" className="mt-0">
                <ThemeSettings />
              </TabsContent>
              <TabsContent value="sources" className="mt-0">
                <SourceSettings />
              </TabsContent>
            </motion.div>
          </ScrollArea>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}