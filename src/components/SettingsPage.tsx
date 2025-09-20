import { Link } from 'react-router-dom';
import { ArrowLeft, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ThemeSettings } from '@/components/settings/ThemeSettings';
import { SourceSettings } from '@/components/settings/SourceSettings';
import { AboutSettings } from '@/components/settings/AboutSettings';
import { motion } from 'framer-motion';

export function SettingsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted">
      <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur-lg">
        <div className="container mx-auto px-4 py-4">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-4"
          >
            <Link to="/">
              <Button
                variant="ghost"
                size="icon"
                className="h-9 w-9 rounded-full hover:bg-primary/10"
              >
                <ArrowLeft className="h-5 w-5" />
                <span className="sr-only">Back to Home</span>
              </Button>
            </Link>
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <Settings className="w-6 h-6 text-primary" />
              </div>
              <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60">
                Settings
              </h1>
            </div>
          </motion.div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto"
        >
          <Tabs defaultValue="theme" className="flex-1 overflow-hidden">
            <div className="mb-6">
              <TabsList className="grid w-full grid-cols-3 p-1 bg-muted/50">
                <TabsTrigger value="theme">Appearance</TabsTrigger>
                <TabsTrigger value="sources">Sources</TabsTrigger>
                <TabsTrigger value="about">About</TabsTrigger>
              </TabsList>
            </div>

            <ScrollArea className="h-[calc(100vh-200px)]">
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
                <TabsContent value="about" className="mt-0">
                  <AboutSettings />
                </TabsContent>
              </motion.div>
            </ScrollArea>
          </Tabs>
        </motion.div>
      </main>
    </div>
  );
}