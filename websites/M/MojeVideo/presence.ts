const presence = new Presence({
    clientId: "776113876605337660"
  }),
  presenceData: PresenceData = {
    largeImageKey: "mojevideo"
  };

presence.on("UpdateData", async () => {
  if (!presenceData.details) presence.setActivity();
  else presence.setActivity(presenceData);
});

function RefreshData() {
  if (document.getElementById("video-comment")) {
    const mvTime = document.getElementById("mv-tm"),
      [mvCaptionH1] = document
        .getElementById("video-comment")
        .getElementsByTagName("h1"),
      videoName = mvCaptionH1 ? mvCaptionH1.textContent : "Unknown video";

    if (mvTime) {
      presenceData.details = videoName;
      presenceData.state = mvTime.textContent;
    } else {
      presenceData.details = "Sleduje video";
      presenceData.state = videoName;
    }
    presenceData.smallImageKey =
      document.getElementById("mv-pl").style.visibility !== "visible"
        ? "mvplaying"
        : "mvpaused";
  } else {
    let actualUrl = window.location.toString();
    const actualTitle = document.title;

    actualUrl = actualUrl.replace("https://www.mojevideo.sk/", "");
    actualUrl = actualUrl.replace("https://mojevideo.sk/", "");
    actualUrl = actualUrl.replace("mesiac/", "");
    actualUrl = actualUrl.replace("celkovo/", "");

    if (actualUrl === "") presenceData.details = "Hlavná stránka";
    else if (!actualTitle.startsWith("Videá - mojeVideo.sk")) {
      if (actualTitle.includes(".strana"))
        [presenceData.details, presenceData.state] = actualTitle.split(" - ");
      else presenceData.details = actualTitle;
    } else {
      let extraPage = "Hlavná stránka",
        extraPageNumber = 0;
      const urlPieces = actualUrl.split("/");

      for (let i = 0; i < urlPieces.length; i++) {
        const urlPiece = urlPieces[i];
        if (urlPiece.includes("strana_")) {
          extraPageNumber = parseInt(urlPiece.replace("strana_", "")) || 0;
          extraPageNumber++;
        }
      }

      if (actualUrl.includes("prihlasenie")) extraPage = "Prihlásenie";
      else if (actualUrl.includes("registracia")) extraPage = "Registrácia";
      presenceData.details = extraPage;
      if (extraPageNumber !== 0)
        presenceData.state = `${extraPageNumber}.strana`;
    }
  }
  presenceData.largeImageKey = "mojevideo";
}

setInterval(RefreshData, 1000);
