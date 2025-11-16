"use client";

import { useEffect, useRef, useState } from "react";

type MatterportViewerProps = {
  modelId: string;
  sdkKey: string;
};

type PoseSubscription =
  | (() => void)
  | {
      cancel?: () => void;
      unsubscribe?: () => void;
    };

type MatterportSDK = {
  Camera: {
    pose: {
      subscribe: (callback: (pose: Record<string, unknown>) => void) => PoseSubscription;
    };
  };
  Mattertag?: {
    add: (args: Record<string, unknown>) => Promise<unknown>;
  };
};

type MatterportSdkModule = {
  connect: (
    element: HTMLIFrameElement,
    sdkKey: string,
    modelId: string,
    options?: Record<string, unknown>,
  ) => Promise<MatterportSDK>;
};

declare global {
  interface Window {
    MP_SDK?: MatterportSdkModule;
  }
}

const SDK_URL = "https://static.matterport.com/showcase-sdk/latest.js";
let sdkLoader: Promise<MatterportSdkModule> | null = null;

const loadMatterportSdk = (): Promise<MatterportSdkModule> => {
  if (typeof window === "undefined") {
    return Promise.reject(new Error("Matterport SDK is only available in the browser."));
  }

  if (window.MP_SDK) {
    return Promise.resolve(window.MP_SDK);
  }

  sdkLoader ??= new Promise((resolve, reject) => {
    const handleError = (message: string) => {
      sdkLoader = null;
      reject(new Error(message));
    };

    const existingScript = document.querySelector<HTMLScriptElement>(`script[src="${SDK_URL}"]`);

    if (existingScript) {
      existingScript.addEventListener("load", () => {
        if (window.MP_SDK) {
          resolve(window.MP_SDK);
        } else {
          handleError("Matterport SDK failed to load.");
        }
      });
      existingScript.addEventListener("error", () => handleError("Matterport SDK script could not be loaded."));
      return;
    }

    const script = document.createElement("script");
    script.src = SDK_URL;
    script.async = true;
    script.onload = () => {
      if (window.MP_SDK) {
        resolve(window.MP_SDK);
      } else {
        handleError("Matterport SDK failed to initialize.");
      }
    };
    script.onerror = () => handleError("Matterport SDK script failed to load.");
    document.head.appendChild(script);
  });

  return sdkLoader;
};

const MatterportViewer = ({ modelId, sdkKey }: MatterportViewerProps) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!iframeRef.current || !modelId || !sdkKey) {
      return;
    }

    let unsubscribe: (() => void) | undefined;
    loadMatterportSdk()
      .then((MP_SDK) =>
        MP_SDK.connect(iframeRef.current!, sdkKey, modelId, {
          iframeParameters: {
            play: 1,
            qs: 1,
          },
        }),
      )
      .then((sdk) => {
        setError(null);
        const poseSubscription = sdk.Camera.pose.subscribe((pose) => {
          console.log("Matterport camera pose:", pose);
        });

        if (!poseSubscription) {
          unsubscribe = undefined;
        } else {
          unsubscribe =
            typeof poseSubscription === "function"
              ? poseSubscription
              : poseSubscription.cancel
                ? poseSubscription.cancel.bind(poseSubscription)
                : poseSubscription.unsubscribe
                  ? poseSubscription.unsubscribe.bind(poseSubscription)
                  : undefined;
        }
      })
      .catch((sdkError) => {
        console.error("Matterport SDK error:", sdkError);
        setError("Unable to load Matterport experience.");
      });

    return () => {
      if (typeof unsubscribe === "function") {
        unsubscribe();
      }
    };
  }, [modelId, sdkKey]);

  if (!sdkKey) {
    return (
      <div className="rounded-md border border-red-200 bg-red-50 p-4 text-sm text-red-600">
        Missing Matterport SDK key. Set NEXT_PUBLIC_MATTERPORT_SDK_KEY in your .env.local file.
      </div>
    );
  }

  const viewerUrl = (() => {
    const params = new URLSearchParams({
      m: modelId,
      play: "1",
    });

    params.set("applicationKey", sdkKey);

    return `https://my.matterport.com/show/?${params.toString()}`;
  })();

  return (
    <div className="w-full">
      {error ? (
        <div className="rounded-md border border-red-200 bg-red-50 p-4 text-sm text-red-600">{error}</div>
      ) : (
        <iframe
          ref={iframeRef}
          title="Matterport 3D Viewer"
          src={viewerUrl}
          className="h-[600px] w-full rounded-lg border border-gray-200"
          allow="xr-spatial-tracking; gyroscope; accelerometer; fullscreen"
          allowFullScreen
        />
      )}
    </div>
  );
};

export default MatterportViewer;
