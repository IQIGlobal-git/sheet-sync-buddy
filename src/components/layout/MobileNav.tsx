import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, GitCompare, History, LogOut, Menu, X } from 'lucide-react';
import { useGoogleAuth } from '@/features/auth/GoogleAuthContext';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

const navItems = [
  { to: '/', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/sync/new', icon: GitCompare, label: 'New Sync' },
  { to: '/history', icon: History, label: 'History' },
];

export default function MobileNav() {
  const { pathname } = useLocation();
  const { user, signOut } = useGoogleAuth();
  const [open, setOpen] = useState(false);

  return (
    <div className="md:hidden">
      <div className="flex items-center justify-between px-4 py-3 bg-card border-b border-border">
        <div className="flex items-center gap-2">
          <div className="h-7 w-7 rounded-lg bg-primary flex items-center justify-center">
            <GitCompare className="h-3.5 w-3.5 text-primary-foreground" />
          </div>
          <span className="font-bold text-base">SheetSync</span>
        </div>
        <div className="flex items-center gap-2">
          {user && (
            <Avatar className="h-7 w-7">
              <AvatarImage src={user.picture} />
              <AvatarFallback className="text-xs">{user.name?.charAt(0)}</AvatarFallback>
            </Avatar>
          )}
          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setOpen(!open)}>
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </Button>
        </div>
      </div>

      {open && (
        <nav className="px-4 py-3 bg-card border-b border-border space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.to;
            return (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium ${
                  isActive ? 'bg-accent text-accent-foreground' : 'text-muted-foreground hover:bg-accent/50'
                }`}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
          {user && (
            <Button
              variant="ghost"
              size="sm"
              className="w-full justify-start text-muted-foreground"
              onClick={() => { signOut(); setOpen(false); }}
            >
              <LogOut className="h-4 w-4 mr-2" />
              Sign out
            </Button>
          )}
        </nav>
      )}
    </div>
  );
}
