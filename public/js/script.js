(function () {
  let clickCount = 0;
  let maxScrollDepth = 0;
  let startTime = Date.now();

  if (sessionStorage.getItem("startTime")) {
    startTime = sessionStorage.getItem("startTime");
  } else {
    sessionStorage.setItem("startTime", startTime);
  }

  if (sessionStorage.getItem("clickCount")) {
    clickCount = sessionStorage.getItem("clickCount");
  } else {
    sessionStorage.setItem("clickCount", clickCount);
  }

  if (sessionStorage.getItem("maxScrollDepth")) {
    maxScrollDepth = sessionStorage.getItem("maxScrollDepth");
  } else {
    sessionStorage.setItem("maxScrollDepth", maxScrollDepth);
  }

  // Event listener for tracking clicks
  document.addEventListener("click", () => {
    clickCount++;
    sessionStorage.setItem("clickCount", clickCount);
  });

  // Event listener for tracking scroll depth
  window.addEventListener("scroll", () => {
    const scrolled = window.scrollY + window.innerHeight;
    const height = document.documentElement.scrollHeight;
    const scrollDepth = (scrolled / height) * 100;
    if (scrollDepth > maxScrollDepth) {
      maxScrollDepth = scrollDepth;
    }
    sessionStorage.setItem("maxScrollDepth", maxScrollDepth);
  });

  function getInteractionsData() {
    return {
      clicks: clickCount,
      scrollDepth: maxScrollDepth,
    };
  }

  function sendAnalyticsData() {
    const payload = {
      url: window.location.href,
      referrer: document.referrer,
      userAgent: navigator.userAgent,
      timestamp: new Date().toISOString(),
      sessionId: getSessionId(),
      visitDuration: Date.now() - startTime,
      browser: {
        name: getBrowserName(),
        version: getBrowserVersion(),
      },
      device: getDeviceType(),
      interactions: getInteractionsData(), // Capture interaction data
    };

    fetch("https://sitetrace-api.sigve.dev/analytics", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Analytics data sent:", data);
      })
      .catch((error) => {
        console.error("Error sending analytics data:", error);
      });
  }

  function getSessionId() {
    let sessionId = sessionStorage.getItem("sessionId");
    if (!sessionId) {
      sessionId = "sess_" + Math.random().toString(36).substr(2, 12);
      sessionStorage.setItem("sessionId", sessionId);
    }
    return sessionId;
  }

  function getBrowserName() {
    // Simple browser detection logic
    if (navigator.userAgent.indexOf("Chrome") !== -1) return "Chrome";
    if (navigator.userAgent.indexOf("Safari") !== -1) return "Safari";
    if (navigator.userAgent.indexOf("Firefox") !== -1) return "Firefox";
    if (navigator.userAgent.indexOf("MSIE") !== -1 || !!document.documentMode)
      return "IE"; // IE < 11
    return "Unknown";
  }

  function getBrowserVersion() {
    // Define the regular expression to match browser versions
    const userAgent = navigator.userAgent;
    const match = userAgent.match(
      /(Chrome|Safari|Firefox|MSIE|Trident\/.*?rv:)(\d+)/
    );

    // Check if match is found and return the version
    if (match) {
      return match[2];
    } else {
      // Return a default value or handle the case where the browser is not recognized
      return "Unknown";
    }
  }

  function getDeviceType() {
    const ua = navigator.userAgent;
    if (/Mobile|Android|iP(ad|hone)/.test(ua)) return "Mobile";
    return "Desktop";
  }

  window.addEventListener("beforeunload", function () {
    const payload = {
      url: window.location.href,
      referrer: document.referrer,
      userAgent: navigator.userAgent,
      timestamp: new Date().toISOString(),
      sessionId: getSessionId(),
      visitDuration: Date.now() - startTime,
      browser: {
        name: getBrowserName(),
        version: getBrowserVersion(),
      },
      device: getDeviceType(),
      interactions: getInteractionsData(), // Capture interaction data
    };

    navigator.sendBeacon(
      "https://sitetrace-api.sigve.dev/analytics",
      JSON.stringify(payload)
    );
  });

  sendAnalyticsData();
})();
