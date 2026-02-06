import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Lock, LogOut, Mail, ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';
import { ChangePasswordDialog } from './ChangePasswordDialog';

export const AdminLoginDialog = () => {
  const { user, isAdmin, signIn, signOut, loading } = useAuth();
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [resetEmailSent, setResetEmailSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const { error } = await signIn(email, password);

    if (error) {
      toast.error('Login failed: ' + error.message);
    } else {
      toast.success('Logged in successfully');
      setOpen(false);
      setEmail('');
      setPassword('');
    }
    setIsLoading(false);
  };

  const handleSignOut = async () => {
    await signOut();
    toast.success('Logged out successfully');
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast.error('Please enter your email address');
      return;
    }
    setIsLoading(true);

    const redirectUrl = `${window.location.origin}/`;
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: redirectUrl,
    });

    if (error) {
      toast.error('Failed to send reset email: ' + error.message);
    } else {
      setResetEmailSent(true);
      toast.success('Password reset email sent! Check your inbox.');
    }
    setIsLoading(false);
  };

  const handleDialogClose = (isOpen: boolean) => {
    setOpen(isOpen);
    if (!isOpen) {
      setShowForgotPassword(false);
      setResetEmailSent(false);
      setEmail('');
      setPassword('');
    }
  };

  if (loading) {
    return null;
  }

  if (user) {
    return (
      <div className="flex items-center gap-2">
        <ChangePasswordDialog />
        <Button
          variant="ghost"
          size="sm"
          onClick={handleSignOut}
          className="text-foreground/70 hover:text-foreground text-xs gap-1"
        >
          <LogOut className="h-3 w-3" />
          {isAdmin ? 'Admin Logout' : 'Logout'}
        </Button>
      </div>
    );
  }

  return (
    <Dialog open={open} onOpenChange={handleDialogClose}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="text-foreground/50 hover:text-foreground/70 text-xs gap-1"
        >
          <Lock className="h-3 w-3" />
          Admin
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        {showForgotPassword ? (
          <>
            <DialogHeader>
              <DialogTitle>Reset Password</DialogTitle>
              <DialogDescription>
                {resetEmailSent 
                  ? 'Check your email for the password reset link.'
                  : 'Enter your email address and we\'ll send you a link to reset your password.'}
              </DialogDescription>
            </DialogHeader>
            
            {resetEmailSent ? (
              <div className="space-y-4">
                <div className="flex items-center justify-center p-6 bg-primary/10 rounded-lg">
                  <Mail className="h-12 w-12 text-primary" />
                </div>
                <p className="text-sm text-center text-muted-foreground">
                  We've sent a password reset link to <strong>{email}</strong>. 
                  Please check your inbox and follow the instructions.
                </p>
                <Button onClick={() => handleDialogClose(false)} className="w-full">
                  Close
                </Button>
              </div>
            ) : (
              <form onSubmit={handleForgotPassword} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="reset-email">Email</Label>
                  <Input
                    id="reset-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    required
                  />
                </div>
                <div className="flex gap-2">
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => setShowForgotPassword(false)} 
                    className="flex-1"
                  >
                    <ArrowLeft className="mr-2 h-4 w-4" /> Back
                  </Button>
                  <Button type="submit" className="flex-1" disabled={isLoading}>
                    {isLoading ? 'Sending...' : 'Send Reset Link'}
                  </Button>
                </div>
              </form>
            )}
          </>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle>Admin Login</DialogTitle>
              <DialogDescription>
                Sign in to manage the gallery content.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@example.com"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                />
              </div>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? 'Signing in...' : 'Sign In'}
              </Button>
              <Button 
                type="button" 
                variant="link" 
                className="w-full text-sm text-muted-foreground hover:text-foreground"
                onClick={() => setShowForgotPassword(true)}
              >
                Forgot your password?
              </Button>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};
