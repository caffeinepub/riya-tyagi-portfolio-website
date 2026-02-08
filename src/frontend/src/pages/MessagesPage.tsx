import { useMessages } from '@/hooks/useQueries';
import { useAdminStatus } from '@/hooks/useAdminStatus';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Skeleton } from '@/components/ui/skeleton';
import { Mail, Calendar, User, AlertCircle, Lock, Key, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useInternetIdentity } from '@/hooks/useInternetIdentity';
import { getSecretParameter, storeSessionParameter, clearSessionParameter, emitAdminTokenChange } from '@/utils/urlParams';
import { getConfiguredAdminToken } from '@/config/adminToken';
import { useState, useEffect } from 'react';

export function MessagesPage() {
  const { identity, login, loginStatus } = useInternetIdentity();
  const { data: isAdmin, isLoading: adminStatusLoading, isFetched: adminStatusFetched, refetch: refetchAdminStatus } = useAdminStatus();
  const { data: messages, isLoading: messagesLoading, error: messagesError, refetch: refetchMessages } = useMessages(isAdmin === true);
  const [isProvisioning, setIsProvisioning] = useState(false);

  const formatDate = (timestamp: bigint) => {
    const date = new Date(Number(timestamp) / 1000000);
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const isAuthenticated = !!identity;
  const hasAdminToken = !!getSecretParameter('caffeineAdminToken');
  const configuredToken = getConfiguredAdminToken();

  // Clear stored admin token once admin status is confirmed
  useEffect(() => {
    if (isAdmin === true && hasAdminToken) {
      clearSessionParameter('caffeineAdminToken');
    }
  }, [isAdmin, hasAdminToken]);

  // Handle auto-provisioning with the configured token
  const handleEnableAdminAccess = async () => {
    if (!configuredToken) {
      console.error('No admin token configured');
      return;
    }

    setIsProvisioning(true);
    try {
      // Store the token in sessionStorage
      storeSessionParameter('caffeineAdminToken', configuredToken);
      
      // Emit token change event to trigger actor re-provisioning
      emitAdminTokenChange();
      
      // Wait for actor to re-provision
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Retry fetching admin status and messages
      await refetchAdminStatus();
      await refetchMessages();
    } catch (err) {
      console.error('Failed to enable admin access:', err);
    } finally {
      setIsProvisioning(false);
    }
  };

  // Handle remediation: clear stale provisioning and retry
  const handleRemediation = async () => {
    setIsProvisioning(true);
    try {
      // Clear any stale admin token from session
      clearSessionParameter('caffeineAdminToken');
      
      // Wait a moment
      await new Promise(resolve => setTimeout(resolve, 300));
      
      // Re-apply the configured token if available
      if (configuredToken) {
        storeSessionParameter('caffeineAdminToken', configuredToken);
        emitAdminTokenChange();
      }
      
      // Wait for actor to re-provision
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Retry fetching admin status and messages
      await refetchAdminStatus();
      await refetchMessages();
    } catch (err) {
      console.error('Remediation failed:', err);
    } finally {
      setIsProvisioning(false);
    }
  };

  // Detect stale provisioning: authenticated + token present + backend says not admin
  const isStaleProvisioning = isAuthenticated && hasAdminToken && adminStatusFetched && isAdmin === false;

  // Build version marker (deterministic, changes on redeploy)
  const buildVersion = document.lastModified;

  // If admin status is confirmed, show messages (bypass all auth gates)
  if (isAdmin === true) {
    return (
      <div className="container mx-auto px-4 py-12 min-h-[calc(100vh-200px)]">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">Messages</h1>
            <p className="text-muted-foreground">
              View all contact form submissions
            </p>
            <p className="text-xs text-muted-foreground/60 mt-2">
              Build: {buildVersion}
            </p>
          </div>

          {/* Loading State */}
          {messagesLoading && (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <Card key={i} className="shadow-soft">
                  <CardHeader>
                    <Skeleton className="h-6 w-48" />
                    <Skeleton className="h-4 w-32 mt-2" />
                  </CardHeader>
                  <CardContent>
                    <Skeleton className="h-20 w-full" />
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {/* Error State */}
          {messagesError && (
            <Alert variant="destructive">
              <AlertCircle className="h-5 w-5" />
              <AlertTitle>Error Loading Messages</AlertTitle>
              <AlertDescription className="space-y-3">
                <p>Failed to load messages. Please try again later.</p>
                <div className="mt-3">
                  <Button
                    onClick={() => refetchMessages()}
                    variant="outline"
                    size="sm"
                    className="border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground"
                  >
                    Retry
                  </Button>
                </div>
              </AlertDescription>
            </Alert>
          )}

          {/* Empty State */}
          {!messagesLoading && !messagesError && messages && messages.length === 0 && (
            <Card className="shadow-soft">
              <CardContent className="py-12 text-center">
                <Mail className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">No messages yet</h3>
                <p className="text-muted-foreground">
                  When someone submits the contact form, their messages will appear here.
                </p>
              </CardContent>
            </Card>
          )}

          {/* Messages List */}
          {!messagesLoading && !messagesError && messages && messages.length > 0 && (
            <div className="space-y-4">
              {messages.map((message, index) => (
                <Card key={index} className="shadow-soft hover:shadow-soft-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <CardTitle className="flex items-center gap-2 text-lg">
                          <User className="h-4 w-4 text-primary" />
                          {message.name}
                        </CardTitle>
                        <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Mail className="h-3.5 w-3.5" />
                            <a
                              href={`mailto:${message.email}`}
                              className="hover:text-primary transition-colors"
                            >
                              {message.email}
                            </a>
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="h-3.5 w-3.5" />
                            {formatDate(message.timestamp)}
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-accent/30 rounded-lg p-4 border">
                      <p className="text-sm whitespace-pre-wrap leading-relaxed">
                        {message.message}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }

  // Otherwise, show appropriate gate/error states
  return (
    <div className="container mx-auto px-4 py-12 min-h-[calc(100vh-200px)]">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Messages</h1>
          <p className="text-muted-foreground">
            View all contact form submissions
          </p>
          <p className="text-xs text-muted-foreground/60 mt-2">
            Build: {buildVersion}
          </p>
        </div>

        {/* Stale Provisioning / Remediation State */}
        {isStaleProvisioning && (
          <Alert variant="destructive" className="mb-6">
            <AlertCircle className="h-5 w-5" />
            <AlertTitle>Admin Access Issue</AlertTitle>
            <AlertDescription className="mt-2 space-y-3">
              <p>
                You are logged in and have an admin token configured, but the backend is not recognizing you as an admin.
              </p>
              <p className="text-sm">
                This can happen if the admin provisioning didn't complete successfully or if there's stale state. Click the button below to clear any stale provisioning artifacts and retry.
              </p>
              <div className="mt-4">
                <Button
                  onClick={handleRemediation}
                  disabled={isProvisioning}
                  className="gradient-accent text-white"
                >
                  <RefreshCw className={`h-4 w-4 mr-2 ${isProvisioning ? 'animate-spin' : ''}`} />
                  {isProvisioning ? 'Clearing and retrying...' : 'Clear stale admin provisioning and retry'}
                </Button>
              </div>
            </AlertDescription>
          </Alert>
        )}

        {/* Unauthorized State - show when backend confirms not admin and no token present */}
        {isAuthenticated && adminStatusFetched && isAdmin === false && !hasAdminToken && (
          <Alert variant="destructive" className="mb-6">
            <Lock className="h-5 w-5" />
            <AlertTitle>Unauthorized Access</AlertTitle>
            <AlertDescription className="mt-2 space-y-3">
              <p>
                Viewing messages requires admin access. You are logged in, but your account does not have admin privileges.
              </p>
              <p className="text-sm">
                To access this page, you need to enable admin access with your admin token.
              </p>
              
              {configuredToken && (
                <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg">
                  <p className="text-sm text-blue-900 dark:text-blue-100 mb-3">
                    <strong>Ready to enable admin access:</strong> Click the button below to automatically configure your admin token and gain access to the messages.
                  </p>
                  <Button
                    onClick={handleEnableAdminAccess}
                    disabled={isProvisioning}
                    className="gradient-accent text-white"
                  >
                    <Key className="h-4 w-4 mr-2" />
                    {isProvisioning ? 'Enabling...' : 'Enable Admin Access'}
                  </Button>
                </div>
              )}
            </AlertDescription>
          </Alert>
        )}

        {/* Not Logged In State */}
        {!isAuthenticated && (
          <Alert variant="destructive" className="mb-6">
            <Lock className="h-5 w-5" />
            <AlertTitle>Authentication Required</AlertTitle>
            <AlertDescription className="mt-2 space-y-3">
              <p>
                You must be logged in with Internet Identity to access this page.
              </p>
              <div className="mt-4">
                <Button
                  onClick={login}
                  disabled={loginStatus === 'logging-in'}
                  className="gradient-accent text-white"
                >
                  {loginStatus === 'logging-in' ? 'Logging in...' : 'Login with Internet Identity'}
                </Button>
              </div>
            </AlertDescription>
          </Alert>
        )}

        {/* Loading State (checking admin status) */}
        {isAuthenticated && adminStatusLoading && (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="shadow-soft">
                <CardHeader>
                  <Skeleton className="h-6 w-48" />
                  <Skeleton className="h-4 w-32 mt-2" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-20 w-full" />
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
