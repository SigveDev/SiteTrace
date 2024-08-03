(function () {
  let clickCount = 0;
  let maxScrollDepth = 0;
  let startTime = Date.now();
  let userConsent = false;
  let firstTime = true;

  // Load initial state from sessionStorage if available
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

  // Collect additional data points
  function getScreenResolution() {
    return `${window.screen.width}x${window.screen.height}`;
  }

  function getViewportSize() {
    return `${window.innerWidth}x${window.innerHeight}`;
  }

  function getLoadTime() {
    if (performance.getEntriesByType("navigation").length > 0) {
      const navEntry = performance.getEntriesByType("navigation")[0];
      return navEntry.domContentLoadedEventEnd - navEntry.startTime;
    }
    return (
      window.performance.timing.domContentLoadedEventEnd -
      window.performance.timing.navigationStart
    );
  }

  function getNetworkInfo() {
    if (navigator.connection) {
      return {
        effectiveType: navigator.connection.effectiveType,
        downlink: navigator.connection.downlink,
        rtt: navigator.connection.rtt,
      };
    }
    return {
      effectiveType: "unknown",
      downlink: "unknown",
      rtt: "unknown",
    };
  }

  function toIsoString(date) {
    var tzo = -date.getTimezoneOffset(),
      dif = tzo >= 0 ? "+" : "-",
      pad = function (num) {
        return (num < 10 ? "0" : "") + num;
      };

    return (
      date.getFullYear() +
      "-" +
      pad(date.getMonth() + 1) +
      "-" +
      pad(date.getDate()) +
      "T" +
      pad(date.getHours()) +
      ":" +
      pad(date.getMinutes()) +
      ":" +
      pad(date.getSeconds()) +
      dif +
      pad(Math.floor(Math.abs(tzo) / 60)) +
      ":" +
      pad(Math.abs(tzo) % 60)
    );
  }

  function sendAnalyticsData(isFullData = false) {
    let payload = {
      url: window.location.href,
      referrer: document.referrer,
      sessionId: getSessionId(),
      timestamp: toIsoString(new Date()),
      browser: {
        name: getBrowserName(),
        version: getBrowserVersion(),
      },
    };

    if (isFullData) {
      console.log(sessionStorage.getItem("removedOldDevice"));
      if (sessionStorage.getItem("removedOldDevice")) {
        payload = {
          ...payload,
          userAgent: navigator.userAgent,
          visitDuration: Date.now() - startTime,
          device: getDeviceType(),
          clicks: Number(clickCount - sessionStorage.getItem("sendtClicks")),
          scrollDepth: Number(
            maxScrollDepth - sessionStorage.getItem("sendtScrollDepth")
          ),
          screenResolution: getScreenResolution(),
          viewportSize: getViewportSize(),
          loadTime: getLoadTime(),
          network: getNetworkInfo(),
          focus: document.hasFocus(),
          removeOneFromUnknownDevice: true,
        };
      } else {
        payload = {
          ...payload,
          userAgent: navigator.userAgent,
          visitDuration: Date.now() - startTime,
          device: getDeviceType(),
          clicks: Number(clickCount - sessionStorage.getItem("sendtClicks")),
          scrollDepth: Number(
            maxScrollDepth - sessionStorage.getItem("sendtScrollDepth")
          ),
          screenResolution: getScreenResolution(),
          viewportSize: getViewportSize(),
          loadTime: getLoadTime(),
          network: getNetworkInfo(),
          focus: document.hasFocus(),
        };
      }
    }
    sessionStorage.removeItem("removedOldDevice");

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
        if (firstTime) {
          firstTime = false;
          showConfirmationDialog();
        }
      })
      .catch((error) => {
        console.error("Error sending analytics data:", error);
      });

    sessionStorage.setItem("sendtClicks", clickCount);
    sessionStorage.setItem("sendtScrollDepth", maxScrollDepth);
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
    if (navigator.userAgent.indexOf("Chrome") !== -1) return "Chrome";
    if (navigator.userAgent.indexOf("Safari") !== -1) return "Safari";
    if (navigator.userAgent.indexOf("Firefox") !== -1) return "Firefox";
    if (navigator.userAgent.indexOf("MSIE") !== -1 || !!document.documentMode)
      return "IE";
    return "Unknown";
  }

  function getBrowserVersion() {
    const userAgent = navigator.userAgent;
    const match = userAgent.match(
      /(Chrome|Safari|Firefox|MSIE|Trident\/.*?rv:)(\d+)/
    );
    if (match) {
      return match[2];
    } else {
      return "Unknown";
    }
  }

  function getDeviceType() {
    const ua = navigator.userAgent;
    if (/Mobile|Android|iP(ad|hone)/.test(ua)) return "Mobile";
    return "Desktop";
  }

  function showConfirmationDialog() {
    if (
      localStorage.getItem("userConsent") === "true" ||
      sessionStorage.getItem("userConsent") === "true"
    ) {
      return;
    }
    const checkDialog = setInterval(() => {
      const dialog = document.getElementById("confirmation-dialog");
      if (dialog) {
        dialog.classList.add("show");
        dialog.classList.remove("hidden");
        clearInterval(checkDialog);
      }
    }, 100); // Check every 100ms until the dialog is found
  }

  function hideConfirmationDialog() {
    const dialog = document.getElementById("confirmation-dialog");
    if (dialog) {
      dialog.classList.add("hidden");
      dialog.classList.remove("show");
    }
  }

  window.handleConsent = function (consent) {
    userConsent = consent;
    hideConfirmationDialog();
    localStorage.setItem("userConsent", consent);
    if (!consent) {
      sessionStorage.setItem("userConsent", "false");
    } else {
      sessionStorage.setItem("removedOldDevice", true);
    }
    sendAnalyticsData(consent);
    clearInterval(intervalId);
    intervalId = setInterval(() => sendAnalyticsData(consent), 5 * 60 * 1000);
  };

  window.addEventListener("beforeunload", function (event) {
    sendAnalyticsData(userConsent);
  });

  // Set up interval to send limited data every 5 minutes
  let intervalId = setInterval(() => sendAnalyticsData(false), 5 * 60 * 1000);

  if (
    localStorage.getItem("userConsent") === "true" ||
    sessionStorage.getItem("userConsent") === "true"
  ) {
    userConsent = true;
    hideConfirmationDialog();
    sendAnalyticsData(true);
    clearInterval(intervalId);
    intervalId = setInterval(() => sendAnalyticsData(true), 5 * 60 * 1000);
  } else {
    sendAnalyticsData(false);
  }
})();
