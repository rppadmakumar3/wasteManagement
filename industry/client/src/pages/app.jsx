import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { AppView } from 'src/sections/overview/view';

// ----------------------------------------------------------------------

const ChatbotIntegration = () => {
  useEffect(() => {
    // Insert the Kommunicate code here
    (function (d, m) {
      var kommunicateSettings = {
        "appId": "your_kommunicate_app_id",
        "popupWidget": true,
        "automaticChatOpenOnNavigation": true
      };
      var s = document.createElement("script");
      s.type = "text/javascript";
      s.async = true;
      s.src = "https://widget.kommunicate.io/v2/kommunicate.app";
      var h = document.getElementsByTagName("head")[0];
      h.appendChild(s);
      window.kommunicate = m;
      m._globals = kommunicateSettings;
    })(document, window.kommunicate || {});
  }, []); // Ensure that the effect runs only once on component mount

  return null; // Since this is a side effect, return null
};

export default function AppPage() {
  return (
    <>
      <Helmet>
        <title> Industry Dashboard </title>
      </Helmet>

      <AppView />
      <ChatbotIntegration />
    </>
  );
}
