import { useMemo, useState } from 'react';
import { AlertTriangle, CheckCircle2, FileWarning, Search, ShieldAlert } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';

type Finding = { name: string; level: 'High' | 'Medium' | 'Low'; reasons: string[] };

const executableExtensions = new Set(['exe', 'scr', 'com', 'bat', 'cmd', 'ps1', 'vbs', 'vbe', 'js', 'jse', 'wsf', 'wsh', 'hta', 'msi', 'dll', 'jar', 'lnk', 'reg']);
const macroExtensions = new Set(['docm', 'xlsm', 'pptm', 'dotm', 'xlam']);
const archiveExtensions = new Set(['zip', 'rar', '7z', 'iso', 'img']);

function inspectFilename(raw: string): Finding {
  const name = raw.trim().replace(/^['"]|['"]$/g, '');
  const parts = name.toLowerCase().split('.');
  const extension = parts.length > 1 ? parts[parts.length - 1] : '';
  const reasons: string[] = [];
  let level: Finding['level'] = 'Low';

  if (!extension) reasons.push('No file extension is visible; the true file type is unclear.');
  if (executableExtensions.has(extension)) {
    level = 'High';
    reasons.push(`.${extension} can execute code or launch commands.`);
  }
  if (macroExtensions.has(extension)) {
    level = 'High';
    reasons.push(`.${extension} may contain Office macros.`);
  }
  if (parts.length >= 3) {
    const earlier = parts[parts.length - 2];
    if (['pdf', 'jpg', 'jpeg', 'png', 'doc', 'docx', 'xls', 'xlsx', 'txt'].includes(earlier) && (executableExtensions.has(extension) || macroExtensions.has(extension))) {
      level = 'High';
      reasons.push('Double extension may disguise an executable or macro-enabled file (for example, invoice.pdf.exe).');
    }
  }
  if (archiveExtensions.has(extension) && level !== 'High') {
    level = 'Medium';
    reasons.push(`.${extension} is an archive or disk-image format; inspect its contents without opening or running them.`);
  }
  if (['doc', 'xls', 'ppt', 'docx', 'xlsx', 'pptx'].includes(extension) && level === 'Low') {
    level = 'Medium';
    reasons.push('Office documents can contain links or active content; verify the sender and context.');
  }
  if (!reasons.length) reasons.push('No high-risk extension pattern was detected. This does not prove the file is safe.');
  return { name, level, reasons };
}

export const AttachmentRiskInspector = () => {
  const [fileNames, setFileNames] = useState('');
  const findings = useMemo(() => [...new Set(fileNames.split(/[\n,;]+/).map(v => v.trim()).filter(Boolean))].map(inspectFilename), [fileNames]);
  const high = findings.filter(item => item.level === 'High').length;
  const medium = findings.filter(item => item.level === 'Medium').length;

  return (
    <Card className="p-5 border-orange-500/25 bg-gradient-to-br from-card to-orange-500/5 space-y-4">
      <div className="flex items-center gap-3">
        <div className="rounded-xl bg-orange-500/10 p-2"><FileWarning className="h-5 w-5 text-orange-500" /></div>
        <div><h3 className="font-semibold">Attachment Risk Inspector</h3><p className="text-xs text-muted-foreground">Check attachment filenames for risky extensions and disguise patterns.</p></div>
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium" htmlFor="attachment-names">Attachment filenames</label>
        <Textarea id="attachment-names" value={fileNames} onChange={e => setFileNames(e.target.value)} placeholder={'Paste filenames, one per line\ninvoice.pdf.exe\nreport.docm\nphoto.jpg'} className="min-h-24 bg-background" />
        <div className="flex flex-wrap items-center justify-between gap-2">
          <p className="text-xs text-muted-foreground">Separate multiple names with a new line, comma, or semicolon.</p>
          <Button size="sm" variant="outline" onClick={() => setFileNames('')}>Clear</Button>
        </div>
      </div>
      {findings.length > 0 ? (
        <>
          <div className="grid grid-cols-3 gap-2">
            <div className="rounded-lg border border-border p-3"><p className="text-xs text-muted-foreground">Checked</p><p className="text-xl font-bold">{findings.length}</p></div>
            <div className="rounded-lg border border-red-500/30 p-3"><p className="text-xs text-muted-foreground">High risk</p><p className="text-xl font-bold text-red-500">{high}</p></div>
            <div className="rounded-lg border border-amber-500/30 p-3"><p className="text-xs text-muted-foreground">Review</p><p className="text-xl font-bold text-amber-500">{medium}</p></div>
          </div>
          <div className="space-y-2">
            {findings.map((item, index) => (
              <div key={`${item.name}-${index}`} className="rounded-lg border border-border bg-background/70 p-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-sm font-medium break-all">{item.name}</span>
                  <span className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-semibold ${item.level === 'High' ? 'bg-red-500/10 text-red-500' : item.level === 'Medium' ? 'bg-amber-500/10 text-amber-600' : 'bg-emerald-500/10 text-emerald-600'}`}>
                    {item.level === 'High' ? <ShieldAlert className="h-3 w-3" /> : item.level === 'Medium' ? <AlertTriangle className="h-3 w-3" /> : <CheckCircle2 className="h-3 w-3" />}{item.level} risk
                  </span>
                </div>
                <ul className="mt-2 list-disc pl-5 text-xs text-muted-foreground space-y-1">{item.reasons.map(reason => <li key={reason}>{reason}</li>)}</ul>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="rounded-lg border border-dashed border-border p-5 text-center text-sm text-muted-foreground"><Search className="mx-auto mb-2 h-5 w-5" />Enter attachment filenames to inspect them.</div>
      )}
      <div className="rounded-lg bg-muted/50 p-3 text-xs text-muted-foreground">Safety note: This is a filename-based heuristic only. It does not open, upload, scan, or execute files and cannot confirm that an attachment is safe. Do not open unexpected attachments; verify with the sender through a trusted channel.</div>
    </Card>
  );
};
