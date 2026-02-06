import { useState } from 'react';
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
import { Mail, ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';

interface PasswordResetDialogProps {
  trigger?: React.ReactNode;
  onBack?: () => void;
}

export const PasswordResetDialog = ({ trigger, onBack }: PasswordResetDialogProps) => {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const redirectUrl = `${window.location.origin}/`;

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: redirectUrl,
    });

    if (error) {
      toast.error('Failed to send reset email: ' + error.message);
    } else {
      setEmailSent(true);
      toast.success('Password reset email sent! Check your inbox.');
    }
    setIsLoading(false);
  };

  const handleClose = () => {
    setOpen(false);
    setEmailSent(false);
    setEmail('');
  };

  if (trigger) {
    return (
      <Dialog open={open} onOpenChange={(isOpen) => {
        if (!isOpen) handleClose();
        else setOpen(true);
      }}>
        <DialogTrigger asChild>
          {trigger}
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Reset Password</DialogTitle>
            <DialogDescription>
              {emailSent 
                ? 'Check your email for the password reset link.'
                : 'Enter your email address and we\'ll send you a link to reset your password.'}
            </DialogDescription>
          </DialogHeader>
          
          {emailSent ? (
            <div className="space-y-4">
              <div className="flex items-center justify-center p-6 bg-primary/10 rounded-lg">
                <Mail className="h-12 w-12 text-primary" />
              </div>
              <p className="text-sm text-center text-muted-foreground">
                We've sent a password reset link to <strong>{email}</strong>. 
                Please check your inbox and follow the instructions.
              </p>
              <Button onClick={handleClose} className="w-full">
                Close
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
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
                {onBack && (
                  <Button type="button" variant="outline" onClick={onBack} className="flex-1">
                    <ArrowLeft className="mr-2 h-4 w-4" /> Back
                  </Button>
                )}
                <Button type="submit" className="flex-1" disabled={isLoading}>
                  {isLoading ? 'Sending...' : 'Send Reset Link'}
                </Button>
              </div>
            </form>
          )}
        </DialogContent>
      </Dialog>
    );
  }

  // Inline version (without dialog wrapper)
  return emailSent ? (
    <div className="space-y-4">
      <div className="flex items-center justify-center p-6 bg-primary/10 rounded-lg">
        <Mail className="h-12 w-12 text-primary" />
      </div>
      <p className="text-sm text-center text-muted-foreground">
        We've sent a password reset link to <strong>{email}</strong>. 
        Please check your inbox and follow the instructions.
      </p>
    </div>
  ) : (
    <form onSubmit={handleSubmit} className="space-y-4">
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
        {onBack && (
          <Button type="button" variant="outline" onClick={onBack} className="flex-1">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back
          </Button>
        )}
        <Button type="submit" className="flex-1" disabled={isLoading}>
          {isLoading ? 'Sending...' : 'Send Reset Link'}
        </Button>
      </div>
    </form>
  );
};
