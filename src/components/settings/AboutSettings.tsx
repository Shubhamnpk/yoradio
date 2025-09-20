import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Radio, Info, Calendar, Code } from 'lucide-react';
import { motion } from 'framer-motion';

export function AboutSettings() {
  const version = "0.0.0"; // This would ideally come from package.json
  const buildDate = new Date().toLocaleDateString();
  const buildNumber = "20240920.001"; // Placeholder build number

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="text-center space-y-4">
        <div className="flex justify-center">
          <div className="p-4 rounded-xl bg-primary/10">
            <Radio className="w-12 h-12 text-primary" />
          </div>
        </div>
        <div>
          <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60">
            Yo Radio
          </h2>
          <p className="text-muted-foreground mt-2">
            Your personalized online radio experience
          </p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <Info className="w-5 h-5" />
              Version Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Version</span>
              <Badge variant="secondary">{version}</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Build Number</span>
              <Badge variant="outline">{buildNumber}</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Build Date</span>
              <Badge variant="outline">{buildDate}</Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <Code className="w-5 h-5" />
              Technical Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Framework</span>
              <Badge variant="secondary">React 18</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">UI Library</span>
              <Badge variant="outline">Tailwind CSS</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Animation</span>
              <Badge variant="outline">Framer Motion</Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            What's New
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold text-sm">Latest Updates</h4>
              <ul className="text-sm text-muted-foreground mt-2 space-y-1">
                <li>• Enhanced mobile responsiveness</li>
                <li>• Improved station card layout</li>
                <li>• Added favorites management</li>
                <li>• Better audio controls</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="text-center text-xs text-muted-foreground">
        © 2024 Yo Radio. All rights reserved.
      </div>
    </motion.div>
  );
}