
!function () {
  let closeButton = document.querySelector('.drift-close-button');
  let driftIcon = document.querySelector('.drift-facade-img.drift-dark-bg');
  let facadeImg = document.querySelector('.drift-facade-img');
  let driftIconUnread = document.querySelector('.drift-icon-unread');
  let driftWidget = document.querySelector('.drift-widget');
  let loader = document.querySelector('.drift-loader');
  let driftFacadeContainer = document.querySelector('#drift-facade-container');
  let driftMessage = document.querySelector('#drift-message');
  let noIcon = document.querySelector('#no-icon');
  let yesIcon = document.querySelector('#yes-icon');

  document.addEventListener('click', function (event) {
    checkConsentChanged();
  });


  driftFacadeContainer.addEventListener('click', (event) => {
    if (event.target.parentNode === closeButton || event.target.id === "drift-close-button") {
      toggleWidget('hide');
      return;
    }
    if (event.target === loader) {
      //drift is loading, be patient
      return
    }
    checkCookieManager();
  })

  function toggleLoader(status) {
    if (status === 'show') {
      loader.classList.remove('hide-loader');
      driftIcon.classList.add('drift-hidden');
    } else {
      loader.classList.add('hide-loader');
    }
  }

  function toggleMessage(message) {
    switch (message) {
      case 1:
        driftMessage.textContent = 'Hey 👋! Any questions? I can have a teammate jump in on chat right now!'
        break;
      case 2:
        driftMessage.textContent = 'Please accept Functional Cookies in order to use this chat.'
        break;
      default:
        break;
    }
  }

  function toggleWidget(status) {
    //hide the message element
    if (status === 'hide') {
      driftWidget.classList.add('drift-hidden');
      facadeImg.classList.add('drift-hidden');
      driftIconUnread.classList.add('drift-hidden');
      driftIcon.classList.remove('drift-hidden');
    }

    if (status === 'show') {
      driftIcon.classList.add('drift-hidden');
      driftFacadeContainer.classList.add('drift-shown');
      driftWidget.classList.remove('drift-hidden');
      facadeImg.classList.remove('drift-hidden');
      driftIconUnread.classList.remove('drift-hidden');
      toggleLoader();
    }
  }

  function loadDrift() {
    toggleWidget('hide');
    toggleLoader('show');
    console.log("load Drift");
    // replace the embedId below with your org's id (https://app.drift.com/settings2/widget/install)
    drift.load('uttup3cu7r8a');
    drift.on('ready', () => {
      driftFacadeContainer.classList.replace('drift-shown', 'drift-hidden');
    })
  }

  function unloadDrift() {
    console.log("unload Drift");
    driftFacadeContainer.classList.remove('drift-hidden');
    drift ? drift.unload() : null;
    toggleWidget('show');
    toggleMessage(1);
  }


  function hasConsent() {
    //Intializing the consent cookie check - This will change according to your consent management solution.
    let consentCookie = document.cookie.split('; ').find(row => row.startsWith('drift_consent='));
    console.log("Checking consent cookie");
    if (!consentCookie) {
      console.log("No consent cookie found");
      return false;
    }
    console.log("Consent cookie found: " + consentCookie);

  }

  function checkCookieManager() {
    if (hasConsent()) {
      //if consent is given, load drift
      loadDrift();
    } else {
      //if consent is not given open the widget message and include new instructions
      console.log("No consent found, opening widget message - Consent banner");
    }
  }

  function checkConsentChanged() {
    let consent = hasConsent();
    if (!consent) {
      //if Drift has initialized, unload Drift, otherwise do nothing
      drift.hasInitialized ? unloadDrift() : null;
    }
    if (consent) {
      drift.hasInitialized ? null : loadDrift();
    }
  }

  function checkDriftInstalled() {
    //periodically check if Drift Widget has loaded
    setInterval(() => {
      if (drift.hasInitialized) {
        noIcon.classList.add('drift-hidden');
        yesIcon.classList.remove('drift-hidden');
      } else {
        noIcon.classList.remove('drift-hidden');
        yesIcon.classList.add('drift-hidden');
      }
    }, 500);
  }


  checkDriftInstalled();
  checkConsentChanged();
}()