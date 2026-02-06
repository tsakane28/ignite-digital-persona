import { useState, useEffect } from 'react';
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
} from '@/components/ui/dialog';
import { CheckCircle, KeyRound } from 'lucide-react';
import { toast } from 'sonner';

export const PasswordRecoveryHandler = () => {
  const [open, setOpen] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    // Check URL for recovery token on mount
    const hashParams = new URLSearchParams(window.location.hash.substring(1));
    const accessToken = hashParams.get('access_token');
    const type = hashParams.get('type');
    
    if (type === 'recovery' && accessToken) {
      setOpen(true);
      // Clean up URL
      window.history.replaceState(null, '', window.location.pathname);
    }

    // Also listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
      if (event === 'PASSWORD_RECOVERY') {
        setOpen(true);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (newPassword !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    if (newPassword.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }

    setIsLoading(true);

    const { error } = await supabase.auth.updateUser({
      password: newPassword,
    });

    if (error) {
      toast.error('Failed to update password: ' + error.message);
    } else {
      setSuccess(true);
      toast.success('Password updated successfully!');
    }
    setIsLoading(false);
  };

  const handleClose = () => {
    setOpen(false);
    setSuccess(false);
    setNewPassword('');
    setConfirmPassword('');
  };

  return (
    <Dialog open={open} onOpenChange={(isOpen) => {
      if (!isOpen && !success) {
        // Don't allow closing without setting password unless successful
        toast.error('Please set a new password before closing');
        return;
      }
      if (!isOpen) handleClose();
    }}>
      <DialogContent className="sm:max-w-md" onPointerDownOutside={(e) => {
        if (!success) e.preventDefault();
      }}>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <KeyRound className="h-5 w-5" />
            {success ? 'Password Updated' : 'Set New Password'}
          </DialogTitle>
          <DialogDescription>
            {success 
              ? 'Your password has been updated successfully.'
              : 'Please enter your new password below.'}
          </DialogDescription>
        </DialogHeader>
        
        {success ? (
          <div className="space-y-4">
            <div className="flex items-center justify-center p-6 bg-primary/10 rounded-lg">
              <CheckCircle className="h-12 w-12 text-primary" />
            </div>
            <p className="text-sm text-center text-muted-foreground">
              You can now use your new password to sign in.
            </p>
            <Button onClick={handleClose} className="w-full">
              Continue
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="new-password">New Password</Label>
              <Input
                id="new-password"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="••••••••"
                required
                minLength={6}
                autoFocus
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirm-new-password">Confirm New Password</Label>
              <Input
                id="confirm-new-password"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                required
                minLength={6}
              />
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? 'Updating...' : 'Update Password'}
            </Button>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
};
