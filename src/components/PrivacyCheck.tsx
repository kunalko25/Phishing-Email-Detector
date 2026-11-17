import { useMemo, useState } from 'react';
import { EyeOff, ShieldCheck, Download, Copy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { toast } from 'sonner';

export const PrivacyCheck = ({ text }: { text: string }) => {
  const [showPreview, setShowPreview] = useState(false);
  const findings = useMemo(() => [
    { label: 'Email addresses', regex: /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/gi },
    { label: 'Phone-like numbers', regex: /\b(?:\+?\d[\d\s().-]{7,}\d)\b/g },
    { label: 'Possible payment-card numbers', regex: /\b(?:\d[ -]*?){13,19}\b/g },
  ].map(item => ({ label: item.label, count: [...(text.matchAll(item.regex))].length })), [text]);

  const redacted = text
    .replace(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/gi, '[REDACTED EMAIL]')
    .replace(/\b(?:\+?\d[\d\s().-]{7,}\d)\b/g, '[REDACTED NUMBER]')
    .replace(/\b(?:\d[ -]*?){13,19}\b/g, '[REDACTED CARD-LIKE NUMBER]');

  const saveRedacted = () => {
    const blob = new Blob([redacted], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob); const a = document.createElement('a');
    a.href = url; a.download = 'email-redacted.txt'; a.click(); URL.revokeObjectURL(url);
    toast.success('Redacted copy downloaded. Original input was not changed.');
  };
  const copyRedacted = async () => {
    try { await navigator.clipboard.writeText(redacted); toast.success('Redacted copy copied.'); }
    catch { toast.error('Clipboard access blocked by your browser.'); }
  };
  const total = findings.reduce((sum, item) => sum + item.count, 0);

  return <Card className="p-5 border-emerald-500/25 bg-gradient-to-br from-card to-emerald-500/5 space-y-4">
    <div className="flex flex-wrap items-center justify-between gap-3">
      <div className="flex items-center gap-2"><ShieldCheck className="h-5 w-5 text-emerald-500"/><div><h3 className="font-semibold">Privacy & Sensitive Data Check</h3><p className="text-xs text-muted-foreground">Finds common personal-data patterns before sharing an email.</p></div></div>
      <Button size="sm" variant="outline" onClick={() => setShowPreview(!showPreview)} className="gap-2"><EyeOff className="h-4 w-4"/>{showPreview ? 'Hide' : 'Preview'} redaction</Button>
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">{findings.map(item => <div key={item.label} className="rounded-lg bg-background/70 border p-3"><p className="text-xs text-muted-foreground">{item.label}</p><p className="text-xl font-semibold tabular-nums">{item.count}</p></div>)}</div>
    <p className="text-xs text-muted-foreground">{total ? `${total} possible sensitive-data pattern(s) found.` : 'No common sensitive-data patterns found.'} Pattern matching can produce false positives and does not guarantee complete privacy protection.</p>
    {showPreview && <div className="space-y-2"><pre className="max-h-40 overflow-auto whitespace-pre-wrap break-words rounded-lg border bg-background p-3 text-xs">{redacted || 'Paste email content to preview redaction.'}</pre><div className="flex flex-wrap gap-2"><Button size="sm" onClick={copyRedacted} className="gap-2"><Copy className="h-4 w-4"/>Copy redacted</Button><Button size="sm" variant="outline" onClick={saveRedacted} className="gap-2"><Download className="h-4 w-4"/>Download redacted</Button></div></div>}
  </Card>;
};
