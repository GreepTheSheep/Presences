const presence = new Presence({
    clientId: "638344004085350400"
  }),
  browsingTimestamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
      largeImageKey: "teamtrees"
    },
    currentCount = await presence.getSetting("count");

  if (currentCount) {
    presenceData.details = `$${
      document.getElementById("totalTrees")?.textContent
    }`;
    presenceData.state = "Currently Donated";
  } else {
    presenceData.details = "Helping #TeamTrees plant";
    presenceData.state = "20million trees by 2020";
  }

  presenceData.startTimestamp = browsingTimestamp;
  presenceData.buttons = [
    { label: "Visit #TeamSeas", url: "https://teamSeas.org" }
  ];

  presence.setActivity(presenceData);
});
