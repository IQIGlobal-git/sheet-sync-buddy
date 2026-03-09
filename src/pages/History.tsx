import { Link } from 'react-router-dom';
import { Clock, ArrowRight, CheckCircle2, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import AppLayout from '@/components/layout/AppLayout';
import { getSyncHistory } from '@/services/syncHistory';

export default function HistoryPage() {
  const history = getSyncHistory();

  return (
    <AppLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">Sync History</h1>
          <p className="text-muted-foreground mt-1">View all past sync runs.</p>
        </div>

        {history.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <Clock className="h-10 w-10 text-muted-foreground mb-3" />
            <p className="text-sm text-muted-foreground">No sync history yet.</p>
          </div>
        ) : (
          <div className="bg-card rounded-xl border border-border divide-y divide-border">
            {history.map((entry) => (
              <Link
                key={entry.id}
                to={`/history/${entry.id}`}
                className="flex items-center gap-4 px-5 py-4 hover:bg-accent/30 transition-colors group"
              >
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">
                    {entry.primarySheetName} → {entry.destinationTabName}
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {entry.sourceType === 'csv' ? 'CSV' : 'Google Sheet'} · {new Date(entry.completedAt).toLocaleString()}
                  </p>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <span className="text-xs text-muted-foreground hidden sm:inline">
                    +{entry.newLeadsAdded} · ↻{entry.rowsUpdated} · ⊘{entry.rowsSkipped}
                  </span>
                  <Badge variant={entry.status === 'completed' ? 'default' : 'destructive'} className="text-xs">
                    {entry.status === 'completed' ? <CheckCircle2 className="h-3 w-3 mr-1" /> : <XCircle className="h-3 w-3 mr-1" />}
                    {entry.status}
                  </Badge>
                  <ArrowRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </AppLayout>
  );
}
