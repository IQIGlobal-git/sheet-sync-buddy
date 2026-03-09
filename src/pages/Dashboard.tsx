import { Link } from 'react-router-dom';
import { GitCompare, Plus, Clock, CheckCircle2, XCircle, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useGoogleAuth } from '@/features/auth/GoogleAuthContext';
import { getSyncHistory, type SyncHistoryEntry } from '@/services/syncHistory';
import AppLayout from '@/components/layout/AppLayout';

function StatusBadge({ status }: { status: string }) {
  if (status === 'completed') {
    return <Badge className="bg-success/15 text-success border-success/25 hover:bg-success/20"><CheckCircle2 className="h-3 w-3 mr-1" />Completed</Badge>;
  }
  if (status === 'failed') {
    return <Badge variant="destructive" className="bg-destructive/15 text-destructive border-destructive/25 hover:bg-destructive/20"><XCircle className="h-3 w-3 mr-1" />Failed</Badge>;
  }
  return <Badge variant="secondary"><Clock className="h-3 w-3 mr-1" />{status}</Badge>;
}

function SyncRow({ entry }: { entry: SyncHistoryEntry }) {
  return (
    <Link
      to={`/history/${entry.id}`}
      className="flex items-center gap-4 px-4 py-3 rounded-lg hover:bg-accent/50 transition-colors group"
    >
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium truncate text-foreground">
          {entry.primarySheetName} → {entry.destinationTabName}
        </p>
        <p className="text-xs text-muted-foreground mt-0.5">
          {entry.sourceType === 'csv' ? 'CSV' : 'Google Sheet'} · {new Date(entry.completedAt).toLocaleDateString()}
        </p>
      </div>
      <div className="flex items-center gap-3 shrink-0">
        <div className="text-right hidden sm:block">
          <p className="text-xs text-muted-foreground">
            +{entry.newLeadsAdded} added · {entry.rowsUpdated} updated · {entry.rowsSkipped} skipped
          </p>
        </div>
        <StatusBadge status={entry.status} />
        <ArrowRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>
    </Link>
  );
}

export default function Dashboard() {
  const { user } = useGoogleAuth();
  const history = getSyncHistory();

  return (
    <AppLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-foreground">
              Welcome back{user?.name ? `, ${user.name.split(' ')[0]}` : ''}
            </h1>
            <p className="text-muted-foreground mt-1">
              Compare and sync leads from any source into your Google Sheets.
            </p>
          </div>
          <Link to="/sync/new">
            <Button size="lg" className="gap-2 shadow-sm">
              <Plus className="h-4 w-4" />
              New Sync
            </Button>
          </Link>
        </div>

        {/* Stats Cards */}
        {history.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Card className="bg-card border-border">
              <CardContent className="pt-6">
                <p className="text-sm font-medium text-muted-foreground">Total Syncs</p>
                <p className="text-3xl font-bold text-foreground mt-1">{history.length}</p>
              </CardContent>
            </Card>
            <Card className="bg-card border-border">
              <CardContent className="pt-6">
                <p className="text-sm font-medium text-muted-foreground">Leads Added</p>
                <p className="text-3xl font-bold text-foreground mt-1">
                  {history.reduce((sum, h) => sum + h.newLeadsAdded, 0)}
                </p>
              </CardContent>
            </Card>
            <Card className="bg-card border-border">
              <CardContent className="pt-6">
                <p className="text-sm font-medium text-muted-foreground">Fields Updated</p>
                <p className="text-3xl font-bold text-foreground mt-1">
                  {history.reduce((sum, h) => sum + h.rowsUpdated, 0)}
                </p>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Recent Syncs */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-lg">Recent Syncs</CardTitle>
          </CardHeader>
          <CardContent>
            {history.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center mb-4">
                  <GitCompare className="h-6 w-6 text-muted-foreground" />
                </div>
                <p className="text-sm font-medium text-foreground">No syncs yet</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Start by creating a new sync to compare your data.
                </p>
                <Link to="/sync/new" className="mt-4">
                  <Button variant="outline" size="sm" className="gap-2">
                    <Plus className="h-3.5 w-3.5" />
                    Create first sync
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="space-y-1">
                {history.slice(0, 10).map((entry) => (
                  <SyncRow key={entry.id} entry={entry} />
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
