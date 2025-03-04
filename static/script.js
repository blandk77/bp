 // Function to get URL parameters
 function getParameterByName(name, url = window.location.href) {
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
      results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
  }

  function decodeBase64(encodedString) {
    try {
      return atob(encodedString);
    } catch (error) {
      console.error("Error decoding Base64:", error);
      return null;
    }
  }

  let timerValue = 5;
  const timerElement = document.getElementById("timer");
  const redirectButton = document.getElementById("redirectButton");
  const additionalButton = document.getElementById("additionalButton");
  const scrollMessage = document.getElementById("scrollMessage");
  const generatingMessage = document.getElementById("generatingMessage");
  const finalLinkButton = document.getElementById("finalLinkButton");
  let finalDecodedUrl;

  //Initially hide redirect and additional button
    redirectButton.style.display = "none";
    additionalButton.style.display = "none";

  function startTimer() {
    const timerInterval = setInterval(() => {
      timerValue--;
      timerElement.textContent = timerValue;

      if (timerValue <= 0) {
        clearInterval(timerInterval);
        redirectButton.style.display = "block";
      }
    }, 1000);
  }

    function startSecondTimer() {
        additionalButton.style.display = "none";
        let secondTimerValue = 5;
        timerElement.textContent = secondTimerValue;

        const secondTimerInterval = setInterval(() => {
            secondTimerValue--;
            timerElement.textContent = secondTimerValue;

            if (secondTimerValue <= 0) {
                clearInterval(secondTimerInterval);
                generatingMessage.style.display = "block";

                setTimeout(() => {
                    generatingMessage.style.display = "none";
                    finalLinkButton.style.display = "inline-block";
                    finalLinkButton.href = finalDecodedUrl;
                }, 3000);
            }
        }, 1000);
    }

  document.addEventListener("DOMContentLoaded", function() {
    const encodedUrl = getParameterByName("url");

    if (encodedUrl) {
      const decodedUrl = decodeBase64(encodedUrl);
      finalDecodedUrl = decodedUrl;

      if (decodedUrl) {
        startTimer();

        redirectButton.addEventListener("click", function(event) {
          event.preventDefault();
          redirectButton.style.display = "none";
          scrollMessage.style.display = "block";
          additionalButton.style.display = "block"; // Show the additional button

        });

      } else {
        document.body.textContent = "Error: Invalid URL.";
      }
    } else {
      document.body.textContent = "Error: No URL provided.";
    }
  });

    additionalButton.addEventListener("click", startSecondTimer);
