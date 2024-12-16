export interface RadioSource {
  id: string;
  name: string;
  url: string;
  isDefault: boolean;
  description: string;
}

export const radioSources: RadioSource[] = [
  {
    id: 'default',
    name: 'Standard Source',
    url: 'https://shubhamnpk.github.io/yoradio-api/data/',
    isDefault: true,
    description: 'Primary collection of radio stations'
  },
  {
    id: 'radio-browser',
    name: 'Radio Browser (Beta)',
    url: 'https://de1.api.radio-browser.info/json/stations/bycountry/bangladesh',
    isDefault: false,
    description: 'Extended collection from Radio Browser API'
  }
];