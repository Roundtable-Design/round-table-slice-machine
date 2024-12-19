import { useEffect } from "react";

function ClutchWidget() {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://widget.clutch.co/static/js/widget.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, []);

  return (
    <div
      className="w-full bg-white p-1 rounded clutch-widget"
      data-url="https://widget.clutch.co"
      data-widget-type="2"
      data-height="45"
      data-nofollow="true"
      data-expandifr="true"
      data-clutchcompany-id="2017780"
    ></div>
  );
}

export default ClutchWidget;
