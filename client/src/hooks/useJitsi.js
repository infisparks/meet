import { useState, useEffect, useRef, useCallback } from 'react';

const DEFAULT_JITSI_DOMAIN = import.meta.env.VITE_JITSI_DOMAIN || 'meet.infispark.in';
const DEFAULT_JITSI_URL = import.meta.env.VITE_JITSI_URL || 'https://meet.infispark.in';

export function useJitsi({
  containerRef,
  roomName,
  displayName,
  initialAudioMuted = false,
  initialVideoMuted = false,
  onJoined,
  onLeft,
  onParticipantJoined,
  onParticipantLeft,
  onAudioStatusChange,
  onVideoStatusChange,
  onScreenShareStatusChange,
}) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isJoined, setIsJoined] = useState(false);
  const [isAudioMuted, setIsAudioMuted] = useState(initialAudioMuted);
  const [isVideoMuted, setIsVideoMuted] = useState(initialVideoMuted);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [error, setError] = useState(null);

  const apiRef = useRef(null);

  // Dynamically load the Jitsi External API script
  const loadScript = useCallback(() => {
    return new Promise((resolve, reject) => {
      if (window.JitsiMeetExternalAPI) {
        resolve();
        return;
      }

      const scriptSrc = `${DEFAULT_JITSI_URL}/external_api.js`;
      const existingScript = document.querySelector(`script[src="${scriptSrc}"]`);

      if (existingScript) {
        existingScript.addEventListener('load', () => resolve());
        existingScript.addEventListener('error', () => reject(new Error('Failed to load Jitsi API script')));
        return;
      }

      const script = document.createElement('script');
      script.src = scriptSrc;
      script.async = true;
      script.onload = () => resolve();
      script.onerror = () => reject(new Error(`Failed to load Jitsi script from ${scriptSrc}`));
      document.body.appendChild(script);
    });
  }, []);

  // Initialize Jitsi instance
  useEffect(() => {
    let isCancelled = false;

    if (!containerRef.current || !roomName) return;

    loadScript()
      .then(() => {
        if (isCancelled || !containerRef.current) return;

        // Clean up previous instance if any
        if (apiRef.current) {
          try {
            apiRef.current.dispose();
          } catch (e) {
            console.warn('Error disposing previous Jitsi instance:', e);
          }
          apiRef.current = null;
        }

        // Clean container children
        containerRef.current.innerHTML = '';

        const domain = DEFAULT_JITSI_DOMAIN;
        const options = {
          roomName: roomName,
          parentNode: containerRef.current,
          width: '100%',
          height: '100%',
          userInfo: {
            displayName: displayName || 'InfiMeet Guest',
          },
          configOverwrite: {
            prejoinPageEnabled: false,
            prejoinConfig: {
              enabled: false,
              hideDisplayName: true,
            },
            startWithAudioMuted: initialAudioMuted,
            startWithVideoMuted: initialVideoMuted,
            disableDeepLinking: true,
            enableClosePage: false,
            enableWelcomePage: false,
            hideConferenceSubject: true,
            disableWatermark: true,
            disableBranding: true,
            branding: {
              showWatermark: false,
              showBranding: false,
              logoUrl: '',
              brandWatermarkUrl: '',
            },
            watermark: {
              enabled: false,
            },
            toolbarButtons: [
              'microphone',
              'camera',
              'desktop',
              'chat',
              'raisehand',
              'tileview',
              'videoquality',
              'fullscreen',
              'settings',
              'hangup'
            ],
            remoteVideoMenu: {
              disableKick: false,
            },
          },
          interfaceConfigOverwrite: {
            SHOW_JITSI_WATERMARK: false,
            SHOW_WATERMARK_FOR_GUESTS: false,
            SHOW_BRAND_WATERMARK: false,
            SHOW_POWERED_BY: false,
            DEFAULT_LOGO_URL: '',
            DEFAULT_WELCOME_PAGE_LOGO_URL: '',
            JITSI_WATERMARK_LINK: '',
            BRAND_WATERMARK_LINK: '',
            SHOW_PROMOTIONAL_CLOSE_PAGE: false,
            HIDE_DEEP_LINKING_LOGO: true,
            DISPLAY_WELCOME_PAGE_CONTENT: false,
            DISPLAY_WELCOME_PAGE_TOOLBAR_ADDITIONAL_CONTENT: false,
            GENERATE_ROOMNAMES_ON_WELCOME_PAGE: false,
            APP_NAME: 'InfiMeet',
            NATIVE_APP_NAME: 'InfiMeet',
            PROVIDER_NAME: 'InfiMeet',
            DEFAULT_BACKGROUND: '#0b0f19',
            TOOLBAR_ALWAYS_VISIBLE: false,
            DISABLE_JOIN_LEAVE_NOTIFICATIONS: false,
          },
        };

        try {
          const api = new window.JitsiMeetExternalAPI(domain, options);
          apiRef.current = api;
          setIsLoaded(true);

          // Event Listeners
          api.addEventListeners({
            videoConferenceJoined: (event) => {
              setIsJoined(true);
              if (onJoined) onJoined(event);
            },
            videoConferenceLeft: () => {
              setIsJoined(false);
              if (onLeft) onLeft();
            },
            participantJoined: (participant) => {
              if (onParticipantJoined) onParticipantJoined(participant);
            },
            participantLeft: (participant) => {
              if (onParticipantLeft) onParticipantLeft(participant);
            },
            audioMuteStatusChanged: (data) => {
              setIsAudioMuted(data.muted);
              if (onAudioStatusChange) onAudioStatusChange(data.muted);
            },
            videoMuteStatusChanged: (data) => {
              setIsVideoMuted(data.muted);
              if (onVideoStatusChange) onVideoStatusChange(data.muted);
            },
            screenSharingStatusChanged: (data) => {
              setIsScreenSharing(data.on);
              if (onScreenShareStatusChange) onScreenShareStatusChange(data.on);
            },
          });
        } catch (err) {
          console.error('Jitsi initialization error:', err);
          setError(err.message || 'Failed to initialize Jitsi engine');
        }
      })
      .catch((err) => {
        if (!isCancelled) {
          console.error('Error loading Jitsi External API:', err);
          setError('Could not connect to Jitsi server at ' + DEFAULT_JITSI_DOMAIN);
        }
      });

    return () => {
      isCancelled = true;
      if (apiRef.current) {
        try {
          apiRef.current.dispose();
        } catch (e) {
          console.warn('Error during Jitsi dispose on unmount:', e);
        }
        apiRef.current = null;
      }
    };
  }, [roomName, displayName, loadScript]);

  // Command handlers
  const toggleAudio = useCallback(() => {
    if (apiRef.current) {
      apiRef.current.executeCommand('toggleAudio');
    }
  }, []);

  const toggleVideo = useCallback(() => {
    if (apiRef.current) {
      apiRef.current.executeCommand('toggleVideo');
    }
  }, []);

  const toggleScreenShare = useCallback(() => {
    if (apiRef.current) {
      apiRef.current.executeCommand('toggleShareScreen');
    }
  }, []);

  const toggleChat = useCallback(() => {
    if (apiRef.current) {
      apiRef.current.executeCommand('toggleChat');
    }
  }, []);

  const toggleRaiseHand = useCallback(() => {
    if (apiRef.current) {
      apiRef.current.executeCommand('toggleRaiseHand');
    }
  }, []);

  const toggleTileView = useCallback(() => {
    if (apiRef.current) {
      apiRef.current.executeCommand('toggleTileView');
    }
  }, []);

  const muteEveryone = useCallback((mediaType = 'audio') => {
    if (apiRef.current) {
      apiRef.current.executeCommand('muteEveryone', mediaType);
    }
  }, []);

  const muteParticipant = useCallback((participantId, mediaType = 'audio') => {
    if (apiRef.current && participantId) {
      apiRef.current.executeCommand('muteParticipant', participantId, mediaType);
    }
  }, []);

  const kickParticipant = useCallback((participantId) => {
    if (apiRef.current && participantId) {
      apiRef.current.executeCommand('kickParticipant', participantId);
    }
  }, []);

  const setAudioMuted = useCallback((muted) => {
    if (apiRef.current) {
      apiRef.current.executeCommand('setAudioMuted', muted);
    }
  }, []);

  const setVideoMuted = useCallback((muted) => {
    if (apiRef.current) {
      apiRef.current.executeCommand('setVideoMuted', muted);
    }
  }, []);

  const stopScreenShare = useCallback(() => {
    if (apiRef.current && isScreenSharing) {
      apiRef.current.executeCommand('toggleShareScreen');
    }
  }, [isScreenSharing]);

  const hangup = useCallback(() => {
    if (apiRef.current) {
      apiRef.current.executeCommand('hangup');
    }
  }, []);

  return {
    isLoaded,
    isJoined,
    isAudioMuted,
    isVideoMuted,
    isScreenSharing,
    error,
    toggleAudio,
    toggleVideo,
    toggleScreenShare,
    toggleChat,
    toggleRaiseHand,
    toggleTileView,
    muteEveryone,
    muteParticipant,
    kickParticipant,
    setAudioMuted,
    setVideoMuted,
    stopScreenShare,
    hangup,
    api: apiRef.current,
  };
}
