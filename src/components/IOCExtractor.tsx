import { useMemo } from 'react';
import { Copy, Download, Fingerprint, Globe, Mail, Network, Link2, Hash } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { toast } from 'sonner';

type IOCGroup = { label: string; kind: string; values: string[]; icon: typeof Link2 };

export const IOCExtractor = ({ text }: { text: string }) => {
  const groups = useMemo<IOCGroup[]>(() => {
    const unique = (items: string[]) => [...new Set(items)];
    const urls = unique(text.match(/https?:\/\/[^\s<>"'`]+/gi) || []);
    const emails = unique(text.match(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/gi) || []);
    const ips = unique(text.match(/\b(?:\d{1,3}\.){3}\d{1,3}\b/g) || []).filter(ip => ip.split('.').every(n => Number(n) <= 255));
    const hashes = unique(text.match(/\b(?:[a-f0-9]{32}|[a-f0-9]{40}|[a-f0-9]{64})\b/gi) || []);
    const domains = unique((text.match(/\b(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z]{2,}\b/gi) || []).map(v => v.toLowerCase()))
      .filter(domain => !emails.some(email => email.toLowerCase().endsWith(`@${domain}`)));
    return [
      { label: 'URLs', kind: 'URL', values: urls, icon: Link2 },
      { label: 'Domains', kind: 'Domain', values: domains, icon: Globe },
      { label: 'Email addresses', kind: 'Email', values: emails, icon: Mail },
      { label: 'IP addresses', kind: 'IP', values: ips, icon: Network },
      { label: 'File hashes', kind: 'Hash', values: hashes, icon: Hash },
    ];
  }, [text]);

  const all = groups.flatMap(group => group.values.map(value => ({ type: group.kind, value })));
  const copyAll = async () => {
    if (!all.length) return toast.info('No indicators found yet.');
    try { await navigator.clipboard.writeText(all.map(item => `${item.type}: ${item.value}`).join('\n')); toast.success('Indicators copied.'); }
    catch { toast.error('Clipboard access blocked by your browser.'); }
  };
  const exportCSV = () => {
    if (!all.length) return toast.info('No indicators to export.');
    const csv = ['Type,Value', ...all.map(item => `"${item.type}","${item.value.replace(/"/g, '""')}"`)].join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a'); anchor.href = url; anchor.download = 'email-indicators.csv'; anchor.click(); URL.revokeObjectURL(url);
    toast.success('IOC list exported as CSV.');
  };

  return (
    <Card className="p-5 border-primary/25 bg-gradient-to-br from-card to-primary/5 space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2"><Fingerprint className="h-5 w-5 text-primary" /><div><h3 className="font-semibold">Indicator of Compromise (IOC) Extractor</h3><p className="text-xs text-muted-foreground">Extracts observable indicators from the pasted text locally.</p></div></div>
        <div className="flex gap-2"><Button size="sm" variant="outline" onClick={copyAll} className="gap-2"><Copy className="h-4 w-4"/>Copy all</Button><Button size="sm" onClick={exportCSV} className="gap-2"><Download className="h-4 w-4"/>Export CSV</Button></div>
      </div>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {groups.map(group => {
          const Icon = group.icon;
          return <div key={group.kind} className="rounded-lg border border-border/70 bg-background/70 p-3 min-w-0">
            <div className="flex items-center justify-between gap-2 mb-2"><span className="flex items-center gap-2 text-sm font-medium"><Icon className="h-4 w-4 text-primary"/>{group.label}</span><span className="text-xs rounded-full bg-primary/10 text-primary px-2 py-0.5">{group.values.length}</span></div>
            {group.values.length ? <ul className="space-y-1 max-h-28 overflow-auto text-xs text-muted-foreground break-all">{group.values.map(value => <li key={value}>{value}</li>)}</ul> : <p className="text-xs text-muted-foreground">No indicators found</p>}
          </div>;
        })}
      </div>
      <p className="text-xs text-muted-foreground">This is pattern-based extraction, not reputation or malware verification. Treat every result as untrusted until independently checked.</p>
    </Card>
  );
};
